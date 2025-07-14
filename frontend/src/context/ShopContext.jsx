import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { userDataContext } from './UserContext'
import { toast } from 'react-toastify'

export const shopDataContext = createContext()

function ShopContext({ children }) {
  let [products, setProducts] = useState([])
  let [search, setSearch] = useState('')
  let { userData } = useContext(userDataContext)
  let [showSearch, setShowSearch] = useState(false)
  let { serverUrl } = useContext(authDataContext)
  let [cartItem, setCartItem] = useState({})
  let [loading, setLoading] = useState(false)
  let currency = '₹'
  let delivery_fee = 50

  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setProducts(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product Size")
      return
    }

    let cartData = structuredClone(cartItem)

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      } else {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    setCartItem(cartData)

    if (userData) {
      setLoading(true)
      try {
        await axios.post(serverUrl + "/api/cart/add", { itemId, size }, { withCredentials: true })
        toast.success("Product Added")
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error("Add Cart Error")
      }
    }
  }

  const getUserCart = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true })
      setCartItem(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem)
    cartData[itemId][size] = quantity
    setCartItem(cartData)

    if (userData) {
      try {
        await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalCount += cartItem[items][item]
        }
      }
    }
    return totalCount
  }

  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items)
      if (!itemInfo) continue //  Prevents crash
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalAmount += itemInfo.price * cartItem[items][item]
        }
      }
    }
    return totalAmount
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    getUserCart()
  }, [])

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount,
    loading,
  }

  return (
    <div>
      <shopDataContext.Provider value={value}>
        {children}
      </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext
