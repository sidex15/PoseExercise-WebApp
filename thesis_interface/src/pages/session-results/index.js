import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { IoFlame } from "react-icons/io5";
import { TbClockFilled } from "react-icons/tb";
import { MdTimer } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { useContext, useState, useEffect, useRef} from "react";
import ExerciseContext from "@/pages/api/exercise-context";
import SessionContext from "@/pages/api/session_result";
import UserInfoContext from '@/pages/api/user_info-conntext';
import drinkwater from '@/img/drinkwater.jpg'
import Image from "next/image";
import average from "@/lib/get_arrayAverage";
import evalExercise from "@/lib/borgRPE_eval";
import calcCalorie from "@/lib/calorie_calculator";
import formatTime from "@/lib/format_time";
import fetchuserinfo from "@/pages/api/userinfo";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import Head from "next/head";
import { Modal } from "flowbite-react";
import { Label } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import { HiOutlineExclamation } from "react-icons/hi";

export default function Result (){

    const router = useRouter()
    const dateTime = new Date();
    const { exerName, postValue } = useContext(ExerciseContext);
    const { exerciseReps, exerciseDuration, avgRepsSpeed, borgQnA } = useContext(SessionContext);
    const { info, updatedb, setupdatedb } = useContext(UserInfoContext);
    const [ showWeightModal, setShowWeightModal ] = useState(false);
    
    // const [weightInput, setWeightInput] = useState();
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [exerDuration, setExerDuration] = useState(0);
    const [exerRep, setExerRep] = useState(0);
    const [avgRepsSpd, setAvgRepsSpd] = useState(0);
    const userid = Cookies.get('userinfoid');
    const weightInput = useRef();

    const handleProceed = () => {
        //console.log(postValue)
        router.push('/dashboard')
    }

    const handleChange = (event) => {
        weightInput.current = event.target.value;
    };

    const weightInputBtnSubmit = () => {
        let exerEval = evalExercise(borgQnA[0], borgQnA[1])
        const MET_val = exerEval[0];
        const duration_min = exerciseDuration/60;
        console.log(weightInput);
        setCaloriesBurned(calcCalorie(duration_min, MET_val, weightInput.current).toFixed(2));
        setShowWeightModal(false);
    }

    const addrecord = async (formData) => {
        if(!formData.reps == 0||!formData.reps === ''){
            try {
                const response = await fetch('/api/addrecord', {
                  method: 'POST',
                  body: JSON.stringify(formData),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
            
                if (response.ok) {
                  const data = await response.json();
                  console.log(data.message);
                  setupdatedb(updatedb+1);
                } else {
                  console.error(`HTTP error! status: ${response.status}`);
                }
              } catch (error) {
                console.error(error);
              }
        }
    }

    useEffect(() => {
        setCaloriesBurned(0);
        setExerDuration(formatTime(0));
        setExerRep(0);
        setAvgRepsSpd(0);
        if(userid!=undefined && exerciseReps!=undefined && exerciseDuration!=undefined && avgRepsSpeed!=undefined && borgQnA!=undefined){
            let exerEval = evalExercise(borgQnA[0], borgQnA[1]);
            let MET_val = exerEval[0];
            let result = exerEval[1];
            let duration_min = exerciseDuration/60;
            let weight = info.weight;
            setCaloriesBurned(calcCalorie(duration_min, MET_val, weight).toFixed(2));
            setExerDuration(formatTime(exerciseDuration));
            setExerRep(exerciseReps);
            setAvgRepsSpd(average(avgRepsSpeed).toFixed(2));
            const formData={ 
                userid: userid,
                extype: exerName, 
                calburn: calcCalorie(duration_min, MET_val, weight).toFixed(2), 
                reps: exerciseReps, 
                avgreps: average(avgRepsSpeed).toFixed(2), 
                duration: formatTime(exerciseDuration),
                result: result,
            };
            addrecord(formData);
        }else if(userid==undefined && exerciseReps!=undefined && exerciseDuration!=undefined && avgRepsSpeed!=undefined && borgQnA!=undefined){
            let exerEval = evalExercise(borgQnA[0], borgQnA[1]);
            let MET_val = exerEval[0];
            let duration_min = exerciseDuration/60;
            setCaloriesBurned(calcCalorie(duration_min, MET_val, 60).toFixed(2));
            setExerDuration(formatTime(exerciseDuration));
            setExerRep(exerciseReps);
            setAvgRepsSpd(average(avgRepsSpeed).toFixed(2));
            setShowWeightModal(true);
        }
    },[]);

    return ( 
        <Layout>
            <Head><title>Session Result</title></Head>
            <div className="bg-grey h-full w-full flex flex-col justify-center items-center gap-6">
                <h1 className="font-mono font-bold lg:text-5xl text-xl text-cyan-blue self-start ml-24">Exercise session result</h1>
                <div className="relative w-3/4 h-3/4 shadow-lg shadow-rgba(3,4,94,0.7) rounded-3xl">
                    <Image className="absolute object-cover h-full rounded-3xl" src={drinkwater} alt="dashboardimg" priority/>
                    <div className="absolute w-full h-full flex flex-col justify-around items-center py-7">
                        <div>
                            <h1 className="text-cyan-400 drop-shadow-2xl xl:text-6xl 2xl:text-8xl font-semibold">{exerName}</h1>
                        </div>
                       <div className="bg-grey rounded-2xl flex justify-around p-5 gap-7 shadow-lg shadow-rgba(3,4,94,0.3)">
                            <div className="flex items-center gap-3">
                                <IoFlame size="60px" color="red" />
                                <h1 className="font-mono font-bold text-#03045E xl:text-3xl 2xl:text-5xl">{caloriesBurned}</h1>
                                <h1 className="font-mono font-bold text-cyan-blue text-center xl:text-xl 2xl:text-2xl">Calories <br /> Burned</h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <TbClockFilled size="60px" className="text-slate-500" />
                                <h1 className="font-mono font-bold text-#03045E xl:text-3xl 2xl 2xl:text-5xl">{exerDuration}</h1>
                                <h1 className="font-mono font-bold text-cyan-blue text-center xl:text-xl 2xl:text-2xl">Exercise <br /> Duration</h1>
                            </div>
                        </div>
                        <div className="w-3/5 flex justify-around">
                            <div className="bg-grey rounded-2xl p-5 relative shadow-lg shadow-rgba(3,4,94,0.7)">
                                <MdTimer size="60px" className="text-repsbg absolute -top-5 -left-5" />
                                <div className="h-full flex flex-col justify-center items-center">
                                    <h1 className="font-mono font-bold text-#03045E xl:text-3xl 2xl 2xl:text-5xl">{exerRep}</h1>
                                    <h1 className="font-mono font-bold text-cyan-blue text-center xl:text-xl 2xl:text-2xl">No. of Reps</h1>
                                </div>
                            </div>
                            <div className="bg-grey rounded-2xl p-5 relative shadow-lg shadow-rgba(3,4,94,0.7)">
                                <IoSpeedometer size="60px" className="text-speedbg absolute -top-5 -left-5" />
                                <div className="flex flex-col items-center">
                                    <h1 className="font-mono font-bold text-#03045E xl:text-3xl 2xl:text-5xl">{avgRepsSpd}</h1>
                                    <h1 className="font-mono font-bold text-cyan-blue text-center xl:text-xl 2xl:text-xl">Average Reps <br /> Speed</h1>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className={`bg-cyan-blue font-bold rounded-2xl text-white p-4`} onClick={() => {handleProceed();}}>Proceed to Dashboard</button> 
                    </div>
                </div>
                <ToastContainer />
            </div>
            <Modal show={showWeightModal} size="md" popup={true} onClose={()=>setShowWeightModal(false)}>
                <Modal.Header />
                <Modal.Body>
                <div className="space-y-6 px-5 pb-4 sm:pb-4 xl:pb-6">
                    <HiOutlineExclamation className="mx-auto mb-4 h-14 w-14 text-red-600" />
                    <h4 className="text-lg text-gray-900 dark:text-white">To provide you with accurate calorie computation, please enter your weight in kilograms (kg) below. If you close this without entering your weight, a default value of 60 kg will be used for calorie calculations.</h4>
                    <div>
                    <div className="mb-2 block">
                        <Label
                        htmlFor="weight"
                        value="Your weight in Kilograms:"
                        />
                    </div>
                    <TextInput
                        id="weight"
                        type="number"
                        key="textField"
                        placeholder="60"
                        required={true}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="w-full flex justify-end gap-4">
                        <Button type="submit" onClick={()=>weightInputBtnSubmit()}>
                            Confirm
                        </Button>
                        <Button color="gray" onClick={()=>setShowWeightModal(false)}>
                            Close
                        </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </Layout>
    );
}