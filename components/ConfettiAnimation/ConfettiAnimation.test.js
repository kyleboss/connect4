import React from "react";
import { render } from "@testing-library/react";
import lottie from "lottie-web";

import ConfettiAnimation from "./ConfettiAnimation";
import useGame from "../../hooks/useGame";

jest.mock("lottie-web", () => ({
  loadAnimation: jest.fn().mockReturnValue({
    goToAndPlay: jest.fn(),
    stop: jest.fn(),
    destroy: jest.fn(),
  }),
}));

jest.mock("../../hooks/useGame", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("ConfettiAnimation", () => {
  it("renders correctly when it is the user's win", () => {
    useGame.mockImplementation(() => ({
      userRole: "Red",
      gameState: "GAME_STATE_GAME_OVER",
      winner: "Red",
    }));

    const { asFragment } = render(<ConfettiAnimation />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly when it is the user's win", () => {
    useGame.mockImplementation(() => ({
      userRole: "Red",
      gameState: "GAME_STATE_GAME_OVER",
      winner: "Red",
    }));

    const { asFragment } = render(<ConfettiAnimation />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("loads but does not play animation when it is not the user's win", () => {
    useGame.mockImplementation(() => ({
      userRole: "Yellow",
      gameState: "GAME_STATE_GAME_OVER",
      winner: "Red",
    }));

    render(<ConfettiAnimation />);
    expect(lottie.loadAnimation).toHaveBeenCalled();
    expect(lottie.loadAnimation().goToAndPlay).not.toHaveBeenCalled();
  });
});
