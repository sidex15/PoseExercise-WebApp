import { FaWeight } from 'react-icons/fa';
import { IoBody } from 'react-icons/io5'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import biometrics from "@/img/biometrics.png";
import { useEffect, useState } from 'react';

const Userinfo2 = () => {
    const router = useRouter();

    const [formData, setformData] = useState({
        username: '',
        password: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: '',
        sex: '',
        weight: '',
        height: '',
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

    const Invcode = (e) => {
        e.preventDefault()
        localStorage.setItem('formData', JSON.stringify(formData));
        router.push('/invite-code')
    } 
    return ( 
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="lg:block hidden h-full w-1/2">
                <Image className="h-full w-full" src={biometrics} alt="biometricsimg"/>
            </div>
            <div className="lg:w-1/2 sm:w-4/5 w-90% lg:relative absolute flex flex-col justify-center items-center lg:bg-inherit bg-white/50 lg:p-0 p-7 rounded-xl lg:shadow-none shadow-#023E8A">
                <h1 className='font-mono font-bold text-6xl text-cyan-blue text-center'>Your Height and Weight</h1>
                <div className='flex justify-center pt-16'>
                    <form className='flex flex-col gap-9'>
                        <div className='flex gap-3 items-center'>
                            <span><FaWeight size="50px" color="blue"/></span>
                            <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder='Weight in kg' size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md h-14 pl-5 text-xl"/>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <span><IoBody size="50px" color="blue"/></span>
                            <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder='Height in cm' size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md h-14 pl-5 text-xl"/>
                        </div>
                        <div className='flex justify-center mt-9'>
                            <button type="submit" onClick={Invcode} className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">Proceed</button>
                        </div>
                    </form>
                </div>
            </div>
            <Image className="lg:hidden block h-full w-full object-cover" src={biometrics} alt="biometricsimg"/>
        </div>
     );
}
 
export default Userinfo2;