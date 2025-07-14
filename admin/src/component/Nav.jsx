import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

function Nav() {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin } = useContext(adminDataContext)

  const logOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      console.log(result.data)
      toast.success("Logged out successfully")
      getAdmin()
      navigate("/login")
    } catch (error) {
      console.error(error)
      toast.error("Logout failed")
    }
  }

  return (
    <div className='w-full h-[70px] fixed top-0 left-0 z-10 bg-[#ffffff0a] backdrop-blur-lg border-b border-[#89daea45] shadow-md shadow-black flex items-center justify-between px-6'>

      {/* Logo + Title */}
      <div
        className='flex items-center gap-2 cursor-pointer'
        onClick={() => navigate("/")}
      >
        {/* <img src={logo} alt="logo" className='w-[32px] h-[32px]' /> */}
        <h1 className='text-[24px] text-[#c3f6fa] font-semibold'>SayNShop</h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={logOut}
        className='bg-[#101919] text-[#f3f9fc] px-5 py-2 rounded-2xl text-sm border border-[#89daea48] hover:bg-[#1a2e31] transition-all'
      >
        Logout
      </button>
    </div>
  )
}

export default Nav
