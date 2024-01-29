import React,{useState} from 'react'
import SignUp from '../components/SignUp'
import Login from '../components/Login';


const SignUpSignIn = () => {

  const [flag,setFlag] =useState(false);
  


  return (
    <div className='signUpsignIn'>
      <h1>{!flag ?"SignUp" :"Login"}</h1>
      {!flag?<SignUp/> :<Login/>}
      <p style={{cursor:'pointer'}} onClick=
      {()=>setFlag(!flag)}>{!flag ?<p style={{color:"grey"}}>Already have an Account.<span style={{fontSize:"20px",color:'white'}}> Login </span></p>:<p style={{color:"grey"}}>Click here to<span style={{fontSize:"20px",color:'white'}}> SignUp </span></p>}</p>
      
    </div>
  )
}

export default SignUpSignIn