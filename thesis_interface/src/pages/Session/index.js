import { IoArrowBack } from "react-icons/io5";
import { HiVideoCamera } from "react-icons/hi2";
import { MdTimer } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { HiPlay } from "react-icons/hi2";
import { HiStop } from "react-icons/hi2";
import { useRouter } from "next/router";

const Session = () => {
    const router = useRouter();
    return ( 
        <div className="h-full flex">
            <div className="h-full w-4/5 ">
                <div className="h-5% p-5">
                    <button className="flex items-center" onClick={() => router.push('/Content')}><IoArrowBack size="30px" color="grey"/> Go Back</button>
                </div>
                <div className="h-95% flex items-center justify-center">
                    <div className="h-95% w-95% bg-grey rounded-3xl flex justify-center items-center">
                        container for video feed
                    </div>
                </div>
            </div>
            <div className="h-full w-1/5 flex flex-col justify-around items-center">
                <div className="bg-cambg flex justify-center items-center gap-2 w-72 rounded-full p-2">
                    <HiVideoCamera color="#0096C7"/>
                    <select name="cameras" className="bg-cambg w-56 text-center">
                        <option value="longname">supercalifragilisticexpialidocious</option>
                        <option value="camera1">Camera1</option>
                        <option value="camera2">Camera2</option>
                        <option value="camera3">Camera3</option>
                    </select>
                </div>
                <div className="bg-repsbg w-72 rounded-xl flex justify-around items-center gap-2 p-4">
                    <MdTimer size="40px" color="white"/>
                    <h1 className="font-mono font-bold text-white text-center text-3xl">Reps <br /> Count:</h1>
                    <h1 className="font-mono font-bold text-white text-5xl">000</h1>
                </div>
                <div className="bg-speedbg w-72 rounded-xl flex justify-around items-center gap-2 p-4">
                    <IoSpeedometer size="40px" color="white"/>
                    <h1 className="font-mono font-bold text-white text-center text-3xl">Reps <br /> Speed:</h1>
                    <h1 className="font-mono font-bold text-white text-5xl">000</h1>
                </div>
                <div className="bg-cambg w-72 p-7 flex flex-col items-center gap-10 rounded-xl">
                    <h1 className="font-bold text-4xl">Session:</h1>
                    <button className="bg-btnstart w-56 p-3 font-mono font-bold text-white text-5xl rounded-full flex items-center justify-center">Start <HiPlay size="55px"/></button>
                    <button className="bg-btnstop w-56 p-3 font-mono font-bold text-white text-5xl rounded-full flex items-center justify-center">Stop <HiStop size="55px"/></button>
                </div>
            </div>
        </div>
     );
}
 
export default Session;