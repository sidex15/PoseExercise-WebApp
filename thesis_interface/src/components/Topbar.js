import { useRouter } from "next/router";
import { useState } from 'react';
import { RiLogoutBoxRLine } from "react-icons/ri";
import Cookies from 'js-cookie';
const Topbar = () => {
    const router = useRouter();

    const Backlogin = (e) => {
        Cookies.remove('token');
        e.preventDefault();
        router.push('/Login');
    }


    return ( 
        <div className='w-full'>
            <nav className="flex items-center justify-end flex-wrap bg-cyan-blue h-14">
                <div className='text-white text-sm flex items-center gap-x-2 cursor-pointer p-3 hover:bg-light-white rounded-md mr-4' onClick={Backlogin}>
                    <RiLogoutBoxRLine size="28px" color="white"/>
                    <span>Logout</span>
                </div>
            </nav>
        </div>
    );
}
 
export default Topbar;