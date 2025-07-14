import React, { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io"
import { FaRegListAlt } from "react-icons/fa"
import { SiTicktick } from "react-icons/si"
import { GiHamburgerMenu } from "react-icons/gi"
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: <IoIosAddCircleOutline className="w-5 h-5" />, label: 'Add Items', path: '/add' },
    { icon: <FaRegListAlt className="w-5 h-5" />, label: 'List Items', path: '/lists' },
    { icon: <SiTicktick className="w-5 h-5" />, label: 'View Orders', path: '/orders' },
  ]

  const handleNavigate = (path) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-[70px] left-4 z-40">
        <button
          className="text-white bg-white/10 border border-white/20 rounded p-2 mt-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <GiHamburgerMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden fixed top-[115px] mt-4 left-4 right-4 z-30 bg-[#1c2b2e] border border-white/20 rounded-xl shadow-lg p-4 flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(item.path)}
              className="flex items-center gap-3 text-white px-4 py-2 hover:bg-[#2c7b89] rounded-lg transition cursor-pointer"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-[260px] h-[calc(100vh-70px)] fixed left-0 top-[70px] 
                      border-r border-white/20 bg-white/5 backdrop-blur-md 
                      shadow-lg z-20 flex-col pt-10 pl-6 text-[15px] gap-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigate(item.path)}
            className='flex items-center gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer 
                       hover:bg-[#2c7b89] rounded-r-lg transition w-full'
          >
            {item.icon}
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Sidebar
