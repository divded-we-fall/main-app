import React, { useEffect } from "react";
import {
  TitleScreen,
  LevelSelectScreen,
  GameScreen,
  LoseScreen,
  WinScreen,
  GameWinScreen,
} from "./pages";
import { useGameState } from "./hooks/useGameState";
import IntroScreen from "./pages/IntroScreen";
import { LevelData } from "./data/levelData";


const App = () => {
  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
      <ScreenManager />
    </div>
  );
};

const ScreenManager = () => {
  const {
    gameState,
    startGame,
    selectLevel,
    levelFail,
    gameOver,
    winLevel,
    restartGame,
    continueToLevelSelect,
  } = useGameState();

  switch (gameState.currentScreen) {
    case "intro":
      return <IntroScreen onIntroContinue={startGame} />; 
    case "title":
      return <TitleScreen onStart={startGame} />;
    case "level-select":
      return (
        <LevelSelectScreen
          onLevelSelect={selectLevel}
          highestLevel={gameState.highestLevel}
        />
      );
    case "game":
      return (
        <GameScreen
          lives={gameState.lives}
          level={LevelData[gameState.selectedLevel]}
          onWin={winLevel}
          onGameOver={gameOver}
          onLevelFail={levelFail}
        />
      );
    case "lose":
      return <LoseScreen score={gameState.score} onRestart={restartGame} />;
    case "win":
      return gameState.highestLevel < 6 ? (
        <WinScreen
          level={LevelData[gameState.selectedLevel]}
          score={gameState.score}
          onContinue={continueToLevelSelect}
        />
      ) : (
        <GameWinScreen score={gameState.score} />
      );

    default:
      return <TitleScreen onStart={startGame} />;
  }
};

export default App;
