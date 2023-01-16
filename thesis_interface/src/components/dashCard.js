import React, { Component } from 'react';
import { FaPlayCircle } from 'react-icons/fa';

const Card = (props) => {
    return (
        <div className='flex p-7'>
            <div className='h-80 w-80 rounded-lg shadow-lg'>
                <div className='absolute h-56 w-80 text-center mt-20'>
                    <p className="font-mono font-bold text-5xl text-white">{props.name}</p> 
                </div>
                <div>
                    <img className='rounded-t-lg h-56' src={props.picsrc}/>
                </div>
                <div className='mt-3  text-cyan-blue text-2xl flex justify-center gap-x-2 cursor-pointer p-3 hover:bg-light-white rounded-md'>
                    <span className='mt-2'>Start Session</span>
                    <FaPlayCircle size="50px" color="blue"/>
                </div>
            </div>
        </div>
    )
}

export default Card