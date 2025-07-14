import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from "react-icons/si"

function Orders() {
  const [orders, setOrders] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) await fetchAllOrders()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      <Nav />
      <div className='flex flex-col lg:flex-row w-full pt-[70px]'>
        <Sidebar />

        <div className='flex-1 p-6 md:ml-[260px] lg:ml-[310px] mt-[30px]'>
          <h1 className='text-[30px] md:text-[40px] mb-6 text-[#afe2f2] font-semibold'>All Orders List</h1>

          <div className='space-y-6'>
            {orders.map((order, index) => (
              <div
                key={index}
                className='w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6'
              >
                {/* Icon */}
                {/* <SiEbox className='w-[50px] h-[50px] text-black p-[8px] rounded-lg bg-white shadow-md' /> */}

                {/* Product Details */}
                <div className='text-[#8fe0ff] text-[15px] leading-6'>
                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name.toUpperCase()} × {item.quantity}
                      <span className='ml-1'>({item.size})</span>
                      {i < order.items.length - 1 ? ',' : ''}
                    </p>
                  ))}
                </div>

                {/* Address Info */}
                <div className='text-green-100 text-[14px] space-y-1'>
                  <p>{order.address.firstName} {order.address.lastName}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.pinCode}</p>
                  <p>{order.address.phone}</p>
                </div>

                {/* Summary */}
                <div className='text-green-100 text-[14px] space-y-1'>
                  <p>Items: {order.items.length}</p>
                  <p>Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p className='text-white text-[17px] font-semibold'>₹ {order.amount}</p>
                </div>

                {/* Status Dropdown */}
                <select
                  value={order.status}
                  onChange={(e) => statusHandler(e, order._id)}
                  className='px-4 py-2 bg-[#182c33] text-white border border-[#96eef3] rounded-lg focus:outline-none shadow-md'
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
