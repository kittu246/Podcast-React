import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/Button/Button'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { toast } from 'react-toastify'

const Profile = () => {

  const {user} =useSelector((state) => state.user)  
  console.log(user)

  const hangleLogout= async() =>{

    try{
      await signOut(auth)
      toast.success("Successfully Logged Out")
    }
    catch(err){

      toast.error(err.message)

    }

    

  }

  if(!user){
    return <div>Loading...</div>
  }
  return (

    <div>
      {user.name}
      {user.email}
      <Button text="logout" onClick={hangleLogout}></Button>
    </div>
  )
}

export default Profile