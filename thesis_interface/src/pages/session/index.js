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

import getPrediction from "@/lib/get_prediction";
import validateExercise from "@/lib/validate_exercise";

import {
  drawLandmarks,
  drawConnectors,
  PoseConnection,
} from "@mediapipe/drawing_utils/drawing_utils";
import { POSE_CONNECTIONS, Pose } from "@mediapipe/pose/pose";
import { Camera } from "@mediapipe/camera_utils/camera_utils";

// GLOBAL VARIABLES ONLY FOR THIS CCOMPONENT
var stopSesssion = false;
var sessionStarted = false;
var timePaused = false;

const Session = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);

  const [stop, setStop] = useState(false);

  const handleStopButton = () => {
    console.log("Test");
    setStop(true);
    stopSesssion = true;
  };

  const { exerName, setExerName, postValue, setPostValue } = useContext(ExerciseContext);

  if(exerName == '' || exerName == undefined){
    setExerName("SQUAT");
  }

  const [question1, setquestion1] = useState(true);
  const [question2, setquestion2] = useState(false);
  const [answer1, setanswer1] = useState('');
  const [answer2, setanswer2] = useState('');
  
  const getQuestion = (qid, answer) => {
    if (qid == "1") {
      setanswer1(answer);
      setquestion1(false);
      setquestion2(true);
    }
    
    if (qid == "2") {
      console.log(answer)
      setanswer2(answer); // this shit is not working
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

  if (count == true) {
    fetchCameraDevice();
  }

  const [reps, setReps] = useState(0);
  const [speed, setSpeed] = useState(0);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    // const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    // return `${hours.toString().padStart(2, '0')}:${minutes
    //   .toString()
    //   .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

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
    sessionStarted = true;

    setIsDisabled(true);

    const canvasElement = document.getElementsByClassName("output_canvas")[0];
    const canvasCtx = canvasElement.getContext("2d");

    var prevPrediction = undefined;
    var curPrediction = undefined;
    var prevTime;
    var curTime;
    var countReset = true;
    var durationReset = true;
    var repsProgress = 0;

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

          console.log(result);

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
            durationReset,
            repsProgress
          );

          // console.log(stopSesssion);

          if (exercise_assessment != undefined && stopSesssion == false) {
            if (exercise_assessment.startPosition != undefined)
              prevPrediction = exercise_assessment.startPosition;

            if (exercise_assessment.count == 0 && durationReset == true) {
              prevTime = exercise_assessment.pTime;
              durationReset = exercise_assessment.durationReset;
            }

            if (exercise_assessment.count == 0.5) {
              repsProgress = exercise_assessment.count;
              countReset = exercise_assessment.countReset;
            } else if (exercise_assessment.count == 1) {
              curTime = exercise_assessment.cTime;
              let repsSpeed = (exercise_assessment.cTime - prevTime) / 1000;
              repsSpeed = repsSpeed.toFixed(2);
              setSpeed(repsSpeed);
              setReps((prevReps) => prevReps + 1);
              countReset = exercise_assessment.countReset;
              repsProgress = 0;
              durationReset = true;
            }

            curPrediction = result;
          }
        });
        if (prevPrediction == curPrediction) {
          // console.log("Changed");
          prevPrediction = curPrediction;
        } else {
        }
      } catch (error) {
        console.error(error);
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
    pose.onResults(onResults);

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
      <div className={`${stop ? "block" : "hidden"} h-screen w-screen absolute`}>
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
            <div className="bg-black opacity-75 absolute w-96 self-start text-center rounded-xl p-2">
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
              {speed}s
            </h1>
          </div>
          <div className="bg-timberwolf w-72 rounded-xl flex justify-around items-center gap-2 p-4 shadow-lg shadow-rgba(3,4,94,0.3)">
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
                  handleStart();
                }
              }}
              disabled={isDisabled} 
              className="bg-btnstart w-56 p-3 font-mono font-bold text-white text-4xl rounded-full flex items-center justify-center"
            >
              Start <HiPlay size="40px" />
            </button>
            <button
              className="bg-btnstop w-56 p-3 font-mono font-bold text-white text-4xl rounded-full flex items-center justify-center"
              onClick={() => {
                handleStopButton();
                getQuestion();
              }}
            >
              Stop <HiStop size="40px" />
            </button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleContinue}>Continue</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Session;
