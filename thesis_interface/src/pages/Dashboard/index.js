import React, { Component } from 'react';
import Image from 'next/image';
import Card from '@/components/dashCard';
import banner from '@/img/banner.jpg'
import pushups from '@/img/pushups.jpg'
import situps from '@/img/situps.jpg'
import jumpjacks from '@/img/jumpjacks.jpg'
import squats from '@/img/squats.jpg'
import flanking from '@/img/flanking.png'
import Layout from '@/components/Layout';

const Dashboard = () => {

    return <Layout >
        <div className='h-screen'>
            <div className='flex justify-center items-center w-full'>
                <Image className="h-65vh w-screen" src={banner} alt="dashboardimg" priority/>
                <p className="font-mono font-bold text-8xl text-white absolute">Start your exercise <br /> session now</p>
            </div>
            <div>
                <div className='pl-60 pt-16'>
                    <h1 className='font-mono font-bold text-cyan-blue text-3xl'>Choose an exercise</h1>
                    <div className="flex flex-wrap">
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