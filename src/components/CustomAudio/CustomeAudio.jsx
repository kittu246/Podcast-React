import React, { useState } from "react";
import "./style.css";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa";
import { VscUnmute } from "react-icons/vsc";
import { useRef } from "react";
import { useEffect } from "react";

const CustomeAudio = ({ audioSrc, image }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVolumeOn, setVolumeOn] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isVolumeOn) {
      audioRef.current.volume = volume;
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isVolumeOn]);

  useEffect(() =>{

    const audio = audioRef.current;
    audio.addEventListener("timeupdate",handleTimeUpdate);
    audio.addEventListener("loadedmetadata",handleLoadedMetaData);
    audio.addEventListener("ended",handleEnded);

    return () =>{
        audio.removeEventListener("timeupdate",handleTimeUpdate);
    audio.removeEventListener("loadedmetadata",handleLoadedMetaData);
    audio.removeEventListener("ended",handleEnded);

    }

  },[])

 
   const handleTimeUpdate=() =>{
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetaData=() =>{
    setDuration(audioRef.current.duration)
  }

  const handleEnded=() =>{
    setCurrentTime(0);
    setIsPlaying(false);
  }

  const handleCurrentTime = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime= e.target.value;
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  const formatTime= (time) =>{
    const minute = Math.floor(time/60);
    const seconds = Math.floor(time%60);

    return `${minute}:${seconds}`
  }

  return (
    <div className="custom-audio">
      {/* <div>
        
        </div> */}

      <div className="audio-div">
        <img src={image} />
        <audio src={audioSrc} ref={audioRef} />
        <p onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </p>

        <div className="range-div">
          <p>{formatTime(currentTime)}</p>
          <input type="range" onChange={handleCurrentTime} value={currentTime} max={duration} step={0.01} />
          <p>-{formatTime(duration-currentTime)}</p>
        </div>
      </div>

      <div className="volume-div">
        <p onClick={() => setVolumeOn(!isVolumeOn)}>
          {isVolumeOn ? <VscUnmute /> : <FaVolumeMute />}
        </p>

        <div className="range-div">
          <input
            style={{ width: "100%" }}
            type="range"
            onChange={handleVolume}
            value={volume}
            min="0"
            max="1"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomeAudio;
