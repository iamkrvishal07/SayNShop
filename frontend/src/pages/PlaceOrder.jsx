import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function PlaceOrder() {
  const navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let orderItems = []

      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          if (cartItem[productId][size] > 0) {
            const product = products.find(p => p._id === productId)
            if (product) {
              const item = { ...product, size, quantity: cartItem[productId][size] }
              orderItems.push(item)
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      const res = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
      if (res.data) {
        setCartItem({})
        
        navigate("/order")
      } else {
        console.log()
      }

    } catch (error) {
      console.error("Order submit error:", error)
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative'>

      {/* Form Section */}
      <div className='lg:w-[50%] w-[100%] flex items-center justify-center lg:mt-0 mt-[90px]'>
        <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%]'>
          <div className='py-[10px]'><Title text1={'DELIVERY'} text2={'INFORMATION'} /></div>

          <div className='w-full flex gap-4 px-2 mb-2'>
            <input type="text" name="firstName" value={formData.firstName} onChange={onChangeHandler} required placeholder='First name' className='w-1/2 h-[50px] rounded-md bg-slate-700 px-4 text-white placeholder:text-white shadow-sm shadow-[#343434]' />
            <input type="text" name="lastName" value={formData.lastName} onChange={onChangeHandler} required placeholder='Last name' className='w-1/2 h-[50px] rounded-md bg-slate-700 px-4 text-white placeholder:text-white shadow-sm shadow-[#343434]' />
          </div>

          <div className='w-full px-2 mb-2'>
            <input type="email" name="email" value={formData.email} onChange={onChangeHandler} required placeholder='Email address' className='w-full h-[50px] rounded-md bg-slate-700 px-4 text-white placeholder:text-white shadow-sm shadow-[#343434]' />
          </div>

          <div className='w-full px-2 mb-2'>
            <input type="text" name="street" value={formData.street} onChange={onChangeHandler} required placeholder='Street' className='w-full h-[50px] rounded-md bg-slate-700 px-4 text-white placeholder:text-white shadow-sm shadow-[#343434]' />
          </div>

          <div className='w-full flex gap-4 px-2 mb-2'>
            <input type="text" name="city" value={formData.city} onChange={onChangeHandler} required placeholder='City' className='w-1/2 h-[50px] rounded-md bg-slate-700 px-4 text-white placeholder:text-white shadow-sm shadow-[#343434]' />
            <input type="text" name="state" value={formData.state} onChange={onChangeHandler} required placeholder='State' className='w-1/2 h-[50px] rounded-md bg-slate-700 px-4 text-white placeholder:text-white shadow-sm shadow-[#343434]' />
          </div>

          <div className='w-full flex gap-4 px-2 mb-2'>
            <input type="text" name="pinCode" value={formData.pinCode} onChange={onChangeHandler} required placeholder='Pincode' className='w-1/2 h-[50px] rounded-md bg-slate-700 px-4 text-white placeholder:text-white shadow-sm shadow-[#343434]' />
            <input type="text" name="country" value={formData.country} onChange={onChangeHandler} required placeholder='Country' className='w-1/2 h-[50px] rounded-md bg-slate-700 px-4 text-white placeholder:text-white shadow-sm shadow-[#343434]' />
          </div>

          <div className='w-full px-2 mb-2'>
            <input type="text" name="phone" value={formData.phone} onChange={onChangeHandler} required placeholder='Phone' className='w-full h-[50px] rounded-md bg-slate-700 px-4 text-white placeholder:text-white shadow-sm shadow-[#343434]' />
          </div>

          <div className='absolute lg:right-[17%] lg:bottom-[5%] right-[8%] bottom-[9%] '>
            <button type="submit" disabled={loading} className={`text-[18px] bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white border border-[#80808049] ml-[30px] mt-[20px] ${loading ? 'opacity-60' : ''}`}>
              {loading ? <Loading /> : "PLACE ORDER"}
            </button>
          </div>
        </form>
      </div>

      {/* Cart Summary */}
      <div className='lg:w-[50%] w-full flex items-center justify-center'>
        <div className='lg:w-[70%] w-[90%] flex flex-col gap-4'>
          <CartTotal />
          <Title text1={'PAYMENT'} text2={'METHOD'} />
<div className='flex items-center justify-center h-[50px] mt-4 border border-[#80808049] rounded-md bg-[#1f1f1f] text-white font-bold text-[16px] tracking-wide shadow-sm shadow-[#343434]'>
  CASH ON DELIVERY
</div>
        </div>
      </div>

    </div>
  )
}

export default PlaceOrder
