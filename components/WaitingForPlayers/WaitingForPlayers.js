import useGame from "@/hooks/useGame";
import { USER_ROLE_GUEST } from "@/utils/constants";
import Header from "@/components/Header";
import Button from "@/components/Button";

const WaitingForPlayers = () => {
  const { joinGame, userRole } = useGame();

  return (
    <>
      {userRole === USER_ROLE_GUEST ? (
        <>
          <Header>Waiting for player...</Header>
          <Button onClick={joinGame}>Join Game</Button>
        </>
      ) : (
        <Header>Waiting for opponent...</Header>
      )}
    </>
  );
};

export default WaitingForPlayers;
