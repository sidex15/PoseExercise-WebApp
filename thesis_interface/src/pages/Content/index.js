import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Image from 'next/image';
import Navbar from "@/components/Navbar";


export default function Content(){

    const [open, setOpen] = useState(0);

    const SidebarSize = (value) => {
        setOpen(value)
    }

    return ( 
        <div className='h-screen'>
            <div className="absolute">
                <Navbar callback={SidebarSize}/>
            </div>
            <div className={`${open ? 'ml-52' : 'ml-14'} duration-300 pt-12 h-full`}>
                <Outlet />
            </div>
        </div>
     );
}