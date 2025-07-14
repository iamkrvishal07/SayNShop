import React from 'react'
import Title from '../component/Title'
import contact from '../assets/contact.jpg'
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className="w-full min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[80px] flex flex-col items-center justify-center gap-[50px]">
      <Title text1="CONTACT" text2="US" />

      {/* Contact Info */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center px-6 gap-10">
        {/* Image */}
        <div className="lg:w-[50%] w-full flex justify-center">
          <img
            src={contact}
            alt="Contact"
            className="w-[80%] lg:w-[70%] rounded-md shadow-md shadow-black"
          />
        </div>

        {/* Info Content */}
        <div className="lg:w-[50%] w-full flex flex-col items-start justify-start gap-4 text-white px-4 mt-4 lg:mt-0">

          <div>
            <p className="text-[14px] md:text-[16px]">Tel: +91-987-654-3210</p>
            <p className="text-[14px] md:text-[16px]">Email: admin@saynshop.com</p>
          </div>

          <div>
            <p className="text-[16px] md:text-[18px] font-bold text-[#bff1f9] mt-2 mb-1">Careers at SayNShop</p>
            <p className="text-[14px] md:text-[16px]">Explore our teams and discover exciting career opportunities at SayNShop.</p>
            <button className="mt-3 px-6 py-3 text-white border border-white rounded-md hover:bg-[#ffffff12] transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewLetterBox />
    </div>
  )
}

export default Contact
