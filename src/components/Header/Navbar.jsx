import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

const Navbar = () => {
  return (
    <nav>
        <div className="gradient"></div>
        <NavLink className='link'  to='/'>SignUp</NavLink>
        <NavLink className='link' to='/podcasts'>Podcasts</NavLink>
        <NavLink className='link' to='/createPodcast'>Start Podcast</NavLink>
        <NavLink className='link' to='/profile'> Profile</NavLink>
        
    </nav>
  )
}

export default Navbar