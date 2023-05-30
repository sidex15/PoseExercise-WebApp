import { useRouter } from 'next/navigation';
import Image from 'next/image';
import quartercircle from "@/img/quartercircle.png";
import coach from "@/img/coach.png";
import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import RegLayout from '@/components/registerlayout';
import StepsContext from "@/pages/api/steps-context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Invcode = () => {
    const router = useRouter();
    const [tempcoach, settempcoach] = useState('');
    var formData={
        username: '',
        password: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: '',
        sex: '',
        weight: '',
        height: '',
        coach:'',
      };

    
    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
          formData=JSON.parse(storedData);
        }
        //console.log(formData);
    }, [tempcoach]);

    const handleChange = (e) => {
      settempcoach(e.target.value);
      //console.log(tempcoach)
    };

    const { setStep3 } = useContext(StepsContext);

    const registerUser = async () => {

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
            //console.log(data.message);
          } else {
            console.error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
        setStep3(true);
        router.push('/reg-success')
      };

    //Finds the coach invite code first if the code does not exist it will not go...
    const setcoach = async (e) => {
      const invcodever=tempcoach;
      //console.log(invcodever)
      //console.log(formData)
      try {
                const res = await fetch('/api/findcoachcode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({invcodever}),
                });
        
            if (res.ok) {
                const { coachid } = await res.json();
                formData={ ...formData, coach: coachid };
                //console.log(formData)
                registerUser();
                const { message } = await res.json();
                throw new Error(message);
            }
            else {
              toast.error("Coach Not Found!", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000, // close after 3 seconds
                  hideProgressBar: true, // hide the progress bar
                  closeOnClick: true, // close on click
                  pauseOnHover: true, // pause on hover
                  draggable: true,}) // allow dragging
              console.error(error);
              console.error(`HTTP error! status: ${response.status}`);
              return;
            }
          } catch {
          }
    };

    return (
    <RegLayout>
      <Head><title>Invite Code</title></Head>
      <div className="bg-white h-5/6 w-9/12 flex items-center justify-center rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3)">
          <div className="h-full laptop:w-2/5 w-full relative">
              <div className="absolute h-full laptop:w-full w-full flex flex-col justify-center">
                  <h1 className='self-center font-mono font-bold desktop:text-6xl laptopL:text-5xl laptop:text-4xl tablet:text-5xl text-3xl text-cyan-blue text-center'>Do you have a <br /> fitness coach?</h1>
                  <div className="flex flex-col tablet:pt-32 pt-16">
                      <h1 className="font-mono font-bold text-cyan-blue self-center text-xl">Enter your coach's <br /> invite code below</h1>
                      <input type="text" name="tempcoach" value={tempcoach} onChange={handleChange} className="laptopL:w-fit laptop:w-56 tablet:w-fit w-90% self-center border-solid border-2 border-cyan-blue bg-white rounded-md mt-5 p-2 font-bold text-xl text-center"/>
                      <button type="submit" onClick={setcoach} className="self-center bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32 tablet:mt-28 mt-20">Proceed</button>   
                  </div>
              </div>
              <Image className="laptopL:h-1/2 laptop:h-2/5 tablet:h-4/5 h-3/5 rounded-tl-xl" src={quartercircle} alt="circle"/>
          </div>
          <div className="laptop:flex hidden h-full w-3/5 justify-center relative">
              <Image className="h-full w-full absolute rounded-r-xl" src={coach} alt="inviteimg"/>
              <div className="absolute flex flex-col self-center items-center">
                  <h1 className='font-mono font-bold desktop:text-5xl laptopL:text-4xl laptop:text-3xl text-white'>Train Like A <br /> Champion Today, <br /> and let your coach <br /> track your exercise <br /> records, stats, and <br /> performance in our <br /> platform.</h1>
                  <div className="flex justify-center mt-40">
                      <button type="submit" onClick={registerUser} className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">SKIP</button>
                  </div>
              </div>
          </div>
          <ToastContainer/>
      </div>
    </RegLayout> 
    );
}
 
export default Invcode;