"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Music,
  Users,
} from "lucide-react";

const artist = {
  name: "John Doe",
  backgroundImage:
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  profileImage: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6",
  bio: "John Doe is a multi-platinum artist known for his deep lyrics and innovative sound.",
  followers: "2.5M",
  albums: 5,
  songs: [
    {
      id: 1,
      title: "Eternal Echoes",
      duration: "3:45",
      albumCover: "https://source.unsplash.com/100x100/?music,album",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      lyrics: "Eternal echoes in the night, whispering dreams taking flight...",
    },
    {
      id: 2,
      title: "Lost in Time",
      duration: "4:12",
      albumCover: "https://source.unsplash.com/100x100/?music,sound",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      lyrics:
        "Drifting through the sands of time, memories fade but never die...",
    },
    {
      id: 3,
      title: "Golden Horizon",
      duration: "3:59",
      albumCover: "https://source.unsplash.com/100x100/?vinyl,records",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      lyrics: "Chasing the golden horizon, lost but never truly gone...",
    },
  ],
  relatedArtists: [
    {
      name: "Alex Beats",
      image: "https://source.unsplash.com/80x80/?dj,music",
    },
    {
      name: "Sarah Melodic",
      image: "https://source.unsplash.com/80x80/?singer,woman",
    },
    {
      name: "Lofi King",
      image: "https://source.unsplash.com/80x80/?guitar,music",
    },
  ],
};

export default function ArtistPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [volume, setVolume] = useState(50);
  const [darkMode, setDarkMode] = useState(true);
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      } min-h-screen transition-all`}
    >
      {/* 🎤 Artist Banner */}
      <div
        className="relative h-[50vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${artist.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>
        <div className="relative z-10">
          <img
            src={artist.profileImage}
            alt={artist.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-4xl font-extrabold mt-4">{artist.name}</h1>
          <p className="text-gray-300">{artist.followers} Followers</p>
        </div>
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-5 right-5 bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-600 transition"
        >
          {darkMode ? (
            <Sun className="text-yellow-400" />
          ) : (
            <Moon className="text-gray-200" />
          )}
        </button>
      </div>

      {/* 🎵 Music List */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Music className="w-6 h-6" /> Popular Songs
        </h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artist.songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center p-4 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
            >
              <img
                src={song.albumCover}
                alt="album"
                className="w-16 h-16 rounded-lg"
              />
              <div className="ml-4 flex-1">
                <p className="text-lg font-medium">{song.title}</p>
                <p className="text-gray-400 text-sm">{song.duration}</p>
              </div>
              <button
                onClick={() => playTrack(song)}
                className="p-3 bg-green-500 rounded-full hover:bg-green-400 transition-all"
              >
                {currentTrack?.id === song.id && isPlaying ? (
                  <Pause />
                ) : (
                  <Play />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🎤 Lyrics Section */}
      {currentTrack && (
        <div className="p-6 mt-4 bg-gray-900 rounded-lg text-gray-200">
          <h2 className="text-xl font-semibold">
            🎶 Lyrics - {currentTrack.title}
          </h2>
          <p className="mt-2 text-gray-400 italic">{currentTrack.lyrics}</p>
        </div>
      )}

      {/* 👥 Related Artists */}
      <div className="p-6 mt-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Users className="w-6 h-6" /> Related Artists
        </h2>
        <div className="mt-4 flex gap-6">
          {artist.relatedArtists.map((rel) => (
            <div
              key={rel.name}
              className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg shadow-lg"
            >
              <img
                src={rel.image}
                alt={rel.name}
                className="w-12 h-12 rounded-full"
              />
              <p className="text-lg">{rel.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🎧 Audio Player */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#181818] p-4 flex items-center justify-between shadow-lg">
          <p className="text-lg">{currentTrack.title}</p>
          <button onClick={() => playTrack(currentTrack)}>
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-24"
          />
        </div>
      )}

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}
