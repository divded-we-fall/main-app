import React from "react";

const LevelSelectScreen = ({ onLevelSelect, highestLevel }) => {
  const levels = [
    {
      id: 1,
      name: "Female empowerment podcast",
      locked: false,
    },
    {
      id: 2,
      name: "Kai cenat clip",
      locked: highestLevel < 2 ? true : false,
    },
    {
      id: 3,
      name: "Song of the year",
      locked: highestLevel < 3 ? true : false,
    },
    {
      id: 4,
      name: "City Lights",
      locked: highestLevel < 4 ? true : false,
    },
    {
      id: 5,
      name: "Cosmic Journey",
      locked: highestLevel < 5 ? true : false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black flex items-center justify-center p-4 w-full">
      <div className="text-center bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-12 shadow-2xl transform transition-all hover:scale-105 duration-300 w-full max-w-4xl">
        <h1 className="text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          Level Select
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => !level.locked && onLevelSelect(level.id)}
              className={`
                p-4 rounded-lg text-white
                ${
                  level.locked
                    ? "bg-gray-500 cursor-not-allowed opacity-50"
                    : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                }
              `}
              disabled={level.locked}
            >
              {level.name}
              {level.locked && <span className="ml-2">🔒</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelectScreen;
