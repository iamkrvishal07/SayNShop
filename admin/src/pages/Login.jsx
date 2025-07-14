import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoEyeOutline, IoEye } from "react-icons/io5"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '../component/Loading'

function AdminLogin() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin } = useContext(adminDataContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + '/api/auth/adminlogin', { email, password }, { withCredentials: true })
      toast.success("Admin Login Successful")
      getAdmin()
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error("Admin Login Failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="absolute top-4 left-4 flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="w-10" />
        <h1 className="text-xl font-bold">OneCart</h1>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-white/20">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-wide">Admin Login</h2>
          <p className="text-sm text-gray-300 mt-1">Only authorized admins can access this panel</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Admin Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white text-lg" onClick={() => setShow(!show)}>
              {show ? <IoEye /> : <IoEyeOutline />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition shadow-md"
          >
            {loading ? <Loading /> : "Login as Admin"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </div>
  )
}

export default AdminLogin
