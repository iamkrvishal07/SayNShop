import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  const { products } = useContext(shopDataContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 8))
  }, [products])

  return (
    <div className="w-full min-h-screen px-4 py-10 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center">
      {/* Title and Subtitle */}
      <div className="text-center mb-8">
        <Title text1="LATEST" text2="COLLECTIONS" />

      </div>

      {/* Collection Cards */}
      <div className="w-full max-w-[1300px] flex flex-wrap gap-8 justify-center items-center">
        {latestProducts.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl transition hover:scale-[1.02] hover:shadow-blue-500/10"
          >
            <Card
              name={item.name}
              image={item.image1}
              id={item._id}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
