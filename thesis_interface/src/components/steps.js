import add from '@/svg/Vectoradd.svg'
import info from '@/svg/Vectorinfo.svg'
import done from '@/svg/Vectordone.svg'
import Image from 'next/image';
import { useState } from 'react';

const Steps = ({step1, step2, step3}) => {
    const addpage = step1
    const infopage = step2
    const donepage = step3

    return ( 
    <div className="h-full flex items-center">
        <ol className="flex flex-col items-center h-3/4 ">
            <li className="flex flex-col w-full h-full justify-center items-center text-blue-600 dark:text-blue-500 relative">
                <span class={`flex items-center justify-center ${addpage ? 'bg-#48CAE4' : 'bg-#B6B6B6' } rounded-full h-20 w-20 shrink-0`}>
                    <Image src={add} class="w-11 h-8" />
                </span>
                <span className={`left-5 w-1 h-full ${addpage ? infopage ? 'bg-#48CAE4' : 'bg-gradient-to-b from-#48CAE4 to-white' : 'bg-white'}`}></span>
            </li>
            <li className="flex flex-col w-full h-full justify-center items-center text-blue-600 dark:text-blue-500 relative">
                <span class={`flex items-center justify-center ${infopage ? 'bg-#48CAE4' : 'bg-#B6B6B6' } rounded-full h-20 w-20 shrink-0`}>
                    <Image src={info} class="w-11 h-8" />
                </span>
                <span className={`left-5 w-1 h-full ${infopage ? donepage ? 'bg-#48CAE4' : 'bg-gradient-to-b from-#48CAE4 to-white' : 'bg-white'}`}></span>
            </li>
            <li className="flex flex-col w-full justify-center items-center text-blue-600 dark:text-blue-500 relative">
                <span class={`flex items-center justify-center ${donepage ? 'bg-#48CAE4' : 'bg-#B6B6B6' } rounded-full h-20 w-20 shrink-0`}>
                    <Image src={done} class="w-11 h-8" />
                </span>
            </li>
        </ol>
    </div>
     );
}
 
export default Steps;