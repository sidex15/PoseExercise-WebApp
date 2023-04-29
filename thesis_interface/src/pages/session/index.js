import { IoArrowBack } from "react-icons/io5";
import { HiVideoCamera } from "react-icons/hi2";
import { MdTimer } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { HiPlay } from "react-icons/hi2";
import { HiStop } from "react-icons/hi2";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import PostQuestions from "@/components/questions";
import { useState, useEffect } from "react";

import getPrediction from '@/lib/get_prediction';
import validateExercise from "@/lib/validate_exercise";

import { drawLandmarks, drawConnectors, PoseConnection } from '@mediapipe/drawing_utils/drawing_utils';
import { POSE_CONNECTIONS, Pose } from '@mediapipe/pose/pose';
import { Camera } from '@mediapipe/camera_utils/camera_utils';

const Session = () => {
    const router = useRouter();

    const [stop, setStop] = useState(false)

    const handleStopButton = () => {
        setStop(true)
    }

    const [question1, setquestion1] = useState(true)
    const [question2, setquestion2] = useState(false)
    const [question3, setquestion3] = useState(false)

    const getQuestion = (value) => {
        if (value == '1') {
            setquestion1(false)
            setquestion2(true)
            setquestion3(false)
        }
        if (value == '2') {
            setquestion1(false)
            setquestion2(false)
            setquestion3(true)
        }
        if (value == '3') {
            router.push('/dashboard')
        }
    }

    const [count, setCount] = useState(false);
  
  useEffect(() => {
    setCount(true);
  }, [count]) 
  
  if(count==true){
    fetchCameraDevice();
  }
  
  const [reps, setReps] = useState(0);
  const [speed, setSpeed] = useState(0);
  function initMediapipe(){

    const canvasElement = document.getElementsByClassName('output_canvas')[0];
    const canvasCtx = canvasElement.getContext('2d');

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
            results.image, 0, 0, canvasElement.width, canvasElement.height);
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                        {color: '#00FF00', lineWidth: 2});
        drawLandmarks(canvasCtx, results.poseLandmarks,
                        {color: '#FF0000', lineWidth: 1});
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
          getPrediction(flattenedLandmarks).then(result =>{

            console.log(result);

            const landmark = results.poseLandmarks;

            // SET VALUE OF prevPrediction to the CURRENT PREDICTION RESULT FROM ML MODEL
            if(prevPrediction == undefined){
              prevPrediction = result;
            }

            // GET THE EXERCISE ASSESSMENT USING validateExercise() FUNCTION AND SEND THE FF. ARGUMENTS REQUIRED
            let exercise_assessment = validateExercise("Sit Up", landmark, prevPrediction, result, countReset, durationReset, repsProgress);
            
            if(exercise_assessment != undefined){

              if(exercise_assessment.startPosition != undefined) prevPrediction = exercise_assessment.startPosition;

              if(exercise_assessment.count == 0 && durationReset == true){
                prevTime = exercise_assessment.pTime;
                durationReset = exercise_assessment.durationReset;
              }

              if(exercise_assessment.count == 0.5){
                repsProgress = exercise_assessment.count;
                countReset = exercise_assessment.countReset;

              }else if(exercise_assessment.count == 1){
                curTime = exercise_assessment.cTime;
                let repsSpeed = (exercise_assessment.cTime - prevTime)/1000;
                setSpeed(repsSpeed);
                setReps((prevReps)=> prevReps + 1);
                countReset = exercise_assessment.countReset;
                repsProgress = 0;
                durationReset = true;
              };

              curPrediction = result;

            }
          });
          if(prevPrediction == curPrediction){
            // console.log("Changed");
            prevPrediction = curPrediction;
          }else{
          }


        } catch (error) {
          console.error(error);
        }
        
    }

    // MediapipeScreen({"count": 1, "speed": 3});
    const pose = new Pose({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
    }});
    pose.setOptions({
        upperBodyOnly: false,
        smoothLandmarks: true,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7
    });
    pose.onResults(onResults);
  
    startCamera();
  
    async function startCamera() {
        // Get the selected camera ID from the select element
        const selectElement = document.getElementById('camera-select');
        const selectedDeviceId = selectElement.value;
        
        // Request access to the selected camera
        const constraints = { audio: false, video: { deviceId: selectedDeviceId } };
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
  
        // Attach the stream to a video element to display the camera feed
        const videoElement = document.createElement('video');
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = function(e) {
          videoElement.play();
        };
  
        // Create a Camera object and start it
        const camera = new Camera(videoElement, {
          onFrame: async () => {
            await pose.send({image: videoElement});
          },
          width: 1280,
          height: 720
        });
        camera.start();
    }
  }
  
  function fetchCameraDevice() {
    // Get list of available video devices (cameras)
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      // Create a select element with options for each camera
      const selectElement = document.getElementById('camera-select');
      // selectElement.setAttribute('id', 'camera-select');

      while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild);
      }
      
      videoDevices.forEach(device => {

        const optionElement = document.createElement('option');
        optionElement.value = device.deviceId;
        optionElement.text = device.label || `Camera ${selectElement.length + 1}`;
        selectElement.appendChild(optionElement);
      });
        
    });
  }

    return (<Layout>
        <div className={`${stop ? 'block' : 'hidden'} h-screen w-screen absolute`}>
            <div className={`${ question1 ? 'block' : 'hidden' }`}>
                <PostQuestions id='1' question='Do you feel like you can keep going?' choice1='Yes' choice2='No' choice3={false} submit={getQuestion}/>
            </div>
            <div className={`${ question2 ? 'block' : 'hidden' }`}>
                <PostQuestions id='2' question='Are you out of breath?' choice1='Yes' choice2='No' choice3={false} submit={getQuestion}/>
            </div>
            <div className={`${ question3 ? 'block' : 'hidden' }`}>
                <PostQuestions id='3' question='Can you still talk?' choice1='Can speak a sentence' choice2='Can only speak few words' choice3='Cant speak' submit={getQuestion}/>
            </div>
        </div>
        <div className="h-full flex">
            <div className="h-full w-4/5 ">
                <div className="h-5% p-5">
                    <button className="flex items-center" onClick={() => router.push('/dashboard')}><IoArrowBack size="30px" color="grey"/> Go Back</button>
                </div>
                <div className="h-95% flex items-center justify-center">
                    <canvas className="output_canvas" width="1000px" height="600px"></canvas>
                </div>
            </div>
            <div className="h-full w-1/5 flex flex-col justify-around items-center">
                <div className="bg-cambg flex justify-center items-center gap-2 w-72 rounded-full p-2">
                    <HiVideoCamera color="#0096C7"/>
                    <select id="camera-select" name="cameras" className="bg-cambg w-56 text-center">
                    </select>
                </div>
                <div className="bg-repsbg w-72 rounded-xl flex justify-around items-center gap-2 p-4">
                    <MdTimer size="40px" color="white"/>
                    <h1 className="font-mono font-bold text-white text-center text-3xl">Reps <br /> Count:</h1>
                    <h1 className="font-mono font-bold text-white text-5xl">{reps}</h1>
                </div>
                <div className="bg-speedbg w-72 rounded-xl flex justify-around items-center gap-2 p-4">
                    <IoSpeedometer size="40px" color="white"/>
                    <h1 className="font-mono font-bold text-white text-center text-3xl">Reps <br /> Speed:</h1>
                    <h1 className="font-mono font-bold text-white text-5xl">{speed}s</h1>
                </div>
                <div className="bg-cambg w-72 p-7 flex flex-col items-center gap-10 rounded-xl">
                    <h1 className="font-bold text-4xl">Session:</h1>
                    <button onClick={() =>{
              if(count==true){initMediapipe();}}} className="bg-btnstart w-56 p-3 font-mono font-bold text-white text-5xl rounded-full flex items-center justify-center">Start <HiPlay size="55px"/></button>
                    <button className="bg-btnstop w-56 p-3 font-mono font-bold text-white text-5xl rounded-full flex items-center justify-center" onClick={handleStopButton}>Stop <HiStop size="55px"/></button>
                </div>
            </div>
        </div>
        </Layout>
     );
}
 
export default Session;