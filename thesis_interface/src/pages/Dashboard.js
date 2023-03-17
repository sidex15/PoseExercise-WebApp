import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/dashCard';

const Dashboard = () => {

    return <div className='h-fit w-auto'>
            <div className='mt-44 ml-44 absolute'>
                <p className="font-mono font-bold text-8xl text-white">Start your exercise <br /> session now</p>
            </div>
            <div>
                <div className=''>
                    <img className="h-65vh w-screen" src="images/banner.jpg" alt="dashboardimg"/>
                </div>
                <div className='pl-60 pt-16'>
                    <h1 className='font-mono font-bold text-cyan-blue text-3xl'>Choose an exercise</h1>
                    <div className="flex flex-wrap">
                        <Card name="PUSH-UPS" picsrc="images/pushups.jpg"/>
                        <Card name="SIT-UPS" picsrc="images/situps.jpg"/>
                        <Card name="JUMPING JACK" picsrc="images/jumpjacks.jpg"/>
                        <Card name="SQUATS" picsrc="images/squats.jpg"/>
                        <Card name="PLANKING" picsrc="images/flanking.png"/>
                    </div>
                </div>
            </div>
        </div>
}

export default Dashboard