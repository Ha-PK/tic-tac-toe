import React, { useState } from "react";
import GameInfo from "./GameInfo";
import Board from "./Board";
import GameContext from "../context/GameContext";
import calculateWinner from "../logic/calculateWinner";
import "./Game.css";

export default function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      currentMove: -1,
    },
  ]);
  const [sortInAsc, setSort] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const currentMove = current.currentMove;
  const winner = calculateWinner(current.squares);

  let moves = history.map((step, move) => {
    const currentMove = step.currentMove;
    const desc = move
      ? "Go to move #" +
        move +
        " (" +
        Math.floor(currentMove / 3) +
        "," +
        (currentMove % 3) +
        ")"
      : "Go to game start";
    const className = stepNumber === move ? "is-bold" : "";

    return (
      <li key={move}>
        <button className={className} onClick={() => handleJumb(move)}>
          {desc}
        </button>
      </li>
    );
  });

  if (moves && !sortInAsc) {
    moves = moves.reverse();
  }

  let status;
  if (winner) {
    status = "Winner: " + current.squares[winner[0]];
  } else if (stepNumber === 9) {
    status = "Game Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || calculateWinner(squares)) return;
    squares[i] = xIsNext ? "X" : "O";

    setHistory(
      newHistory.concat({
        squares: squares,
        currentMove: i,
      })
    );
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  function handleJumb(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  return (
    <GameContext.Provider
      value={{
        moves,
        currentMove,
        winner,
        handleClick,
      }}
    >
      <div className="game">
        <Board squares={current.squares} />
        <GameInfo status={status} handleSort={() => setSort(!sortInAsc)} />
      </div>
    </GameContext.Provider>
  );
}
