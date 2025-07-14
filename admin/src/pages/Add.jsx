import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload image.jpg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Add() {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!image1 || !image2 || !image3 || !image4) {
      toast.error("Please upload all 4 images")
      setLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)

      const result = await axios.post(serverUrl + "/api/product/addproduct", formData, {
        withCredentials: true,
      })

      toast.success("Product added successfully")
      setLoading(false)

      if (result.data) {
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
        setBestSeller(false)
        setCategory("Men")
        setSubCategory("TopWear")
        setSizes([])
      }
    } catch (error) {
      console.error("Add Product Error:", error)
      toast.error("Add Product Failed")
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden">
      <Nav />
      <Sidebar />

      <div className="ml-[70px] md:ml-[260px] mt-[70px] px-4 py-10 flex justify-center">
        <form
          onSubmit={handleAddProduct}
          className="w-full max-w-4xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-6"
        >
          <h2 className="text-3xl font-bold">Add Product</h2>

          {/* Image Upload */}
          <div>
            <p className="text-lg font-semibold mb-2">Upload Images</p>
            <div className="flex gap-4 flex-wrap">
              {[image1, image2, image3, image4].map((img, i) => (
                <label key={i} htmlFor={`image${i + 1}`} className="cursor-pointer w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                  <img
                    src={!img ? upload : URL.createObjectURL(img)}
                    alt=""
                    className="w-full h-full object-cover rounded-lg border border-white/20 shadow"
                  />
                  <input
                    type="file"
                    id={`image${i + 1}`}
                    name={`image${i + 1}`}
                    hidden
                    required
                    onChange={(e) => {
                      const setter = [setImage1, setImage2, setImage3, setImage4][i]
                      setter(e.target.files[0])
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              required
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-gray-300 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              placeholder="Enter product description"
              required
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-gray-300 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 text-sm font-medium">Price (₹)</label>
            <input
              type="number"
              placeholder="₹2000"
              required
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-gray-300 focus:outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Category & Subcategory */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#424040] border border-gray-500 text-white focus:outline-none"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">Sub Category</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#424040] border border-gray-500 text-white focus:outline-none"
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block mb-1 text-sm font-medium">Available Sizes</label>
            <div className="flex gap-3 flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <span
                  key={size}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                    )
                  }
                  className={`px-4 py-2 rounded-full cursor-pointer border transition ${
                    sizes.includes(size)
                      ? "bg-green-400 text-black border-green-300"
                      : "bg-white/10 text-white border-gray-500"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="bestseller"
              checked={bestseller}
              onChange={() => setBestSeller(!bestseller)}
              className="w-5 h-5 cursor-pointer"
            />
            <label htmlFor="bestseller" className="text-sm font-medium">
              Mark as BestSeller
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add
