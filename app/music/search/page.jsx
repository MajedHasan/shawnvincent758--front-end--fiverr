"use client";

import React, { useState, useRef } from "react";
import {
  Search,
  Play,
  Pause,
  ShoppingCart,
  Heart,
  User,
  Music,
  Album,
} from "lucide-react";

const mockData = {
  topResult: {
    id: 1,
    name: "Lofi Beats",
    type: "Artist",
    image: "https://source.unsplash.com/200x200/?music,artist",
  },
  songs: Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Song ${i + 1}`,
    artist: "Lofi Beats",
    album: "Chill Vibes",
    price: (Math.random() * 2 + 1).toFixed(2),
    duration: "3:45",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  })),
  artists: Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: `Artist ${i + 1}`,
    image: `https://source.unsplash.com/200x200/?singer,person&random=${i}`,
  })),
  albums: Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Album ${i + 1}`,
    artist: "Lofi Beats",
    price: (Math.random() * 10 + 5).toFixed(2),
    image: `https://source.unsplash.com/200x200/?album,music&random=${i}`,
  })),
  playlists: Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Playlist ${i + 1}`,
    createdBy: `User ${i + 10}`,
    image: `https://source.unsplash.com/200x200/?playlist,music&random=${i}`,
  })),
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(mockData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [cart, setCart] = useState([]);
  const audioRef = useRef(null);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setQuery(term);
    const filtered = {
      topResult: mockData.topResult,
      songs: mockData.songs.filter((s) => s.title.toLowerCase().includes(term)),
      artists: mockData.artists.filter((a) =>
        a.name.toLowerCase().includes(term)
      ),
      albums: mockData.albums.filter((a) =>
        a.title.toLowerCase().includes(term)
      ),
      playlists: mockData.playlists.filter((p) =>
        p.title.toLowerCase().includes(term)
      ),
    };
    setFilteredResults(filtered);
  };

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

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 🔍 Search Bar */}
      <div className="bg-gradient-to-b from-[#1D1D1D] to-black p-6">
        <div className="flex items-center bg-gray-800 p-3 rounded-full w-full max-w-lg mx-auto">
          <Search className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for songs, artists, albums..."
            value={query}
            onChange={handleSearch}
            className="w-full bg-transparent outline-none px-3 text-white"
          />
        </div>
      </div>

      {/* 🎵 Search Results */}
      <div className="p-6 space-y-6">
        {/* 🌟 Top Result */}
        {filteredResults.topResult && (
          <div className="flex items-center bg-gray-800 p-4 rounded-lg">
            <img
              src={filteredResults.topResult.image}
              className="w-20 h-20 rounded-full"
            />
            <div className="ml-4">
              <p className="text-lg font-bold">
                {filteredResults.topResult.name}
              </p>
              <p className="text-sm text-gray-400">
                {filteredResults.topResult.type}
              </p>
            </div>
          </div>
        )}

        {/* 🎶 Songs List */}
        <h2 className="text-2xl font-bold">Songs</h2>
        <div className="space-y-3">
          {filteredResults.songs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
            >
              <div className="flex items-center">
                <span className="text-gray-400">{index + 1}</span>
                <div className="ml-3">
                  <p className="text-lg">{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => playTrack(song)}
                  className="bg-green-500 p-2 rounded-full"
                >
                  {isPlaying && currentTrack?.id === song.id ? (
                    <Pause size={16} />
                  ) : (
                    <Play size={16} />
                  )}
                </button>
                <button
                  onClick={() => addToCart(song)}
                  className="bg-blue-600 p-2 ml-2 rounded-full"
                >
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🎨 Artists */}
        <h2 className="text-2xl font-bold">Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredResults.artists.map((artist) => (
            <div
              key={artist.id}
              className="bg-gray-800 p-3 rounded-lg text-center"
            >
              <img
                src={artist.image}
                className="w-20 h-20 rounded-full mx-auto"
              />
              <p className="mt-2">{artist.name}</p>
            </div>
          ))}
        </div>

        {/* 🎼 Albums */}
        <h2 className="text-2xl font-bold">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredResults.albums.map((album) => (
            <div key={album.id} className="bg-gray-800 p-3 rounded-lg">
              <img src={album.image} className="w-full rounded-lg" />
              <p className="mt-2 font-bold">{album.title}</p>
              <p className="text-sm text-gray-400">{album.artist}</p>
            </div>
          ))}
        </div>

        {/* 📜 Playlists */}
        <h2 className="text-2xl font-bold">Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredResults.playlists.map((playlist) => (
            <div key={playlist.id} className="bg-gray-800 p-3 rounded-lg">
              <img src={playlist.image} className="w-full rounded-lg" />
              <p className="mt-2 font-bold">{playlist.title}</p>
              <p className="text-sm text-gray-400">By {playlist.createdBy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
