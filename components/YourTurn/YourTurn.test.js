import React from "react";
import { render } from "@testing-library/react";

import YourTurn from "./YourTurn";
import useGame from "../../hooks/useGame";
import {
  USER_ROLE_RED,
  USER_ROLE_YELLOW,
  GAME_STATE_ACTIVE,
} from "../../utils/constants";

jest.mock("../../hooks/useGame", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("YourTurn", () => {
  it("is visible when it is the user's turn", () => {
    useGame.mockImplementation(() => ({
      userRole: USER_ROLE_RED,
      gameState: GAME_STATE_ACTIVE,
      currentPlayer: USER_ROLE_RED,
    }));

    const { getByText } = render(<YourTurn />);
    const yourTurnElement = getByText("✨Your turn✨");
    expect(yourTurnElement).toHaveStyle("opacity: 1");
    expect(yourTurnElement).toHaveStyle("visibility: visible");
    expect(yourTurnElement).toHaveStyle("pointer-events: auto");
  });

  it("is not visible when it is not the user's turn", () => {
    useGame.mockImplementation(() => ({
      userRole: USER_ROLE_YELLOW,
      gameState: GAME_STATE_ACTIVE,
      currentPlayer: USER_ROLE_RED,
    }));

    const { getByText } = render(<YourTurn />);
    const yourTurnElement = getByText("✨Your turn✨");
    expect(yourTurnElement).toHaveStyle("opacity: 0");
    expect(yourTurnElement).toHaveStyle("visibility: hidden");
    expect(yourTurnElement).toHaveStyle("pointer-events: none");
  });
});
