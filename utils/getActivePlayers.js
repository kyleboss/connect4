const { USER_ROLE_GUEST } = require("./constants");

// Active players are folks who are actually playing the game, not just watching.
// Active players are either USER_ROLE_RED or USER_ROLE_YELLOW. Since the only other
// type of player is USER_ROLE_GUEST, it's sufficient just to find the folks who are
// not guests.
const getActivePlayers = (players) =>
  Object.values(players).filter((role) => role !== USER_ROLE_GUEST);

module.exports = getActivePlayers;
