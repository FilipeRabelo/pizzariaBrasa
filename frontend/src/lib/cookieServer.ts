
import { cookies } from 'next/headers'

export function getCookieServer(){
  const token = cookies().get("session")?.value; 
  return token || null;
}

// console.log('Token - getCookieServer():  ', token); // Verifica o valor do cookie