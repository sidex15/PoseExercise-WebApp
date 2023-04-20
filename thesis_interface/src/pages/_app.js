import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/router';
import { useState } from 'react';
import Dashboard from "./Dashboard";
import ExerRecords from "./Exer_records";
import StudentRecord from "./Stud_records";
import Session from "./Session";
import Content from "./Content";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [open, setOpen] = useState(0);

  const SidebarSize = (value) => {
      setOpen(value)
  }
  return (
    <div className="App h-screen">
      {router.pathname === '/Dashboard' && <div className='h-screen'>
            <div className="absolute">
                <Navbar callback={SidebarSize}/>
            </div>
            <div className={`${open ? 'ml-52' : 'ml-14'} duration-300 pt-12 h-full`}>
              <Dashboard/>
            </div>
        </div>}
      
      {router.pathname === '/Exer_records' && <div className='h-screen'>
            <div className="absolute">
                <Navbar callback={SidebarSize}/>
            </div>
            <div className={`${open ? 'ml-52' : 'ml-14'} duration-300 pt-12 h-full`}>
              <ExerRecords/>
            </div>
        </div>}

      {router.pathname === '/Stud_records' && <div className='h-screen'>
            <div className="absolute">
                <Navbar callback={SidebarSize}/>
            </div>
            <div className={`${open ? 'ml-52' : 'ml-14'} duration-300 pt-12 h-full`}>
              <StudentRecord/>
            </div>
        </div>}
        
      {router.pathname === '/Session' && <div className='h-screen'>
            <div className="absolute">
                <Navbar callback={SidebarSize}/>
            </div>
            <div className={`${open ? 'ml-52' : 'ml-14'} duration-300 pt-12 h-full`}>
              <Session/>
            </div>
        </div>}
      
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;