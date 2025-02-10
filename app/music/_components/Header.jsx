import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
} from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-[#121212] flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-full bg-black/40">
            <ChevronLeft size={24} />
          </button>
          <button className="p-1 rounded-full bg-black/40">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex-1 min-w-[200px] max-w-[400px]">
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="What do you want to play?"
              className="w-full py-2 pl-10 pr-4 rounded-full bg-[#242424] text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <button className="px-4 py-2 rounded-full bg-white text-black font-bold whitespace-nowrap">
            Explore Premium
          </button>
          <button className="px-4 py-2 rounded-full bg-[#242424] text-white font-bold flex items-center gap-2 whitespace-nowrap">
            <Download size={20} /> Install App
          </button>
          <button className="p-2">
            <Bell size={20} />
          </button>
          <button className="w-8 h-8 rounded-full bg-[#282828] flex items-center justify-center">
            M
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
