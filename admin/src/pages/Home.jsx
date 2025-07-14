import React, { useState, useEffect, useContext } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const { serverUrl } = useContext(authDataContext)

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true })
      setTotalProducts(products.data.length)

      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
      setTotalOrders(orders.data.length)
    } catch (err) {
      console.error("Failed to fetch counts", err)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative'>
      <Nav />
      <Sidebar />

      <div className='w-[70vw] h-full absolute left-[25%] py-[100px] px-[20px] flex flex-col gap-[40px]'>
        <h1 className='text-[32px] md:text-[36px] text-[#afe2f2] font-semibold'>
          OneCart Admin Panel
        </h1>

        <div className='flex flex-col md:flex-row gap-[30px]'>
          <div className='w-full md:w-[300px] h-[160px] bg-[#ffffff0d] border border-[#888] rounded-xl shadow backdrop-blur-lg flex flex-col items-center justify-center gap-3 p-4'>
            <p className='text-[18px] md:text-[20px] text-[#dcfafd] font-medium'>Total Products</p>
            <span className='text-[24px] bg-[#030e11] px-6 py-2 rounded-lg border border-[#888]'>
              {totalProducts}
            </span>
          </div>

          <div className='w-full md:w-[300px] h-[160px] bg-[#ffffff0d] border border-[#888] rounded-xl shadow backdrop-blur-lg flex flex-col items-center justify-center gap-3 p-4'>
            <p className='text-[18px] md:text-[20px] text-[#dcfafd] font-medium'>Total Orders</p>
            <span className='text-[24px] bg-[#030e11] px-6 py-2 rounded-lg border border-[#888]'>
              {totalOrders}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
