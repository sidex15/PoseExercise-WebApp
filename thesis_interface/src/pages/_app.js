import '@/styles/globals.css'
import Cookies from 'js-cookie';
import { useRouter,usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const token = Cookies.get('token');
  const pathname = usePathname();
  useEffect(() => {
    const verifyToken = async () => {
      if (pathname === '/signup') {
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
          if (pathname === '/personal_details' 
          || pathname === '/biometrics' 
          || pathname === '/invite-code' 
          || pathname === '/reg-success') {
            router.push('/signup');
          }
            router.push('/login');
        }
    }
    verifyToken();
    if (pathname === '/personal_details' 
      || pathname === '/biometrics' 
      || pathname === '/invite-code' 
      || pathname === '/reg-success') {
        router.push('/signup');
      }
  }, []);
  return <Component {...pageProps} />
}
