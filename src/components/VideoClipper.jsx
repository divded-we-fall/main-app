import React from 'react';
import { SpongeBobBrainRotQuizVideo } from '../assets/videos';
import { gameScreenHeight, blockWidth, gameScreenWidth } from '../data/constants';

const VideoClipper = ({ rectangle, index }) => {
  console.log(rectangle);
  return (
    <>
      <svg
        width={0}
        height={0}
        style={{ position: 'absolute' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={`clip-path-${index}`}>
            <rect
              key={index}
              x={rectangle.left - gameScreenWidth / 2 + blockWidth / 2}
              y={gameScreenHeight - 25.8 * (index + 1)}
              width={rectangle.width}
              height={25.8}
            />
          </clipPath>
        </defs>
      </svg>
      <video
        src={SpongeBobBrainRotQuizVideo}
        width={blockWidth}
        height={gameScreenHeight}
        style={{
          clipPath: `url(#clip-path-${index})`,
          position: 'absolute',
          top: 0,
        }}
        autoPlay
        muted
        loop
        className=' left-1/2 z-10 -translate-x-1/2 absolute'
      />
    </>
  );
};

export default VideoClipper;
