import React,{useState} from 'react'
import Button from './Button/Button';
import Input from './Input/Input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../slices/UserSlice';
import { toast } from 'react-toastify';

const SignUp = () => {
const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [loading,setLoading] = useState(false);
 
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate is used for navigation

  const handleSignUp= async() =>{
    setLoading(true);

    console.log("custom button clicked")
    // create the user in firebase

    if(password === confirmPassword && password.length>=6){
        try{
            const authUser =  await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
    
            const user = authUser.user;
            
            console.log("user",user);

              // add user in database in firestore

              await setDoc(doc(db,"users",user.uid),{
                name:name,// as name is not stored in user
                email:user.email,
                uid:user.uid,


              })

              // seting user in redux 

              dispatch(setUser({
                name:name,// as name is not stored in user
                email:user.email,
                uid:user.uid,


              }))
              setLoading(false);

              toast.success("user successfully signed up")

              navigate('/profile');
    
        }
        catch(err){
            console.log("error",err);
            toast.error(err.message)
            setLoading(false); // if user  done error allow then resubmit, enable button again
        }

      



    }
    else{

        if(password !== confirmPassword){
            setLoading(false);// if user  done typo allow then resubmit
            toast.error("Confirm Password not matched")
        }
        else if(password <6){
            setLoading(false);
            toast.error("Password can't be less than 6")
        }
    }

    
    

  }
  return (
    
    <div className='input-wrapper'>
    <Input type="text" value={name} setValue={setName} placeholder="Name"/>
    <Input type="text" value={email} setValue={setEmail} placeholder="Email"/>
    <Input type="password" value={password} setValue={setPassword} placeholder="Password"/>
    <Input type="password" value={confirmPassword} setValue={setConfirmPassword} placeholder="Confirm Password"/>
    <Button text={loading ?"loading":"SignUp"} disabled={loading} onClick={handleSignUp} />
  </div>
  
  )
}

export default SignUp