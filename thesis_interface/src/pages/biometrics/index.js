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
        <div className="relative bg-white h-5/6 w-9/12 flex items-center justify-center rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3)">
            <div className="laptop:block hidden h-full w-1/2 relative">
                <Image className="h-full w-full absolute rounded-l-xl" src={biometrics} alt="biometricsimg"/>
            </div>
            <div className="laptop:h-fit h-full laptop:w-1/2 w-full laptop:relative absolute flex flex-col justify-center items-center laptop:bg-inherit bg-white/50 laptop:p-0 p-7 rounded-xl laptop:shadow-none shadow-#023E8A">
                <h1 className='font-mono font-bold laptopL:text-6xl tablet:text-5xl mobileL:text-4xl text-3xl text-cyan-blue text-center'>Your Height and Weight</h1>
                <div className='flex justify-center pt-16'>
                    <form className='flex flex-col gap-9' onSubmit={Invcode}>
                        <div className='flex gap-3 items-center'>
                            <span><FaWeight size="50px" color="blue"/></span>
                            <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder='Weight in kg' className="laptopL:w-64 laptop:w-52 tablet:w-fit w-40 border-solid border-2 border-cyan-blue bg-white rounded-md h-14 pl-5 text-xl" required/>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <span><IoBody size="50px" color="blue"/></span>
                            <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder='Height in cm' className="laptopL:w-64 laptop:w-52 tablet:w-fit w-40 border-solid border-2 border-cyan-blue bg-white rounded-md h-14 pl-5 text-xl" required/>
                        </div>
                        <div className='flex justify-center mt-9'>
                            <button type="submit" className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">Proceed</button>
                        </div>
                    </form>
                </div>
            </div>
            <Image className="laptop:hidden block h-full w-full object-cover" src={biometrics} alt="biometricsimg"/>
        </div>
    </RegLayout>  
     );
}
 
export default Userinfo2;