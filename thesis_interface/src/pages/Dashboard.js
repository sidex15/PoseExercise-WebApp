import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/dashCard';
import banner from '../img/banner.jpg'
import pushups from '../img/pushups.jpg'
import situps from '../img/situps.jpg'
import jumpjacks from '../img/jumpjacks.jpg'
import squats from '../img/squats.jpg'
import flanking from '../img/flanking.png'

const Dashboard = () => {

    return <div className='h-screen w-auto'>
            <div className='mt-44 ml-44 absolute'>
                <p className="font-mono font-bold text-8xl text-white">Start your exercise <br /> session now</p>
            </div>
            <div>
                <div className=''>
                    <img className="h-65vh w-screen" src={banner} alt="dashboardimg"/>
                </div>
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
}

export default Dashboard