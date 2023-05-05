import { RiHomeLine } from "react-icons/ri";
import { GiBiceps } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { RiFileUserLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useState } from 'react';

const Sidebar = ({open}) => {

    const router = useRouter();

    const [isCoach, setIsCoach] = useState(false);
 
    // this condition set the student record button visible or not
    // if anyone enter the user coaching code {
    //     setIsCoach(true);
    // }


    const Menus = [
        { title: "Dashboard", icon: <RiHomeLine size='30px' color='white' />, path: "/dashboard", display: true},
        { title: "Workout Session", icon: <GiBiceps size='30px' color='white' />, path: "/session", display: true},
        { title: "Exercise Records", icon: <TbReportSearch size='30px' color='white' />, path: "/exer_records", display: true},
        { title: "Student Records", icon: <RiFileUserLine size='30px' color='white' />, path: "/stud_records", display: isCoach},
        { title: "Profile", icon: <IoSettingsOutline size='30px' color='white'/>, path: "/profile", gap: true, display: true},
    ]
    

    return ( <>
        <div className={`${open ? 'lg:w-56 pr-2 w-full' : 'lg:w-14 lg:block hidden'} lg:h-full h-80 lg:static fixed lg:z-0 z-1 duration-300 bg-cyan-blue`}>
            <ul className='lg:pt-3 pt-0 lg:block h-full flex flex-col justify-center items-center'>
                <div>
                    {Menus.map((menu, index) => (
                    <li key={index} className={`${router.pathname === menu.path ? 'bg-#00B4D8 hover:bg-#00B4D8' : ''} ${menu.display ? 'flex' : 'hidden'} text-white text-sm items-center gap-x-4 cursor-pointer p-3 hover:bg-light-white rounded-md ${menu.gap ? "lg:absolute static inset-x-0 bottom-0" : "mt-2"} `} onClick={() => {router.push(menu.path)}}>
                        {menu.icon}
                        <span className={`${!open && 'hidden'} origin-left duration-300`}>{menu.title}</span>
                    </li>
                ))}
                </div>
            </ul>
        </div>
    </> 
    );
}
 
export default Sidebar;