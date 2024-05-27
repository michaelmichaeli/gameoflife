const generateEmptyBoard = (rows, cols) => {
  return Array.from(Array(rows), () => Array(cols).fill(0));
};

export { generateEmptyBoard };