import React,{useState} from 'react'
import Button from './Button/Button';
import Input from './Input/Input';
import { signInWithEmailAndPassword, } from 'firebase/auth';
import { auth,db } from '../firebase';
import { getDoc,doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';
const Login = () => {
    
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const[loading,setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  

  const handleLogin= async() =>{

setLoading(true);
    console.log("custom button clicked")

    try{

        // login with email and password
        const authUser =  await signInWithEmailAndPassword(auth,email,password);

        console.log(authUser.user);
        const user = authUser.user
        // now user is alredy set we need to get user

        const userDoc = await getDoc(doc(db,"users",user.uid));
        const userData = userDoc.data();
        console.log(userData);

        //we need to add in redux state

        dispatch(setUser(userData))
        setLoading(false);
        toast.success("Successfully Logged in")

        //navigate to user profile

        navigate('/profile')

       

    }
    catch(err){
        console.log("error",err)
        toast.error(err.message);
        setLoading(false);
    }

    




  }

  const handleResetPassword = async () =>{

    try{

      await sendPasswordResetEmail(auth,email);
      toast.success("Check Email to Reset Password")

    }
    catch(error){

      toast.error("Error while sending email" ,error)
      console.log(error.message)

    }


  }



  return (
    <div className='input-wrapper'>
    
    <Input type="text" value={email} setValue={setEmail} placeholder="Email"/>
    <Input type="password" value={password} setValue={setPassword} placeholder="Password"/>

    
    
    <Button text={loading?"loading":"Login"} onClick={handleLogin} disabled={loading}/>

    <p style={{color:"grey"}} > Forget Your password ? <span onClick={handleResetPassword} style={{fontSize:"20px",cursor:"pointer",color:"white"}}>Reset Password</span></p>
  </div>
  )
}

export default Login