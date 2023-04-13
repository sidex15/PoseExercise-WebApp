import { FaWeight } from 'react-icons/fa';
import { IoBody } from 'react-icons/io5'
import { useNavigate } from "react-router-dom";
import biometrics from "../img/biometrics.png"

const Userinfo2 = () => {
    const navigate = useNavigate();
    return ( 
        <div className="h-full flex">
            <div className="h-screen w-1/2">
                <img className="h-full w-full" src={biometrics} alt="biometricsimg"/>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <div>
                    <h1 className='font-mono font-bold text-6xl text-cyan-blue text-center'>Your Height and Weight</h1>
                    <div className='flex justify-center mt-12'>
                        <form className=''>
                            <div className='flex mt-14'>
                                <span className="mt-3 mr-4"><FaWeight size="50px" color="blue"/></span>
                                <input type="number" name="fn" placeholder='Weight in kg' size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md h-14 mt-3 pl-5 text-xl"/>
                            </div>
                            <div className='flex mt-14'>
                                <span className="mt-3 mr-4"><IoBody size="50px" color="blue"/></span>
                                <input type="number" name="fn" placeholder='Height in cm' size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md h-14 mt-3 pl-5 text-xl"/>
                            </div>
                            <div className='flex justify-center mt-20'>
                                <button type="submit" onClick={() => navigate('/step-3')} className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">Proceed</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Userinfo2;