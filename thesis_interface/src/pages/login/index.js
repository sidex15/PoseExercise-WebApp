import { FaUser } from "react-icons/fa";
import { useState } from 'react';
import { FaLock } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import loginbanner from "@/img/loginbanner.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Layout from "@/components/Layout";
import Head from "next/head";

function Login () {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          document.getElementById('submit').click();
        }
      };
      
    
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

      // store the token in a cookie
      const { token,iduser } = await res.json();
      Cookies.set('token', token);
      Cookies.set('userinfoid', iduser);

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
      <Layout>
        <Head><title>Login</title></Head>
        <div className="bg-white h-5/6 w-9/12 flex items-center justify-center rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3)">
            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="">
                    <h1 className='font-mono font-bold desktop:text-7xl laptopL:text-6xl laptop:text-4xl text-5xl text-cyan-blue text-center'>Login to your <br /> Account</h1>
                    <div className="flex justify-center laptopL:pt-12 laptop:pt-7 pt-12">
                      <form className="laptop:w-full w-screen flex flex-col items-center">
                          <div className="flex items-center desktop:h-20 laptopL:h-16 desktop:w-550px laptopL:w-96 laptop:w-60">
                            <FaUser color="blue" className="absolute desktop:ml-4 laptopL:ml-3 laptop:ml-2 ml-3 desktop:h-12 desktop:w-12 laptopL:h-9 laptopL:w-9 laptop:h-7 laptop:w-7 h-9 w-9"/>
                            <input type="text" placeholder="Username" onChange={handleUsernameChange} className="bg-white rounded-md shadow-lg shadow-blue-500/50 desktop:pl-20 laptopL:pl-14 laptop:pl-10 pl-14 desktop:h-20 laptopL:h-16 desktop:w-550px laptopL:w-96 laptop:w-60 h-16 w-96 laptop:text-2xl text-lg" />    
                          </div>
                          <div className="flex items-center desktop:h-20 laptopL:h-16 desktop:w-550px laptopL:w-96 laptop:w-60 mt-8">
                            <FaLock color="blue" className="absolute desktop:ml-4 laptopL:ml-3 laptop:ml-2 ml-3 desktop:h-12 desktop:w-12 laptopL:h-9 laptopL:w-9 laptop:h-7 laptop:w-7 h-9 w-9"/>
                            <input type="password" placeholder="Password" onKeyDown={handleKeyDown} onChange={handlePasswordChange} className="bg-white rounded-md shadow-lg shadow-blue-500/50 desktop:pl-20 laptopL:pl-14 laptop:pl-10 pl-14 desktop:h-20 laptopL:h-16 desktop:w-550px laptopL:w-96 laptop:w-60 h-16 w-96 laptop:text-2xl text-lg" />    
                          </div>
                          <div className="flex justify-center mt-3">
                              <button type="submit" onClick={signup} className=" font-bold rounded-3xl text-cyan-blue p-4">Don't have an account yet? <span className="underline">Sign up</span></button>
                          </div>
                          <div className="flex justify-center mt-7">
                              <button id="submit" type="submit" className="bg-cyan-blue font-bold rounded-3xl text-white p-4 laptopL:w-32 laptop:w-28 w-32" onClick={handleSubmit}>Login</button>
                          </div>
                      </form>
                    </div>
                </div>
            </div>
            <div className="laptop:flex hidden h-full w-1/2 justify-center">
                <h1 className='absolute font-mono font-bold desktop:text-5xl laptopL:text-4xl laptop:text-3xl text-white self-center mt-56'>Login to your <br /> account and <br /> start tracking <br /> you Exercise <br />Sessions now!</h1>
                <Image className="h-full rounded-r-xl" src={loginbanner} priority='true' alt="loginimg"/>
            </div>
            <ToastContainer />
        </div>
        </Layout>
     );
}
 
export default Login;