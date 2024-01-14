const {
  USER_ROLE_GUEST,
  USER_ROLE_YELLOW,
  USER_ROLE_RED,
} = require("./constants");
const getActivePlayers = require("./getActivePlayers");

// When someone connects to the game, how we decide if they are red, yellow, or a guest?
// If there are two active players already, this new person must be a guest.
// Otherwise, if there is a red user already, the new person must be yellow.
// If the above two conditions are not met: The new user is red.
const getNewPlayerRole = (players) => {
  if (getActivePlayers(players).length === 2) {
    return USER_ROLE_GUEST;
  }

  return Object.values(players).includes(USER_ROLE_RED)
    ? USER_ROLE_YELLOW
    : USER_ROLE_RED;
};

module.exports = getNewPlayerRole;
