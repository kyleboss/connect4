const checkForTie = (board) =>
  board.every((row) => row.every((cell) => cell !== null));

module.exports = checkForTie;
