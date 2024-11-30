import React from 'react';

const LoseScreen = ({ score, onRestart }) => {
  return (
    <div className="text-center text-white">
      <h2 className="text-4xl mb-8">Game Over</h2>
      <p className="text-2xl mb-4">Your Score: {score}</p>
      <button
        onClick={onRestart}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Restart
      </button>
    </div>
  );
};

export default LoseScreen;