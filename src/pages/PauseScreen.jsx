import React from 'react';

const PauseScreen = ({ onResume, onQuit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl mb-4">Paused</h2>
        <div className="flex space-x-4">
          <button
            onClick={onResume}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Resume
          </button>
          <button
            onClick={onQuit}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PauseScreen;