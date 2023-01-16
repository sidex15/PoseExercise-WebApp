import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/dashCard';

const Dashboard = () => {

    return <div className='h-fit w-auto'>
            <div className=''><Navbar /></div>
            <div>
                <div className='absolute mt-44 ml-44'>
                    <p className="font-mono font-bold text-8xl text-white">Start your exercise <br /> session now</p>
                </div>
                <div>
                    <img className="h-65vh w-screen " src="images/banner.jpg" />
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