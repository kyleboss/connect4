import React, { useContext } from "react";
import { render, cleanup, act } from "@testing-library/react";
import GameContext, { GameProvider } from "./GameContext";
import socketIOClient from "socket.io-client";
import {
  SERVER_URL,
  SOCKET_EVENT_ASSIGN_ROLE,
  USER_ROLE_RED,
} from "../utils/constants";

jest.mock("socket.io-client", () => {
  const emit = jest.fn();
  const on = jest.fn((_, callback) => {
    mockSocket.__simulateEvent = (event, data) => {
      if (on.mock.calls.some((call) => call[0] === event)) {
        callback(data);
      }
    };
  });
  const disconnect = jest.fn();

  const mockSocket = {
    on,
    emit,
    disconnect,
  };

  return jest.fn(() => mockSocket);
});

const renderBoard = (board) => board.map((row, i) => `|${row.join(", ")}|`);

const TestComponent = () => {
  const { board, currentPlayer, gameState, winner, userRole } =
    useContext(GameContext);

  return (
    <div>
      <p>Board: {renderBoard(board)}</p>
      <p>Current Player: {String(currentPlayer)}</p>
      <p>Game State: {String(gameState)}</p>
      <p>Winner: {String(winner)}</p>
      <p>User Role: {String(userRole)}</p>
    </div>
  );
};

describe("GameProvider", () => {
  afterEach(cleanup);

  it("renders correctly and provides context", () => {
    const { asFragment } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("establishes a socket connection on mount", () => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    expect(socketIOClient).toHaveBeenCalledWith(SERVER_URL);
  });

  it("listens to SOCKET_EVENT_ASSIGN_ROLE and updates user role", () => {
    const mockRole = USER_ROLE_RED;

    const { getByText } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    act(() => {
      socketIOClient().__simulateEvent(SOCKET_EVENT_ASSIGN_ROLE, mockRole);
    });

    expect(getByText(`User Role: ${mockRole}`)).toBeInTheDocument();
  });

  it("disconnects from socket on unmount", () => {
    const { unmount } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    unmount();

    expect(socketIOClient().disconnect).toHaveBeenCalled();
  });
});
