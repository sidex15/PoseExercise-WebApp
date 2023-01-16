import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as hiIcons from "react-icons/hi";
import * as vscIcons from "react-icons/vsc";
import Sidebar from './Sidebar';

const Navbar = () => {
    const [open, setOpen] = useState(false)

    return <div>
            <div className='absolute'>
                <Sidebar menustat={open}/>
            </div>
            <div className='relative'>
                <nav className="md:flex md:items-center md:justify-between flex-wrap bg-cyan-blue">
                    <div className='p-3'>
                        <hiIcons.HiMenu size="30px" color="white" onClick={() => setOpen(!open)}/>
                    </div>
                    <div className='text-white text-sm flex items-center gap-x-2 cursor-pointer p-3 hover:bg-light-white rounded-md'>
                        <vscIcons.VscAccount size="28px" color="white"/>
                        <span>Login/Signup</span>
                    </div>
                </nav>
            </div>
        </div>
}

export default Navbar