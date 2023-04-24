import { useRouter } from 'next/navigation';
import Image from 'next/image';
import quartercircle from "@/img/quartercircle.png";
import coach from "@/img/coach.png";
import { useEffect, useState } from 'react';

const Invcode = () => {
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

    const RegSuccess = (e) => {
        e.preventDefault()
        router.push('/Reg-success')
    }

    const registerUser = async (e) => {
      
        try {
          const response = await fetch('/api/createUser', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log(data.message);
          } else {
            console.error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
        e.preventDefault()
        router.push('/reg-success')
      };

    return ( 
    <div className="h-full flex">
        <div className="h-screen w-2/5">
            <div className="absolute w-2/5 flex flex-col justify-center h-full">
                <h1 className='self-center font-mono font-bold text-6xl text-cyan-blue text-center'>Do you have a <br /> fitness coach?</h1>
                <div className="flex flex-col mt-32">
                    <h1 className="font-mono font-bold text-cyan-blue self-center text-xl">Enter your coach's <br /> invite code below</h1>
                    <input type="text" name="fn" size="20" className="self-center border-solid border-2 border-cyan-blue bg-white rounded-md mt-5 p-2 font-bold text-xl text-center"/>
                    <button type="submit" onClick={RegSuccess} className="self-center bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32 mt-28">Proceed</button>   
                </div>
            </div>
            <Image className="h-1/2" src={quartercircle} alt="circle"/>
        </div>
        <div className="h-screen w-3/5 flex justify-center">
            <div className="absolute flex flex-col self-center">
                <h1 className='font-mono font-bold text-5xl text-white'>Train Like A <br /> Champion Today, <br /> and let your coach <br /> track your exercise <br /> records, stats, and <br /> performance in our <br /> platform.</h1>
                <div className="flex justify-center mt-36">
                    <button type="submit" onClick={registerUser} className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">SKIP</button>
                </div>
            </div>
            <Image className="h-full w-full" src={coach} alt="inviteimg"/>
        </div>
    </div> 
    );
}
 
export default Invcode;