import React, { useState } from 'react'
import Input from './Input/Input'
import Button from './Button/Button'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CustomInput from './CustomInput';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getDocsFromServer } from 'firebase/firestore';

const Episode = () => {

  const{podcastId} =  useParams()

const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [audio,setAudio] = useState(null);
  const[loading,setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAudio =(file) =>{

    setAudio(file)



  }

  const handleAudioSubmit = async () =>{
    setLoading(true);
    if(title,desc,audio,podcastId){
        try{
         const audioRef= ref(storage,`/podcast-audio/${auth.currentUser.uid}/${Date.now()}`);

         await uploadBytes(audioRef,audio);

         const downloadedUrl = await getDownloadURL(audioRef);

         const audioData ={
          title:title,
          description:desc,
          audio:downloadedUrl,
         }

        
         await addDoc(collection(db,'podcasts',podcastId,"episodes"),audioData);
         
         toast.success('Episode Create Successfully')
         setLoading(false);
         setTitle('');
         setDesc('');
         setAudio(null);
         navigate(`/podcasts/${podcastId}`)


        }
        catch(error){
            toast.error(error.message);
            setLoading(false);
        }


    }
    else{
        
        toast.error("No fields should be empty")
        setLoading(false);
    }
    
  }


  return (
    <div className='createEpisode'>
    <div className='input-wrapper'>
    <h1>Create Episode</h1>
    <Input type="text" value={title} setValue={setTitle} placeholder="Title"/>
    <Input type="text" value={desc} setValue={setDesc} placeholder="Description"/>
    <CustomInput id={"choose-audio"} text={"Add Audio"} handleImage={handleAudio}/>
    
    <Button text={loading?"loading":"Submit Episode"} onClick={handleAudioSubmit} disabled={loading}/>
  </div>
        

    </div>
  )
}

export default Episode