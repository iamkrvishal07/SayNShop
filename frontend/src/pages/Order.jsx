import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
  const [orderData, setOrderData] = useState([])
  const { currency } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (result.data) {
        let allOrdersItem = []
        result.data.forEach(order => {
          order.items.forEach(item => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            })
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [])

  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] pb-[150px] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <div className='text-center mt-[80px]'>
        <Title text1={'MY'} text2={'ORDER'} />
      </div>

      <div className='flex flex-col gap-5 mt-10'>
        {orderData.map((item, index) => (
          <div key={index} className='w-full bg-[#51808048] border border-gray-600 rounded-xl shadow-md hover:shadow-xl transition-all p-4 flex flex-col md:flex-row gap-4'>
            {/* Image */}
            <div className='w-full md:w-[150px] h-[150px] flex-shrink-0'>
              <img src={item.image1} alt={item.name} className='w-full h-full object-cover rounded-md' />
            </div>

            {/* Info */}
            <div className='flex flex-col gap-2 text-white w-full md:flex-1'>
              <h2 className='text-[20px] md:text-[24px] font-semibold'>{item.name}</h2>
              <div className='flex flex-wrap gap-4 text-[#aaf4e7] text-sm md:text-[16px]'>
                <p>Price: {currency} {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>
              <p className='text-[#e4fbff] text-sm md:text-[15px]'>Date: {new Date(item.date).toDateString()}</p>
              <p className='text-[#aaf4e7] text-sm md:text-[15px]'>Payment Method: {item.paymentMethod}</p>
            </div>

            {/* Status & Track */}
            <div className='flex flex-col items-end justify-between md:justify-center md:items-center gap-2 w-full md:w-[180px]'>
              <div className='flex items-center gap-2 text-green-400 text-sm md:text-base'>
                <span className='w-3 h-3 bg-green-500 rounded-full'></span>
                <span>{item.status}</span>
              </div>
              <button
                onClick={loadOrderData}
                className='px-4 py-2 bg-[#101919] text-white text-sm md:text-[15px] rounded-md hover:bg-slate-600 transition active:scale-95'
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
