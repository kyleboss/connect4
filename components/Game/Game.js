import { useMemo } from "react";

import useGame from "@/hooks/useGame";
import Board from "@/components/Board";
import YourTurn from "@/components/YourTurn";
import WaitingForPlayers from "@/components/WaitingForPlayers";
import GameOver from "@/components/GameOver";
import NameTag from "@/components/NameTag";
import Button from "@/components/Button";
import {
  GAME_STATE_GAME_OVER,
  GAME_STATE_WAITING,
  USER_ROLE_GUEST,
} from "@/utils/constants";

const Game = () => {
  const { userRole, gameState, resetGame } = useGame();

  const isPlayer = useMemo(() => userRole !== USER_ROLE_GUEST, [userRole]);

  if (gameState === GAME_STATE_WAITING) {
    return <WaitingForPlayers />;
  }

  if (gameState === GAME_STATE_GAME_OVER) {
    return <GameOver />;
  }

  return (
    <>
      <NameTag />
      <YourTurn />
      <Board />
      {isPlayer ? <Button onClick={resetGame}>Reset Game</Button> : null}
    </>
  );
};

export default Game;
