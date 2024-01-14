const getNewPlayerRole = require("./getNewPlayerRole");
const {
  USER_ROLE_GUEST,
  USER_ROLE_RED,
  USER_ROLE_YELLOW,
} = require("./constants");

describe("getNewPlayerRole", () => {
  it("assigns USER_ROLE_RED if no players are present", () => {
    const players = {};
    expect(getNewPlayerRole(players)).toBe(USER_ROLE_RED);
  });

  it("assigns USER_ROLE_YELLOW if USER_ROLE_RED is already taken", () => {
    const players = { player1: USER_ROLE_RED };
    expect(getNewPlayerRole(players)).toBe(USER_ROLE_YELLOW);
  });

  it("assigns USER_ROLE_RED if USER_ROLE_YELLOW is already taken", () => {
    const players = { player1: USER_ROLE_YELLOW };
    expect(getNewPlayerRole(players)).toBe(USER_ROLE_RED);
  });

  it("assigns USER_ROLE_GUEST if both USER_ROLE_RED and USER_ROLE_YELLOW are taken", () => {
    const players = { player1: USER_ROLE_RED, player2: USER_ROLE_YELLOW };
    expect(getNewPlayerRole(players)).toBe(USER_ROLE_GUEST);
  });
});
