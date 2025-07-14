import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Lists() {
  const [list, setList] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) {
        fetchList()
      } else {
        console.log("Failed to remove Product")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <Nav />

      <div className="flex flex-1 w-full min-h-[calc(100vh-70px)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 ml-[70px] md:ml-[260px] px-4 md:px-10 py-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#afe2f2] mt-12 justify-center items-center">All Listed Products</h2>

          {list?.length > 0 ? (
            <div className="flex flex-col gap-6 mt-15">
              {list.map((item, index) => (
                <div
                  key={index}
                  className="w-full bg-white/10 border border-white/20 backdrop-blur-md rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:shadow-lg transition"
                >
                  <img
                    src={item.image1}
                    alt={item.name}
                    className="w-full sm:w-[120px] h-[180px] sm:h-[100px] object-cover rounded-lg"
                  />

                  <div className="flex-1 flex flex-col items-start justify-center gap-[6px] px-2 text-left break-words">
                    <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#bef0f3]">{item.name}</h3>
                    <p className="text-sm sm:text-base text-[#bef3da]">{item.category}</p>
                    <p className="text-sm sm:text-base text-[#bef3da]">₹{item.price}</p>
                  </div>

                  <div className="w-full sm:w-fit px-0 sm:px-3">
                    <button
                      onClick={() => removeList(item._id)}
                      className="w-full sm:w-auto px-3 py-2 rounded-md bg-red-400/80 hover:bg-red-500 text-black font-semibold shadow-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white text-lg mt-4">No products available.</p>
          )}
        </main>
      </div>
    </div>
  )
}

export default Lists
