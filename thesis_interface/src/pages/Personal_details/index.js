import { useRouter } from 'next/router';
import Image from 'next/image';
import userinfobanner from "@/img/userinfobanner.png"
import { useEffect, useState } from 'react';


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

    console.log(formData);
      
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const Userinfo2 = (e) => {
        e.preventDefault()
        localStorage.setItem('formData', JSON.stringify(formData));
        router.push('/biometrics');
      } 

    return ( 
        <div className="h-screen w-screen flex">
            <div className="h-full lg:w-1/2 w-full flex justify-center items-center">
                <div className="lg:relative absolute items-center lg:bg-inherit bg-white/50 lg:w-full sm:w-4/5 w-90% lg:p-0 p-7 rounded-xl lg:shadow-none shadow-#023E8A">
                    <h1 className='font-mono font-bold text-6xl text-cyan-blue text-center'>Personal Details</h1>
                    <div className="flex justify-center mt-5">
                        <form className='flex flex-col gap-4'>
                            <div className="">
                                <label for="fn" className="absolute p-1 bg-white text-xs ml-3">FIRST NAME</label>
                                <input type="text"  name="firstName" value={formData.firstName} onChange={handleChange}  size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md mt-3 p-2"/>  
                            </div>
                            <div className="">
                                <label for="fn" className="absolute p-1 bg-white text-xs ml-3">MIDDLE NAME</label>
                                <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md mt-3 p-2"/>  
                            </div>
                            <div className="">
                                <label for="fn" className="absolute p-1 bg-white text-xs ml-3">LAST NAME</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md mt-3 p-2"/>  
                            </div>
                            <div className="">
                                <label for="fn" className="absolute p-1 bg-white text-xs ml-3">BIRTH DATE</label>
                                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md mt-3 p-2"/>  
                            </div>
                            <div className="flex flex-col">
                                <p className="ml-3">SEX</p>
                                <div className="ml-7 flex">
                                    <div>
                                        <input type="radio" name="sex" value="male" checked={formData.sex === 'male'} onChange={handleChange}/>
                                        <label for="male">Male</label>
                                    </div>
                                    <div className="ml-4">
                                        <input type="radio" name="sex" value="female" checked={formData.sex === 'female'} onChange={handleChange} />
                                        <label for="female">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:hidden flex justify-center">
                                <button type="submit" onClick={Userinfo2} className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">Proceed</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Image className="lg:hidden block h-full w-full object-cover" src={userinfobanner} alt="userinfobanner"/>
            </div>
            <div className="h-full w-1/2 lg:flex hidden justify-center">
                <div className="absolute flex flex-col self-center">
                    <h1 className='font-mono font-bold text-5xl text-white'>Get stronger and <br /> fitter with us, <br /> helping you to take <br /> fitness to the top <br /> level</h1>
                    <div className="flex justify-center mt-36">
                        <button type="submit" onClick={Userinfo2} className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">Proceed</button>
                    </div>
                </div>
                <Image className="h-full w-full" src={userinfobanner} alt="userinfobanner"/>
            </div>
        </div>
     );
}
 
export default Userinfo;