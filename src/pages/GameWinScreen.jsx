import React from "react";

const GameWinScreen = ({ score }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black flex items-center justify-center p-4 w-full">
      <div className="flex flex-col md:flex-row items-center bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-12 md:p-16 shadow-2xl w-full max-w-5xl space-y-8 md:space-y-0 md:space-x-8 transform transition-all hover:scale-105 duration-300">
        {/* Left Section: Acceptance Email Image with Colorful Border */}
        <div className="flex justify-center items-center w-full md:w-2/5">
          <div className="p-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-lg">
            <img
              src="src/assets/images/acceptance_email.png"
              alt="Acceptance Email"
              className="w-64 h-auto md:w-80 md:h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Right Section: Message and Score */}
        <div className="flex flex-col items-center text-center w-full md:w-3/5">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
            CONGRATS! YOU SECURED THE INTERNSHIP!
          </h1>
          <p className="text-3xl text-gray-300">
            Your Score: <span className="text-white font-bold">{score}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameWinScreen;
