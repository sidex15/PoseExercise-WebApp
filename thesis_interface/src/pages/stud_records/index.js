import { IoCopyOutline } from "react-icons/io5";
import { HiCheck } from "react-icons/hi";
import Layout from "@/components/Layout";
import Head from "next/head";
import StudentRecordsTable from "@/components/student_records";
import { useState, useEffect, useMemo, useContext } from "react";
import StudentList from "@/components/student_list";
import { Button } from "flowbite-react";
import { Toast } from "flowbite-react";
import StudentRecordsContext from "../api/stud_records-context";
import UserInfoContext from '@/pages/api/user_info-conntext';

const StudentRecord = () => {

    const {selectedStudent, setSelectedStudent, selectedName, setSelectedName, selectedUsername, setSelectedUsername, studentRecord, setstudentRecord} = useContext(StudentRecordsContext);
    const [name, setName] = useState(selectedName);
    const [students,setstudents]=useState([]);
    const {info} = useContext(UserInfoContext);
    const [copyCode, setCopyCode] = useState('ABCD-1234');
    let curcoach = info._id

    useEffect(()=>{
        console.log(curcoach)
        const currentcoach = async(e) =>{
            try {
                const res = await fetch('/api/findstudents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({curcoach}),
                });
        
            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message);
            }
        
            // store the token in a cookie
            const { coachinfo } = await res.json();
            //console.log(coachinfo);
            //const fcoachinfo = coachinfo;
            //setCoach(fcoachinfo);
            //setUserHaveCoach(true);
            setstudents(coachinfo);

            } catch (error) {
                console.log(error);
                //setUserHaveCoach(false)

            }
        }
        currentcoach();

        setName(selectedName);
        setCopyCode(info.invcode);
    },[info,selectedName])

    function copyToClipboard() {
        navigator.clipboard.writeText(copyCode);
    }

    console.log(students);

    const data = useMemo(()=>studentRecord||[]
    )

    const studentList = useMemo(
        () => students
    )
    
    return ( <Layout>
        <Head><title>Student Records</title></Head>
        <div className="absolute h-full w-full bg-white overflow-scroll flex">
            <div className="bg-grey h-full w-1/6 pt-10 2xl:pt-20">
                <h1 className="font-mono font-bold text-4xl 2xl:text-4xl text-cyan-blue ml-3">Student's List</h1>
                <hr className="border-solid border-2 border-blue-900 my-4" />
                <h1 className="text-center text-cyan-blue">Select one to view their Exercise sessions</h1>

                {/* PASS THE DATA AS PROPS HERE TO THIS COMPONENT */}
                <StudentList data={studentList}/>
            </div>
            <div className="h-full w-5/6 px-28 pt-4">
                <div className="h-full pb-4">
                    <div className="flex items-center justify-end gap-3">
                        <h1 className="text-cyan-blue text-3xl">Your Code:</h1>
                        <Button onClick={copyToClipboard} pill={true} className="text-white text-2xl w-44 py-2">{copyCode}<IoCopyOutline className="text-2xl ml-2"/></Button>
                    </div>
                    <h1 className='font-mono font-bold text-3xl text-cyan-blue mt-7'>Viewing <i>{name}</i> Exercise Sessions</h1>
                    <div className="bg-grey mt-7 h-2/3">

                        {/* PASS THE DATA AS PROPS HERE TO THIS COMPONENT */}
                        <StudentRecordsTable data={data}/>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    );
}
 
export default StudentRecord;