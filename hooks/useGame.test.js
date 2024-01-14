import React from "react";
import { render } from "@testing-library/react";

import GameContext from "@/state/GameContext";
import useGame from "./useGame";

const TestComponent = () => {
  const gameData = useGame();
  return <div data-testid="game-data">{JSON.stringify(gameData)}</div>;
};

describe("useGame", () => {
  it("provides the correct context data", () => {
    const testGameData = { currentPlayer: "Red", gameState: "active" };

    const { getByTestId } = render(
      <GameContext.Provider value={testGameData}>
        <TestComponent />
      </GameContext.Provider>
    );

    expect(getByTestId("game-data")).toHaveTextContent(
      JSON.stringify(testGameData)
    );
  });
});
