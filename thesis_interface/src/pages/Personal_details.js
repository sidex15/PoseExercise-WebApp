import { useNavigate } from "react-router-dom";

const Userinfo = () => {
    const navigate = useNavigate();
    return ( 
        <div className="h-full flex">
            <div className="w-1/2 flex justify-center">
                <div className="self-center">
                    <h1 className='font-mono font-bold text-6xl text-cyan-blue text-center'>Personal Details</h1>
                    <div className="flex justify-center mt-5">
                        <form>
                            <div className="mt-4">
                                <label for="fn" className="absolute p-1 bg-white text-xs ml-3">FIRST NAME</label>
                                <input type="text" name="fn" size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md mt-3 p-2"/>  
                            </div>
                            <div className="mt-4">
                                <label for="fn" className="absolute p-1 bg-white text-xs ml-3">MIDDLE NAME</label>
                                <input type="text" name="fn" size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md mt-3 p-2"/>  
                            </div>
                            <div className="mt-4">
                                <label for="fn" className="absolute p-1 bg-white text-xs ml-3">LAST NAME</label>
                                <input type="text" name="fn" size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md mt-3 p-2"/>  
                            </div>
                            <div className="mt-4">
                                <label for="fn" className="absolute p-1 bg-white text-xs ml-3">BIRTH DATE</label>
                                <input type="date" name="fn" size="35" className="border-solid border-2 border-cyan-blue bg-white rounded-md mt-3 p-2"/>  
                            </div>
                            <div className="mt-4 flex flex-col">
                                <p className="ml-3">SEX</p>
                                <div className="ml-7 flex">
                                    <div>
                                        <input type="radio" id="male" name="sex" value="Male" />
                                        <label for="male">Male</label>
                                    </div>
                                    <div className="ml-4">
                                        <input type="radio" id="female" name="sex" value="Female" />
                                        <label for="female">Female</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="h-screen w-1/2 flex justify-center">
                <div className="absolute flex flex-col self-center">
                    <h1 className='font-mono font-bold text-5xl text-white'>Get stronger and <br /> fitter with us, <br /> helping you to take <br /> fitness to the top <br /> level</h1>
                    <div className="flex justify-center mt-36">
                        <button type="submit" onClick={() => navigate('/personal-information')} className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32">Proceed</button>
                    </div>
                </div>
                <img className="h-full w-full" src="images/userinfobanner.png" alt="userinfobanner"/>
            </div>
        </div>
     );
}
 
export default Userinfo;