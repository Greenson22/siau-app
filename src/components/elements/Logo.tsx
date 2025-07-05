import React from 'react';
import Image from 'next/image';
 
 const Logo = () => {
   return (
     <div className="flex items-center gap-3">
       <div className="bg-gray-100 p-1 rounded-md shadow">
         <Image src="/images/logo.png" 
         alt="Logo STTIS Siau" 
         width={160} 
         height={40} 
         className='h-10 w-auto rounded-full object-cover'
         priority/>
       </div>
       <span className="text-2xl font-bold text-gray-800">STTIS Siau</span>
     </div>
   );
 };
 
 export default Logo;