import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoEye, IoEyeOutline } from "react-icons/io5"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import Loading from '../component/Loading'
import Logo from '../assets/logo.png'
import google from '../assets/google.png'

function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("") // added
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { getCurrentUser } = useContext(userDataContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("") // clear previous error
    try {
      const result = await axios.post(serverUrl + '/api/auth/login', { email, password }, { withCredentials: true })
      console.log(result.data)
      getCurrentUser()
      navigate("/")
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message)
      } else {
        setMessage("Something went wrong")
      }
    } finally {
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const result = await axios.post(serverUrl + "/api/auth/googlelogin", {
        name: user.displayName,
        email: user.email
      }, { withCredentials: true })
      console.log(result.data)
      getCurrentUser()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="absolute top-4 left-4 flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <img src={Logo} alt="Logo" className="w-10" />
        <h1 className="text-xl font-bold">SayNShop</h1>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-white/20">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-wide">Welcome Back</h2>
          <p className="text-sm text-gray-300 mt-1">Login to your SayNShop account</p>
        </div>

        {/* Google Login */}
        <div onClick={googleLogin} className="flex items-center justify-center gap-3 py-2 px-4 bg-white/20 hover:bg-white/30 transition rounded-lg cursor-pointer shadow-md">
          <img src={google} alt="Google" className="w-5" />
          <span className="text-sm font-medium">Continue with Google</span>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex-1 h-px bg-gray-600" />
          <span className="text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
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
            {loading ? <Loading /> : "Login"}
          </button>

          {/* Error message */}
          {message && (
            <p className="text-center text-sm text-red-400 font-medium">
              {message}
            </p>
          )}

          <p className="text-center text-sm text-gray-300">
            Don't have an account?
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-400 ml-1 hover:underline cursor-pointer"
            >
              Create New Account
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
