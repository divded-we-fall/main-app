import React from "react";

const LoseScreen = ({ score, onRestart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black flex items-center justify-center p-4 w-full">
      <div className="flex flex-col md:flex-row items-center bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-12 md:p-16 shadow-2xl w-full max-w-5xl space-y-8 md:space-y-0 md:space-x-8 transform transition-all hover:scale-105 duration-300">
        {/* Left Section: Rejection Email Image */}
        <div className="flex justify-center items-center w-full md:w-2/5">
          <img
            src="src/assets/images/rejection_email.png" // Replace with your actual image path
            alt="Rejection Email"
            className="w-64 h-auto md:w-80 md:h-auto rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          />
        </div>

        {/* Right Section: Message and Restart Button */}
        <div className="flex flex-col items-center text-center w-full md:w-3/5">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">
            You failed to centre the divs!
          </h1>
          <p className="text-3xl text-gray-300 mb-8">
            Your Score: <span className="text-white font-bold">{score}</span>
          </p>
          <button
            onClick={onRestart}
            className="group relative px-12 py-6 text-2xl rounded-full bg-red-500 hover:bg-red-600 text-white font-bold transition-all duration-300 
            transform hover:-translate-y-1 hover:shadow-lg 
            before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-300 
            hover:before:opacity-20"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoseScreen;
