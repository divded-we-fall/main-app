import React from "react";

const WinScreen = ({ level, score, onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black flex items-center justify-center p-4 w-full">
      <div className="text-center bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-12 shadow-2xl transform transition-all hover:scale-105 duration-300 w-full max-w-4xl">
        <h2 className="text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          Level {level} Completed!
        </h2>
        <p className="text-2xl text-gray-300 mb-8">Your score: {score}</p>
        <button
          onClick={onContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WinScreen;
