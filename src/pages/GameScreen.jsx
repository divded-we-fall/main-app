import React, { useState, useEffect, useRef, Fragment } from 'react';
import { gameScreenWidth, blockWidth, gameScreenHeight, numberOfBlocksPerGame } from '../data/constants.js';
import { calculateMissBlockColour, getRandomItemInArray } from '../utils/gameScreenUtils.js'
import AnimatedNumberChange from '../components/AnimatedNumberChange.jsx';
import { EmptyHeartIcon, FilledHeartIcon } from '../assets/icons/index.js';

const perfectLeft = gameScreenWidth / 2 - blockWidth / 2;

const GameScreen = ({ lives, level, onLevelFail, onWin }) => {
  const [stackedBlocks, setStackedBlocks] = useState([]);
  const [isMoving, setIsMoving] = useState(true); 

  const containerRef = useRef(null);
  const movingBlockRef = useRef(null);

  const containerLeft = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      containerLeft.current = rect.left;
    }
  }, []);

  if (stackedBlocks.length === numberOfBlocksPerGame) {
    onWin();
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && isMoving) {
        setIsMoving(false);

        if (movingBlockRef.current && containerRef.current) {
          const blockRect = movingBlockRef.current.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();

          const relativeLeft = Math.abs((blockRect.left - containerRect.left + blockWidth / 2) - gameScreenWidth / 2) < 50
            ? perfectLeft
            : blockRect.left - containerRect.left;

          setStackedBlocks(prev => [...prev, relativeLeft]);
          setIsMoving(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMoving]);

  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-white'>Build the talk tuah podcast</h1>
      <div
        ref={containerRef}
        style={{
          height: `${gameScreenHeight}px`,
          width: `${gameScreenWidth}px`
        }}
        className={`relative z-10 border-5 bg-red-200 overflow-hidden`}
      >
        <ScoreDisplay stackedBlocks={stackedBlocks} />

        <ComboDisplay stackedBlocks={stackedBlocks} />

        <div className='h-full w-[1px] left-1/2 z-10 -translate-x-1/2 bg-red-600 m-auto absolute top-0'></div>

        <StackedBlocks stackedBlocks={stackedBlocks} />

        <div className='absolute top-2 flex gap-4 right-2'>
          {Array.from({ length: lives }, (_, index) => (
            <img key={index} src={FilledHeartIcon} alt='heart' className='w-14 h-14' />
          ))}
        </div>

        <div
          ref={movingBlockRef}
          style={{
            bottom: `${stackedBlocks.length * gameScreenHeight / numberOfBlocksPerGame}px`,
            height: `${gameScreenHeight / numberOfBlocksPerGame}px`,
            width: `${blockWidth}px`
          }}
          className={`text-center border border-blue-700 absolute flex items-center justify-center bg-blue-400 
          ${isMoving ? 'animate-slide' : ''}`}
        >{`<div></div>`}
          <div className='h-full w-1 left-1/2 -translate-x-1/2 bg-red-500 m-auto absolute top-0'></div>
        </div>
      </div>
    </div>
  );
};


const StackedBlocks = ({ stackedBlocks }) => {
  const [missMessages, setMissMessages] = useState([]);

  const closeMissMessage = ["sus", "gyatt", "-1", 'bruh']
  const mediumMissMessage = ["negative aura", "not sigma"]
  const farMissMessage = ["not skibidi toilet rizz", "what da hellllll", "internship gone"]

  useEffect(() => {
    let message = ''
    const missBlockWidth = Math.abs((stackedBlocks[stackedBlocks.length - 1] + blockWidth / 2) - gameScreenWidth / 2)

    if (isNaN(missBlockWidth)) {
      return;
    }
    if (missBlockWidth < 50) {
      message = "";
    }
    else if (missBlockWidth < 100) {
      message = getRandomItemInArray(closeMissMessage);
    }
    else if (missBlockWidth < 150) {
      message = getRandomItemInArray(mediumMissMessage);
    }
    else if (typeof missBlockWidth === 'number') {
      message = getRandomItemInArray(farMissMessage);
    }
    setMissMessages(prev => [...prev, message]);
  }, [stackedBlocks]);

  return (
    <>
      {stackedBlocks.map((stackedBlockLeft, index) => {
        const missBlockWidth = Math.abs((stackedBlockLeft + blockWidth / 2) - gameScreenWidth / 2)
        return (
          <Fragment key={index}>
            <div
              key={index}
              style={{
                left: `${stackedBlockLeft}px`,
                bottom: `${index * gameScreenHeight / numberOfBlocksPerGame}px`,
                width: `${blockWidth}px`,
                height: `${gameScreenHeight / numberOfBlocksPerGame}px`
              }}
              className="absolute bg-green-500 border border-green-600"
            >
              <div className='h-full w-1 left-1/2 -translate-x-1/2 bg-red-500 m-auto absolute top-0'></div>
            </div>
            <div
              key={`close-${index}`}
              style={{
                left: `${Math.min(650, stackedBlockLeft + blockWidth / 2)}px`,
                bottom: `${index * gameScreenHeight / numberOfBlocksPerGame}px`,
                width: `${missBlockWidth}px`,
                height: `${gameScreenHeight / numberOfBlocksPerGame}px`,
                backgroundColor: `${calculateMissBlockColour(missBlockWidth)}`
              }}
              className='absolute flex items-center justify-center'
            >
              {missMessages[index]}
            </div>
          </Fragment>
        )
      })}
    </>
  );
}

const ComboDisplay = ({ stackedBlocks }) => {
  let comboPerfectCount = [...stackedBlocks].reverse().findIndex(num => num !== perfectLeft);
  if (comboPerfectCount === -1) {
    comboPerfectCount = stackedBlocks.length;
  }
  return (
    <h1
      style={{
        opacity: comboPerfectCount > 1 ? 1 : 0,
        transition: 'opacity 0.5s'
      }}
      className='absolute bottom-2 left-2 text-white bg-green-500 px-2 py-1 rounded'
    >
      COMBO! x{comboPerfectCount}
    </h1>
  );
};


const ScoreDisplay = ({ stackedBlocks }) => {
  let totalScore = 0;
  let comboCount = 0;
  for (let i = 0; i < stackedBlocks.length; i++) {
    const blockLeft = stackedBlocks[i];
    if (Math.abs(blockLeft - perfectLeft) < 50) {
      comboCount++;
    }
    else {
      comboCount = 0;
    }
    totalScore += Math.max(300 - Math.abs(blockLeft - perfectLeft), 0) * Math.max(comboCount, 1);
  }
  return (
    <AnimatedNumberChange score={totalScore} />
  );
}

export default GameScreen;
