import { IoArrowBack } from "react-icons/io5";
import { HiVideoCamera } from "react-icons/hi2";
import { MdTimer } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { HiPlay } from "react-icons/hi2";
import { HiStop } from "react-icons/hi2";
import { useRouter } from "next/router";
import { FaHourglass } from "react-icons/fa";
import Layout from "@/components/Layout";
import PostQuestions from "@/components/questions";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import ExerciseContext from "@/pages/api/exercise-context";
import { ToastContainer, toast } from 'react-toastify';
import formatTime from "@/lib/format_time";
import SessionContext from "@/pages/api/session_result";

import getPrediction from "@/lib/get_prediction";
import validateExercise from "@/lib/validate_exercise";

import { POSE_CONNECTIONS, Pose } from "@mediapipe/pose/pose";
import { Camera } from "@mediapipe/camera_utils/camera_utils";
import {
  drawLandmarks,
  drawConnectors,
  PoseConnection,
} from "@mediapipe/drawing_utils/drawing_utils";

// GLOBAL VARIABLES ONLY FOR THIS CCOMPONENT
var stopSesssion = false;
var sessionStarted = false;
var timePaused = false;
var avgRepsSpd = [];
var borgAnswers = [];

const Session = () => {
  const router = useRouter();

  const [isStartBtnDisabled, setStartBtnIsDisabled] = useState(false);
  const [isStopBtnDisabled, setStopBtnIsDisabled] = useState(true);
  const [isCameraBtnDisabled, setCameraBtnIsDisabled] = useState(false);

  const [stop, setStop] = useState(false);
  const [question1, setquestion1] = useState(true);
  const [question2, setquestion2] = useState(false);
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');

  const [reps, setReps] = useState(0);
  const [speed, setSpeed] = useState(0);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const {exerciseReps, setExerciseReps, avgRepsSpeed, setAvgRepsSpeed, exerciseDuration, setExerciseDuration, borgQnA, setBorgQnA} = useContext(SessionContext);


  const handleStopButton = () => {
    if(reps==0){
      toast.error("No activity detected during your Session. Redirecting you to Dashboard.", 
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // close after 3 seconds
        hideProgressBar: true, // hide the progress bar
        closeOnClick: true, // close on click
        pauseOnHover: true, // pause on hover
        draggable: true, // allow dragging
      });
      // setTimeout(()=>{router.push('/dashboard')}, 3000);
    }else{
      setStop(true);
      stopSesssion = true;
      getQuestion();
      handleStop();
      setExerciseReps(reps);
      console.log(avgRepsSpd)
      setAvgRepsSpeed(avgRepsSpd);
      setExerciseDuration(time);
      setBorgQnA(borgAnswers);
    }
  };

  const { exerName, setExerName, postValue, setPostValue } = useContext(ExerciseContext);

  if(exerName == '' || exerName == undefined){
    setExerName("PLANKING");
  }
  
  const getQuestion = (qid, answer) => {
    if (qid == "1") {
      console.log(answer);
      setAnswer1(answer);
      borgAnswers[0] = answer;
      // console.log("State val: " + answer1);
      setquestion1(false);
      setquestion2(true);
    }
    
    if (qid == "2") {
      console.log(answer)
      setAnswer2((prevAnswer)=>prevAnswer + answer); // this shit is not working
      borgAnswers[1] = answer;
      // console.log("State val: " + answer2);
      passToContext();
      router.push('/session-results')
    }
  };
  
  function passToContext() {
    const exercise_name = exerName;
    const post_answer1 = answer1;
    const post_answer2 = answer2;
    const newPostValue = { exercise_name, post_answer1, post_answer2};
    setPostValue([...postValue, newPostValue])
  }

  const [count, setCount] = useState(false);

  useEffect(() => {
    setCount(true);
  }, [count]);

  useEffect(() => {
    console.log("Component is mounted.");
    avgRepsSpd.length = 0;
    borgAnswers.length = 0;
    return () => {
      console.log('Component is about to be unmounted.');
      sessionStarted = false;
    };
  }, []);

  if (count == true) {
    fetchCameraDevice();
  }

  // const [repsSpeedArray, setRepsSpeedArray] = useState([]);

  // useEffect(()=>{
  //   setRepsSpeedArray(prevRepsSpeedArray => [...prevRepsSpeedArray, speed]);
  //   console.log(repsSpeedArray);
  // },[speed]);

  const handleStart = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      if (timePaused == false) {
        setTime((prevTime) => prevTime + 1);
      }
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handlePause = () => {
    timePaused = true;
  };

  const handleContinue = () => {
    timePaused = false;
  }

  function initMediapipe(exercise) {

    if(sessionStarted == false){
      setTime(0);
    }

    sessionStarted = true;

    setStartBtnIsDisabled(true);
    setStopBtnIsDisabled(false);
    setCameraBtnIsDisabled(true);

    const canvasElement = document.getElementsByClassName("output_canvas")[0];
    const canvasCtx = canvasElement.getContext("2d");

    var prevPrediction = undefined;
    var curPrediction = undefined;
    var prevTime;
    var curTime;
    var countReset = false;
    var repsSpeedStart = false;
    var repsProgress = 0;
    var startDetected = false;

    function onResults(results) {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 1,
      });
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
      canvasCtx.restore();

      // const poseLandmarksArray = results.poseLandmarks.map((landmark) => ({
      //   x: landmark.x,
      //   y: landmark.y,
      // }));

      try {
        const flattenedLandmarks = results.poseLandmarks.flatMap((landmark) => {
          return [landmark.x, landmark.y];
        });

        // GET PREDICTION FROM ML MODEL BY SENDING DATA TO getPrediction() FUNCTION
        getPrediction(flattenedLandmarks).then((result) => {
          const landmark = results.poseLandmarks;

          // console.log(result);

          // SET VALUE OF prevPrediction to the CURRENT PREDICTION RESULT FROM ML MODEL
          if (prevPrediction == undefined) {
            prevPrediction = result;
          }

          // GET THE EXERCISE ASSESSMENT USING validateExercise() FUNCTION AND SEND THE FF. ARGUMENTS REQUIRED
          let exercise_assessment = validateExercise(
            exercise,
            landmark,
            prevPrediction,
            result,
            countReset,
            repsSpeedStart,
            repsProgress,
            startDetected
          );

          // console.log(stopSesssion);

          if (exercise_assessment != undefined && stopSesssion == false && exerName != "PLANKING") {
            if (exercise_assessment.startPosition != undefined){
              prevPrediction = exercise_assessment.startPosition;
            }

            if (exercise_assessment.count == 0 && exercise_assessment.countReset == false) {
              startDetected = exercise_assessment.isDetectedStart;
              if(repsSpeedStart == false){
                prevTime = exercise_assessment.pTime;
                repsSpeedStart = true;
              }
              // console.log("PTIME: " + prevTime);
              // durationReset = exercise_assessment.durationReset;
            }

            if (exercise_assessment.count == 0.5) {
              repsProgress = exercise_assessment.count;
              // startDetected = exercise_assessment.isDetectedStart;
              countReset = exercise_assessment.countReset;
            }

            if (exercise_assessment.count == 1 && countReset == true) {
              curTime = exercise_assessment.cTime;
              if(prevTime != undefined && curTime != undefined){
                let repsSpeed = (exercise_assessment.cTime - prevTime) / 1000;
                repsSpeed = repsSpeed.toFixed(2);
                // console.log(repsSpeed);
                // console.log(!isNaN(repsSpeed));
                setSpeed(repsSpeed);
                avgRepsSpd.push(parseFloat(repsSpeed));
                // console.log(avgRepsSpd);
                setReps((prevReps) => prevReps + 1);
                // console.log("Count=" + reps);
              }
              countReset = exercise_assessment.countReset;
              repsSpeedStart = false;
              repsProgress = 0;
              countReset = false;
            }
            curPrediction = result;
          }else if(exerName == "PLANKING" && exercise_assessment != undefined && stopSesssion == false){
            setReps("--");
            setSpeed("--");
            timePaused = true;
            if(exercise_assessment.count == 1){
              handleContinue();
            }else{
              handlePause();
            }
          }
        });
        curPrediction = result;
        if (prevPrediction == curPrediction) {
          // console.log("Changed");
          prevPrediction = curPrediction;
        }
      } catch (error) {
        
      }
    }

    // MediapipeScreen({"count": 1, "speed": 3});
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
      },
    });
    pose.setOptions({
      upperBodyOnly: false,
      smoothLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });
    if(sessionStarted == true){
      pose.onResults(onResults);
    }

    // function stopPose() {
    //   pose.close();
    //   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    //   poseIsActive = false;
    // }

    // stopPose();

    startCamera();

    async function startCamera() {
      // Get the selected camera ID from the select element
      const selectElement = document.getElementById("camera-select");
      const selectedDeviceId = selectElement.value;

      // Request access to the selected camera
      const constraints = {
        audio: false,
        video: { deviceId: selectedDeviceId },
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );

      // Attach the stream to a video element to display the camera feed
      const videoElement = document.createElement("video");
      videoElement.srcObject = mediaStream;
      videoElement.onloadedmetadata = function (e) {
        videoElement.play();
      };

      // Create a Camera object and start it (TEST CODE FOR SETTING THE VIDEO RESOLUTION BASED ON DEVICE SPECS)
      const track = mediaStream.getVideoTracks()[0];
      const settings = track.getSettings();
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await pose.send({ image: videoElement });
        },
        width: settings.width,
        height: settings.height,
      });
      camera.start();

      // Create a Camera object and start it
      // const camera = new Camera(videoElement, {
      //   onFrame: async () => {
      //     await pose.send({ image: videoElement });
      //   },
      //   width: 1920,
      //   height: 1080,
      // });
      // camera.start();
    }
  }

  function fetchCameraDevice() {
    // Get list of available video devices (cameras)
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      // Create a select element with options for each camera
      const selectElement = document.getElementById("camera-select");
      // selectElement.setAttribute('id', 'camera-select');

      while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild);
      }

      videoDevices.forEach((device) => {
        const optionElement = document.createElement("option");
        optionElement.value = device.deviceId;
        optionElement.text =
          device.label || `Camera ${selectElement.length + 1}`;
        selectElement.appendChild(optionElement);
      });
    });
  }

  return (
    <Layout>
      <div className={`${stop ? "block" : "hidden"} h-screen w-screen absolute z-10`}>
        <div className={`${question1 ? "block" : "hidden"}`}>
          <PostQuestions
            id="1"
            question="How would you describe your level of breathlessness during exercise?"
            choice1="Borderline uncomfortable"
            choice2="Breathing heavily"
            choice3="Comfortable"
            submit={getQuestion}
          />
        </div>
        <div className={`${question2 ? "block" : "hidden"}`}>
          <PostQuestions
            id="2"
            question="How would you describe your ability to speak during exercise?"
            choice1="Can speak a sentence"
            choice2="Can hold a short conversation"
            choice3="Easy to breath and carry a conversation"
            submit={getQuestion}
          />
        </div>
      </div>
      <div className="h-full flex">
        <div className="h-full w-4/5 ">
          <div className="h-5% p-5">
            <button
              className="flex items-center"
              onClick={() => router.push("/dashboard")}
            >
              <IoArrowBack size="30px" color="grey" /> Go Back
            </button>
          </div>
          <div className="h-95% flex items-center justify-center pl-7">
            <div className="bg-black opacity-75 absolute w-96 self-start text-center rounded-xl p-2 z-1">
              <h1 className="text-white text-4xl">{exerName}</h1>
            </div>
            <canvas
              className="output_canvas h-95% w-95% bg-grey rounded-3xl flex justify-center items-center"
              width={"1280"}
              height={"720"}
            ></canvas>
            {/* <div className="z-10 stopwatch-display text-black">{formatTime(time)}</div> */}
          </div>
        </div>
        <div className="h-full w-1/5 flex flex-col justify-around items-center">
          <div className="bg-cambg flex justify-center items-center gap-2 w-72 rounded-full p-2 shadow-lg shadow-rgba(3,4,94,0.3)">
            <HiVideoCamera color="#0096C7" />
            <select
              id="camera-select"
              name="cameras"
              className="bg-cambg w-56 text-center"
              disabled={isCameraBtnDisabled}
            ></select>
          </div>
          <div className="bg-repsbg w-72 rounded-xl flex justify-around items-center gap-2 p-4 shadow-lg shadow-rgba(3,4,94,0.3)">
            <MdTimer size="40px" color="white" />

            <h1 className="font-mono font-bold text-white text-center text-3xl">
              Reps <br /> Count:
            </h1>
            <h1 className="font-mono font-bold text-white text-5xl">{reps}</h1>
          </div>
          <div className="bg-speedbg w-72 rounded-xl flex justify-around items-center gap-2 p-4 shadow-lg shadow-rgba(3,4,94,0.3)">
            <IoSpeedometer size="40px" color="white" />
            <h1 className="font-mono font-bold text-white text-center text-3xl">
              Reps <br /> Speed:
            </h1>
            <h1 className="font-mono font-bold text-white text-5xl">
              {speed}
            </h1>
          </div>
          <div className="bg-slate-600 w-72 rounded-xl flex justify-around items-center gap-2 p-4 shadow-lg shadow-rgba(3,4,94,0.3)">
            <FaHourglass size="40px" color="white" />
            <div>
              <h1 className="font-mono font-bold text-white text-center text-3xl">
                Duration:
              </h1>
              <h1 className="font-mono font-bold text-white text-5xl">
                {formatTime(time)}s
              </h1>
            </div>
          </div>
          <div className="bg-cambg w-72 p-7 flex flex-col items-center gap-7 rounded-xl shadow-lg shadow-rgba(3,4,94,0.3)">
            <h1 className="font-bold text-4xl">Session:</h1>
            <button
              onClick={() => {
                stopSesssion = false;
                if (count == true) {
                  initMediapipe(exerName);
                  handleStart(false);
                }
              }}
              disabled={isStartBtnDisabled} 
              className="bg-btnstart w-56 p-3 font-mono font-bold text-white text-4xl rounded-full flex items-center justify-center"
            >
              Start <HiPlay size="40px" />
            </button>
            <button
              onClick={() => {
                handleStopButton();
              }}
              disabled={isStopBtnDisabled}
              className="bg-btnstop w-56 p-3 font-mono font-bold text-white text-4xl rounded-full flex items-center justify-center"
            >
              Stop <HiStop size="40px" />
            </button>
            {/* <button onClick={handlePause}>Pause</button>
            <button onClick={handleContinue}>Continue</button> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Session;
