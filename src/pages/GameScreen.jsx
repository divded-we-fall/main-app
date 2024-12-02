import React, { useState, useEffect, useRef, Fragment, useCallback, useMemo } from "react";
import {
  gameScreenWidth,
  blockWidth,
  gameScreenHeight,
  numberOfBlocksPerGame,
  leniency,
} from "../data/constants.js";
import {
  calculateMissBlockColour,
  calculateMissBlockWidth,
  getRandomItemInArray,
} from "../utils/gameScreenUtils.js";
import { AnimatedNumberChange, VideoClipper } from "../components/index.js";
import { EmptyHeartIcon, FilledHeartIcon } from "../assets/icons/index.js";
import "../styles/GameScreen.css";
import LevelFailModal from "./LevelFailModal.jsx";

import lose_game_sfx from "../assets/sfx/lose_game.wav";
import lose_level_sfx from "../assets/sfx/lose_level.wav";
import place_perfect_sfx from "../assets/sfx/place_perfect.wav";
import place_okay_sfx from "../assets/sfx/place_okay.wav";
import place_bad_sfx from "../assets/sfx/place_bad.wav";
import win_level_sfx from "../assets/sfx/win_level.mp3";

const GameScreen = ({ lives, level, onWin, onGameOver, onLevelFail }) => {
  const [stackedBlocks, setStackedBlocks] = useState([]);
  const [movingBlockWidth, setMovingBlockWidth] = useState(blockWidth);
  const [isLevelFailed, setIsLevelFailed] = useState(false);

  const containerRef = useRef(null);
  const movingBlockRef = useRef(null);
  const containerLeft = useRef(0);

  const closeMissMessages = ["sus", "gyatt", "-1", "bruh"];
  const mediumMissMessages = ["negative aura", "not sigma"];
  const farMissMessages = ["what da hellllll", "internship gone"];

  // defining bg music
  const bgAudio = new Audio(level.music);
  bgAudio.loop = true; // Loop the music
  bgAudio.volume = 0.1; // Set the volume (0.0 to 1.0)

  // play bg music
  useEffect(() => {
    bgAudio.play();
    return () => {
      bgAudio.pause();
      bgAudio.currentTime = 0; // Stop the music when the component unmounts
    };
  }, []);

  const totalScore = useMemo(() => {
    let comboCount = 0;
    return stackedBlocks.reduce((score, block) => {
      const missBlockWidth = calculateMissBlockWidth(block.left, block.width);
      comboCount = missBlockWidth < leniency ? comboCount + 1 : 0;
      return score + Math.max(300 - missBlockWidth * Math.max(comboCount, 1));
    }, 0);
  }, [stackedBlocks, leniency]);

  //play sfx
  const playSFX = (file, volume) => {
    const sfx = new Audio(file);
    sfx.volume = volume; // Set volume
    sfx.play();
  };

  const handleLevelFail = () => {
    onLevelFail();
    if (lives - 1 <= 0) {
      playSFX(lose_game_sfx, 0.2);
      onGameOver();
    } else {
      playSFX(lose_level_sfx, 0.2);
      setIsLevelFailed(true);
      setStackedBlocks([]);
    }
  };

  const handleTryAgain = () => {
    setIsLevelFailed(false);
    setStackedBlocks([]);
    setMovingBlockWidth(blockWidth);
  };

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      containerLeft.current = rect.left;
    }
  }, []);

  useEffect(() => {
    if (stackedBlocks.length === numberOfBlocksPerGame) {
      bgAudio.volume = 0;
      playSFX(win_level_sfx, 0.2);
      const winTimer = setTimeout(() => {
        onWin(parseInt(totalScore));
      }, level.videoLength * 1000);

      // Clean up the timer if the component unmounts
      return () => clearTimeout(winTimer);
    }
  }, [stackedBlocks, onWin, level.videoLength]);

  const handleKeyDown = (e) => {
    if (e.code === "Space" && !isLevelFailed) {
      if (
        movingBlockRef.current &&
        containerRef.current &&
        stackedBlocks.length < numberOfBlocksPerGame
      ) {
        const blockRect = movingBlockRef.current.getBoundingClientRect();
        const missBlockWidth = calculateMissBlockWidth(
          blockRect.left - containerLeft.current,
          movingBlockWidth
        );
        const relativeLeft =
          missBlockWidth < leniency
            ? gameScreenWidth / 2 - movingBlockWidth / 2
            : blockRect.left - containerLeft.current;

        // Reduce block width based on miss
        const newBlockWidth = Math.max(movingBlockWidth - missBlockWidth, 0);
        setMovingBlockWidth(newBlockWidth);

        if (newBlockWidth === 0 || missBlockWidth > movingBlockWidth / 2) {
          handleLevelFail();
        }

        // Determine miss message
        let missMessage = "";
        if (missBlockWidth < leniency) {
          missMessage = "";
          playSFX(place_perfect_sfx, 0.2);
        } else if (missBlockWidth < 75) {
          missMessage = getRandomItemInArray(closeMissMessages);
          playSFX(place_okay_sfx, 0.2);
        } else if (missBlockWidth < 125) {
          playSFX(place_bad_sfx, 0.2);
          missMessage = getRandomItemInArray(mediumMissMessages);
        } else {
          playSFX(place_bad_sfx, 0.2);
          missMessage = getRandomItemInArray(farMissMessages);
        }
        setStackedBlocks((prev) => [
          ...prev,
          {
            left: relativeLeft,
            width: movingBlockWidth,
            missWidth: missBlockWidth,
            missMessage: missMessage,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
        Build the talk tuah podcast
      </h1>
      {isLevelFailed && <LevelFailModal onTryAgain={handleTryAgain} />}
      <div
        ref={containerRef}
        style={{
          height: `${gameScreenHeight}px`,
          width: `${gameScreenWidth}px`,
        }}
        className={`relative z-10 bg-gradient-to-b from-white ${level.color} border-4 border-black-700" overflow-hidden`}>
        {stackedBlocks.map((stackedBlock, index) => (
          <VideoClipper
            rectangle={stackedBlock}
            index={index}
            video={level.videoUrl}
            reveal={stackedBlocks.length === numberOfBlocksPerGame}
          />
        ))}

        <ScoreDisplay totalScore={totalScore} />

        <ComboDisplay stackedBlocks={stackedBlocks} />

        <div
          style={{
            opacity: stackedBlocks.length === numberOfBlocksPerGame ? 0 : 1,
          }}
          className="dashed-centerline"></div>

        <StackedBlocks stackedBlocks={stackedBlocks} />

        <div className="absolute top-2 right-2 flex gap-2">
          {[1, 2, 3].map((heartIndex) => (
            <img
              key={heartIndex}
              src={heartIndex <= lives ? FilledHeartIcon : EmptyHeartIcon}
              alt={`Heart ${heartIndex}`}
              className="w-10 h-10"
            />
          ))}
        </div>

        <div
          ref={movingBlockRef}
          style={{
            "--block-width": `${movingBlockWidth}px`,
            "--game-screen-width": `${gameScreenWidth}px`,
            "--animation-duration": `${level.speed}s`, // Set the animation duration here
            bottom: `${(stackedBlocks.length * gameScreenHeight) / numberOfBlocksPerGame
              }px`,
            height: `${gameScreenHeight / numberOfBlocksPerGame}px`,
            width: `${movingBlockWidth}px`,
          }}
          className={`text-center whitespace-nowrap absolute flex items-center justify-center bg-blue-400 border border-black-700 ${!isLevelFailed ? "moving-block" : ""
            }`}
        >
          {`<div></div>`}
          <div className="h-full w-1 left-1/2 -translate-x-1/2 bg-red-500 m-auto absolute top-0"></div>
        </div>
      </div>
    </div>
  );
};

const StackedBlocks = ({ stackedBlocks }) => {
  return (
    <>
      {stackedBlocks.map((stackedBlock, index) => {
        const missBlockWidth = Math.abs(
          stackedBlock.left + stackedBlock.width / 2 - gameScreenWidth / 2
        );
        return (
          <Fragment key={index}>
            <div
              style={{
                left: `${stackedBlock.left}px`,
                bottom: `${(index * gameScreenHeight) / numberOfBlocksPerGame
                  }px`,
                width: `${stackedBlock.width}px`,
                height: `${gameScreenHeight / numberOfBlocksPerGame}px`,
              }}
              className="absolute bg-green-500 border border-green-600"
            >
              <div className="h-full w-1 left-1/2 -translate-x-1/2 bg-red-500 m-auto absolute top-0"></div>
            </div>
            {stackedBlock.missMessage && (
              <div
                style={{
                  left: `${Math.min(
                    650,
                    stackedBlock.left + stackedBlock.width / 2
                  )}px`,
                  bottom: `${(index * gameScreenHeight) / numberOfBlocksPerGame
                    }px`,
                  width: `${missBlockWidth}px`,
                  height: `${gameScreenHeight / numberOfBlocksPerGame}px`,
                  backgroundColor: `${calculateMissBlockColour(
                    missBlockWidth
                  )}`,
                }}
                className="absolute flex items-center justify-center text-white"
              >
                {stackedBlock.missMessage}
              </div>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

const ComboDisplay = ({ stackedBlocks }) => {
  let comboPerfectCount = [...stackedBlocks]
    .reverse()
    .findIndex((num) => num.left !== gameScreenWidth / 2 - num.width / 2);
  if (comboPerfectCount === -1) {
    comboPerfectCount = stackedBlocks.length;
  }
  return (
    <h1
      style={{
        opacity: comboPerfectCount > 1 ? 1 : 0,
        transition: "opacity 0.5s",
      }}
      className="absolute bottom-4 left-4 text-black font-bold text-2xl bg-blue-400 px-2 py-1 rounded shadow"
    >
      x{comboPerfectCount} COMBO!
    </h1>
  );
};

const ScoreDisplay = ({ totalScore }) => {
  return <AnimatedNumberChange score={totalScore} />;
};

export default GameScreen;
