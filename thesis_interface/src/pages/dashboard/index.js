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
                <Image className="object-cover lg:h-65vh h-30vh" src={banner} alt="dashboardimg" priority/>
                <p className="font-mono font-bold lg:text-8xl text-5xl text-white absolute">Start your exercise <br /> session now</p>
            </div>
            <div className='w-full flex justify-center bg-grey'>
                <div className='pt-16 w-90% lg:block flex flex-col items-center'>
                    <h1 className='font-mono font-bold text-cyan-blue lg:text-5xl text-3xl'>Choose an exercise</h1>
                    <div className="flex flex-wrap justify-center lg:pt-16 pt-0">
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