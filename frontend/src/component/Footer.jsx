import React from 'react'
import logo from "../assets/logo.png"

function Footer() {
  return (
    <div className='w-full bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] text-white'>
      
      {/* Main Grid Section */}
      <div className='w-full max-w-7xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-8'>

        {/* Column 1: Logo + Description */}
        <div className='flex flex-col items-center text-center gap-4'>
          <div className='flex items-center justify-center gap-3'>
            <img src={logo} alt="Logo" className='w-10 h-10' />
            <p className='text-2xl font-bold'>SayNShop</p>
          </div>
          <p className='text-sm text-gray-300 leading-6 max-w-[280px]'>
            From daily essentials to trending must-haves — SayNShop brings it all to your door with speed, savings, and support.
          </p>
        </div>

        {/* Column 2: Company */}
        <div className='flex flex-col items-center text-center gap-3'>
          <p className='text-lg font-semibold'>Company</p>
          <ul className='text-gray-300 space-y-2 text-sm'>
            <li className='hover:text-white cursor-pointer'>Home</li>
            <li className='hover:text-white cursor-pointer'>Delivery</li>
            <li className='hover:text-white cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className='flex flex-col items-center text-center gap-3'>
          <p className='text-lg font-semibold'>Get in Touch</p>
          <ul className='text-gray-300 space-y-2 text-sm'>
            <li>contact@saynshop.info</li>
            <li>+91-987-654-3210</li>
            <li>admin@saynshop.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-white/10'></div>

      {/* Bottom */}
      <div className='text-center py-4 text-xs text-gray-400'>
        © 2025 SayNShop — All Rights Reserved
      </div>
    </div>
  )
}

export default Footer
