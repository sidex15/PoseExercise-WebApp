import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { IoFlame } from "react-icons/io5";
import { TbClockFilled } from "react-icons/tb";
import { MdTimer } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { useContext, useState, useEffect, use } from "react";
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

const Result = () => {

    const router = useRouter()
    const dateTime = new Date();
    const { exerName, postValue } = useContext(ExerciseContext);
    const { exerciseReps, exerciseDuration, avgRepsSpeed, borgQnA } = useContext(SessionContext);
    const { info } = useContext(UserInfoContext);
    const handleProceed = () => {
        console.log(postValue)
        router.push('/dashboard')
    }

    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [exerDuration, setExerDuration] = useState(0);
    const [exerRep, setExerRep] = useState(0);
    const [avgRepsSpd, setAvgRepsSpd] = useState(0);
    const userid = Cookies.get('userinfoid');
    const addrecord = async (formData) => {
        console.log(formData);
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
                } else {
                  console.error(`HTTP error! status: ${response.status}`);
                }
              } catch (error) {
                console.error(error);
              }
        }
    }

    useEffect(() => {
        console.log(borgQnA);
        const MET_val = evalExercise(borgQnA[0], borgQnA[1]);
        const duration_min = exerciseDuration/60;
        const weight = info.weight;
        console.log(weight);
        setCaloriesBurned(calcCalorie(duration_min, MET_val, weight).toFixed(2));
        setExerDuration(formatTime(exerciseDuration));
        setExerRep(exerciseReps);
        console.log(avgRepsSpeed);
        console.log(average(avgRepsSpeed));
        setAvgRepsSpd(average(avgRepsSpeed).toFixed(2));
        const formData={ 
            userid: userid,
            extype: exerName, 
            calburn: calcCalorie(duration_min, MET_val, weight).toFixed(2), 
            reps: exerciseReps, 
            avgreps: average(avgRepsSpeed).toFixed(2), 
            duration: formatTime(exerciseDuration),
            result: MET_val,
        };
        addrecord(formData);
    },[]);

    return ( 
        <Layout>
            <div className="bg-grey h-full w-full flex flex-col justify-center items-center gap-6">
                <h1 className="font-mono font-bold lg:text-5xl text-xl text-cyan-blue self-start ml-24">Exercise session result</h1>
                <div className="relative w-3/4 h-3/4 shadow-lg shadow-rgba(3,4,94,0.7) rounded-3xl">
                    <Image className="absolute object-cover h-full rounded-3xl" src={drinkwater} alt="dashboardimg" priority/>
                    <div className="absolute w-full h-full flex flex-col justify-around items-center py-7">
                       <div className="bg-grey rounded-2xl flex justify-around p-6 gap-7 shadow-lg shadow-rgba(3,4,94,0.3)">
                            <div className="flex items-center gap-3">
                                <IoFlame size="60px" color="red" />
                                <h1 className="font-mono font-bold text-#03045E text-5xl">{caloriesBurned}</h1>
                                <h1 className="font-mono font-bold text-cyan-blue text-center text-2xl">Calories <br /> Burned</h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <TbClockFilled size="60px" className="text-slate-500" />
                                <h1 className="font-mono font-bold text-#03045E text-5xl">{exerDuration}</h1>
                                <h1 className="font-mono font-bold text-cyan-blue text-center text-2xl">Exercise <br /> Duration</h1>
                            </div>
                        </div>
                        <div className="w-3/5 flex justify-around">
                            <div className="bg-grey rounded-2xl p-5 relative shadow-lg shadow-rgba(3,4,94,0.7)">
                                <MdTimer size="60px" className="text-repsbg absolute -top-5 -left-5" />
                                <div className="h-full flex flex-col justify-center items-center">
                                    <h1 className="font-mono font-bold text-#03045E text-5xl">{exerRep}</h1>
                                    <h1 className="font-mono font-bold text-cyan-blue text-center text-2xl">No. of Reps</h1>
                                </div>
                            </div>
                            <div className="bg-grey rounded-2xl p-5 relative shadow-lg shadow-rgba(3,4,94,0.7)">
                                <IoSpeedometer size="60px" className="text-speedbg absolute -top-5 -left-5" />
                                <div className="flex flex-col items-center">
                                    <h1 className="font-mono font-bold text-#03045E text-5xl">{avgRepsSpd}</h1>
                                    <h1 className="font-mono font-bold text-cyan-blue text-center text-xl">Average Reps <br /> Speed</h1>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className={`bg-cyan-blue font-bold rounded-2xl text-white p-4`} onClick={() => {handleProceed();}}>Proceed to Dashboard</button> 
                    </div>
                </div>
            </div>
        </Layout>
     );
}
 
export default Result;