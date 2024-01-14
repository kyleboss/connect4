import React from "react";
import { render, fireEvent } from "@testing-library/react";

import WaitingForPlayers from "./WaitingForPlayers";
import useGame from "../../hooks/useGame";
import { USER_ROLE_GUEST } from "../../utils/constants";
import { USER_ROLE_RED } from "../../utils/constants";

jest.mock("../../hooks/useGame", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("WaitingForPlayers", () => {
  it("renders correctly for a guest user", () => {
    useGame.mockImplementation(() => ({
      joinGame: jest.fn(),
      userRole: USER_ROLE_GUEST,
    }));

    const { asFragment, getByText } = render(<WaitingForPlayers />);
    expect(getByText("Waiting for player...")).toBeInTheDocument();
    expect(getByText("Join Game")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly for a non-guest user", () => {
    useGame.mockImplementation(() => ({
      joinGame: jest.fn(),
      userRole: USER_ROLE_RED,
    }));

    const { asFragment, getByText } = render(<WaitingForPlayers />);
    expect(getByText("Waiting for opponent...")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls joinGame when join button is clicked", () => {
    const joinGameMock = jest.fn();
    useGame.mockImplementation(() => ({
      joinGame: joinGameMock,
      userRole: USER_ROLE_GUEST,
    }));

    const { getByText } = render(<WaitingForPlayers />);
    fireEvent.click(getByText("Join Game"));
    expect(joinGameMock).toHaveBeenCalled();
  });
});
