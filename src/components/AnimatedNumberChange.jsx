import React, { useState, useEffect } from 'react';

const AnimatedNumberChange = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // If the actual score is different from the displayed score
    if (score !== displayScore) {
      // Determine the step size for smooth animation
      const stepSize = Math.abs(score - displayScore) > 50 
        ? Math.ceil(Math.abs(score - displayScore) / 20) 
        : 1;

      // Set up an interval to increment/decrement the displayed score
      const timer = setInterval(() => {
        setDisplayScore(current => {
          if (current < score) {
            return Math.min(current + stepSize, score);
          } else if (current > score) {
            return Math.max(current - stepSize, score);
          }
          return current;
        });
      }, 15); // Adjust this value to control animation speed

      // Clear the interval when we reach the target score or component unmounts
      return () => clearInterval(timer);
    }
  }, [score]);

  return (
    <div className="text-4xl font-bold">
      Score: {Math.round(displayScore)}
    </div>
  );
};

export default AnimatedNumberChange;