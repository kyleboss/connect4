// Express depends on CommonJS, which would require a new jest environment for
// strictly Node. I was going to create a new project for the server to accomodate
// for this, but realized it would complicate the setup to an extent that it would
// no longer be trivial to figure out what is going wrong if a simple
// "yarn && yarn dev" failed on the interviewer's machine. Thus I will put some tests
// that I would expect to pass, but have them skipped so you can observe my methodolgy
// when it comes to server-testing.

const http = require("http");
const socketIo = require("socket.io");

const {
  SOCKET_EVENT_ASSIGN_ROLE,
  SOCKET_EVENT_MAKE_MOVE,
  SOCKET_EVENT_DISCONNECT,
  SOCKET_EVENT_RESET_GAME,
  USER_ROLE_RED,
  USER_ROLE_YELLOW,
} = require("../utils/constants");
const createBoard = require("../utils/createBoard");
const checkForWin = require("../utils/checkForWin");
const getNewPlayerRole = require("../utils/getNewPlayerRole");

jest.mock("http", () => ({
  createServer: jest.fn(),
}));
jest.mock("socket.io", () => {
  return jest.fn(() => ({
    on: jest.fn(() => {}),
    emit: jest.fn(),
    socketClient: jest.fn(() => ({
      emit: jest.fn(),
      on: jest.fn(),
      close: jest.fn(),
    })),
    server: {
      close: jest.fn(),
    },
  }));
});
jest.mock("../utils/createBoard");
jest.mock("../utils/checkForWin");
jest.mock("../utils/getNewPlayerRole");
jest.mock("../utils/getActivePlayers");

xdescribe("Game Server", () => {
  let server, io, socket;

  beforeAll(() => {
    server = http.createServer();
    io = socketIo(server);
    require("./server");
  });

  beforeEach(() => {
    socket = io.socketClient();
  });

  afterEach(() => {
    io.server.close();
    socket.close();
  });

  it("should initialize game with waiting state and empty board", () => {
    createBoard.mockReturnValue(Array(6).fill(Array(7).fill(null)));
    expect(createBoard).toHaveBeenCalled();
  });

  it("assigns a role to a new player and updates game state", () => {
    const role = USER_ROLE_RED;
    getNewPlayerRole.mockReturnValue(role);

    socket.emit(SOCKET_EVENT_ASSIGN_ROLE, role);

    expect(socket.emit).toHaveBeenCalledWith(SOCKET_EVENT_ASSIGN_ROLE, role);
  });

  it("handles a player making a move and updates game state", () => {
    let mockBoard = createBoard();
    socket.emit(SOCKET_EVENT_MAKE_MOVE, 0);

    expect(mockBoard[0][0]).toBe(USER_ROLE_RED);
  });

  it("rejects a move if it is not the player’s turn", () => {
    let mockBoard = createBoard();
    socket.emit(SOCKET_EVENT_MAKE_MOVE, 0);
    expect(mockBoard[0][0]).toBe(null);
  });

  it("updates game state and checks for a win after a move", () => {
    let mockBoard = createBoard();
    checkForWin.mockReturnValue(true);
    socket.emit(SOCKET_EVENT_MAKE_MOVE, 0);

    expect(checkForWin).toHaveBeenCalledWith(USER_ROLE_RED, mockBoard);
  });

  it("resets the game state correctly", () => {
    let mockBoard = createBoard();
    mockBoard[0][0] = USER_ROLE_RED;
    currentPlayer = USER_ROLE_YELLOW;

    socket.emit(SOCKET_EVENT_RESET_GAME);

    expect(createBoard).toHaveBeenCalled();
    expect(currentPlayer).toBe(USER_ROLE_RED);
  });

  it("updates the game state when a player disconnects", () => {
    players[socket.id] = USER_ROLE_RED;
    let initialPlayerCount = Object.keys(players).length;

    socket.emit(SOCKET_EVENT_DISCONNECT);

    expect(players[socket.id]).toBeUndefined();
    expect(Object.keys(players).length).toBe(initialPlayerCount - 1);
  });
});
