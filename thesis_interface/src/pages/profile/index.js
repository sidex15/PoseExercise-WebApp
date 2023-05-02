import Layout from "@/components/Layout";
import { SlUser, SlUserFemale } from "react-icons/sl";
import { RiEditLine, RiSave3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

const Profile = () => {
    const [sex, setSex] = useState()

    const userid = Cookies.get('userinfoid');
    const [userinfo,setuserinfo] = useState('');
    useEffect(() => {
        const fetchuserinfo = async (e) => {
            try {
                const res = await fetch('/api/fetchuserinfo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userid}),
                });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message);
            }

            // store the token in a cookie
            const { userinfo } = await res.json();
            setuserinfo(userinfo);
      
            } catch (error) {
                console.log('error found');
            }
        };
        fetchuserinfo();
    }, []);
    
    const handleSex = (e) => {
        setSex(e.target.value)
    }
    return ( 
        <Layout>
            <div className="h-full w-full bg-grey flex justify-center items-center">
                <div className="bg-white h-95% w-4/5 border-2 rounded-xl flex flex-col items-center pt-11 gap-24">
                    <h1 className="font-medium text-5xl text-cyan-blue">Your Profile</h1>
                    <div className="flex w-4/6 p-7 rounded-xl shadow-#023E8A">
                        <div className="flex w-full items-center p-3">
                            <div className=" w-full flex justify-center p-7">
                                <div className="h-72 w-72 border-2 border-cyan-blue rounded-full flex justify-center pt-5">
                                    <SlUser className="w-60 h-52 text-cyan-blue"/>
                                </div>
                                {/* <div className="h-72 w-72 border-2 border-cyan-blue rounded-full flex justify-center pt-5">
                                    <SlUserFemale className="w-60 h-52 text-cyan-blue"/>
                                </div> */}
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex w-full">
                                    <label htmlFor="name" className="text-3xl text-cyan-blue">Name: </label>
                                    <div className="w-full flex justify-end"><input type='text' name='name' placeholder={userinfo.firstName + ' ' + userinfo.middleName + ' ' + userinfo.lastName} className="text-3xl w-72 border-2"/></div>
                                </div>
                                <div className="flex items-center">
                                    <label htmlFor="birthdate" className="text-3xl text-cyan-blue">Birthdate: </label>
                                    <div className="w-full flex justify-end"><input type='date' name='birthdate' value={userinfo.birthDate} className="text-3xl w-72 border-2"/></div>
                                </div>
                                <div className="flex items-center">
                                    <label htmlFor="Gender" className="text-3xl text-cyan-blue">Sex: </label>
                                    <div className="w-full flex justify-end">
                                        <select name="sex" className="text-3xl w-72 border-2" onChange={handleSex}>
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <label htmlFor="height" className="text-3xl text-cyan-blue">Height: </label>
                                    <div className="w-full flex justify-end"><input type='text' name='height' placeholder={userinfo.height} className="text-3xl w-72 border-2"/></div>
                                </div>
                                <div className="flex items-center">
                                    <label htmlFor="weight" className="text-3xl text-cyan-blue">Weight: </label>
                                    <div className="w-full flex justify-end"><input type='text' name='weight' placeholder={userinfo.weight} className="text-3xl w-72 border-2"/></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-centerw-10%">
                            <RiEditLine size="30" color="#023E8A"/>
                        </div>
                    </div>
                </div>
            </div> 
        </Layout>
    );
}
 
export default Profile;