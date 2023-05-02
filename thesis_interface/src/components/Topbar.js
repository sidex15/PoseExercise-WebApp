import { useRouter } from "next/router";
import { useState } from 'react';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi2";
import Cookies from 'js-cookie';
const Topbar = () => {
    const router = useRouter();

    const Backlogin = (e) => {
        Cookies.remove('token');
        e.preventDefault();
        router.push('/login');
    }

    const [isLogin , setIsLogin] = useState(true)


    // if condition {
    //     setIsLogin(false)
    // }

    const SignUp = (e) => {
        e.preventDefault();
        router.push('/signup');
    }


    return ( 
        <div className='w-full'>
            <nav className="flex items-center justify-end flex-wrap bg-cyan-blue h-14">
                <div className={`${ isLogin ? 'flex' : 'hidden' } text-white text-sm items-center gap-x-2 cursor-pointer p-3 hover:bg-light-white rounded-md mr-4`} onClick={Backlogin}>
                    <RiLogoutBoxRLine size="28px" color="white"/>
                    <span>Logout</span>
                </div>
                <div className={`${ isLogin ? 'hidden' : 'flex' } text-white text-sm items-center gap-x-2 cursor-pointer p-3 hover:bg-light-white rounded-md mr-4`} onClick={SignUp}>
                    <HiOutlineUserCircle size="28px" color="white"/>
                    <span>Sign Up</span>
                </div>
            </nav>
        </div>
    );
}
 
export default Topbar;