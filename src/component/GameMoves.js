import { useContext } from "react";
import GameContext from "../context/GameContext";

export default function GameMoves() {
  const { moves } = useContext(GameContext);

  return <ol>{moves}</ol>;
}
