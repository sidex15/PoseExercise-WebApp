import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import loginbanner from "../img/loginbanner.png"

const Login = () => {
    const navigate = useNavigate();
    return ( 
        <div className="h-full flex">
            <div className="w-1/2 flex justify-center">
                <div className="self-center">
                    <h1 className='font-mono font-bold text-8xl text-cyan-blue text-center'>Login to your <br /> Account</h1>
                    <div className="flex justify-center mt-16">
                    <form>
                        <div>
                        <span className="absolute m-4"><FaUser size="50px" color="blue"/></span>
                        <input type="text" placeholder="Username" size="50" className="bg-white rounded-md shadow-lg shadow-blue-500/50 p-2 pl-20 h-20 text-2xl" />    
                        </div>
                        <div className="mt-8">
                        <span className="absolute m-4"><FaLock size="50px" color="blue"/></span>
                        <input type="password" placeholder="Password" size="50" className="bg-white rounded-md shadow-lg shadow-blue-500/50 p-2 pl-20 h-20 text-2xl" />    
                        </div>
                        <div className="flex justify-center mt-3">
                            <button type="submit" onClick={() => navigate('/signup')} className=" font-bold rounded-3xl text-cyan-blue p-4">Don't have an account yet? <span className="underline">Sign up</span></button>
                        </div>
                        <div className="flex justify-center mt-7">
                            <button type="submit" className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32" onClick={() => navigate('/content')}>Login</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <div className="h-screen w-1/2 flex justify-center ml-20">
                <h1 className='absolute font-mono font-bold text-5xl text-white self-center mt-56'>Login to your <br /> account and <br /> start tracking <br /> you Exercise <br />Sessions now!</h1>
                <img className="h-full" src={loginbanner} alt="loginimg"/>
            </div>
        </div>
     );
}
 
export default Login;