import { useNavigate } from "react-router-dom";
import regsuccess from "../img/regsuccess.jpg"
const RegSuccess = () => {
    const navigate = useNavigate();
    return ( 
        <div className="h-screen flex justify-center items-center">
            <div className="absolute flex flex-col">
                <h1 className='font-mono font-bold text-9xl text-white'>Congratulations, <br /> You are all set!</h1>
                <div className="flex justify-center mt-36">
                    <button type="submit" onClick={() => navigate('/content')} className="bg-cyan-blue font-bold text-4xl rounded-3xl text-white p-5 w-2/5">Proceed to Dashboard</button>
                </div>
            </div>
            <img src={regsuccess} alt="regsuccess" className="h-full w-full object-cover" />
        </div>
     );
}
 
export default RegSuccess;