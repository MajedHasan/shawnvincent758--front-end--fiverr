import { Heart, Home, Library, Plus, Search } from "lucide-react";
import React from "react";

const Sidebar = ({ setSelectedNav, showPlaylist, selectedNav }) => {
  const playlists = [
    { id: 1, name: "My Playlist #1" },
    { id: 2, name: "Chill Vibes" },
    { id: 3, name: "Workout Mix" },
    { id: 4, name: "Study Music" },
  ];

  return (
    <>
      <div className="w-64 bg-black flex flex-col h-full">
        <div className="p-6">
          <div className="space-y-4">
            <button
              onClick={() => setSelectedNav("home")}
              className={`flex items-center gap-4 text-sm font-semibold hover:text-white transition-colors w-full ${
                selectedNav === "home" ? "text-white" : "text-gray-400"
              }`}
            >
              <Home size={24} />
              Home
            </button>
            <button
              onClick={() => setSelectedNav("search")}
              className={`flex items-center gap-4 text-sm font-semibold hover:text-white transition-colors w-full ${
                selectedNav === "search" ? "text-white" : "text-gray-400"
              }`}
            >
              <Search size={24} />
              Search
            </button>
            <button
              onClick={() => setSelectedNav("library")}
              className={`flex items-center gap-4 text-sm font-semibold hover:text-white transition-colors w-full ${
                selectedNav === "library" ? "text-white" : "text-gray-400"
              }`}
            >
              <Library size={24} />
              Your Library
            </button>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="flex items-center gap-4 text-sm font-semibold text-gray-400 hover:text-white transition-colors w-full"
            >
              <Plus size={24} />
              Create Playlist
            </button>
            <button className="flex items-center gap-4 text-sm font-semibold text-gray-400 hover:text-white transition-colors w-full">
              <Heart size={24} />
              Liked Songs
            </button>
          </div>

          <div className="mt-4 border-t border-gray-800 pt-4">
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                className="text-sm text-gray-400 hover:text-white transition-colors w-full text-left py-2"
              >
                {playlist.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
