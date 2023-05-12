import { useRouter } from 'next/router';
import Image from 'next/image';
import regsuccess from "@/img/regsuccess.jpg"
import Head from 'next/head';
import RegLayout from '@/components/registerlayout';
const RegSuccess = () => {
    const router = useRouter()
    const Content = (e) => {
        e.preventDefault()
        router.push('/login')
      } 
    return (
    <RegLayout> 
        <Head><title>Success</title></Head>  
        <div className="h-5/6 w-9/12 flex items-center justify-center rounded-xl shadow-2xl shadow-rgba(3,4,94,0.3) relative">
            <Image src={regsuccess} alt="regsuccess" className="h-full w-full object-cover absolute rounded-xl" />
            <div className="absolute flex flex-col sm:gap-36 gap-16">
                <h1 className='font-mono font-bold xl:text-8xl sm:text-6xl text-4xl text-white'>Congratulations, <br /> You are all set!</h1>
                <div className="flex justify-center">
                    <button type="submit" onClick={Content} className="bg-cyan-blue font-bold xl:text-3xl sm:text-2xl text-xl rounded-3xl text-white p-5">Back To Login</button>
                </div>
            </div>
        </div>
    </RegLayout> 
     );
}
 
export default RegSuccess;