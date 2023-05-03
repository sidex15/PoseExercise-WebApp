import '@/styles/globals.css'
import Cookies from 'js-cookie';
import { useRouter,usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ExerciseContext from "../pages/api/exercise-context";
import UserInfoContext from '@/pages/api/user_info-conntext';
import SessionContext from '@/pages/api/session_result';

export default function App({ Component, pageProps }) {

  const [exerName, setExerName] = useState("PUSH-UPS");
  const [postValue, setPostValue] = useState([]);
  const [exerciseReps, setExerciseReps] = useState();
  const [avgRepsSpeed, setAvgRepsSpeed] = useState([]);
  const [exerciseDuration, setExerciseDuration] = useState();
  const [borgQnA, setBorgQnA] = useState([]);

  const router = useRouter();
  const token = Cookies.get('token');
  const pathname = usePathname();
  useEffect(() => {
    const verifyToken = async () => {
      if (pathname === '/signup') {
        return <Component {...pageProps} />;
      }
        try {
            const res = await fetch('/api/verify-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message);
            }
        } catch (error) {
          if (pathname === '/personal_details' 
          || pathname === '/biometrics' 
          || pathname === '/invite-code' 
          || pathname === '/reg-success') {
            router.push('/signup');
          }
            router.push('/login');
        }
    }
    verifyToken();
    if (pathname === '/personal_details' 
      || pathname === '/biometrics' 
      || pathname === '/invite-code' 
      || pathname === '/reg-success') {
        router.push('/signup');
      }
  }, []);
  return(
    // USER DATA/INFORMATIONS FOR THE UserInfo CONTEXT
    //  value={{userID, setUserID, fname, setFname, mname, setMname, weight, setWeight, age, setAge}}
    <UserInfoContext.Provider>
      <ExerciseContext.Provider value={{ exerName, setExerName, postValue, setPostValue }}>
        <SessionContext.Provider value={{exerciseReps, setExerciseReps, avgRepsSpeed, setAvgRepsSpeed, exerciseDuration, setExerciseDuration, borgQnA, setBorgQnA}}>
          <Component {...pageProps} />
        </SessionContext.Provider>
      </ExerciseContext.Provider>
    </UserInfoContext.Provider>
  )
}
