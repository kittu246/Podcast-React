import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button/Button'
import { signOut } from 'firebase/auth'
import { auth, db, storage } from '../firebase'
import { toast } from 'react-toastify'
import Loader from '../components/loader/Loader'
import CustomInput from '../components/CustomInput'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import Avatar from '../assets/avatar.png'
import Podcast from '../components/Podcasts/Podcast'
import { setUserPodcasts } from '../slices/UserPodcasts'

const Profile = () => {


  const {userPodcasts} = useSelector((state) => (state.userPodcasts));
  console.log(userPodcasts);
  const dispatch = useDispatch();

  useEffect(() =>{

    const unsubscribe = onSnapshot( query(collection(db,"podcasts")),
    (querySnapshot) =>{
      const userPodcastsDetails =[];
      querySnapshot.forEach((doc) =>{
        userPodcastsDetails.push ({id:doc.id ,...doc.data()})

      })

      dispatch(setUserPodcasts(userPodcastsDetails))

    },
    (error) =>{
      console.log(error.message)
    })


    return () =>{
      unsubscribe()

    }

  },[dispatch])

  const {user} =useSelector((state) => state.user)  
  console.log(user)

 const [profilePhoto,setProfilePhoto]  = useState(null);
 const [loading,setLoading] = useState(false);

 const style = {
  display:'flex',
   alignItems:'center',
    justifyContent:'center' ,
    padding:"15.5px 10px",
    fontSize:'16px',
    cursor:'pointer'
   ,height:"15px",
   backgroundColor:"#20061e",
   border:'2px solid white',
   color:"white",
   borderRadius:'5px',
  
}

  const hangleLogout= async() =>{

    try{
      await signOut(auth)
      toast.success("Successfully Logged Out")
    }
    catch(err){

      toast.error(err.message)

    }

    

  }

  const handleProfileUpload = (file)  =>{

    setProfilePhoto(file);




  }

  const handleUploadProfile = async()  =>{

    if(profilePhoto){

      setLoading(true);

      try{

      

        const profileRef =  ref(storage,`/profile/${auth.currentUser.uid}/${Date.now()}`);
  
        await uploadBytes(profileRef,profilePhoto);
        const profileUrl =  await getDownloadURL(profileRef);
  
        await updateDoc(doc(db,'users', auth.currentUser.uid), {
          profilePhoto: profileUrl,
        });
  
       toast.success("Profile Photo Uploaded Successfully");
       setProfilePhoto(null);
       setLoading(false);
  
      }
  
      catch(error){

        toast.error("Failed Uploading Profile",error.message);
        console.log(error.message)
        setLoading(false);
  
      }

    }

    else{
      toast.error("Upload the profile photo");
    }

    

   



  }

  if(!user){
    return <Loader/>
  }
  return (
    <div className='profileName'>

    <div className='input-wrapper'>

      <h1 style={{margin:"1.5rem 0"}}>Profile</h1>

      <div className='podcastCard' style={{padding:"0px"} }>
        <img src={user.profilePhoto?user.profilePhoto:Avatar}/>
        
    </div>
    <p style={{fontSize:"25px", fontWeight:"600"}}>{user.profilePhoto?`Welcome ${user.name}`:"No Profile Photo"}</p>


     

      {!user.profilePhoto && <div className='uploadProfileButton'>
      <CustomInput  id={"profile-photo"} text={"upload a profile"} handleImage={handleProfileUpload}/>
       <button style={style} onClick={handleUploadProfile}> {loading ? "Loading...":"upload"} </button>
      </div>}
      
      <h1>Your Podcasts</h1>

      {userPodcasts.length == 0 ? <div>No Podcasts</div> :
      <div className='userPodcasts'>
        {userPodcasts.map((podcast) =>(

          <Podcast key={podcast.id} {...podcast} />

        ))}
      </div> }

     
      <Button  text="logout" onClick={hangleLogout}></Button>

    </div>
    </div>
  )
}

export default Profile