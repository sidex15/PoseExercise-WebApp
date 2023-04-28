import '@/styles/globals.css'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const token = Cookies.get('token');
  useEffect(() => {
    const verifyToken = async () => {
      if (router.pathname === '/signup'
      || router.pathname === '/Personal_details' 
      || router.pathname === '/Biometrics' 
      || router.pathname === '/Invite-code' 
      || router.pathname === '/Reg-success') {
        return <Component {...pageProps} />;
      }
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
        } catch (error) {
            router.push('/Login');
        }
    }
    verifyToken();
  }, []);
  return <Component {...pageProps} />
}
