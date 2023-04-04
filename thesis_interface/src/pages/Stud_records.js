import { IoCopyOutline } from "react-icons/io5"

const Student_record = () => {
    return ( 
    <div className="h-screen flex">
        <div className="bg-grey h-full w-1/6 pt-24">
            <h1 className="font-mono font-bold text-4xl text-cyan-blue ml-3">Student's List</h1>
            <hr className="border-solid border-2 border-blue-900 my-4" />
            <h1 className="text-center text-cyan-blue">Select one to view their Exercise sessions</h1>
        </div>
        <div className="h-full w-5/6 px-28 pt-4">
            <div className="h-full">
                <div className="flex items-center justify-end gap-3">
                    <h1 className="text-cyan-blue text-3xl">Your Code</h1>
                    <button className="flex justify-center items-center bg-cyan-blue font-bold rounded-3xl text-white p-4 w-44 gap-3">ABCD-1234 <IoCopyOutline size='30px' color='white'/></button>
                </div>
                <h1 className='font-mono font-bold text-3xl text-cyan-blue mt-7'>Viewing <i>Student #</i> Exercise Sessions</h1>
                <div className="bg-grey flex justify-center items-center mt-7 h-2/3">
                    this is container for the exercise records pulled from the database
                </div>
                
            </div>
            
        </div>
    </div>
    );
}
 
export default Student_record;