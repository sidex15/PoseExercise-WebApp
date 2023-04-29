import { useRouter } from 'next/router';
import Image from 'next/image';
import regsuccess from "@/img/regsuccess.jpg"
const RegSuccess = () => {
    const router = useRouter()
    const Content = (e) => {
        e.preventDefault()
        router.push('/login')
      } 
    return ( 
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="absolute flex flex-col sm:gap-36 gap-16">
                <h1 className='font-mono font-bold xl:text-9xl sm:text-6xl text-4xl text-white'>Congratulations, <br /> You are all set!</h1>
                <div className="flex justify-center">
                    <button type="submit" onClick={Content} className="bg-cyan-blue font-bold xl:text-4xl sm:text-2xl text-xl rounded-3xl text-white p-5">Back To Login</button>
                </div>
            </div>
            <Image src={regsuccess} alt="regsuccess" className="h-full w-full object-cover" />
        </div>
     );
}
 
export default RegSuccess;