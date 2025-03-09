import React from 'react';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className="heading">
      <a href='https://wordpress-863910-2986415.cloudwaysapps.com/'>
        <Image src="/hangaren-solo.svg" alt="hangaren-solo" width={100} height={100} />
      </a>
{/* 
      <div style={{ position: 'absolute', top: '0', left: '0', zIndex: '100000' }}>
        <iframe 
          src="http://localhost:3000/test" 
          style={{ 
            width: '10rem', 
            height: '14rem', 
            marginTop: '0rem',
            border: 'none',
            background: 'none',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '100000'
          }} 
          frameBorder="0"
          width="20rem" 
          height="10rem"
        />
      </div> */}
      {/* <h1>Hangaren</h1> */}
    </div>
  );
}