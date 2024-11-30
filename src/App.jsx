import React, { useState, useEffect, useRef } from 'react';
import { LevelData } from './data/levelData';

// Main Game Component
const App = () => {
  const [gameState, setGameState] = useState({
    currentScreen: 'title',
    selectedLevel: null,
    currentLevel: null,
    stackedBlocks: [],
    currentBlock: null,
    gameOver: false,
    score: 0
  });

  const renderScreens = () => {
    switch (gameState.currentScreen) {
      case 'title':
        return <TitleScreen onStart={() => setGameState(prev => ({ ...prev, currentScreen: 'level-select' }))} />;
      case 'level-select':
        return <LevelSelect onLevelSelect={handleLevelSelect} />;
      case 'game':
        return <GameScreen
          level={gameState.currentLevel}
          onGameOver={handleGameOver}
          onWin={handleWin}
        />;
      case 'lose':
        return <LoseScreen
          score={gameState.score}
          onRestart={handleRestart}
        />;
      case 'win':
        return <WinScreen
          level={gameState.currentLevel}
          onContinue={handleNextLevel}
        />;
      default:
        return <TitleScreen />;
    }
  };

  const handleLevelSelect = (level) => {
    setGameState(prev => ({
      ...prev,
      selectedLevel: level,
      currentScreen: 'game',
      currentLevel: LevelData[level]
    }));
  };

  const handleGameOver = (score) => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'lose',
      score: score
    }));
  };

  const handleWin = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'win'
    }));
  };

  const handleRestart = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'level-select',
      stackedBlocks: [],
      currentBlock: null,
      gameOver: false,
      score: 0
    }));
  };

  const handleNextLevel = () => {
    // Logic to progress to next level or return to level select
    setGameState(prev => ({
      ...prev,
      currentScreen: 'level-select'
    }));
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
      {renderScreens()}
    </div>
  );
};

// Title Screen Component
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

// Level Select Component
const LevelSelect = ({ onLevelSelect }) => {
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

// Game Screen Component
const GameScreen = ({ level, onGameOver, onWin }) => {
  const [isMoving, setIsMoving] = useState(true);
  const [lockedPosition, setLockedPosition] = useState(null);
  const [blockCount, setBlockCount] = useState(0);
  const [stackedBlocks, setStackedBlocks] = useState([]);
  const blockRef = useRef(null);
  const containerRef = useRef(null);

  if (stackedBlocks.length === 14) {
    onWin();
  }

  // Calculate total score by summing up the left positions of stacked blocks
  const totalScore = stackedBlocks.reduce((sum, block) => sum + block.left, 0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && isMoving) {
        // Stop the animation
        setIsMoving(false);

        // Get the current position of the block relative to the container
        if (blockRef.current && containerRef.current) {
          const blockRect = blockRef.current.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          const relativeLeft = blockRect.left - containerRect.left;

          // Add the current block to stacked blocks
          setStackedBlocks(prev => [
            ...prev,
            {
              left: relativeLeft,
              blockNumber: blockCount
            }
          ]);

          // Increment block count and prepare for next block
          setBlockCount(prev => prev + 1);
          setLockedPosition(0); // Set to left of the container
          setIsMoving(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMoving, blockCount]);

  return (
    <div
      ref={containerRef}
      className="relative w-[700px] h-[calc(14*48px)] z-10 border-5 bg-red-200 overflow-hidden"
    >
      <h1 className='z-20 relative'>Score: {Math.round(totalScore)}</h1>
      <div className='h-full w-1 left-1/2 z-10 -translate-x-1/2  bg-red-500 m-auto absolute top-0 '></div>

      {/* Render stacked blocks */}
      {stackedBlocks.map((block) => (
        <div 
          key={block.blockNumber}
          style={{
            left: `${block.left}px`,
            bottom: `${block.blockNumber * 48}px`
          }}
          className="absolute h-12 w-[400px] bg-green-500"
        >        <div className='h-full w-1 left-1/2 -translate-x-1/2  bg-red-500 m-auto absolute top-0 '></div>
        </div>
      ))}

      {stackedBlocks.map((block) => (
        <div style={{ 
          left: `${200}px`,
          bottom: `${block.blockNumber * 48}px`
        }} className='absolute'>close!</div>
      ))}

      <div
        ref={blockRef}
        style={{
          left: lockedPosition !== null ? `${lockedPosition}px` : undefined,
          bottom: `${blockCount * 48}px`
        }}
        className={`text-center absolute h-12 w-[400px] flex items-center justify-center bg-blue-500 
          ${isMoving ? 'animate-slide' : ''}`}
      >{`<div></div>`}
        <div className='h-full w-1 left-1/2 -translate-x-1/2  bg-red-500 m-auto absolute top-0 '></div>
      </div>
    </div>
  );
};

// Lose Screen Component
const LoseScreen = ({ score, onRestart }) => {
  return (
    <div className="text-center text-white">
      <h2 className="text-4xl mb-8">Game Over</h2>
      <p className="mb-4">Your Score: {score}</p>
      <button
        onClick={onRestart}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Restart
      </button>
    </div>
  );
};

// Win Screen Component
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

// Pause Menu Component
const PauseMenu = ({ onResume, onQuit }) => {
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

export default App;