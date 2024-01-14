import React from "react";
import { render } from "@testing-library/react";

import GameOver from "./GameOver";
import useGame from "../../hooks/useGame";
import {
  USER_ROLE_GUEST,
  USER_ROLE_RED,
  USER_ROLE_YELLOW,
} from "../../utils/constants";

jest.mock("../../hooks/useGame", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("GameOver", () => {
  it("renders correctly when the user wins", () => {
    useGame.mockImplementation(() => ({
      userRole: USER_ROLE_RED,
      winner: USER_ROLE_RED,
      resetGame: jest.fn(),
    }));

    const { asFragment, getByText } = render(<GameOver />);
    expect(getByText("Congratulations! 🎉")).toBeInTheDocument();
    expect(getByText("You won.")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly when the user loses", () => {
    useGame.mockImplementation(() => ({
      userRole: USER_ROLE_YELLOW,
      winner: USER_ROLE_RED,
      resetGame: jest.fn(),
    }));

    const { asFragment, getByText } = render(<GameOver />);
    expect(getByText("Game over.")).toBeInTheDocument();
    expect(getByText("Red won.")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("does not render the new game button for guests", () => {
    useGame.mockImplementation(() => ({
      userRole: USER_ROLE_GUEST,
      winner: USER_ROLE_RED,
      resetGame: jest.fn(),
    }));

    const { queryByText } = render(<GameOver />);
    expect(queryByText("New Game")).not.toBeInTheDocument();
  });
});
