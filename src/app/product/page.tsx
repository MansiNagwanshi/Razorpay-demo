import React from 'react'
import { Card } from '../Components/ui/Card'
import { Products } from '../utils/Products'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function page() {
  return (
    <div>
      <div className='flex flex-row justify-center items-center flex-wrap w-full gap-5 mt-10'>

        {Products && Products.map((item, index) => (<Card key={index} title={item.title} description={item.description} image={item.image} price={item.price} />))}

      </div>
      <ToastContainer />
    </div>
  )
}

export default page
