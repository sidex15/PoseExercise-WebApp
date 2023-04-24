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

    console.log(formData);

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const Invcode = (e) => {
        e.preventDefault()
        localStorage.setItem('formData', JSON.stringify(formData));
        router.push('/invite-code')
    } 
    return ( 
        <div className="h-full flex">
            <div className="h-screen w-1/2">
                <Image className="h-full w-full" src={biometrics} alt="biometricsimg"/>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <div>
                    <h1 className='font-mono font-bold text-6xl text-cyan-blue text-center'>Your Height and Weight</h1>
                    <div className='flex justify-center mt-12'>
                        <form className=''>
                            <div className='flex mt-14'>
                                <span className="mt-3 mr-4"><FaWeight size="50px" color="blue"/></span>
                                <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder='Weight in kg' size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md h-14 mt-3 pl-5 text-xl"/>
                            </div>
                            <div className='flex mt-14'>
                                <span className="mt-3 mr-4"><IoBody size="50px" color="blue"/></span>
                                <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder='Height in cm' size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md h-14 mt-3 pl-5 text-xl"/>
                            </div>
                            <div className='flex justify-center mt-20'>
                                <button type="submit" onClick={Invcode} className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">Proceed</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Userinfo2;