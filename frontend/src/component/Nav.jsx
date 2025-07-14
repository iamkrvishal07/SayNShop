import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5"
import { FaCircleUser } from "react-icons/fa6"
import { MdOutlineShoppingCart } from "react-icons/md"
import { IoMdHome } from "react-icons/io"
import { HiOutlineCollection } from "react-icons/hi"
import { MdContacts } from "react-icons/md"
import { userDataContext } from '../context/UserContext'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function Nav() {
  const { userData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
  const [showProfile, setShowProfile] = useState(false)
  const { clearUserData } = useContext(userDataContext);
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      console.log(result.data)
      clearUserData();
      toast.success("You have been logged out.");
    } catch (error) {
      console.log(error)
      toast.error("Logout failed. Please try again.");
    } finally {
      navigate("/login")
    }
  }

  return (
    <div className="w-full fixed top-0 z-50 bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] shadow-md text-white px-6 h-[72px] flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="w-9" />
        <h1 className="text-2xl font-bold text-gray-100">SayNShop</h1>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-8 text-base font-semibold text-gray-200">
        <li className="hover:bg-white/10 px-4 py-2 rounded-xl cursor-pointer transition" onClick={() => navigate("/")}>Home</li>
        <li className="hover:bg-white/10 px-4 py-2 rounded-xl cursor-pointer transition" onClick={() => navigate("/collection")}>Collections</li>
        <li className="hover:bg-white/10 px-4 py-2 rounded-xl cursor-pointer transition" onClick={() => navigate("/contact")}>Contact</li>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-5 relative">
        {!showSearch ? (
          <IoSearchCircleOutline className="text-4xl text-gray-300 cursor-pointer" onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }} />
        ) : (
          <IoSearchCircleSharp className="text-4xl text-gray-300 cursor-pointer" onClick={() => setShowSearch(prev => !prev)} />
        )}

        {/* Cart comes before profile (Desktop) */}
        <div className="relative hidden md:block">
          <MdOutlineShoppingCart className="text-3xl text-gray-300 cursor-pointer" onClick={() => navigate("/cart")} />
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-[10px] rounded-full flex items-center justify-center font-bold">
            {getCartCount()}
          </span>
        </div>

        {/* Profile */}
        {!userData ? (
          <FaCircleUser className="text-3xl text-gray-300 cursor-pointer" onClick={() => setShowProfile(prev => !prev)} />
        ) : (
          <div
            className="w-9 h-9 bg-white text-black text-lg font-bold rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setShowProfile(prev => !prev)}
          >
            {userData?.name[0]?.toUpperCase()}
          </div>
        )}
      </div>

      {/* Search Input */}
      {showSearch && (
        <div className="absolute w-full h-[68px] bg-[#1a1c20ef] backdrop-blur-sm border-t border-white/10 top-full left-0 flex items-center justify-center z-30">
          <input
            type="text"
            placeholder="Search here..."
            className="w-[80%] lg:w-[50%] bg-[#2a2f3c] border border-gray-600 text-white placeholder-gray-400 rounded-full px-6 py-3 focus:outline-none text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute top-[72px] right-6 w-52 bg-[#1c1c1c] border border-white/10 rounded-xl shadow-md z-50">
          <ul className="text-base font-medium text-gray-200 py-2">
            {!userData && (
              <li className="hover:bg-white/10 px-5 py-2 cursor-pointer" onClick={() => {
                navigate("/login")
                setShowProfile(false)
              }}>Login</li>
            )}
            {userData && (
              <li className="hover:bg-white/10 px-5 py-2 cursor-pointer" onClick={async () => {
                await handleLogout()
                setShowProfile(false)
              }}>Logout</li>
            )}
            <li className="hover:bg-white/10 px-5 py-2 cursor-pointer" onClick={() => {
              navigate("/order")
              setShowProfile(false)
            }}>Orders</li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1f1f1f] border-t border-white/10 flex md:hidden justify-around py-2 z-40 text-white text-sm">
        <button onClick={() => navigate("/")} className="flex flex-col items-center"><IoMdHome className="text-2xl" />Home</button>
        <button onClick={() => navigate("/collection")} className="flex flex-col items-center"><HiOutlineCollection className="text-2xl" />Collections</button>
        <button onClick={() => navigate("/contact")} className="flex flex-col items-center"><MdContacts className="text-2xl" />Contact</button>
        <div className="relative flex flex-col items-center">
          <button onClick={() => navigate("/cart")}><MdOutlineShoppingCart className="text-2xl" />Cart</button>
          <span className="absolute -top-2 -right-3 w-5 h-5 bg-white text-black text-[10px] rounded-full flex items-center justify-center font-bold">{getCartCount()}</span>
        </div>
      </div>
    </div>
  )
}

export default Nav
