"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Heart,
  Share2,
  Plus,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react";

const playlist = {
  title: "Lofi Chill Vibes",
  description: "Relax and study with the best lofi beats.",
  coverArt: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
  createdBy: "Lofi Records",
  tracks: [
    {
      id: 1,
      title: "Dreaming",
      artist: "Lofi Beats",
      duration: "3:45",
      url: "https://link-to-song.mp3",
    },
    {
      id: 2,
      title: "Midnight Walk",
      artist: "DJ Chill",
      duration: "4:12",
      url: "https://link-to-song.mp3",
    },
    {
      id: 3,
      title: "Ocean Breeze",
      artist: "Relax Tunes",
      duration: "2:58",
      url: "https://link-to-song.mp3",
    },
    {
      id: 4,
      title: "Peaceful Mind",
      artist: "Zen Mode",
      duration: "3:22",
      url: "https://link-to-song.mp3",
    },
  ],
};

export default function PlaylistPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [volume, setVolume] = useState(50);
  const [favorites, setFavorites] = useState({});
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

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
    setVolume(e.target.value);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 🔥 Playlist Banner */}
      <div className="relative w-full h-96 bg-gradient-to-b from-[#4A154B] to-black p-6 flex items-end">
        <img
          src={playlist.coverArt}
          alt={playlist.title}
          className="w-48 h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        />
        <div className="ml-6">
          <p className="text-sm uppercase text-gray-300">Playlist</p>
          <h1 className="text-6xl font-extrabold">{playlist.title}</h1>
          <p className="text-gray-400">{playlist.description}</p>
          <p className="text-sm text-gray-500">
            Created by {playlist.createdBy}
          </p>
          <div className="mt-4 flex space-x-4">
            <button
              className="px-6 py-2 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition-all"
              onClick={() => playTrack(playlist.tracks[0])}
            >
              Play All
            </button>
            <button className="text-gray-400 hover:text-white flex items-center space-x-2">
              <Plus /> <span>Add to Playlist</span>
            </button>
            <button className="text-gray-400 hover:text-white flex items-center space-x-2">
              <Share2 /> <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🎵 Tracklist Section */}
      <div className="p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700 text-left text-gray-400 uppercase text-sm">
              <th className="py-2">#</th>
              <th>Title</th>
              <th>Artist</th>
              <th className="text-center">❤️</th>
              <th className="text-right">Duration</th>
            </tr>
          </thead>
          <tbody>
            {playlist.tracks.map((track, index) => (
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
                <td className="py-3 px-2 text-gray-400">{track.artist}</td>
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

      {/* 🎧 Music Player */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-4">
            <button onClick={() => playTrack(currentTrack)} className="p-2">
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <div>
              <p className="text-lg">{currentTrack.title}</p>
              <p className="text-sm text-gray-500">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center space-x-4">
            <SkipBack className="text-gray-500 cursor-pointer hover:text-white" />
            <Shuffle className="text-gray-500 cursor-pointer hover:text-white" />
            <Repeat className="text-gray-500 cursor-pointer hover:text-white" />
            <SkipForward className="text-gray-500 cursor-pointer hover:text-white" />
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
