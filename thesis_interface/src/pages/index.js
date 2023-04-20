import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


function App() {
  const router = useRouter()
  const back = (e) => {
    e.preventDefault()
  }
  useEffect(() => {
    router.push('/Login')
  });
}
 
export default App;