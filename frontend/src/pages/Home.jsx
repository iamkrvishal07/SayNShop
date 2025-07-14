import React, { useEffect, useState } from 'react'
import Backgound from '../component/Backgound'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'


function Home() {
let heroData = [
  { text1: "Limited Time: 30% OFF Everything!", text2: "Unleash Your Style Today" },
  { text1: "Bold Looks. Big Savings.", text2: "Step Into Confidence" },
  { text1: "Curated Collections, Just for You", text2: "Shop the Trend Now" },
  { text1: "Find Your Perfect Fit", text2: "Fashion Deals You’ll Love" }
];


  let [heroCount,setHeroCount] = useState(0)

  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    },3000);
    return () => clearInterval(interval)
  },[])
  
  return (
    <div className='overflow-x-hidden relative top-[70px]'>
    <div className=' w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh]   bg-gradient-to-l from-[#141414] to-[#0c2025] '>

      <Backgound heroCount={heroCount}/>
      <Hero
      heroCount={heroCount}
      setHeroCount={setHeroCount}
      heroData={heroData[heroCount]}
      />


     
    </div>
    <Product/>
    <OurPolicy/>
    <NewLetterBox/>
    <Footer/>
    </div>
  )
}

export default Home
