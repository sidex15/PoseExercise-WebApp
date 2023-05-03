import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi2";
import Cookies from 'js-cookie';
const Topbar = () => {
    const router = useRouter();

    const Backlogin = (e) => {
        Cookies.remove('token');
        Cookies.remove('userinfoid');
        e.preventDefault();
        router.push('/');
    }
    const gotologin = (e) => {
        Cookies.remove('token');
        Cookies.remove('userinfoid');
        e.preventDefault();
        router.push('/login');
    }

    const [isLogin , setIsLogin] = useState()
    const token = Cookies.get('token');

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await fetch('/api/verify-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
        
                if (!res.ok) {
                    const { message } = await res.json();
                    throw new Error(message);
                }
                setIsLogin(true);
            } catch (error) {
                setIsLogin(false);
            }
        }
        verifyToken();
        
    }, []);

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
                <div className={`${ isLogin ? 'hidden' : 'flex' } text-white text-sm items-center gap-x-2 cursor-pointer p-3 hover:bg-light-white rounded-md mr-4`} onClick={gotologin}>
                    <HiOutlineUserCircle size="28px" color="white"/>
                    <span>Login</span>
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