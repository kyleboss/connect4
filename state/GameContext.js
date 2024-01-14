import React, { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import {
  GAME_STATE_ACTIVE,
  GAME_STATE_WAITING,
  SOCKET_EVENT_ASSIGN_ROLE,
  SOCKET_EVENT_JOIN_GAME,
  SOCKET_EVENT_MAKE_MOVE,
  SOCKET_EVENT_RESET_GAME,
  SOCKET_EVENT_UPDATE_STATE,
  USER_ROLE_RED,
  SERVER_URL,
  USER_ROLE_GUEST,
} from "@/utils/constants";
import createBoard from "@/utils/createBoard";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [board, setBoard] = useState(createBoard());
  const [gameState, setGameState] = useState(GAME_STATE_WAITING); // State for the game's status (active, waiting, etc.)
  const [winner, setWinner] = useState(null); // The winner of the current game. Can only be yellow, red, or none in the case of a tie.

  // The player who is currently playing - can only be yellow or red.
  // Note: Current player is the player whose turn it is, not to be confused with userRole which is the current client's
  // user.
  const [currentPlayer, setCurrentPlayer] = useState(USER_ROLE_RED);

  // The role of the user who is logged into the current client. Not to be confused with currentPlayer, which is whose
  // turn it is to play.
  // Role can be red, yellow, or guest. Think of it as this user's identity.
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const newSocket = socketIOClient(SERVER_URL);
    setSocket(newSocket);

    newSocket.on(SOCKET_EVENT_UPDATE_STATE, (data) => {
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
      setGameState(data.gameState);
      setWinner(data.winner);
    });

    newSocket.on(SOCKET_EVENT_ASSIGN_ROLE, (role) => {
      setUserRole(role);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const makeMove = (columnIndex) => {
    // Only games that are active can have moves made to them.
    // Only the current player should be able to make a move.
    if (gameState === GAME_STATE_ACTIVE && userRole === currentPlayer) {
      socket.emit(SOCKET_EVENT_MAKE_MOVE, columnIndex);
    }
  };

  const resetGame = () => {
    // Only players can reset a game. Guests would be interrupting the game otherwise :)
    if (userRole !== USER_ROLE_GUEST) {
      socket.emit(SOCKET_EVENT_RESET_GAME);
    }
  };

  const joinGame = () => {
    // Only games that are waiting can have someone join them.
    // Only guests can join a game, if the user is red or yellow, they are already in it.
    if (gameState === GAME_STATE_WAITING && userRole === USER_ROLE_GUEST) {
      socket.emit(SOCKET_EVENT_JOIN_GAME);
    }
  };

  const value = {
    board,
    currentPlayer,
    gameState,
    joinGame,
    winner,
    makeMove,
    resetGame,
    userRole,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameContext;
