const calculateMissBlockColour = (missBlockWidth) => {
  const green = [34, 197, 94]; // RGB for #22c55e
  const red = [255, 0, 0]; // RGB for red

  // Define the range for missBlockWidth (e.g., 0 to 500)
  const min = 0;
  const max = 200;

  // Clamp missBlockWidth within the range
  const clampedWidth = Math.max(min, Math.min(missBlockWidth, max));

  // Calculate the interpolation factor (0 for green, 1 for red)
  const t = (clampedWidth - min) / (max - min);

  // Interpolate the color
  const interpolatedColor = green.map((g, i) =>
    Math.round(g + t * (red[i] - g))
  );

  // Convert RGB to a CSS string
  return `rgb(${interpolatedColor.join(",")})`;
};

const getRandomItemInArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export { calculateMissBlockColour, getRandomItemInArray };
