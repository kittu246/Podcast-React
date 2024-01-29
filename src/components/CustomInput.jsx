import React, { useState } from 'react'

const CustomInput = ({id,text,handleImage}) => {

    const [fileSelected,setFileSelectde] = useState('');
    const handleSelectedFile=(e) =>{
        setFileSelectde(e.target.files[0].name)
        handleImage(e.target.files[0])
       

    }
  return (
    <>
    <label className={`customInput ${!fileSelected ? "labelColor" :"activeLabel"}`} htmlFor={id}>{fileSelected ? fileSelected :text}</label>
    <input type='file' id={id} style={{display:"none"}} onChange={handleSelectedFile} />
    </>
  )
}

export default CustomInput