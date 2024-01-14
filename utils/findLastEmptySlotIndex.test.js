const { USER_ROLE_RED, USER_ROLE_YELLOW } = require("./constants");
const findLastEmptySlotIndex = require("./findLastEmptySlotIndex");

describe("findLastEmptySlotIndex", () => {
  it("returns the bottom index for an empty column", () => {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const columnIndex = 1;
    expect(findLastEmptySlotIndex(board, columnIndex)).toBe(2);
  });

  it("returns -1 for a full column", () => {
    const board = [
      [USER_ROLE_RED, USER_ROLE_YELLOW, USER_ROLE_RED],
      [USER_ROLE_YELLOW, USER_ROLE_RED, USER_ROLE_YELLOW],
      [USER_ROLE_RED, USER_ROLE_YELLOW, USER_ROLE_RED],
    ];
    const columnIndex = 1;
    expect(findLastEmptySlotIndex(board, columnIndex)).toBe(-1);
  });

  it("returns the first empty slot index for a partially filled column", () => {
    const board = [
      [null, USER_ROLE_YELLOW, null],
      [null, USER_ROLE_RED, null],
      [null, USER_ROLE_YELLOW, null],
    ];
    const columnIndex = 1;
    expect(findLastEmptySlotIndex(board, columnIndex)).toBe(-1);
  });

  it("works with different board sizes", () => {
    const smallBoard = [
      [null, USER_ROLE_RED],
      [USER_ROLE_YELLOW, null],
    ];
    const largeBoard = [
      [null, USER_ROLE_YELLOW, null, USER_ROLE_RED],
      [USER_ROLE_YELLOW, USER_ROLE_RED, null, null],
      [USER_ROLE_RED, USER_ROLE_YELLOW, USER_ROLE_RED, null],
      [USER_ROLE_YELLOW, USER_ROLE_RED, USER_ROLE_YELLOW, USER_ROLE_RED],
    ];

    expect(findLastEmptySlotIndex(smallBoard, 0)).toBe(0);
    expect(findLastEmptySlotIndex(smallBoard, 1)).toBe(1);
    expect(findLastEmptySlotIndex(largeBoard, 2)).toBe(1);
    expect(findLastEmptySlotIndex(largeBoard, 3)).toBe(2);
  });
});
