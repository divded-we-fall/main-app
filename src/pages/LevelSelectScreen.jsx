import React from 'react';

const LevelSelectScreen = ({ onLevelSelect }) => {
  const levels = [
    { id: 1, name: 'Female empowerment podcast', locked: false },
    { id: 2, name: 'Kai cenat clip', locked: true },
    { id: 3, name: 'Song of the year', locked: true },
    { id: 4, name: 'City Lights', locked: true },
    { id: 5, name: 'Cosmic Journey', locked: true }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {levels.map(level => (
        <button
          key={level.id}
          onClick={() => !level.locked && onLevelSelect(level.id)}
          className={`
            p-4 rounded-lg text-white 
            ${level.locked
              ? 'bg-gray-500 cursor-not-allowed opacity-50'
              : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
            }
          `}
          disabled={level.locked}
        >
          {level.name}
          {level.locked && <span className="ml-2">🔒</span>}
        </button>
      ))}
    </div>
  );
};

export default LevelSelectScreen;