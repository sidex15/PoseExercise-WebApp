import { FaUser } from "react-icons/fa";
import { useState } from 'react';
import { FaLock } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import loginbanner from "@/img/loginbanner.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

function Login () {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      const { token } = await res.json();
      Cookies.set('token', token);
       // store the token in a cookie
      router.push('/dashboard');
      
    } catch (error) {
        toast.error('Username or password do not match.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // close after 3 seconds
            hideProgressBar: true, // hide the progress bar
            closeOnClick: true, // close on click
            pauseOnHover: true, // pause on hover
            draggable: true, // allow dragging
          });
    }
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

    const signup = (e) => {
        e.preventDefault()
        router.push('/signup')
      } 
    return ( 
        <div className="h-screen w-screen flex">
            <div className="lg:w-1/2 w-full h-full flex justify-center items-center">
                <div className="">
                    <h1 className='font-mono font-bold lg:text-8xl text-5xl text-cyan-blue text-center'>Login to your <br /> Account</h1>
                    <div className="flex justify-center pt-12">
                    <form className="lg:w-full w-screen flex flex-col items-center">
                        <div className="">
                          <span className="absolute lg:p-4 p-3"><FaUser color="blue" className="lg:h-12 h-8 lg:w-12 w-8"/></span>
                          <input type="text" placeholder="Username" onChange={handleUsernameChange} className="bg-white rounded-md shadow-lg shadow-blue-500/50 p-2 pl-20 lg:h-20 h-14 lg:w-550px w-80 lg:text-2xl text-lg" />    
                        </div>
                        <div className="mt-8">
                          <span className="absolute lg:p-4 p-3"><FaLock color="blue" className="lg:h-12 h-8 lg:w-12 w-8"/></span>
                          <input type="password" placeholder="Password" onChange={handlePasswordChange} className="bg-white rounded-md shadow-lg shadow-blue-500/50 p-2 pl-20 lg:h-20 h-14 lg:w-550px w-80 lg:text-2xl text-lg" />    
                        </div>
                        <div className="flex justify-center mt-3">
                            <button type="submit" onClick={signup} className=" font-bold rounded-3xl text-cyan-blue p-4">Don't have an account yet? <span className="underline">Sign up</span></button>
                        </div>
                        <div className="flex justify-center mt-7">
                            <button type="submit" className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32" onClick={handleSubmit}>Login</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <div className="lg:flex hidden h-screen w-1/2  justify-center ml-20">
                <h1 className='absolute font-mono font-bold text-5xl text-white self-center mt-56'>Login to your <br /> account and <br /> start tracking <br /> you Exercise <br />Sessions now!</h1>
                <Image className="h-full" src={loginbanner} priority='true' alt="loginimg"/>
            </div>
            <ToastContainer />
        </div>
     );
}
 
export default Login;