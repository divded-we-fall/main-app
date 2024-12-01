import { useState } from "react";
import { LevelData } from "../data/levelData";

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    lives: 3,
    currentScreen: "title",
    highestLevel: 1,
    selectedLevel: null,
    currentLevel: null,
    score: 0,
  });

  const startGame = () => {
    setGameState((prev) => ({ ...prev, currentScreen: "level-select" }));
  };

  const selectLevel = (level) => {
    setGameState((prev) => ({
      ...prev,
      selectedLevel: level,
      currentScreen: "game",
      currentLevel: LevelData[level],
    }));
  };

  const levelFail = () => {
    setGameState((prev) => ({
      ...prev,
      lives: prev.lives - 1,
    }));
  };

  const gameOver = (score) => {
    setGameState((prev) => ({
      ...prev,
      currentScreen: "lose",
      score: score,
    }));
  };

  const winLevel = () => {
    setGameState((prev) => ({
      ...prev,
      currentScreen: "win",
      highestLevel: prev.highestLevel + 1,
      currentLevel: prev.currentLevel + 1,
    }));
  };

  const restartGame = () => {
    setGameState((prev) => ({
      ...prev,
      currentScreen: "level-select",
      score: 0,
      lives: 3,
    }));
  };

  const continueToLevelSelect = () => {
    setGameState((prev) => ({
      ...prev,
      currentScreen: "level-select",
    }));
  };

  return {
    gameState,
    startGame,
    selectLevel,
    gameOver,
    winLevel,
    restartGame,
    levelFail,
    continueToLevelSelect,
  };
};
