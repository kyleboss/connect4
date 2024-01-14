import styled from "styled-components";

import useGame from "@/hooks/useGame";
import Slot from "@/components/Slot";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin: 0 20px 50px 0;
`;

const Board = () => {
  const { board, makeMove, currentPlayer, userRole } = useGame();

  return (
    <Container>
      {board.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <Slot
            key={`${rowIndex}-${columnIndex}`}
            value={cell}
            onClick={() => makeMove(columnIndex)}
            disabled={currentPlayer !== userRole || cell}
          />
        ))
      )}
    </Container>
  );
};

export default Board;
