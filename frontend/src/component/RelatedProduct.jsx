import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({category,subCategory,currentProductId }) {

    let {products} = useContext(shopDataContext)
    let [related,setRelated] = useState([])

    useEffect(()=>{
     if(products.length > 0){

        let productsCopy = products.slice()
        productsCopy = productsCopy.filter((item) => category === item.category)
        productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
        productsCopy = productsCopy.filter((item) => currentProductId  !== item._id)
        setRelated(productsCopy.slice(0,4))

     }
    },[products,category,subCategory,currentProductId])
  return (
    <div className='my-[130px] md:my-[40px]  md:px-[60px] '>
        <div className='ml-[20px] lg:ml-[80px]'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='w-[100%]  mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
            {
                related.map((item,index)=>(
                    <Card key={index} id={item._id} name={item.name } price={item.price} image={item.image1} />
                ))
            }
        </div>
      
    </div>
  )
}

export default RelatedProduct
