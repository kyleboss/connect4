const getActivePlayers = require("./getActivePlayers");
const {
  USER_ROLE_GUEST,
  USER_ROLE_RED,
  USER_ROLE_YELLOW,
} = require("./constants");

describe("getActivePlayers", () => {
  it("filters out guests and returns only active players", () => {
    const players = {
      player1: USER_ROLE_RED,
      player2: USER_ROLE_YELLOW,
      guest: USER_ROLE_GUEST,
    };

    const activePlayers = getActivePlayers(players);
    expect(activePlayers).toEqual([USER_ROLE_RED, USER_ROLE_YELLOW]);
    expect(activePlayers).not.toContain(USER_ROLE_GUEST);
  });

  it("returns an empty array if there are no active players", () => {
    const players = {
      guest1: USER_ROLE_GUEST,
      guest2: USER_ROLE_GUEST,
    };

    const activePlayers = getActivePlayers(players);
    expect(activePlayers).toEqual([]);
  });
});
