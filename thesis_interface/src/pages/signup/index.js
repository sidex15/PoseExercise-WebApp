import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useRouter } from 'next/router';
import Image from 'next/image';
import loginbanner from "@/img/loginbanner.png";
import { useState } from 'react';
import bcrypt from 'bcryptjs';


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

    const Personal_details = async (e) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const hashedPassword = await hashPassword(formData.password);
        const userData = { ...formData, password: hashedPassword };
        localStorage.setItem('formData', JSON.stringify(userData));
        router.push('/Personal_details');
      }
    const back = (e) => {
        e.preventDefault()
        router.push('/login')
    }   
    return ( 
        <div className="h-screen w-screen flex">
            <div className="lg:w-1/2 w-full h-full flex justify-center items-center">
                <div className="">
                    <h1 className='font-mono font-bold lg:text-8xl text-5xl text-cyan-blue text-center'>Create Account</h1>
                    <div className="flex justify-center pt-12">
                    <form className="lg:w-full w-screen flex flex-col items-center">
                        <div>
                        <span className="absolute lg:p-4 p-3"><FaUser color="blue" className="lg:h-12 h-8 lg:w-12 w-8"/></span>
                        <input type="text" name="username" value={formData.username} onChange={handleChange}  placeholder="Username"  size="50" className="bg-white rounded-md shadow-lg shadow-blue-500/50 p-2 pl-20 lg:h-20 h-14 lg:w-550px w-80 lg:text-2xl text-lg" />    
                        </div>
                        <div className="mt-8">
                        <span className="absolute lg:p-4 p-3"><FaLock color="blue" className="lg:h-12 h-8 lg:w-12 w-8"/></span>
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} size="50" className="bg-white rounded-md shadow-lg shadow-blue-500/50 p-2 pl-20 lg:h-20 h-14 lg:w-550px w-80 lg:text-2xl text-lg" />    
                        </div>
                        <div className="mt-8">
                        <span className="absolute lg:p-4 p-3"><FaLock color="blue" className="lg:h-12 h-8 lg:w-12 w-8"/></span>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} size="50" className="bg-white rounded-md shadow-lg shadow-blue-500/50 p-2 pl-20 lg:h-20 h-14 lg:w-550px w-80 lg:text-2xl text-lg" />    
                        </div>
                        <div className="flex justify-center mt-3">
                            <button type="submit" onClick={back} className=" font-bold rounded-3xl text-cyan-blue p-4">Already have an account? <span className="underline">Sign in</span></button>
                        </div>
                        <div className="flex justify-center mt-7">
                            <button type="submit" onClick={Personal_details} className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">Proceed</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <div className="lg:flex hidden h-screen w-1/2 justify-center ml-20">
                <h1 className='absolute font-mono font-bold text-5xl text-white self-center mt-56'>Create your <br /> account and <br /> track your <br /> exercise records <br /> and stats</h1>
                <Image className="h-full" src={loginbanner} alt="loginimg"/>
            </div>
        </div>
     );
}
 
export default Register;