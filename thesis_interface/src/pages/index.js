import Login from "./login";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Routes() {
  const router = useRouter();
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
          router.push('/dashboard');
        } catch (error) {
          return (<Login />);
        }
    }
    verifyToken();
  }, []);
  
}

export default Routes;
