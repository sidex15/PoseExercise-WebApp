import React, { Component, useEffect, useContext } from 'react';
import Image from 'next/image';
import Card from '@/components/dashCard';
import banner from '@/img/banner.jpg'
import pushups from '@/img/pushups.jpg'
import situps from '@/img/situps.jpg'
import jumpjacks from '@/img/jumpjacks.jpg'
import squats from '@/img/squats.jpg'
import flanking from '@/img/flanking.png'
import Layout from '@/components/Layout';
import Cookies from 'js-cookie';
import Head from 'next/head';
import ExerciseContext from "@/pages/api/exercise-context";

const Dashboard = () => {
    const { exerSessionStarted, setExerSessionStarted} = useContext(ExerciseContext);

    function refreshPage() {
        window.location.reload();
    }

    useEffect(()=>{
        if(exerSessionStarted==true){
            refreshPage();
        }
    }, [])
    
    return <Layout >
        <Head>
            <title>Dashboard</title>
        </Head>
        <div className='absolute overflow-scroll h-full w-full'>
            <div className=' flex justify-center items-center w-full'>
                <Image className="object-cover laptop:h-65vh tablet:h-55vh mobileM:h-35vh h-25vh" src={banner} alt="dashboardimg" priority/>
                <p className="font-mono font-bold laptopL:text-8xl laptop:text-7xl tablet:text-6xl mobileL:text-4xl mobileM:text-3xl text-2xl text-white absolute">Start your exercise <br /> session now!</p>
            </div>
            <div className='w-full flex justify-center bg-grey'>
                <div className='pt-16 w-90% laptop:block flex flex-col items-center'>
                    <h1 className='font-mono font-bold text-cyan-blue laptopL:text-5xl laptop:text-4xl mobileM:text-3xl text-2xl'>Choose an exercise</h1>
                    <div className="flex flex-wrap justify-center laptop:pt-16 pt-0">
                        <Card name="PUSH-UPS" picsrc={pushups}/>
                        <Card name="SIT-UPS" picsrc={situps}/>
                        <Card name="JUMPING JACK" picsrc={jumpjacks}/>
                        <Card name="SQUATS" picsrc={squats}/>
                        <Card name="PLANKING" picsrc={flanking}/>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}

export default Dashboard