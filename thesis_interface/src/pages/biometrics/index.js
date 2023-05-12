import { FaWeight } from 'react-icons/fa';
import { IoBody } from 'react-icons/io5'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import biometrics from "@/img/biometrics.png";
import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import RegLayout from '@/components/registerlayout';
import StepsContext from "@/pages/api/steps-context";

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

    const { setStep2 } = useContext(StepsContext);

    const Invcode = (e) => {
        e.preventDefault()
        localStorage.setItem('formData', JSON.stringify(formData));
        setStep2(true)
        router.push('/invite-code')
    } 
    return ( 
    <RegLayout>  
        <Head><title>Biometrics</title></Head>
        <div className="bg-white h-5/6 w-9/12 flex items-center justify-center rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3)">
            <div className="lg:block hidden h-full w-1/2 relative">
                <Image className="h-full w-full absolute rounded-l-xl" src={biometrics} alt="biometricsimg"/>
            </div>
            <div className="lg:w-1/2 sm:w-4/5 w-90% lg:relative absolute flex flex-col justify-center items-center lg:bg-inherit bg-white/50 lg:p-0 p-7 rounded-xl lg:shadow-none shadow-#023E8A">
                <h1 className='font-mono font-bold text-6xl text-cyan-blue text-center'>Your Height and Weight</h1>
                <div className='flex justify-center pt-16'>
                    <form className='flex flex-col gap-9' onSubmit={Invcode}>
                        <div className='flex gap-3 items-center'>
                            <span><FaWeight size="50px" color="blue"/></span>
                            <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder='Weight in kg' size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md h-14 pl-5 text-xl" required/>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <span><IoBody size="50px" color="blue"/></span>
                            <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder='Height in cm' size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md h-14 pl-5 text-xl" required/>
                        </div>
                        <div className='flex justify-center mt-9'>
                            <button type="submit" className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">Proceed</button>
                        </div>
                    </form>
                </div>
            </div>
            <Image className="lg:hidden block h-full w-full object-cover" src={biometrics} alt="biometricsimg"/>
        </div>
    </RegLayout>  
     );
}
 
export default Userinfo2;