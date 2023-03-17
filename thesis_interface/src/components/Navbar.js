import React, { useState } from 'react';
import * as hiIcons from "react-icons/hi";
import * as vscIcons from "react-icons/vsc";
import { RiHomeLine } from "react-icons/ri";
import { GiBiceps } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { RiFileUserLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

const Navbar = () => {
    const [open, setOpen] = useState(false)

    const Menus = [
        { title: "Dashboard", icon: <RiHomeLine size='30px' color='white' />},
        { title: "Workout Session", icon: <GiBiceps size='30px' color='white' />},
        { title: "Exercise Records", icon: <TbReportSearch size='30px' color='white' />},
        { title: "Student Records", icon: <RiFileUserLine size='30px' color='white' />},
        { title: "Profile", icon: <IoSettingsOutline size='30px' color='white'/>, gap: true},
    ]

    return <div>
        <div className='fixed'>
            <div className='relative w-screen'>
                <nav className="md:flex md:items-center md:justify-between flex-wrap bg-cyan-blue">
                    <div className='p-3'>
                        <hiIcons.HiMenu size="30px" color="white" onClick={() => setOpen(!open)}/>
                    </div>
                    <div className='text-white text-sm flex items-center gap-x-2 cursor-pointer p-3 hover:bg-light-white rounded-md mr-4'>
                        <vscIcons.VscAccount size="28px" color="white"/>
                        <span>Login/Signup</span>
                    </div>
                </nav>
            </div>
        </div>

        <div className={`${open ? 'w-52' : 'w-14'} flex h-screen duration-300 bg-cyan-blue pt-32`}>
                <ul className='pt-6'>
                    {Menus.map((menu, index) => (
                        <li key={index} className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-3 hover:bg-light-white rounded-md  ${menu.gap ? "absolute inset-x-0 bottom-0" : "mt-2"}`}>
                            {menu.icon}
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
    </div>
}

export default Navbar