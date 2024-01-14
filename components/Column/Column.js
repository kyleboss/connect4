// Column.js
import React from "react";
import styled from "styled-components";
import Slot from "@/components/Slot";
import useGame from "@/hooks/useGame";
import findLastEmptySlotIndex from "@/utils/findLastEmptySlotIndex";

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;

  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  &:hover > :nth-child(${(props) => props.lastemptyslotindex + 1}) {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.5)};
  }
`;

const Column = ({ columnIndex }) => {
  const { makeMove, board, currentPlayer, userRole } = useGame();

  const lastEmptySlotIndex = findLastEmptySlotIndex(board, columnIndex);
  const isDisabled = currentPlayer !== userRole || lastEmptySlotIndex === -1;

  return (
    <StyledColumn
      disabled={isDisabled}
      onClick={() => !isDisabled && makeMove(columnIndex)}
      lastemptyslotindex={lastEmptySlotIndex}
      role="button"
      data-testid="column"
    >
      {board.map((row, rowIndex) => (
        <Slot key={`${rowIndex}-${columnIndex}`} value={row[columnIndex]} />
      ))}
    </StyledColumn>
  );
};
export default Column;
