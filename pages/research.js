import React from 'react'
import Broder from '../components/broder'
import Sister from '../components/sister'
import { useState } from 'react';

function research() {
  const [broder, setBroder] = useState([
    {name: 'broder1', id: 1, active: false},
    {name: 'broder2', id: 2, active: false},
    {name: 'broder3', id: 3, active: false}
  ]);

  return (
    <>
      <section>
        {broder.map((bro) => (
          <Broder setBroder={setBroder} key={bro.id} id={bro.id} name={bro.name} active={bro.active} broder={broder}/>
        ))} 
      </section>
      <section>
        <Sister broder={broder}/>
      </section>
    </>
  )
}

export default research