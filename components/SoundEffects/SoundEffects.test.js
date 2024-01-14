import React from "react";
import { render, fireEvent } from "@testing-library/react";
import useSound from "use-sound";

import SoundEffects from "./SoundEffects";
import useGame from "../../hooks/useGame";
import { USER_ROLE_RED } from "../../utils/constants";

jest.mock("use-sound", () =>
  jest.fn().mockImplementation((sound) => [jest.fn(), { sound }])
);

jest.mock("../../hooks/useGame", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    currentPlayer: USER_ROLE_RED,
    userRole: USER_ROLE_RED,
    winner: USER_ROLE_RED,
  })),
}));

describe("SoundEffects", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<SoundEffects />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("plays notification sound when it is the user's turn", () => {
    const mockPlayNotificationSound = jest.fn();
    useSound.mockImplementation(() => [mockPlayNotificationSound]);
    useGame.mockImplementation(() => ({
      currentPlayer: USER_ROLE_RED,
      userRole: USER_ROLE_RED,
      winner: null,
    }));

    render(<SoundEffects />);
    expect(mockPlayNotificationSound).toHaveBeenCalled();
  });

  it("plays winner sound when the user wins", () => {
    const mockPlayWinnerSound = jest.fn();
    useSound.mockImplementation(() => [mockPlayWinnerSound]);
    useGame.mockImplementation(() => ({
      currentPlayer: USER_ROLE_RED,
      userRole: USER_ROLE_RED,
      winner: USER_ROLE_RED,
    }));

    render(<SoundEffects />);
    expect(mockPlayWinnerSound).toHaveBeenCalled();
  });

  it("toggles sound on click", () => {
    const { getByRole } = render(<SoundEffects />);
    const soundButton = getByRole("button");
    fireEvent.click(soundButton);
    expect(soundButton).toHaveTextContent("🔕");
    fireEvent.click(soundButton);
    expect(soundButton).toHaveTextContent("🔔");
  });
});
