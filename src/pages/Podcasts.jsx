import { collection, onSnapshot,query } from 'firebase/firestore'

import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import { setPodcast } from '../slices/PodcastSlice'
import { useEffect } from 'react'
import Podcast from '../components/Podcasts/Podcast'

const Podcasts = () => {

  const dispatch = useDispatch();
  const {podcasts} = useSelector((state) =>  (state.podcasts))
  console.log(podcasts)
  
  useEffect(() =>{

    const unsubscribe = onSnapshot(
      query(collection(db,'podcasts')),
      (querySnapshot) =>{

        const podcastsData = [];
        querySnapshot.forEach((doc) =>{
          podcastsData.push({id:doc.id, ...doc.data() })

        });
        dispatch(setPodcast(podcastsData));

      },
     (error) => {
      console.log("error fetching data", error)
     }
    );

    return () => { 
      unsubscribe();
    }

  },[dispatch])



  return (

    <div className='podcasts'>
    <div className='input-wrapper'>
      <h1>Podcasts</h1>
      {podcasts.length == 0 ? <div>No Podcasts</div> :
      <div className='userPodcasts'>
        {podcasts.map((podcast) =>(

          <Podcast key={podcast.id} {...podcast} />

        ))}
      </div> }
     

      
    </div>
    </div>
  )
}

export default Podcasts