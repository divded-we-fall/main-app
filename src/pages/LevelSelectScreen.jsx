import React from "react";
import { LevelData } from "../data/levelData";

const LevelSelectScreen = ({ onLevelSelect, highestLevel }) => {

  const levels = Object.entries(LevelData).map(([key, value]) => ({
    id: parseInt(key, 10),
    ...value,
  }));


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black flex items-center justify-center p-4 w-full">
      <div className="text-center bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-12 shadow-2xl transform transition-all hover:scale-105 duration-300 w-full max-w-4xl">
        <h1 className="text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          Level Select
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {levels.map((level) => {
            const isLocked = level.id > highestLevel;
            return (
              <button
                key={level.id}
                onClick={() => !isLocked && onLevelSelect(level.id)}
                className={`
                p-4 rounded-lg text-white
                ${isLocked
                    ? "bg-gray-500 cursor-not-allowed opacity-50"
                    : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  }
              `}
                disabled={isLocked}
              >
                {level.name}
                {isLocked && <span className="ml-2">🔒</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelSelectScreen;
