import { useState } from "react";
import { LevelData } from "../data/LevelData";
import select_sfx from "../assets/sfx/select.mp3";

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    lives: 3,
    currentScreen: "title",
    highestLevel: 5,
    selectedLevel: null,
    score: 0,
  });

  const playSFX = (file, volume) => {
    const sfx = new Audio(file);
    sfx.volume = volume; // Set volume
    sfx.play();
  };

  const startGame = () => {
    playSFX(select_sfx, 0.2);
    setGameState((prev) => ({ ...prev, currentScreen: "level-select" }));
  };

  const selectLevel = (level) => {
    playSFX(select_sfx, 0.2);
    setGameState((prev) => ({
      ...prev,
      selectedLevel: level,
      currentScreen: "game",
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
      highestLevel: prev.selectedLevel === prev.highestLevel ? prev.highestLevel + 1 : prev.highestLevel, 
    }));
  };

  const restartGame = () => {
    playSFX(select_sfx, 0.2);
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
