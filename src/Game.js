import React, { useState } from "react";
import Board from "./Board";

function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      currentMove: -1,
    },
  ]);
  const [sortInAsc, setSort] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  function jumbTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
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

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const currentMove = current.currentMove;

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
    const className = stepNumber === move ? "isBold" : "";

    return (
      <li key={move}>
        <button className={className} onClick={() => jumbTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  if (!sortInAsc) {
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

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          currentMove={currentMove}
          winner={winner}
        />
      </div>
      <div className="game-info">
        <div class="game-status">{status}</div>
        <button onClick={() => setSort(!sortInAsc)}>Toggle Sort</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

export default Game;
