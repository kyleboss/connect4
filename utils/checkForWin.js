const checkHorizontal = (player, board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length - 3; col++) {
      if (
        board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

const checkVertical = (player, board) => {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < board.length - 3; row++) {
      if (
        board[row][col] === player &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player &&
        board[row + 3][col] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

const checkDiagonal = (player, board) => {
  // Check right diagonal
  for (let row = 0; row < board.length - 3; row++) {
    for (let col = 0; col < board[row].length - 3; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  // Check left diagonal
  for (let row = 3; row < board.length; row++) {
    for (let col = 0; col < board[row].length - 3; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col + 1] === player &&
        board[row - 2][col + 2] === player &&
        board[row - 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  return false;
};

const checkForWin = (player, board) =>
  checkHorizontal(player, board) ||
  checkVertical(player, board) ||
  checkDiagonal(player, board);

// Must be CommonJS to accomodate for express server.
module.exports = checkForWin;
