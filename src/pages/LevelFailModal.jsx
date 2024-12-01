import React from "react";

const LevelFailModal = ({ onTryAgain }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Level Failed</h2>
        <p className="mb-6">You didn't quite make it this time!</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onTryAgain}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelFailModal;
