import React from 'react'

const EpisodeDetails = ({title,description,audio,onClick}) => {

   const  style={display:'flex',
    alignItems:'center',
     justifyContent:'center' ,
     padding:"15px 10px",
     fontSize:'16px',
     cursor:'pointer'
    ,height:"20px",
    backgroundColor:"#20061e",
    border:'2px solid white',
    color:"white",
    borderRadius:'5px',
width:'70px'}
  return (
    <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={()=>onClick(audio)} style={style}>Play</button> 
    </div>
  )
}

export default EpisodeDetails