import React from 'react';

const TitleScreen = ({ onStart }) => {
  return (
    <div className="text-center text-white">
      <h1 className="text-5xl font-bold mb-8">Centre the Div</h1>
      <p className="mb-12">Stack blocks perfectly to reveal a hidden video</p>
      <button
        onClick={onStart}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Start Game
      </button>
    </div>
  );
};

export default TitleScreen;