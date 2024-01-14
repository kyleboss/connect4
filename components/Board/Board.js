import React from "react";
import styled from "styled-components";
import useGame from "@/hooks/useGame";
import Column from "@/components/Column";
import { TABLET_AND_LARGER_SIZE } from "@/utils/constants";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin: 0 10px 25px 10px;

  @media (min-width: ${TABLET_AND_LARGER_SIZE}) {
    gap: 10px;
    margin: 0 20px 50px 20px;
  }
`;

const Board = () => {
  const { board } = useGame();

  return (
    <Container>
      {board[0].map((_, columnIndex) => (
        <Column key={columnIndex} columnIndex={columnIndex} />
      ))}
    </Container>
  );
};

export default Board;
