import React from 'react'
import { Link } from 'react-router-dom'

const Segregation = ({ id, name, image }) => {
  return (
    <div className='segregation-container rounded-xl overflow-hidden border border-solid border-green-200'>
        <div className='relative flexCenter group overflow-hidden transition-all duration-100 w-full h-64'>
            <Link to={`waste/${id}`}></Link>
            <img 
                src={image} 
                alt='wasteImage' 
                className='block object-cover group-hover:scale-110 transition-all duration-500 w-24 h-24'
            />
        </div>
        <div className='p-4 overflow-hidden flexCenter'>
          <h4 className='container-text roboto-font'>{name}</h4>
        </div>
    </div>
  )
}

export default Segregation
