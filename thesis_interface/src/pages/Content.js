import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";


const Content = () => {

    const [open, setOpen] = useState(false)

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
 
export default Content;