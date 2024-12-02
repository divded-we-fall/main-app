import React from "react";

const GameWinScreen = ({ score }) => {
  return (
    <div className="text-center text-white">
      <h2 className="text-4xl mb-8">YOU DID IT YAYYY!</h2>
      <p className="text-2xl mb-4">Your Score: {score}</p>
    </div>
  );
};

export default GameWinScreen;
