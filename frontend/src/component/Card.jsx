import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext)
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/productdetail/${id}`)}
      className="w-[240px] h-[340px] bg-[#ffffff0a] rounded-xl overflow-hidden border border-[#5f5f5f46] shadow hover:shadow-lg transition-all duration-300 cursor-pointer backdrop-blur-[3px] hover:scale-[1.03] flex flex-col"
    >
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-[68%] object-cover rounded-t-xl"
      />

      {/* Content */}
      <div className="flex flex-col justify-between h-[32%] p-3">
        <p className="text-[#c3f6fa] text-[15px] font-medium truncate">
          {name}
        </p>
        <p className="text-[#f3fafa] text-[14px] mt-1">{currency} {price}</p>
      </div>
    </div>
  )
}

export default Card
