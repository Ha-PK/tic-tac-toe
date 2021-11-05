import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          currentMove: -1,
        },
      ],
      sortInAsc: true,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  jumbTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || calculateWinner(squares)) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({
        squares: squares,
        currentMove: i,
      }),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  sortTheMoves() {
    this.setState({
      sortInAsc: !this.state.sortInAsc,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const currentMove = current.currentMove;

    let moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      const className = this.state.stepNumber === move ? "isBold" : "";

      return (
        <li key={move}>
          <button className={className} onClick={() => this.jumbTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    if (!this.state.sortInAsc) {
      moves = moves.reverse();
    }

    let status;
    if (winner) {
      status = "Winner: " + current.squares[winner[0]];
    } else if (this.state.stepNumber === 9) {
      status = "Game Draw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            currentMove={currentMove}
            winner={winner}
          />
        </div>
        <div className="game-info">
          <div class="game-status">{status}</div>
          <button onClick={() => this.sortTheMoves()}>Toggle Sort</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
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
