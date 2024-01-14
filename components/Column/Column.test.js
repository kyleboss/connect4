import { render, fireEvent } from "@testing-library/react";
import Column from "./Column";
import useGame from "../../hooks/useGame";
import { USER_ROLE_RED } from "@/utils/constants";

jest.mock("../../hooks/useGame", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    board: [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ],
    makeMove: jest.fn(),
    currentPlayer: USER_ROLE_RED,
    userRole: USER_ROLE_RED,
  })),
}));

describe("Column Component", () => {
  const mockMakeMove = jest.fn();
  const mockBoard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];
  const mockCurrentPlayer = USER_ROLE_RED;
  const mockUserRole = USER_ROLE_RED;
  const columnIndex = 3;

  beforeEach(() => {
    useGame.mockImplementation(() => ({
      makeMove: mockMakeMove,
      board: mockBoard,
      currentPlayer: mockCurrentPlayer,
      userRole: mockUserRole,
    }));
  });

  it("renders correct number of slots", () => {
    const { getAllByTestId } = render(<Column columnIndex={columnIndex} />);
    expect(getAllByTestId("slot").length).toBe(mockBoard.length);
  });

  it("calls makeMove with correct index on click", () => {
    const { getByTestId } = render(<Column columnIndex={columnIndex} />);
    const column = getByTestId("column");
    fireEvent.click(column);
    expect(mockMakeMove).toHaveBeenCalledWith(columnIndex);
  });
});
