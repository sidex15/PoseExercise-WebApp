import Layout from "@/components/Layout";
import { SlUser, SlUserFemale } from "react-icons/sl";
import { RiEditLine, RiSave3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect, useContext } from "react";
import UserInfoContext from '@/pages/api/user_info-conntext';
import male_avatar from '@/img/male_avatar.png';
import female_avatar from '@/img/female_avatar.png';
import Image from "next/image";
import Userinfo from "../personal_details";

const Profile = () => {
    const [sex, setSex] = useState()
    const { info } = useContext(UserInfoContext);
    
    const handleSex = (e) => {
        setSex(e.target.value)
    }

    const handleSexSelected = () => {
        if(info.sex=="male"){
            return male_avatar;
        }else if(info.sex=="female"){
            return female_avatar;
        }
    }

    return (
        <Layout>
            <div className="h-full w-full bg-white flex justify-center items-center">
                <form className="h-auto w-full flex flex-col items-center">
                    <fieldset className="flex flex-col items-center w-3/4 p-7 rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3)">
                        <div className="pb-10">
                            <h1 className="font-medium text-5xl text-cyan-blue">Your Profile</h1>
                        </div>
                        <div className="w-full items-center p-3">
                            <div className="grid grid-cols-5 gap-5 2xl:gap-20 w-full">
                                <div className="grid col-span-2">
                                    <Image src={male_avatar}></Image>
                                </div>
                                <div className="grid xl:gap-4 2xl:gap-7 col-span-3">
                                    <div className="grid grid-cols-5 xl:gap-5 2xl:gap-8 w-full">
                                        <label htmlFor="name" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Name: </label> 
                                        <input type='text' name='name' value={info.firstName + ' ' + info.middleName + ' ' + info.lastName} 
disabled placeholder="" className="xl:text-xl 2xl:text-2xl border-2 col-span-3"/>
                                    </div>
                                    <div className="grid grid-cols-5 xl:gap-5 2xl:gap-8 items-center">
                                        <label htmlFor="birthdate" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Birthdate: </label>
                                        <input type='date' name='birthdate' value={info.birthDate} disabled className="lg:text-xl 2xl:text-2xl border-2 col-span-3"/>
                                    </div>
                                    <div className="grid grid-cols-5 xl:gap-5 2xl:gap-8 items-center">
                                        <label htmlFor="Gender" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Sex: </label>                                        <select name="sex" disabled className="xl:text-xl 2xl:text-2xl border-2 col-span-3" onChange={handleSex}>
                                            <option selected={info.sex} value='male'>Male</option>
                                            <option selected={info.sex} value='female'>Female</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-5 xl:gap-5 2xl:gap-8 items-center">
                                        <label htmlFor="height" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Height: </label>
                                        <input type='text' name='height' value={info.height} placeholder="" disabled className="xl:text-xl 2xl:text-2xl border-2 col-span-3"/>
                                    </div>
                                    <div className="grid grid-cols-5 xl:gap-5 2xl:gap-8 items-center">
                                        <label htmlFor="weight" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Weight: </label>
                                        <input type='text' name='weight' value={info.weight} disabled       placeholder="" className="xl:text-xl 2xl:text-2xl border-2 col-span-3"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center w-10%">
                            <RiEditLine size="30" color="#023E8A"/>
                        </div>
                    </fieldset>
                </form>
            </div>
        </Layout>
    );
}

export default Profile;