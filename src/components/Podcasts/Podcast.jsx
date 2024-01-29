import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { CiPlay1 } from "react-icons/ci";


const Podcast = ({id,title,displayImage}) => {
  return (
    <Link className='link' to={`/podcasts/${id}`}>
    <div className='podcastCard'>
        <img src={displayImage}/>
        <div style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
            <p>{title}</p>
            <CiPlay1 style={{fontSize:'19px'}} />
            </div>
    </div>
    </Link>
  )
}

export default Podcast