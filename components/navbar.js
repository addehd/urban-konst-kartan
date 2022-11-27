import React from 'react';
import Image from 'next/image';

export default function Navbar(){
 return (
  <div className="heading">
    <Image src="/hangaren-solo.svg" alt="hangaren-solo" width={100} height={100} />
    {/* <h1>Hangaren</h1> */}
  </div>
 );
}