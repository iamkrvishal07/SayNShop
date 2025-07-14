import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import RelatedProduct from '../component/RelatedProduct'
import Loading from '../component/Loading'

function ProductDetail() {
  const { productId } = useParams()
  const { products, currency, addtoCart, loading } = useContext(shopDataContext)

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    const found = products.find(item => item._id === productId)
    if (found) {
      setProductData(found)
      setImage(found.image1)
    }
  }, [productId, products])

  if (!productData) return <div className='opacity-0'></div>

  return (
    <div className="min-h-screen w-full bg-gradient-to-l from-[#141414] to-[#0c2025] overflow-x-hidden">
      {/* Top Section */}
      <div className='min-h-[100vh] flex flex-col lg:flex-row gap-6 items-center justify-start pt-[70px] pb-[40px] px-[20px]'>

        {/* Image Thumbnails & Main */}
        <div className='flex flex-col lg:flex-row gap-6 lg:w-[50%] w-full items-center'>
          <div className='flex lg:flex-col flex-row gap-3 overflow-auto max-h-[450px] lg:w-[20%]'>
            {[productData.image1, productData.image2, productData.image3, productData.image4].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumb"
                onClick={() => setImage(img)}
                className='w-[60px] h-[60px] md:w-[100px] md:h-[100px] border border-gray-400 rounded-md object-cover cursor-pointer'
              />
            ))}
          </div>
          <div className='lg:w-[70%] w-full rounded-md overflow-hidden border border-gray-500'>
            <img src={image} alt="main" className='w-full h-full object-cover' />
          </div>
        </div>

        {/* Product Info */}
        <div className='lg:w-[50%] w-full px-[10px] flex flex-col gap-4 text-white'>
          <h1 className='text-[30px] font-semibold'>{productData.name.toUpperCase()}</h1>

          <div className='flex items-center gap-1 text-yellow-400'>
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
            <span className='text-white text-[16px] ml-2'>(124)</span>
          </div>

          <p className='text-[24px] text-[#aaf4e7]'>{currency} {productData.price}</p>

          <p className='text-[15px] lg:w-[90%] leading-relaxed'>
            {productData.description}
          </p>

          <div className='mt-4'>
            <p className='text-[20px] mb-2'>Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border px-4 py-2 rounded-md bg-slate-300 text-black hover:bg-black hover:text-white transition-all
                    ${size === item ? 'bg-green text-[#2f97f1] border-2 border-[#0dff00] scale-105' : ''}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            className='mt-4 bg-[#495b61c9] py-3 px-6 rounded-2xl border border-gray-600 text-white shadow-md hover:bg-slate-600 transition'
            onClick={() => addtoCart(productData._id, size)}
          >
            {loading ? <Loading /> : "Add to Cart"}
          </button>

          <div className='mt-6 border-t pt-4 border-gray-600 text-sm space-y-1'>
            <p className='text-[20px]'>✅ 100% Original Product</p>
            <p className='text-[20px]'>✅ Cash on Delivery Available</p>
            <p className='text-[20px]'>✅ Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className='px-[20px] py-[40px]'>
        <div className='flex gap-4 text-white text-sm'>
          <p className='border px-5 py-2'>Description</p>
          <p className='border px-5 py-2'>Reviews (124)</p>
        </div>

        <div className='mt-4 bg-[#3336397c] border border-gray-600 text-white p-4 text-[15px] lg:text-[18px] leading-relaxed'>
         Elevate your wardrobe with this modern slim-fit cotton shirt — now available on SayNShop. Made from breathable, premium fabric, it delivers all-day comfort with a sharp, versatile look. Whether you're dressing up or keeping it casual, this shirt is easy to style, easy to care for, and designed for those who appreciate both fashion and functionality.
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
        currentProductId={productData._id}
      />
    </div>
  )
}

export default ProductDetail
