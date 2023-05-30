import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useRouter,usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ExerciseContext from "../pages/api/exercise-context";
import UserInfoContext from '@/pages/api/user_info-conntext';
import SessionContext from '@/pages/api/session_result';
import fetchuserinfo from "@/pages/api/userinfo";
import StudentRecordsContext from './api/stud_records-context';
import StepsContext from "@/pages/api/steps-context";
import Head from 'next/head';

export default function App({ Component, pageProps }) {

  const [exerName, setExerName] = useState("PUSH-UPS");
  const [postValue, setPostValue] = useState([]);
  const [exerSessionStarted, setExerSessionStarted] = useState(false);
  const [exerciseReps, setExerciseReps] = useState();
  const [avgRepsSpeed, setAvgRepsSpeed] = useState([]);
  const [exerciseDuration, setExerciseDuration] = useState();
  const [borgQnA, setBorgQnA] = useState([]);
  const [info, setinfo] = useState({});
  const [updatedb, setupdatedb] = useState(0);
  
  // STUDENT RECORDS CONTEXT
  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedName, setSelectedName] = useState();
  const [selectedUsername, setSelectedUsername] = useState();
  const [studentRecord, setstudentRecord] = useState();

  // STEPS CONTEXT BECAUSE AN ERROR OCCURS WHEN I PUT THIS IN THE REGISTER LAYOUT
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  
  const userid = Cookies.get('userinfoid');
  
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
            
            if (pathname === '/personal_details' 
            || pathname === '/biometrics' 
            || pathname === '/invite-code' 
            || pathname === '/reg-success') {
              router.push('/signup');
            }
            else if (pathname === '/login'){
              router.push('/dashboard');
            }   
        } catch (error) {
          if (pathname === '/personal_details' 
          || pathname === '/biometrics' 
          || pathname === '/invite-code' 
          || pathname === '/reg-success') {
            router.push('/signup');
          }
            //router.push('/login');
        }
    }
    const fetchinfo = async (e) => {
      setSelectedName('')
      setstudentRecord([])
      const userinfo = await fetchuserinfo(userid);
      setinfo(userinfo);
    }
    verifyToken();
    fetchinfo();
    console.log('user updated...');
  }, [userid,token, updatedb]);
  return(
    // USER DATA/INFORMATIONS FOR THE UserInfo CONTEXT
    //  value={{userID, setUserID, fname, setFname, mname, setMname, weight, setWeight, age, setAge}}
    <UserInfoContext.Provider value={{info, setinfo, updatedb, setupdatedb}}>
      <ExerciseContext.Provider value={{ exerName, setExerName, postValue, setPostValue, exerSessionStarted, setExerSessionStarted }}>
        <SessionContext.Provider value={{exerciseReps, setExerciseReps, avgRepsSpeed, setAvgRepsSpeed, exerciseDuration, setExerciseDuration, borgQnA, setBorgQnA}}>
          <StudentRecordsContext.Provider value={{selectedStudent, setSelectedStudent, selectedName, setSelectedName, selectedUsername, setSelectedUsername, studentRecord, setstudentRecord}}>
            <StepsContext.Provider value={{step1, step2, step3, setStep1, setStep2, setStep3}}>
              <Head>
                <link rel="icon" href="/favicon/ai.jpg" />
              </Head>
              <Component {...pageProps} />
            </StepsContext.Provider>
          </StudentRecordsContext.Provider>
        </SessionContext.Provider>
      </ExerciseContext.Provider>
    </UserInfoContext.Provider>
  )
}
