import { gameScreenWidth, leniency } from "../data/constants";

const calculateMissBlockOpacityColour = (missBlockWidth) => {
  const red = [255, 0, 0]; // RGB for red

  // Define the range for missBlockWidth (e.g., 0 to 200)
  const min = 0;
  const max = 200;

  // Clamp missBlockWidth within the range
  const clampedWidth = Math.max(min, Math.min(missBlockWidth, max));

  // Calculate the opacity factor (0 to 1)
  const opacity = (clampedWidth - min) / (max - min);

  // Convert RGB and opacity to a CSS string
  return `rgba(${red.join(",")}, ${opacity.toFixed(2)})`;
};


const calculateMissBlockWidth = (movingBlockLeft, movingBlockWidth) => {
  const rawWidth = Math.abs(
    movingBlockLeft + movingBlockWidth / 2 - gameScreenWidth / 2
  );
  return rawWidth < leniency ? 0 : rawWidth;
};

const getRandomItemInArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export {
  calculateMissBlockOpacityColour,
  calculateMissBlockWidth,
  getRandomItemInArray,
};
