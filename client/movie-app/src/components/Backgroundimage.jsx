import React from 'react'
import background from "../assets/background.jpg"

export default function Backgroundimage() {
  return (
    <div>
      <img src={background} alt="background" className='h-screen w-screen' />
    </div>
  )
}
