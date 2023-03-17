import React, { Component } from 'react';
import { FaPlayCircle } from 'react-icons/fa';

const Card = (props) => {
    return (
        <div className='flex p-7'>
            <div className='h-80 w-80 rounded-lg shadow-lg'>
                <div className='absolute w-80 text-center mt-20'>
                    <p className="font-mono font-bold text-5xl text-white">{props.name}</p> 
                </div>
                <div>
                    <img className='rounded-t-lg h-56' src={props.picsrc} alt="dashcardimg"/>
                </div>
                <div className='mt-3 flex justify-center'>
                    <button className="text-cyan-blue font-bold rounded-3xl p-3 text-white flex justify-center gap-x-2">
                    <span className='self-center text-2xl'>Start Session</span>
                    <FaPlayCircle size="50px" color="blue"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card