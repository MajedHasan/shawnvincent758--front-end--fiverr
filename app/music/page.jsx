"use client";

import React from "react";
import { Play, Pause } from "lucide-react";

function Page({ handleTrackClick, currentTrack, isPlaying }) {
  const recentlyPlayed = [
    {
      title: "Fresh Mode",
      artist: "Lofi Beats",
      image: "https://images.unsplash.com/photo-1515104882246-2bbbf5af3977",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      title: "refresh the mind",
      artist: "Chill Mix",
      image: "https://images.unsplash.com/photo-1534685785745-60a2cea0ec34",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      title: "Mind Refresh - Lofi Studio 1",
      artist: "Lofi Studio",
      image: "https://images.unsplash.com/photo-1494548162494-384bba4ab999",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      title: "Mind Refreshment",
      artist: "Ambient Sounds",
      image: "https://images.unsplash.com/photo-1504297050568-910d24c426d3",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      title: "Tahsan",
      artist: "Tahsan",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
  ];

  // const handleTrackClick = (track) => {
  //   setCurrentTrack(track);
  //   setIsPlaying(true);
  //   if (audioRef.current) {
  //     audioRef.current.src = track.url;
  //     audioRef.current.play();
  //   }
  // };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recentlyPlayed.map((track, index) => (
          <div
            key={index}
            className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors group cursor-pointer"
            onClick={() => handleTrackClick(track)}
          >
            <div className="relative mb-4">
              <img
                src={track.image}
                alt={track.title}
                className="w-full aspect-square object-cover rounded-md"
              />
              <button
                className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTrackClick(track);
                }}
              >
                {currentTrack.url === track.url && isPlaying ? (
                  <Pause size={24} className="text-black" />
                ) : (
                  <Play size={24} className="text-black ml-1" />
                )}
              </button>
            </div>
            <h3 className="font-bold truncate">{track.title}</h3>
            <p className="text-sm text-gray-400 truncate">{track.artist}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
