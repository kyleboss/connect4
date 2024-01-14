const checkForWin = require("./checkForWin");

describe("Check For Win", () => {
  const player = "X";

  describe("checkHorizontal", () => {
    it("should return true for a horizontal win", () => {
      const board = [
        ["X", "X", "X", "X", null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      expect(checkForWin(player, board)).toBe(true);
    });

    it("should return false when there is no horizontal win", () => {
      const board = [
        ["X", null, "X", "X", null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      expect(checkForWin(player, board)).toBe(false);
    });
  });

  describe("checkVertical", () => {
    it("should return true for a vertical win", () => {
      const board = [
        ["X", null, null, null, null, null, null],
        ["X", null, null, null, null, null, null],
        ["X", null, null, null, null, null, null],
        ["X", null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      expect(checkForWin(player, board)).toBe(true);
    });

    it("should return false when there is no vertical win", () => {
      const board = [
        ["X", null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ["X", null, null, null, null, null, null],
        ["X", null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      expect(checkForWin(player, board)).toBe(false);
    });
  });

  describe("checkDiagonal", () => {
    it("should return true for a right diagonal win", () => {
      const board = [
        ["X", null, null, null, null, null, null],
        [null, "X", null, null, null, null, null],
        [null, null, "X", null, null, null, null],
        [null, null, null, "X", null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      expect(checkForWin(player, board)).toBe(true);
    });

    it("should return true for a left diagonal win", () => {
      const board = [
        [null, null, null, "X", null, null, null],
        [null, null, "X", null, null, null, null],
        [null, "X", null, null, null, null, null],
        ["X", null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      expect(checkForWin(player, board)).toBe(true);
    });

    it("should return false when there is no diagonal win", () => {
      const board = [
        ["X", null, null, null, null, null, null],
        [null, "X", null, null, null, null, null],
        [null, null, null, "X", null, null, null],
        [null, null, "X", null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      expect(checkForWin(player, board)).toBe(false);
    });
  });

  describe("Overall Win Check", () => {
    it("should return true when there is any type of win", () => {
      const board = [
        [null, null, null, null, null, null, null],
        ["X", "X", "X", "X", null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      expect(checkForWin(player, board)).toBe(true);
      const verticalBoard = [
        ["X", null, null, null, null, null, null],
        ["X", null, null, null, null, null, null],
        ["X", null, null, null, null, null, null],
        ["X", null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      expect(checkForWin(player, verticalBoard)).toBe(true);

      const diagonalBoard = [
        [null, null, null, "X", null, null, null],
        [null, null, "X", null, null, null, null],
        [null, "X", null, null, null, null, null],
        ["X", null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      expect(checkForWin(player, diagonalBoard)).toBe(true);
    });

    it("should return false when there is no win", () => {
      const board = [
        ["X", null, null, null, null, null, null],
        [null, "X", null, "X", null, null, null],
        ["X", null, null, null, "X", null, null],
        [null, "X", null, null, null, "X", null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      expect(checkForWin(player, board)).toBe(false);
    });
  });
});
