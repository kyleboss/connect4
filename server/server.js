const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const checkForWin = require("../utils/checkForWin");
const createBoard = require("../utils/createBoard");
const {
  CLIENT_URL,
  USER_ROLE_RED,
  GAME_STATE_WAITING,
  SOCKET_EVENT_ASSIGN_ROLE,
  SOCKET_EVENT_UPDATE_STATE,
  SOCKET_EVENT_MAKE_MOVE,
  GAME_STATE_ACTIVE,
  GAME_STATE_GAME_OVER,
  SOCKET_EVENT_CONNECTION,
  SOCKET_EVENT_DISCONNECT,
  SOCKET_EVENT_RESET_GAME,
  SOCKET_EVENT_JOIN_GAME,
  USER_ROLE_YELLOW,
  USER_ROLE_NONE,
  USER_ROLES,
  SERVER_PORT,
} = require("../utils/constants");
const getActivePlayers = require("../utils/getActivePlayers");
const getNewPlayerRole = require("../utils/getNewPlayerRole");
const checkForTie = require("../utils/checkForTie");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

let players = {};
let board = createBoard();
let currentPlayer = USER_ROLE_RED;
let gameState = GAME_STATE_WAITING;
let winner;

const updateGameState = () => {
  const activePlayers = getActivePlayers(players);
  // Whether the game is active or not strictly depends on if there are 2 active players or not.
  // Active players is important. If we have 5 guests but only 1 active player, then we're still waiting for someone to
  // play.
  if (gameState !== GAME_STATE_GAME_OVER) {
    gameState =
      activePlayers.length === 2 ? GAME_STATE_ACTIVE : GAME_STATE_WAITING;
  }

  io.emit(SOCKET_EVENT_UPDATE_STATE, {
    board,
    currentPlayer,
    gameState,
    winner,
  });
};

io.on(SOCKET_EVENT_CONNECTION, (socket) => {
  const assignedRole = getNewPlayerRole(players);
  players[socket.id] = assignedRole;

  updateGameState();

  socket.emit(SOCKET_EVENT_ASSIGN_ROLE, assignedRole);
  io.emit(SOCKET_EVENT_UPDATE_STATE, {
    board,
    currentPlayer,
    gameState,
    winner,
  });

  socket.on(SOCKET_EVENT_MAKE_MOVE, (columnIndex) => {
    // Only active games can have moves made to them.
    // Only the current player can make a move.
    if (
      gameState !== GAME_STATE_ACTIVE ||
      players[socket.id] !== currentPlayer
    ) {
      return;
    }

    // This might be a bit extra...
    let madeMove = false;
    for (let row = board.length - 1; row >= 0; row--) {
      if (board[row][columnIndex] === null) {
        board[row] = [...board[row]];
        board[row][columnIndex] = currentPlayer;
        madeMove = true;
        break;
      }
    }

    if (madeMove) {
      if (checkForWin(currentPlayer, board)) {
        gameState = GAME_STATE_GAME_OVER;
        winner = currentPlayer;
      } else if (checkForTie(board)) {
        gameState = GAME_STATE_GAME_OVER;
        winner = USER_ROLE_NONE;
      } else {
        currentPlayer =
          currentPlayer === USER_ROLE_RED ? USER_ROLE_YELLOW : USER_ROLE_RED; // Just toggling the current player.
      }
      io.emit(SOCKET_EVENT_UPDATE_STATE, {
        board,
        currentPlayer,
        gameState,
        winner,
      });
    }
  });

  socket.on(SOCKET_EVENT_DISCONNECT, () => {
    console.log(
      `Client disconnected: ${socket.id} - ${USER_ROLES[assignedRole]}`
    );
    delete players[socket.id];
    updateGameState(); // If an active player leaves, we need to change the game state to waiting.
  });

  socket.on(SOCKET_EVENT_RESET_GAME, () => {
    board = createBoard();
    winner = null;
    const activePlayers = getActivePlayers(players);
    gameState =
      activePlayers.length === 2 ? GAME_STATE_ACTIVE : GAME_STATE_WAITING;
    updateGameState();
  });

  socket.on(SOCKET_EVENT_JOIN_GAME, () => {
    // A person can only join a game if it is waiting for players.
    // Note: Joining a game is different than connecting. Joining a game means the user is an active player.
    // Connecting just means they can see the game and are a guest (a "lurker").
    if (gameState === GAME_STATE_WAITING) {
      players[socket.id] = getNewPlayerRole(players);
      socket.emit(SOCKET_EVENT_ASSIGN_ROLE, players[socket.id]);
      updateGameState();
    }
  });

  console.log(
    `New client connected: ${socket.id} - ${USER_ROLES[assignedRole]}`
  );
});

server.listen(SERVER_PORT, () => {
  console.log(`Websocket server is LIVE! Listening on port ${SERVER_PORT}`);
});
