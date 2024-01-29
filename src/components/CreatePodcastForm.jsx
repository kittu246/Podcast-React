
import React,{useState} from 'react'
import Input from './Input/Input';
import Button from './Button/Button';
import CustomInput from './CustomInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

const CreatePodcastForm = () => {
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [displayImage,setDisplayImage] = useState(null); // we dont need to showinput value do notpassing custum input value prop
  const [broadImage,setBroadImage] = useState(null);

  const [loading,setLoading] = useState(false);
 

  const handleCreatePodacst = async() =>{
    console.log("abs")

    if(title && desc && displayImage &&  broadImage ) {

      //step1 upload image in firebase storage

      //1.a make ref to storage , ams save unique ref id
      setLoading(true);

      try{

        const displayImageRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);  // here auth me authorised user
     // 1.b   uploadBytes with unique ref-id and file 
    await uploadBytes(displayImageRef, displayImage);

    

    //step2  download the link 

    const displayImageUrl = await getDownloadURL(displayImageRef);

   //FOR BROAD IMAGE

    const broadImageRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);  // here auth me authorised user
     // 1.b   uploadBytes with unique ref-id and file 
    await uploadBytes(broadImageRef, broadImage);

    //step2  download the link 

    const broadImageUrl = await getDownloadURL(displayImageRef);

     //step3  add in database

      //3.a make object of file to be added in collection

      const podcastdata = {
        title,
        description:desc,
        displayImage: displayImageUrl,
        broadImage:broadImageUrl,
        createBy:auth.currentUser.uid
      }

     //3.b add object in db

     const docRef = await addDoc(collection(db,"podcasts"),podcastdata);
    

     setTitle('');
     setDesc('');
     setDisplayImage(null);
     setBroadImage(null);

     toast.success("Podcast Created")
     setLoading(false);

      }

    catch(err){
      
      toast.error(err.message);
      setLoading(false);
    }

    }

    else{
      toast.error("please enter all values");
      
    }
    


  
  
  }

  const handleDisplayImage =(file) =>{
    setDisplayImage(file);
  }

  const handleBroadImage =(file) =>{
    setBroadImage(file);
  }

  return (
    <div className='input-wrapper'>
    <Input type="text" value={title} setValue={setTitle} placeholder="Title"/>
    <Input type="text" value={desc} setValue={setDesc} placeholder="Description"/>
  
    <CustomInput id={"choose-image"} text={"Add Podcast Image"} handleImage={handleDisplayImage}/>
    <CustomInput id={"choose-broad-image"} text={"Add Broad Image"} handleImage ={handleBroadImage}/>
    <Button text={loading ?"loading":"Create Podcast"} disabled={loading} onClick={handleCreatePodacst} />
  </div>
  )
}

export default CreatePodcastForm