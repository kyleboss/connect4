import styled from "styled-components";

import useGame from "@/hooks/useGame";
import { GAME_STATE_ACTIVE } from "@/utils/constants";
import Subheader from "@/components/Subheader";

const Container = styled(Subheader)`
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
`;

const YourTurn = () => {
  const { userRole, gameState, currentPlayer } = useGame();

  const isYourTurn =
    gameState === GAME_STATE_ACTIVE && userRole === currentPlayer;

  return (
    <Container show={isYourTurn ? "true" : undefined}>✨Your turn✨</Container>
  );
};

export default YourTurn;
