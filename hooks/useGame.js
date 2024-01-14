import { useContext } from "react";

import GameContext from "@/state/GameContext";

const useGame = () => useContext(GameContext);

export default useGame;
