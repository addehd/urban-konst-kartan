import React from 'react';
import Image from 'next/image';

export default function Navbar(){
 return (
  <div className="heading">
    <a href='https://wordpress-863910-2986415.cloudwaysapps.com/'>
      <Image src="/hangaren-solo.svg" alt="hangaren-solo" width={100} height={100} />
    </a>
    {/* <h1>Hangaren</h1> */}
  </div>
 );
}