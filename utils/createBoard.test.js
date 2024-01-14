const createBoard = require("./createBoard");

describe("createBoard", () => {
  it("creates a 6x7 board", () => {
    const board = createBoard();
    expect(board.length).toBe(6);
    board.forEach((row) => {
      expect(row.length).toBe(7);
    });
  });

  it("initializes all positions to null", () => {
    const board = createBoard();
    board.forEach((row) => {
      row.forEach((cell) => {
        expect(cell).toBeNull();
      });
    });
  });
});
