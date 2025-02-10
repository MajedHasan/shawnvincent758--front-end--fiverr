"use client";

import {
  Heart,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Mic2,
  List,
  Volume2,
  Maximize2,
} from "lucide-react";
import React from "react";

const BottomPlayer = ({
  audioRef,
  currentTrack,
  handleTimeUpdate,
  setIsPlaying,
  togglePlay,
  isPlaying,
  formatTime,
  currentTime,
  duration,
  volume,
  handleVolumeChange,
}) => {
  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="h-20 bg-black border-t border-[#282828] px-4 flex items-center justify-between fixed bottom-0 left-0 right-0">
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
      </div>
    </>
  );
};

export default BottomPlayer;
