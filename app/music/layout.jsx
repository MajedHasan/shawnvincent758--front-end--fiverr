"use client";

import React, { useState, useRef, cloneElement } from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import BottomPlayer from "./_components/BottomPlayer";
import Page from "./page";

function layout({ children }) {
  // Audio state management
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Mind Refresh - Lofi Studio 1",
    artist: "Lofi Beats",
    image: "https://images.unsplash.com/photo-1494548162494-384bba4ab999",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Example audio URL
  });
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Navigation state
  const [selectedNav, setSelectedNav] = useState("home");
  const [showPlaylist, setShowPlaylist] = useState(false);

  // Playback controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleTrackClick = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-screen bg-black text-white flex">
      {/* Side Navigation */}
      <Sidebar
        setSelectedNav={setSelectedNav}
        showPlaylist={showPlaylist}
        selectedNav={selectedNav}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <Header />

        {/* Main Content Scroll Area */}
        <div className="flex-1 overflow-auto bg-gradient-to-b from-[#121212] to-black p-4">
          {/* {children &&
            cloneElement(children, {
              handleTrackClick,
              currentTrack,
              isPlaying,
            })} */}

          <Page
            handleTrackClick={handleTrackClick}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
          />
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Playback Controls */}
      {/* <div className="h-20 bg-black border-t border-[#282828] px-4 flex items-center justify-between fixed bottom-0 left-0 right-0">
        <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
          <img
            src={currentTrack.image}
            alt={currentTrack.title}
            className="w-14 h-14 rounded"
          />
          <div className="hidden sm:block">
            <p className="font-medium">{currentTrack.title}</p>
            <p className="text-sm text-gray-400">{currentTrack.artist}</p>
          </div>
          <Heart size={20} className="text-gray-400" />
        </div>

        <div className="flex flex-col items-center w-[40%] max-w-[722px]">
          <div className="flex items-center gap-4 mb-2">
            <Shuffle size={20} className="text-gray-400" />
            <SkipBack size={20} />
            <button
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause size={20} className="text-black" />
              ) : (
                <Play size={20} className="text-black ml-1" />
              )}
            </button>
            <SkipForward size={20} />
            <Repeat size={20} className="text-gray-400" />
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 h-1 bg-[#4d4d4d] rounded-full">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 w-[30%] justify-end min-w-[180px]">
          <Mic2 size={20} className="text-gray-400" />
          <List size={20} className="text-gray-400" />
          <Volume2 size={20} className="text-gray-400" />
          <div className="w-24 h-1 bg-[#4d4d4d] rounded-full">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
          <Maximize2 size={20} className="text-gray-400" />
        </div>
      </div> */}

      <BottomPlayer
        audioRef={audioRef}
        currentTrack={currentTrack}
        handleTimeUpdate={handleTimeUpdate}
        setIsPlaying={setIsPlaying}
        togglePlay={togglePlay}
        isPlaying={isPlaying}
        formatTime={formatTime}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
      />
    </div>
  );
}

export default layout;
