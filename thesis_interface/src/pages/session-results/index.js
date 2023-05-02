import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { IoFlame } from "react-icons/io5";
import { TbClockFilled } from "react-icons/tb";
import { MdTimer } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { useContext, useState, useEffect, use } from "react";
import ExerciseContext from "@/pages/api/exercise-context";
import SessionContext from "@/pages/api/session_result";

const Result = () => {

    const router = useRouter()

    const { postValue } = useContext(ExerciseContext);
    const { exerciseReps, exerciseDuration, avgRepsSpeed, caloriesBurned } = useContext(SessionContext);

    const handleProceed = () => {
        console.log(postValue)
        router.push('/dashboard')
    }

    const [calorieBurned, setCalorieBurned] = useState(0);
    const [exerDuration, setExerDuration] = useState(0);
    const [exerRep, setExerRep] = useState(0);
    const [avgRepsSpd, setAvgRepsSpd] = useState(0);

    useEffect(()=>{
        setCalorieBurned(caloriesBurned);
        setExerDuration(exerciseDuration);
        setExerRep(exerciseReps);
        setAvgRepsSpd(avgRepsSpeed);
    },[]);

    return ( 
        <Layout>
            <div className="bg-grey h-full w-full flex flex-col justify-center items-center">
                <h1 className="font-mono font-bold lg:text-5xl text-xl text-cyan-blue self-start ml-24">Exercise session result</h1>
                <div className="bg-white w-4/5 h-3/4 flex flex-col justify-around items-center py-7 shadow-lg shadow-rgba(3,4,94,0.7)">
                    <div className="bg-grey rounded-2xl flex justify-around w-3/5 h-24 shadow-lg shadow-rgba(3,4,94,0.3)">
                        <div className="flex items-center gap-3 p-4">
                            <IoFlame size="60px" color="red" />
                            <h1 className="font-mono font-bold text-#03045E text-5xl">{calorieBurned}</h1>
                            <h1 className="font-mono font-bold text-cyan-blue text-center text-2xl">Calories <br /> Burned</h1>
                        </div>
                        <div className="flex items-center gap-3 p-4">
                            <TbClockFilled size="60px" className="text-slate-500" />
                            <h1 className="font-mono font-bold text-#03045E text-5xl">{exerDuration}</h1>
                            <h1 className="font-mono font-bold text-cyan-blue text-center text-2xl">Exercise <br /> Duration</h1>
                        </div>
                    </div>
                    <div className="w-3/5 flex justify-around">
                        <div className="bg-grey rounded-2xl flex flex-col relative p-3 w-52 shadow-lg shadow-rgba(3,4,94,0.7)">
                            <MdTimer size="60px" className="text-repsbg absolute -top-5 -left-5" />
                            <div className="h-full flex flex-col justify-center items-center gap-3 p-4">
                                <h1 className="font-mono font-bold text-#03045E text-5xl">{exerRep}</h1>
                                <h1 className="font-mono font-bold text-cyan-blue text-center text-2xl">No. of Reps</h1>
                            </div>
                        </div>
                        <div className="bg-grey rounded-2xl flex flex-col relative p-3 w-52 shadow-lg shadow-rgba(3,4,94,0.7)">
                            <IoSpeedometer size="60px" className="text-speedbg absolute -top-5 -left-5" />
                            <div className="flex flex-col items-center gap-3 p-4">
                                <h1 className="font-mono font-bold text-#03045E text-5xl">{avgRepsSpd}</h1>
                                <h1 className="font-mono font-bold text-cyan-blue text-center text-xl">Average Reps <br /> Speed</h1>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className={`bg-cyan-blue font-bold rounded-2xl text-white p-4`} onClick={() => {handleProceed();}}>Proceed to Dashboard</button>
                </div>
            </div>
        </Layout>
     );
}
 
export default Result;