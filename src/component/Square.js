import { useContext } from "react";
import GameContext from "../context/GameContext";

export default function Square({ value, index }) {
  const { currentMove, winner, handleClick } = useContext(GameContext);
  const isActive = currentMove === index || (winner && winner.includes(index));
  const addClass = isActive ? "is-active" : "";

  return (
    <button
      className={`game-square ${addClass}`}
      onClick={() => handleClick(index)}
    >
      {value}
    </button>
  );
}
