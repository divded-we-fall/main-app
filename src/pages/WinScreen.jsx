import React from 'react';

const WinScreen = ({ level, onContinue }) => {
  return (
    <div className="text-center text-white">
      <h2 className="text-4xl mb-8">Level {level} Completed!</h2>
      <button
        onClick={onContinue}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Continue
      </button>
    </div>
  );
};

export default WinScreen;