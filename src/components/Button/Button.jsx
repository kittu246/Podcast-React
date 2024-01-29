import React from 'react'
import './style.css'
const Button = ({text,onClick,disabled}) => {
  return (
    <button className='custom-btn' onClick={onClick} disabled={disabled}>

        {text}
        
    </button>
  )
}

export default Button