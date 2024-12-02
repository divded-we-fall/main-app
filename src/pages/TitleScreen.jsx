import React from "react";

const TitleScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black flex items-center justify-center p-4 w-full">
      <div className="text-center bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-12 shadow-2xl transform transition-all hover:scale-105 duration-300">
        <h1 className="text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          Centre the Div
        </h1>
        <div className="mb-10 space-y-4">
          <p className="text-2xl text-gray-300 italic">
            For optimal performance, play on full screen
          </p>
          <div className="flex justify-center">
            <div className="w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
          </div>
        </div>
        <button
          onClick={onStart}
          className="group relative px-10 py-4 text-xl rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300 
          transform hover:-translate-y-1 hover:shadow-lg 
          before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-300 
          hover:before:opacity-20"
        >
          Start Game
        </button>
        <div className="mt-8 text-sm text-gray-500 opacity-75">
          <p>Pro Tip: Your CSS skills will be put to the test!</p>
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;
