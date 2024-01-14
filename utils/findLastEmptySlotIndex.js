const findLastEmptySlotIndex = (board, columnIndex) => {
  for (let i = board.length - 1; i >= 0; i--) {
    if (!board[i][columnIndex]) {
      return i;
    }
  }
  return -1; // Indicates the column is full
};

module.exports = findLastEmptySlotIndex;
