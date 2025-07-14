import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa"
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'

function Collections() {
  const [showFilter, setShowFilter] = useState(false)
  const { products, search, showSearch } = useContext(shopDataContext)
  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCaterory] = useState([])
  const [subCategory, setSubCaterory] = useState([])
  const [sortType, SetSortType] = useState("relavent")

  const toggleCategory = (e) => {
    const value = e.target.value
    setCaterory((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCaterory((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const applyFilter = () => {
    let filtered = [...products]

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (category.length) {
      filtered = filtered.filter((item) => category.includes(item.category))
    }
    if (subCategory.length) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory))
    }

    setFilterProduct(filtered)
  }

  const sortProducts = () => {
    const sorted = [...filterProduct]
    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price)
        break
      default:
        applyFilter()
        return
    }
    setFilterProduct(sorted)
  }

  useEffect(() => { sortProducts() }, [sortType])
  useEffect(() => { setFilterProduct(products) }, [products])
  useEffect(() => { applyFilter() }, [category, subCategory, search, showSearch])

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[80px] pb-[120px] flex flex-col md:flex-row overflow-x-hidden'>

      {/* Filter Section */}
      <div className={`md:w-[18vw] w-full px-5 py-6 text-[#aaf5fa] md:fixed`}>
        <div className="mb-4">
          <p
            className='text-[22px] font-semibold flex items-center justify-between border-b-[2.5px] border-[#8ee3f8] pb-2 cursor-pointer'
            onClick={() => setShowFilter(!showFilter)}
          >
            FILTERS
            {showFilter}
          </p>
        </div>

        {/* Filter Content */}
        <div className={`${showFilter ? '' : 'hidden'} md:block bg-[#1f2b3a] border border-[#45d5ff57] rounded-xl p-4 shadow-lg`}>
          <p className='text-lg font-semibold mb-3 text-[#f2faff]'>Categories</p>
          <div className='space-y-2 text-sm'>
            <label className="flex items-center gap-2"><input type="checkbox" value="Men" onChange={toggleCategory} />Men</label>
            <label className="flex items-center gap-2"><input type="checkbox" value="Women" onChange={toggleCategory} />Women</label>
            <label className="flex items-center gap-2"><input type="checkbox" value="Kids" onChange={toggleCategory} />Kids</label>
          </div>

          <p className='text-lg font-semibold mt-6 mb-3 text-[#f2faff]'>Sub-Categories</p>
          <div className='space-y-2 text-sm'>
            <label className="flex items-center gap-2"><input type="checkbox" value="TopWear" onChange={toggleSubCategory} />TopWear</label>
            <label className="flex items-center gap-2"><input type="checkbox" value="BottomWear" onChange={toggleSubCategory} />BottomWear</label>
            <label className="flex items-center gap-2"><input type="checkbox" value="WinterWear" onChange={toggleSubCategory} />WinterWear</label>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className='md:ml-[18vw] w-full px-5 md:px-[60px]'>
        {/* Top Bar */}
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4'>
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className='bg-[#2a3b45] text-white border border-[#61d4f6] rounded-lg px-4 py-2 focus:outline-none'
            onChange={(e) => SetSortType(e.target.value)}
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className='w-full mt-10 flex flex-wrap justify-center gap-6'>
          {filterProduct.map((item, index) => (
            <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collections
