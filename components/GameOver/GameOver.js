import { useMemo } from "react";

import useGame from "@/hooks/useGame";
import { USER_ROLE_GUEST, USER_ROLES } from "@/utils/constants";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Subheader from "@/components/Subheader";

const GameOver = () => {
  const { userRole, winner, resetGame } = useGame();

  const header = useMemo(
    () => (userRole === winner ? "Congratulations! 🎉" : "Game over."),
    [userRole, winner]
  );

  const subheader = useMemo(
    () => (userRole === winner ? "You won." : `${USER_ROLES[winner]} won.`),
    [userRole, winner]
  );

  const callToAction = useMemo(
    () =>
      userRole === USER_ROLE_GUEST ? null : (
        <Button onClick={resetGame}>New Game</Button>
      ),
    [resetGame, userRole]
  );

  return (
    <>
      <Header>{header}</Header>
      <Subheader>{subheader}</Subheader>
      {callToAction}
    </>
  );
};

export default GameOver;
