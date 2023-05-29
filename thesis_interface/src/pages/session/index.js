import { IoArrowBack } from "react-icons/io5";
import { HiVideoCamera } from "react-icons/hi2";
import { MdTimer } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { HiPlay } from "react-icons/hi2";
import { HiStop } from "react-icons/hi2";
import { useRouter } from "next/router";
import { FaHourglass } from "react-icons/fa";
import { AiFillControl } from "react-icons/ai";
import Layout from "@/components/Layout";
import PostQuestions from "@/components/questions";
import Guides from "@/components/session-guide";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import ExerciseContext from "@/pages/api/exercise-context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formatTime from "@/lib/format_time";
import SessionContext from "@/pages/api/session_result";
import getPrediction from "@/lib/get_prediction";
import validateExercise from "@/lib/validate_exercise";
import { Modal, Button, Carousel, Tooltip } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Image from 'next/image'
import { POSE_CONNECTIONS, Pose } from "@mediapipe/pose/pose";
import { Camera } from "@mediapipe/camera_utils/camera_utils";
import {isMobile, isBrowser} from 'react-device-detect';
import {
  drawLandmarks,
  drawConnectors,
  PoseConnection,
} from "@mediapipe/drawing_utils/drawing_utils";
import Head from "next/head";

// GLOBAL VARIABLES ONLY FOR THIS CCOMPONENT
var stopSession = false;
var sessionStarted = false;
var sessionFinished = false;
var timePaused = false;
var inactivityTimePaused = false;
var avgRepsSpd = [];
var borgAnswers = [];
var phonecamid = 'user';
var phonecam = isMobile;


