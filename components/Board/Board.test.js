import { render, fireEvent } from "@testing-library/react";

import { USE_ROLE_RED } from "@/utils/constants";

import useGame from "../../hooks/useGame";
import Board from "./Board";

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
    currentPlayer: USE_ROLE_RED,
    userRole: USE_ROLE_RED,
  })),
}));
describe("Board", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Board />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the correct number of slots", () => {
    useGame.mockImplementation(() => ({
      board: [[null, null, null, null, null, null, null]],
      makeMove: jest.fn(),
      currentPlayer: "Red",
      userRole: "Red",
    }));
    const { getAllByRole } = render(<Board />);
    expect(getAllByRole("button").length).toBe(7);
  });

  it("calls makeMove when a slot is clicked", () => {
    const makeMoveMock = jest.fn();
    useGame.mockImplementation(() => ({
      board: [[null, null, null, null, null, null, null]],
      makeMove: makeMoveMock,
      currentPlayer: "Red",
      userRole: "Red",
    }));
    const { getAllByRole } = render(<Board />);
    const slots = getAllByRole("button");
    fireEvent.click(slots[0]);
    expect(makeMoveMock).toHaveBeenCalledWith(0);
  });
});
