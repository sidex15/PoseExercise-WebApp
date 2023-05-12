import { useRouter } from 'next/navigation';
import Image from 'next/image';
import quartercircle from "@/img/quartercircle.png";
import coach from "@/img/coach.png";
import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import RegLayout from '@/components/registerlayout';
import StepsContext from "@/pages/api/steps-context";


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
        invcode: '',
      });

    
    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setformData(JSON.parse(storedData));
        }
    }, []);

    const RegSuccess = (e) => {
        e.preventDefault()
        router.push('/reg-success')
    }

    const { setStep3 } = useContext(StepsContext);

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
        setStep3(true);
        router.push('/reg-success')
      };

    return (
    <RegLayout>
      <Head><title>Invite Code</title></Head>
      <div className="bg-white h-5/6 w-9/12 flex items-center justify-center rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3)">
          <div className="h-full lg:w-2/5 w-full relative">
              <div className="absolute h-full lg:w-full w-full flex flex-col justify-center">
                  <h1 className='self-center font-mono font-bold lg:text-6xl text-5xl text-cyan-blue text-center'>Do you have a <br /> fitness coach?</h1>
                  <div className="flex flex-col md:pt-32 pt-16">
                      <h1 className="font-mono font-bold text-cyan-blue self-center text-xl">Enter your coach's <br /> invite code below</h1>
                      <input type="text" name="fn" size="20" className="self-center border-solid border-2 border-cyan-blue bg-white rounded-md mt-5 p-2 font-bold text-xl text-center"/>
                      <button type="submit" onClick={registerUser} className="self-center bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32 md:mt-28 mt-20">Proceed</button>   
                  </div>
              </div>
              <Image className="lg:h-1/2 sm:h-4/5 h-3/5 rounded-tl-xl" src={quartercircle} alt="circle"/>
          </div>
          <div className="lg:flex hidden h-full w-3/5 justify-center relative">
              <Image className="h-full w-full absolute rounded-r-xl" src={coach} alt="inviteimg"/>
              <div className="absolute flex flex-col self-center items-center">
                  <h1 className='font-mono font-bold text-5xl text-white'>Train Like A <br /> Champion Today, <br /> and let your coach <br /> track your exercise <br /> records, stats, and <br /> performance in our <br /> platform.</h1>
                  <div className="flex justify-center mt-40">
                      <button type="submit" onClick={registerUser} className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">SKIP</button>
                  </div>
              </div>
          </div>
      </div>
    </RegLayout> 
    );
}
 
export default Invcode;