const Session = () => {
  const stopcam= useRef(null);
  const router = useRouter();

  const [isStartBtnDisabled, setStartBtnIsDisabled] = useState(false);
  const [isStopBtnDisabled, setStopBtnIsDisabled] = useState(true);
  const [isCameraBtnDisabled, setCameraBtnIsDisabled] = useState(false);
  const [isphone,setisphone] = useState(false)

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

  const [seconds, setSeconds] = useState(0);
  const [showInactivityModal, setShowInactivityModal] = useState(false);

  const {exerciseReps, setExerciseReps, avgRepsSpeed, setAvgRepsSpeed, exerciseDuration, setExerciseDuration, borgQnA, setBorgQnA} = useContext(SessionContext);
  const { exerName, setExerName, postValue, setPostValue, exerSessionStarted, setExerSessionStarted} = useContext(ExerciseContext);

  const [ rightPosDetected, setRightPosDetected ] = useState(false);

  let camera;
  let track;
  let videoTracks;

  const setcam = (e) => {
    phonecamid = e.target.value;
  }

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
      setTimeout(()=>{router.push('/dashboard')}, 3000);
    }else if(seconds >= 30){
      setShowInactivityModal(false);
      setStop(true);
      stopSession = true;
      getQuestion();
      handleStop();
      setExerciseReps(reps);
      // console.log(avgRepsSpd);
      setAvgRepsSpeed(avgRepsSpd);
      setExerciseDuration(time-30);
      setBorgQnA(borgAnswers);
      sessionFinished = true;
    }else{
      setShowInactivityModal(false);
      inactivityTimePaused = true;
      setStop(true);
      stopSession = true;
      getQuestion();
      handleStop();
      setExerciseReps(reps);
      // console.log(avgRepsSpd);
      setAvgRepsSpeed(avgRepsSpd);
      setExerciseDuration(time);
      setBorgQnA(borgAnswers);
      sessionFinished = true;
    }
  };

  if(exerName == '' || exerName == undefined){
    setExerName("PUSH-UPS");
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

  function refreshPage() {
    window.location.reload();
  }

  useEffect(() => {
    if(phonecam==true){
      setisphone(true);
    }
    //console.log(isMobile);
    if(exerSessionStarted==true){
      refreshPage();
    }
    fetchCameraDevice();
    setCount(true);
    // console.log("Component is mounted.");
    avgRepsSpd.length = 0;
    borgAnswers.length = 0;
    console.log("Mounted Array: " + avgRepsSpd);
    sessionFinished = false;
    // console.log(borgAnswers);
    return () => {
      // console.log('Component is about to be unmounted.');
      sessionStarted = false;
      console.log("Unmounted Array: " + avgRepsSpd);
      sessionFinished = true;
      // console.log(borgAnswers);
    };
    
  }, []);

  //if (count == true) {
    //fetchCameraDevice();
  //}

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
  
  function startInactivityTimer() {
    const interval = setInterval(() => {
      if (seconds < 30 && inactivityTimePaused == false) {
        setSeconds((seconds) => seconds + 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  useEffect(()=>{
    //console.log(seconds);
    if(seconds == 30){
      inactivityTimePaused = true;
      console.log("Timer reached 30 seconds");
      setShowInactivityModal(true);
    }
  }, [seconds])

  function initMediapipe(exercise) {


    if(sessionFinished == true){
      return;
    }

    if(sessionStarted == false){
      setTime(0);
    }

    setExerSessionStarted(true);

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

          if (exercise_assessment != undefined && stopSession == false && exerName != "PLANKING") {
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
              setRightPosDetected(true);
            }else{
              setRightPosDetected(false);
            }

            if (exercise_assessment.count == 1 && countReset == true) {
              curTime = exercise_assessment.cTime;
              if(prevTime != undefined && curTime != undefined){
                let repsSpeed = (exercise_assessment.cTime - prevTime) / 1000;
                repsSpeed = repsSpeed.toFixed(2);
                // console.log(repsSpeed);
                // console.log(!isNaN(repsSpeed));
                setSpeed(repsSpeed);
                // console.log("Multiverse Reps Speed: " + repsSpeed);
                avgRepsSpd.push(parseFloat(repsSpeed));
                // console.log(avgRepsSpd);
                setReps((prevReps) => prevReps + 1);
                setSeconds(0);
                // console.log("Count=" + reps);
              }
              countReset = exercise_assessment.countReset;
              repsSpeedStart = false;
              repsProgress = 0;
              countReset = false;
            }
            curPrediction = result;
          }else if(exerName == "PLANKING" && exercise_assessment != undefined && stopSession == false){
            setReps("--");
            setSpeed("--");
            timePaused = true;
            if(exercise_assessment.count == 1){
              handleContinue();
              setSeconds(0);
              setRightPosDetected(true);
            }else{
              handlePause();
              setRightPosDetected(false);
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
      if(phonecam==false){
        const selectElement = document.getElementById("camera-select");
      const selectedDeviceId = selectElement.value;

      // Request access to the selected camera
      const constraints = {
        audio: false,
        video: {deviceId: { exact: selectedDeviceId }},
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );

      videoTracks = mediaStream.getVideoTracks();

      // Attach the stream to a video element to display the camera feed
      const videoElement = document.createElement("video");
      videoElement.srcObject = mediaStream;
      videoElement.onloadedmetadata = function (e) {
        videoElement.play();
      };

      // Create a Camera object and start it (TEST CODE FOR SETTING THE VIDEO RESOLUTION BASED ON DEVICE SPECS)
      track = mediaStream.getVideoTracks()[0];
      const settings = track.getSettings();
      camera = new Camera(videoElement, {
        onFrame: async () => {
          await pose.send({ image: videoElement });
        },
        facingMode: phonecamid,
        width: settings.width,
        height: settings.height,
      });
      camera.start();
      }
      else{

      // Request access to the selected camera
      const constraints = {
        audio: false,
        video: {facingMode: phonecamid},
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );

      videoTracks = mediaStream.getVideoTracks();
      // Attach the stream to a video element to display the camera feed
      const videoElement = document.createElement("video");
      videoElement.srcObject = mediaStream;
      videoElement.onloadedmetadata = function (e) {
        videoElement.play();
      };

      // Create a Camera object and start it (TEST CODE FOR SETTING THE VIDEO RESOLUTION BASED ON DEVICE SPECS)
      track = mediaStream.getVideoTracks()[0];
      const settings = track.getSettings();
      camera = new Camera(videoElement, {
        onFrame: async () => {
          await pose.send({ image: videoElement });
        },
        facingMode: phonecamid,
        width: settings.width,
        height: settings.height,
      });
      camera.start();
      }

      const stopCameraButton = document.getElementById("stop-camera-button");
      const camstop = stopcam.current
      camstop.addEventListener("touchstart", stopCamera);
      camstop.addEventListener("mouseenter", stopCamera);
      camstop.addEventListener("click", stopCamera);
      stopCameraButton.addEventListener("click", stopCamera);
      

      // Define the stopCamera function
      function stopCamera() {
        // Stop the camera
        videoTracks.forEach(track => {
          track.stop();
          camera.stop();
        });
      }

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

    return null;
  }

  function fetchCameraDevice() {
    if (phonecam == true){
      return;
    }
    // Get list of available video devices (cameras)
    //console.log(navigator.mediaDevices.enumerateDevices());
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
      });
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

  const [showControl, setShowControl] = useState(false);

  return (
    <Layout>
      <Head><title>Session</title></Head>
      <div className={`${stop ? "block" : "hidden"} h-screen w-screen absolute z-10`} ref={stopcam}>
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
      <div className="h-full flex items-end relative">
        <div className="h-full laptop:w-4/5 w-full ">
          <div className="h-5% px-5 flex justify-between">
            <button
              className="flex items-center"
              onClick={() => router.push("/dashboard")}
            >
              <IoArrowBack size="30px" color="grey" /> Go Back
            </button>
            <button className="laptop:hidden flex items-center h-full" onClick={() => setShowControl(!showControl)}>
              <AiFillControl size="40px" color="grey" />
            </button>
          </div>
          <div className="h-95% flex items-center justify-center laptop:pl-7">
            <div className="bg-black opacity-75 absolute tablet:w-96 self-start text-center rounded-xl p-2 z-0">
              <h1 className="text-white tablet:text-4xl text-xl">{exerName}</h1>
            </div>
            <canvas
              className={`output_canvas h-95% w-95% bg-grey rounded-3xl flex justify-center items-center ${rightPosDetected ? 'green-shadow': ''}`}
              width={"1280"}
              height={"720"}
            ></canvas>
            {/* <div className="z-10 stopwatch-display text-black">{formatTime(time)}</div> */}
          </div>
        </div>
        <div className={`laptop:py-0 py-2 tablet:px-0 px-2 laptop:h-full h-1/4 laptop:w-1/5 w-full laptop:flex-col justify-around tablet:gap-0 gap-3 laptop:items-center laptop:flex ${showControl ? 'flex laptop:relative absolute' : 'hidden'}`}>
          <div className="bg-cambg laptop:relative absolute flex items-center gap-2 desktop:w-72 laptopL:w-64 laptop:w-40 tablet:w-64 mobileL:w-36 mobileM:w-32 w-28 laptop:m-0 tablet:mr-1 mobileM:ml-3 rounded-full p-2 shadow-lg shadow-rgba(3,4,94,0.3)">
            <HiVideoCamera color="#0096C7" className="absolute desktop:w-8 desktop:h-8 laptopL:w-6 laptopL:h-6 laptop:w-5 laptop:h-5 tablet:w-7 tablet:h-7 tablet:block hidden"/>
            {isphone ? <select
              //id="camera-select"
              //name="cameras"
              className="bg-cambg w-full text-center border-none laptopL:pl-0 laptop:pl-6"
              //disabled={isCameraBtnDisabled}
              onChange={setcam}
            >
              <option value='user'>Front Cam</option>
              <option value='environment'>Back Cam</option>
            </select> : <select
            id="camera-select"
            name="cameras"
            className="bg-cambg w-full text-center border-none laptopL:pl-0 laptop:pl-6"
            //disabled={isCameraBtnDisabled}
          ></select>}
          </div>
          <div className="relative laptop:h-fit h-full laptop:w-fit w-40 flex flex-col justify-around desktop:gap-10 laptopL:gap-3 laptop:gap-8">
            <div className="bg-repsbg desktop:w-72 laptopL:w-64 laptop:w-40 laptop:h-fit rounded-xl flex justify-around items-center gap-2 laptopL:p-4 laptop:p-2 px-0 py-2 shadow-lg shadow-rgba(3,4,94,0.3)">
              <MdTimer className="laptopL:w-10 laptopL:h-10 laptopL:block hidden tablet:w-8 tablet:h-8 w-8 h-8" color="white" />
              <h1 className="font-mono font-bold text-white text-center desktop:text-3xl laptopL:text-3xl tablet:text-lg mobileL:text-base">
                Reps <br /> Count:
              </h1>
              <h1 className="font-mono font-bold text-white laptopL:text-5xl tablet:text-3xl mobileL:text-3xl mobileM:text-2xl">{reps}</h1>
            </div>
            <div className="bg-speedbg desktop:w-72 laptopL:w-64 laptop:w-40 laptop:h-fit rounded-xl flex justify-around items-center gap-2 laptopL:p-4 laptop:p-2 px-0 py-2 shadow-lg shadow-rgba(3,4,94,0.3)">
              <IoSpeedometer className="laptopL:w-10 laptopL:h-10 laptopL:block hidden tablet:w-8 tablet:h-8" color="white" />
              <h1 className="font-mono font-bold text-white text-center desktop:text-3xl laptopL:text-2xl tablet:text-xl mobileL:text-base">
                Reps <br /> Speed:
              </h1>
              <h1 className="font-mono font-bold text-white desktop:text-5xl laptopL:text-4xl tablet:text-3xl mobileL:text-3xl mobileM:text-2xl">
                {speed}
              </h1>
            </div>
          </div>
          <div className="desktop:w-72 laptopL:w-64 laptop:w-40 laptop:h-fit h-full flex items-end pb-4 ">
            <div className="bg-slate-600 w-full rounded-xl flex justify-around items-center gap-2 laptop:p-4 p-0 shadow-lg shadow-rgba(3,4,94,0.3)">
              <FaHourglass className="laptopL:w-10 laptopL:h-10 laptopL:block hidden tablet:w-8 tablet:h-8" color="white" />
              <div className="flex flex-col items-center">
                <h1 className="font-mono font-bold text-white text-center laptopL:text-3xl tablet:text-xl">
                  Duration:
                </h1>
                <h1 className="font-mono font-bold text-white laptopL:text-5xl tablet:text-4xl mobileL:text-xl">
                  {formatTime(time)}
                </h1>
                <Tooltip
                  content="Automatically stops your session when timer reach 30 seconds due to inactivity."
                  style="light"
                  placement="left"
                >
                  <h4 className="text-white font-bold font-mono mr-2 tablet:text-base text-sm">Inactivity Timer: <span className="text-lg">{seconds}</span></h4>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="bg-cambg desktop:w-72 laptopL:w-64 laptop:w-40 laptop:p-7 px-3 flex flex-col items-center laptop:justify-start justify-around laptop:gap-7 rounded-xl shadow-lg shadow-rgba(3,4,94,0.3)">
            <h1 className="font-bold laptopL:text-4xl tablet:text-3xl">Session:</h1>
            <button
              onClick={() => {
                stopSession = false;
                if (count == true) {
                  initMediapipe(exerName);
                  startInactivityTimer();
                  handleStart();
                }
              }}
              disabled={isStartBtnDisabled} 
              className="bg-btnstart laptopL:w-56 tablet:w-36 mobileL:w-24 mobileM:w-20 p-3 font-mono font-bold text-white laptopL:text-4xl tablet:text-2xl mobileL:text-lg rounded-full flex items-center justify-center"
            >
              Start <HiPlay className="laptopL:w-10 laptopL:h-10 laptop:w-8 laptop:h-8" />
            </button>
            <button
              onClick={() => {
                handleStopButton();
              }}
              disabled={isStopBtnDisabled}
              id="stop-camera-button"
              className="bg-btnstop laptopL:w-56 tablet:w-36 mobileL:w-24 mobileM:w-20 p-3 font-mono font-bold text-white laptopL:text-4xl tablet:text-2xl mobileL:text-lg rounded-full flex items-center justify-center"
            >
              Stop <HiStop className="laptopL:w-10 laptopL:h-10 laptop:w-8 laptop:h-8" />
            </button>
            {/* <button onClick={handlePause}>Pause</button>
            <button onClick={handleContinue}>Continue</button> */}
          </div>
        </div>
        <Modal show={showInactivityModal} size="md" popup={true} onClose={()=>handleStopButton()}>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center" ref={stopcam}>
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Your exercise session has been automatically stopped due to inactivity.
              </h3>
              <h3 className="mb-5 text-lg font-normal text-red-500 dark:text-gray-400">
                30 seconds has been deducted from your exercise duration.
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="gray"
                  //ref={stopcam}
                  onClick={()=>handleStopButton()}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Guides name={exerName}/>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Session;
