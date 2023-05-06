import Layout from "@/components/Layout";
import { SlUser, SlUserFemale } from "react-icons/sl";
import { RiEditLine, RiSave3Fill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { VscEdit } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";
import { VscClose } from "react-icons/vsc";
import { useState, useEffect, useContext } from "react";
import UserInfoContext from '@/pages/api/user_info-conntext';
import male_avatar from '@/img/male_avatar.png';
import female_avatar from '@/img/female_avatar.png';
import Image from "next/image";
import Userinfo from "../personal_details";
import Head from "next/head";

const Profile = () => {
    const { info } = useContext(UserInfoContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState();
    const [bday, setBday] = useState();
    const [sex, setSex] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();

    useEffect(()=>{
        setName(info.firstName + ' ' + info.middleName + ' ' + info.lastName);
        setBday(info.birthDate);
        setSex(info.sex);
        setHeight(info.height);
        setWeight(info.weight);
    }, [])

    
    const handleAvatarSelected = () => {
        if(info.sex=="male" || setSex=="male"){
            return male_avatar;
        }else if(info.sex=="female" || setSex=="female"){
            return female_avatar;
        }
    }

    const discardEditing = () => {
        setIsEditing(false);
        setBday(info.birthDate);
        setSex(info.sex);
        setHeight(info.height);
        setWeight(info.weight);
    }

    const handleSex = (e) => {
        setSex(e.target.value);
    }

    const handleDateChange = (event) => {
        setBday(event.target.value);
    }

    return (
        <Layout>
            <Head><title>Profile</title></Head>
            <div className="absolute h-full w-full bg-white overflow-scroll">
                <form className="h-auto w-full flex flex-col items-center pt-12 2xl:pt-20">
                    <fieldset className="flex flex-col items-center w-3/4 p-7 rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3)">
                        <div className="w-full flex justify-end items-center">
                            {isEditing ? (
                                <button type="button" onClick={discardEditing}><RxCross1 className="text-2xl" color="#023E8A"/></button>

                            ):
                                <button type="button" onClick={()=>setIsEditing(true)}><FiEdit className="text-2xl" color="#023E8A"/></button>
                            }
                            </div>
                        <div className="pb-10 text-center">
                            <h1 className="font-medium text-5xl text-cyan-blue">Your Profile</h1>
                        </div>
                        <div className="w-full items-center p-3">
                            <div className="grid sm:grid-cols-1 sm:items-center sm:justify-center xl:grid-cols-5 gap-5 2xl:gap-20 w-full">
                                <div className="grid col-span-3 xl:col-span-2">
                                    <div className="flex items-center justify-center">
                                        <Image src={handleAvatarSelected()} className="w-3/4"></Image>
                                    </div>
                                </div>
                                <div className="grid xl:gap-4 2xl:gap-7 col-span-3">
                                    {!isEditing?(
                                        <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                            <label htmlFor="name" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Name: </label> 
                                            <input type='text' name='name' placeholder={name} disabled={isEditing==true?false:true} className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 placeholder-blue-500"/>
                                        </div>
                                    ):
                                        <>
                                        <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                            <label htmlFor="fname" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">First Name: </label> 
                                            <input type='text' name='fname' placeholder={info.firstName}
                                                disabled={isEditing==true?false:true} 
                                                className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 placeholder-blue-500"/>
                                        </div>
                                        <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                            <label htmlFor="mname" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Middle Name: </label> 
                                            <input type='text' name='mname' placeholder={info.middleName}
                                                disabled={isEditing==true?false:true} 
                                                className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 placeholder-blue-500"/>
                                        </div>
                                        <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                            <label htmlFor="mname" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Last Name: </label> 
                                            <input type='text' name='mname' placeholder={info.lastName}
                                                disabled={isEditing==true?false:true} 
                                                className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 placeholder-blue-500"/>
                                        </div>
                                        </>
                                    }
                                    <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                        <label htmlFor="birthdate" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Birthdate: </label>
                                        <input type='date' name='birthdate' value={bday} onChange={handleDateChange} disabled={isEditing==true?false:true} className="px-4 py-1 lg:text-xl 2xl:text-2xl border-2 col-span-3 text-blue-500"/>
                                    </div>
                                    <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                        <label htmlFor="Gender" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Sex: </label>                                 
                                        <select name="sex" disabled={isEditing==true?false:true} className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 text-blue-500" onChange={handleSex}>
                                            <option selected={sex=="male" ? true : false} value='male' classname="">Male</option>
                                            <option selected={sex=="female" ? true : false} value='female'>Female</option>
                                        </select>
                                    </div>
                                    <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                        <label htmlFor="height" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Height: </label>
                                        <input type='text' name='height' placeholder={`${height} ${!isEditing==true?'cm' : ''}`} disabled={isEditing==true?false:true} className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 placeholder-blue-500"/>
                                    </div>
                                    <div className="grid sm:grid-cols-1 xl:grid-cols-5 xl:gap-2 2xl:gap-8 items-center">
                                        <label htmlFor="weight" className="xl:text-2xl 2xl:text-3xl text-cyan-blue col-span-2">Weight: </label>
                                        <input type='text' name='weight' placeholder={`${weight} ${!isEditing==true?'kg' : ''}`} disabled={isEditing==true?false:true} className="px-4 py-1 xl:text-xl 2xl:text-2xl border-2 col-span-3 placeholder-blue-500"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <div className="h-auto w-full flex flex-col items-center mt-20">
                    <div className="flex flex-col items-center w-3/4 p-7 rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3)">
                        <div className="pb-10 text-center">
                            <h1 className="font-medium text-5xl text-cyan-blue">Your Coach</h1>
                        </div>
                        <div class="p-6 bg-gray-100 text-gray-800">
                            <h2 class="text-3xl font-bold mb-4">Introducing our Coach feature</h2>
                            <p class="text-lg mb-4">Welcome to our fitness web app! Our platform is designed to help you achieve your fitness goals by providing you with the tools and resources you need to stay on track. One of the key features of our app is the ability to work with a professional coach.</p>
                            <div class="container mx-auto mt-10">
                                <h1 class="text-2xl font-bold mb-5">Our Fitness Web App</h1>
                                <ul class="list-disc list-inside">
                                    <li class="mb-3">Our fitness web app helps you achieve your fitness goals with tools and resources.</li>
                                    <li class="mb-3">The app includes a feature to connect with a professional coach.</li>
                                    <li class="mb-3">The coach can view your exercise records to provide personalized feedback and support.</li>
                                    <li class="mb-3">Only one coach can be connected at a time to ensure focused attention and support.</li>
                                    <li class="mb-3">The coach feature can help you stay motivated and on track towards achieving your goals.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;