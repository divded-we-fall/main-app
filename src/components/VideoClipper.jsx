import React, { useEffect, useRef } from 'react';
import { gameScreenHeight, blockWidth, gameScreenWidth, numberOfBlocksPerGame } from '../data/constants';

const VideoClipper = ({ rectangle, index, video, reveal = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (reveal && videoRef.current) {
      videoRef.current.currentTime = 0; // Reset the video to the beginning
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause(); // Pause the video when not revealed
    }
  }, [reveal]);

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
              x={rectangle.left - gameScreenWidth / 2 + blockWidth / 2 + 5}
              y={gameScreenHeight - (gameScreenHeight / numberOfBlocksPerGame) * (index + 1) - 7}
              width={rectangle.width}
              height={gameScreenHeight / numberOfBlocksPerGame}
            />
          </clipPath>
        </defs>
      </svg>
      <video
        ref={videoRef}
        src={video}
        width={blockWidth}
        height={gameScreenHeight}
        style={{
          clipPath: `url(#clip-path-${index})`,
          position: 'absolute',
          top: 0,
          opacity: `${reveal ? '1' : '0'}`,
        }}
        loop
        muted={false}
        className="left-1/2 transition-opacity duration-1000 z-10 -translate-x-1/2 absolute"
      />
    </>
  );
};

export default VideoClipper;
