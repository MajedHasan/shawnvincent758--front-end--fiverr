"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
} from "lucide-react";

const album = {
  title: "The Best of Lofi",
  artist: "Lofi Beats",
  coverArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
  releaseDate: "February 8, 2025",
  genre: "Lofi / Chill",
  description:
    "A collection of the most relaxing lofi beats, perfect for studying, working, and chilling.",
  tracks: [
    {
      id: 1,
      title: "Dreaming",
      duration: "3:45",
      url: "https://link-to-song.mp3",
    },
    {
      id: 2,
      title: "Midnight Walk",
      duration: "4:12",
      url: "https://link-to-song.mp3",
    },
    {
      id: 3,
      title: "Ocean Breeze",
      duration: "2:58",
      url: "https://link-to-song.mp3",
    },
    {
      id: 4,
      title: "Peaceful Mind",
      duration: "3:22",
      url: "https://link-to-song.mp3",
    },
  ],
};

export default function AlbumPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [volume, setVolume] = useState(50);
  const [favorites, setFavorites] = useState({});
  const audioRef = useRef(null);

  const playTrack = (track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setCurrentTrack(track);
      audioRef.current.src = track.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 🔥 Banner Section */}
      <div className="relative w-full h-96 bg-gradient-to-b from-indigo-800 to-black p-6 flex items-end">
        <img
          src={album.coverArt}
          alt={album.title}
          className="w-48 h-48 object-cover rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
        />
        <div className="ml-6">
          <p className="text-sm uppercase text-gray-300">Album</p>
          <h1 className="text-6xl font-extrabold drop-shadow-lg">
            {album.title}
          </h1>
          <p className="text-lg text-gray-400">{album.artist}</p>
          <p className="text-sm text-gray-500">
            {album.releaseDate} • {album.genre}
          </p>
          <p className="mt-2 text-gray-300">{album.description}</p>
          <button
            className="mt-4 px-6 py-2 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition-all"
            onClick={() => playTrack(album.tracks[0])}
          >
            Play All
          </button>
        </div>
      </div>

      {/* 🎵 Tracklist Section */}
      <div className="p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700 text-left text-gray-400 uppercase text-sm">
              <th className="py-2">#</th>
              <th>Title</th>
              <th className="text-center">❤️</th>
              <th className="text-right">Duration</th>
            </tr>
          </thead>
          <tbody>
            {album.tracks.map((track, index) => (
              <tr
                key={track.id}
                className="hover:bg-gray-800 cursor-pointer transition-all"
                onClick={() => playTrack(track)}
              >
                <td className="py-3 px-2">{index + 1}</td>
                <td className="py-3 px-2 flex items-center">
                  {currentTrack?.id === track.id && isPlaying ? (
                    <Pause className="mr-2 text-green-500" />
                  ) : (
                    <Play className="mr-2" />
                  )}
                  {track.title}
                </td>
                <td className="text-center">
                  <Heart
                    className={`cursor-pointer ${
                      favorites[track.id] ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(track.id);
                    }}
                  />
                </td>
                <td className="py-3 px-2 text-right">{track.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🎧 Playback Controls */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-4">
            <button onClick={() => playTrack(currentTrack)} className="p-2">
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <div>
              <p className="text-lg">{currentTrack.title}</p>
              <p className="text-sm text-gray-500">{album.artist}</p>
            </div>
          </div>

          {/* Volume & Shuffle/Repeat Controls */}
          <div className="flex items-center space-x-4">
            <Shuffle className="text-gray-500 cursor-pointer hover:text-white" />
            <Repeat className="text-gray-500 cursor-pointer hover:text-white" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />
            {volume > 0 ? <Volume2 /> : <VolumeX />}
          </div>
        </div>
      )}

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}
