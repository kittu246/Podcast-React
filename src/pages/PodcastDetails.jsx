import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../components/Button/Button";
import EpisodeDetails from "../components/EpisodeDetails";
import CustomeAudio from "../components/CustomAudio/CustomeAudio";

const PodcastDetails = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState({});
  const[episodes,setEpisodes] = useState([]) // don't use null
  const[audioFile,setAudioFile] = useState("");
  console.log("id", podcastId);
  console.log(podcast.createBy);
  console.log(auth.currentUser.id)
  const navigate = useNavigate();

  useEffect(() => {
    getPodcastDetails();

    return () => {
      getPodcastDetails();
    };
  }, [podcastId]);

  async function getPodcastDetails() {
    try {
      const docRef = doc(db, "podcasts", podcastId);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        toast.success("Podcast created");
        setPodcast({ id: podcastId, ...docSnap.data() });
        console.log("displayImage",podcast.displayImage);
      } else {
        console.log("No such document!");
        toast.error("No podcast found");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  useEffect(() =>{

    const unSubscribe = onSnapshot(query(collection(db,'podcasts',podcastId,'episodes')),
    (querySnapshot) => {
      const episodesData=[];
      querySnapshot.forEach((doc) =>{
        episodesData.push({id:doc.id,...doc.data()})
      });

      setEpisodes(episodesData);



    },
    (error)=>{
      console.log("Error fetching data",error)
    }
    )

    return () =>{
      unSubscribe();
    }

  },[podcastId])

  const style = {
    display:'flex',
     alignItems:'center',
      justifyContent:'center' ,
      padding:"20px 10px",
      fontSize:'16px',
      cursor:'pointer'
     ,height:"30px",
     backgroundColor:"#20061e",
     border:'2px solid white',
     color:"white",
     borderRadius:'5px',
    
  }

  return (
    <div className="podcastDetails">
      <div className="input-wrapper">
        {podcast.id && (
          <div className="podcastDetail"> 
          <div style={{display:'flex' ,justifyContent:'space-between',gap:"10rem",alignItems:'center',}}>
          <h1>{podcast.title}</h1>
          {podcast.createBy === auth.currentUser.uid && <button onClick={() => navigate(`/podcasts/${podcastId}/creteEpisode`)} style={style}>Create Episode</button> }
          
          </div>
            
            <img src={podcast.broadImage} />
            <p>{podcast.description}</p>

            <h1>Episodes</h1>
            {episodes.length>0 ? <ol>
              {episodes.map((episode) =>(
                <li key={episode.id}>
                  <EpisodeDetails key={episode.id} {...episode} onClick={(file)=> setAudioFile(file)}/>
                </li>
                
              )

              )}
            </ol>:<div>No Episodes</div>}
            
          </div>
        )}

        {audioFile &&  <CustomeAudio audioSrc={audioFile} image={podcast.displayImage}/>}

        
        
      </div>
    </div>
  );
};

export default PodcastDetails;
