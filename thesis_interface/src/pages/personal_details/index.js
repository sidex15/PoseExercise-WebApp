import { useRouter } from 'next/router';
import Image from 'next/image';
import userinfobanner from "@/img/userinfobanner.png"
import { useEffect, useState } from 'react';
import Head from 'next/head';
import RegLayout from '@/components/registerlayout';


const Userinfo = () => {
    const router = useRouter()

    const [formData, setformData] = useState({
        username: '',
        password: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: '',
        sex: '',
      });
    
    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setformData(JSON.parse(storedData));
        }
    }, []);
      
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const Userinfo2 = (e) => {
        e.preventDefault()
        localStorage.setItem('formData', JSON.stringify(formData));
        router.push('/biometrics');
      } 

    return (
    <RegLayout>   
        <div className="bg-white h-5/6 w-9/12 flex items-center justify-center rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3)">
            <Head><title>Personal Details</title></Head>
            <div className="h-full laptop:w-1/2 w-full laptop:flex relative justify-center items-center">
                <div className="laptop:relative absolute laptopL:bg-inherit bg-white/50 laptop:h-fit h-full w-full laptop:p-0 p-14 rounded-xl laptop:shadow-none shadow-#023E8A">
                    <h1 className='font-mono font-bold laptopL:text-6xl tablet:text-5xl mobileM:text-4xl text-3xl text-cyan-blue text-center'>Personal Details</h1>
                    <div className="flex justify-center mt-5">
                        <form className='flex flex-col gap-4' onSubmit={Userinfo2}>
                            <div className="flex flex-col items-center">
                                <label for="fn" className="self-start absolute p-1 bg-white text-xs ml-3">FIRST NAME</label>
                                <input type="text"  name="firstName" value={formData.firstName} onChange={handleChange} className="laptopL:w-96 border-solid border-2 border-cyan-blue bg-white rounded-md mt-3 p-2" required/>  
                            </div>
                            <div className="flex flex-col items-center">
                                <label for="mn" className="self-start absolute p-1 bg-white text-xs ml-3">MIDDLE NAME</label>
                                <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="laptopL:w-96 border-solid border-2 border-cyan-blue bg-white rounded-md mt-3 p-2" required/>  
                            </div>
                            <div className="flex flex-col items-center">
                                <label for="ln" className="self-start absolute p-1 bg-white text-xs ml-3">LAST NAME</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="laptopL:w-96 border-solid border-2 border-cyan-blue bg-white rounded-md mt-3 p-2" required/>  
                            </div>
                            <div className="flex flex-col items-center">
                                <label for="bd" className="self-start absolute p-1 bg-white text-xs ml-3">BIRTH DATE</label>
                                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="self-start laptopL:w-56 border-solid border-2 border-cyan-blue bg-white rounded-md mt-3 p-2" required/>  
                            </div>
                            <div className="flex flex-col">
                                <p className="ml-3">SEX</p>
                                <div className="ml-7 flex">
                                    <div className='flex items-center gap-1'>
                                        <input type="radio" id='male' name="sex" value="Male" checked={formData.sex === 'Male'} onChange={handleChange} required/>
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div className="ml-4 flex items-center gap-1">
                                        <input type="radio" id='female' name="sex" value="Female" checked={formData.sex === 'Female'} onChange={handleChange} required/>
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-11">
                                <button type="submit" className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">Proceed</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Image className="laptop:hidden block h-full w-full object-cover rounded-xl" src={userinfobanner} alt="userinfobanner"/>
            </div>
            <div className="h-full w-1/2 laptop:flex hidden justify-center relative">
                <Image className="h-full w-full absolute rounded-r-xl" src={userinfobanner} alt="userinfobanner"/>
                <div className="absolute flex flex-col self-center">
                    <h1 className='font-mono font-bold desktop:text-5xl laptopL:text-4xl laptop:text-3xl text-white'>Get stronger and <br /> fitter with us, <br /> helping you to take <br /> fitness to the top <br /> level</h1>
                    <div className="laptop:hidden flex justify-center mt-36">
                        <button type="submit" className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">Proceed</button>
                    </div>
                </div>
                
            </div>
        </div>
    </RegLayout>  
     );
}
 
export default Userinfo;