import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useRouter } from 'next/router';
import StepsContext from "@/pages/api/steps-context";
import Image from 'next/image';
import loginbanner from "@/img/loginbanner.png";
import { useState, useContext } from 'react';
import bcrypt from 'bcryptjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegLayout from "@/components/registerlayout";
import Head from "next/head";


const Register = () => {
    const router = useRouter()

    const [confirmPassword, setConfirmPassword] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    const hashPassword = async (password) => {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { setStep1 } = useContext(StepsContext);

    const Personal_details = async (e) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            toast.error('Password do not match.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, // close after 3 seconds
                hideProgressBar: true, // hide the progress bar
                closeOnClick: true, // close on click
                pauseOnHover: true, // pause on hover
                draggable: true, // allow dragging
            });
            return;
        }

        try {
            const res = await fetch('/api/verifyuser', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username: formData.username }),
            });
      
            if (!res.ok) {
              const { message } = await res.json();
              throw new Error(message);
            }
            const hashedPassword = await hashPassword(formData.password);
            const userData = { ...formData, password: hashedPassword };
            localStorage.setItem('formData', JSON.stringify(userData));
            setStep1(true);
            router.push('/personal_details');  
            
          } catch (error) {
              toast.error('Username already exist.', {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000, // close after 3 seconds
                  hideProgressBar: true, // hide the progress bar
                  closeOnClick: true, // close on click
                  pauseOnHover: true, // pause on hover
                  draggable: true, // allow dragging
                });
          }
      }
    const back = (e) => {
        e.preventDefault()
        router.push('/login')
    }   
    return ( 
     <RegLayout>
        <Head><title>Sign Up</title></Head>
        <div className="bg-white h-5/6 w-9/12 flex items-center justify-center rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3)">
            <div className="w-1/2 h-full flex justify-center items-center" onSubmit={Personal_details}>
                <div className="">
                    <h1 className='font-mono font-bold desktop:text-7xl laptopL:text-6xl tablet:text-5xl mobileL:text-4xl text-3xl text-cyan-blue text-center'>Create Account</h1>
                    <div className="flex justify-center laptopL:pt-12 laptop:pt-7 pt-12">
                    <form className="laptop:w-full w-screen flex flex-col items-center">
                        <div className="flex items-center desktop:h-20 laptopL:h-16 tablet:h-16 h-14 desktop:w-550px laptopL:w-96 laptop:w-60 mobileL:w-fit w-60">
                            <FaUser color="blue" className="absolute desktop:ml-4 laptopL:ml-3 ml-2 desktop:h-12 desktop:w-12 laptopL:h-9 laptopL:w-9 laptop:h-7 laptop:w-7 h-9 w-9"/>
                            <input type="text" name="username" value={formData.username} onChange={handleChange}  placeholder="Username"  className="bg-white rounded-md shadow-lg shadow-blue-500/50 desktop:pl-20 laptopL:pl-14 laptop:pl-10 pl-14 h-full w-full laptopL:text-2xl laptop:text-xl text-lg" required/>    
                        </div>
                        <div className="flex items-center desktop:h-20 laptopL:h-16 tablet:h-16 h-14 desktop:w-550px laptopL:w-96 laptop:w-60 mobileL:w-fit w-60 mt-8">
                            <FaLock color="blue" className="absolute desktop:ml-4 laptopL:ml-3 ml-2 desktop:h-12 desktop:w-12 laptopL:h-9 laptopL:w-9 laptop:h-7 laptop:w-7 h-9 w-9"/>
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="bg-white rounded-md shadow-lg shadow-blue-500/50 desktop:pl-20 laptopL:pl-14 laptop:pl-10 pl-14 h-full w-full laptopL:text-2xl laptop:text-xl text-lg" required/>    
                        </div>
                        <div className="flex items-center desktop:h-20 laptopL:h-16 tablet:h-16 h-14 desktop:w-550px laptopL:w-96 laptop:w-60 mobileL:w-fit w-60 mt-8">
                            <FaLock color="blue" className="absolute desktop:ml-4 laptopL:ml-3 ml-2 desktop:h-12 desktop:w-12 laptopL:h-9 laptopL:w-9 laptop:h-7 laptop:w-7 h-9 w-9"/>
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-white rounded-md shadow-lg shadow-blue-500/50 desktop:pl-20 laptopL:pl-14 laptop:pl-10 pl-14 h-full w-full laptopL:text-2xl laptop:text-xl text-lg" required/>    
                        </div>
                        <div className="flex justify-center mt-3">
                            <button type="submit" onClick={back} className=" font-bold rounded-3xl text-cyan-blue p-4">Already have an account? <span className="underline">Sign in</span></button>
                        </div>
                        <div className="flex justify-center mt-7">
                            <button type="submit" className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">Proceed</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <div className="laptop:flex hidden h-full w-1/2 justify-center">
                <h1 className='absolute font-mono font-bold desktop:text-5xl laptopL:text-4xl laptop:text-3xl text-white self-center mt-56 laptopL:ml-0 laptop:ml-5'>Create your <br /> account and <br /> track your <br /> exercise records <br /> and stats</h1>
                <Image className="h-full rounded-r-xl" src={loginbanner} alt="loginimg"/>
            </div>
            <ToastContainer />
        </div>
        
    </RegLayout>
     );
}
 
export default Register;