import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext)
  const navigate = useNavigate()
  const [activeAi, setActiveAi] = useState(false)
  const openingSound = new Audio(open)

  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    console.log("Speech Recognition not supported")
    return null
  }

  const recognition = new SpeechRecognition()
  recognition.continuous = false
  recognition.lang = 'en-US'

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase()
    console.log("Heard:", transcript)

    if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
      speak("opening search")
      setShowSearch(true)
      navigate("/collection")
    } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
      speak("closing search")
      setShowSearch(false)
    } else if (
      transcript.includes("collection") ||
      transcript.includes("collections") ||
      transcript.includes("product") ||
      transcript.includes("products")
    ) {
      speak("opening collection page")
      navigate("/collection")
    } else if (transcript.includes("home") || transcript.includes("homepage")) {
      speak("opening home page")
      navigate("/")
      setShowSearch(false)
    } else if (
      transcript.includes("cart") ||
      transcript.includes("kaat") ||
      transcript.includes("caat")
    ) {
      speak("opening your cart")
      navigate("/cart")
      setShowSearch(false)
    } else if (transcript.includes("contact")) {
      speak("opening contact page")
      navigate("/contact")
      setShowSearch(false)
    } else if (
      transcript.includes("order") ||
      transcript.includes("myorders") ||
      transcript.includes("orders") ||
      transcript.includes("my order")
    ) {
      speak("opening your orders page")
      navigate("/order")
      setShowSearch(false)
    } else {
      console.log("Unrecognized command:", transcript)
      toast.error("Try Again")
      speak("Try Again")
      setShowSearch(false)
    }
  }

  recognition.onerror = (e) => {
    console.error("Speech recognition error:", e.error)
    toast.error("Speech recognition error")
    speak("Try Again")
    setShowSearch(false)
    setActiveAi(false)
  }

  recognition.onend = () => {
    setActiveAi(false)
  }

  return (
    <div
      className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]'
      onClick={() => {
        try {
          recognition.start()
          openingSound.play()
          setActiveAi(true)
        } catch (err) {
          console.error("Failed to start recognition:", err)
          toast.error("Voice command failed")
          speak("Try Again")
          setActiveAi(false)
        }
      }}
    >
      <img
        src={ai}
        alt=""
        className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform`}
        style={{
          filter: `${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`
        }}
      />
    </div>
  )
}

export default Ai
