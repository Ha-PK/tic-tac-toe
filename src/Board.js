import Square from "./Square";

function Board(props) {
  function renderSquare(i) {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        isActive={
          props.currentMove === i || (props.winner && props.winner.includes(i))
        }
      />
    );
  }

  return (
    <div className="board">
      {Array(3)
        .fill()
        .map((item, index) => {
          const row = Array(3)
            .fill()
            .map((item, index2) => renderSquare(index * 3 + index2));

          return (
            <div key={index} className="board-row">
              {row}
            </div>
          );
        })}
    </div>
  );
}

export default Board;
