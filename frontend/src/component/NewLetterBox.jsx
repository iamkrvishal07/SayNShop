import React from 'react'

function NewLetterBox() {
  const handleSubmit = (e) => {
    e.preventDefault()
  
  }

  return (
    <div className='w-full h-[40vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start gap-[10px] flex-col px-[20px]'>
      <p className='md:text-[30px] text-[20px] text-[#a5faf7] font-semibold text-center'>
        Join the Club & Grab 20% Off Instantly!
      </p>
      <p className='md:text-[18px] text-[14px] text-center text-blue-100 font-semibold'>
        Subscribe for early access to drops, members-only discounts, and more perks – right in your inbox.
      </p>

      <form
        onSubmit={handleSubmit}
        className='w-full h-[30%] md:h-[50%] flex items-center justify-center mt-[20px] gap-[20px] flex-wrap'
      >
        <input
          type="email"
          placeholder="Enter your email"
          className='placeholder:text-black bg-slate-300 w-[600px] max-w-[60%] h-[40px] px-[20px] rounded-lg shadow-sm shadow-black'
          required
        />
        <button
          type='submit'
          className='text-[15px] md:text-[16px] px-[10px] md:px-[30px] py-[12px] md:py-[10px] hover:bg-slate-500 cursor-pointer bg-[#2e3030c9] text-white flex items-center justify-center gap-[10px] border border-[#80808049] rounded-lg shadow-sm shadow-black'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewLetterBox

