import { collection, onSnapshot,query } from 'firebase/firestore'

import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import { setPodcast } from '../slices/PodcastSlice'
import { useEffect,useState } from 'react'
import Podcast from '../components/Podcasts/Podcast'
import Input from '../components/Input/Input'

const Podcasts = () => {

  const [userSearch,setuserSearch] = useState('');

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


  const filteredPodcast = podcasts.filter((podcast) => {
      return podcast.title.trim().toLowerCase().includes(userSearch.trim().toLowerCase())
  } )// as in the start initial value of usersearch is '' , and empty string is present in all strings
  


  return (

    <div className='podcasts'>
    <div className='input-wrapper'>
      <h1>Podcasts</h1>

      <Input type="text" value={userSearch} setValue={setuserSearch} placeholder="Search By Title"/>
      {filteredPodcast.length == 0 ? <div>No Podcasts</div> :
      <div className='userPodcasts'>
        {filteredPodcast.map((podcast) =>(

          <Podcast key={podcast.id} {...podcast} />

        ))}
      </div> }
     

      
    </div>
    </div>
  )
}

export default Podcasts