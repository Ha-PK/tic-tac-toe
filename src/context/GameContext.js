import { createContext } from "react";

const GameContext = createContext({
  moves: null,
  currentMove: -1,
  winner: null,
  handleClick: () => {},
});

export default GameContext;
