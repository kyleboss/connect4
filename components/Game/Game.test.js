import React from "react";
import { render } from "@testing-library/react";

import Game from "./Game";
import useGame from "../../hooks/useGame";

jest.mock("../../hooks/useGame", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../Board", () => {
  const Board = () => <div>Mocked Board</div>;
  Board.displayName = "Board";
  return Board;
});

jest.mock("../YourTurn", () => {
  const YourTurn = () => <div>Mocked YourTurn</div>;
  YourTurn.displayName = "YourTurn";
  return YourTurn;
});

describe("Game", () => {
  it("renders WaitingForPlayers when gameState is waiting", () => {
    useGame.mockImplementation(() => ({
      userRole: "Red",
      gameState: "GAME_STATE_WAITING",
      resetGame: jest.fn(),
    }));

    const { asFragment } = render(<Game />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders GameOver when gameState is game over", () => {
    useGame.mockImplementation(() => ({
      userRole: "Red",
      gameState: "GAME_STATE_GAME_OVER",
      resetGame: jest.fn(),
    }));

    const { asFragment } = render(<Game />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the game board, YourTurn and Reset button for players", () => {
    useGame.mockImplementation(() => ({
      userRole: "Red",
      gameState: "some_other_state",
      resetGame: jest.fn(),
    }));

    const { asFragment, getByText } = render(<Game />);
    expect(getByText("Mocked Board")).toBeInTheDocument();
    expect(getByText("Mocked YourTurn")).toBeInTheDocument();
    expect(getByText("Reset Game")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("does not render Reset button for guests", () => {
    useGame.mockImplementation(() => ({
      userRole: "USER_ROLE_GUEST",
      gameState: "some_other_state",
      resetGame: jest.fn(),
    }));

    const { queryByText } = render(<Game />);
    expect(queryByText("Reset Game")).not.toBeInTheDocument();
  });
});
