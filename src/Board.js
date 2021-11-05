import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isActive={
          this.props.currentMove === i ||
          (this.props.winner && this.props.winner.includes(i))
        }
      />
    );
  }

  render() {
    return (
      <div className="board">
        {Array(3)
          .fill()
          .map((item, index) => {
            const row = Array(3)
              .fill()
              .map((item, index2) => this.renderSquare(index * 3 + index2));

            return (
              <div key={index} className="board-row">
                {row}
              </div>
            );
          })}
      </div>
    );
  }
}

export default Board;
