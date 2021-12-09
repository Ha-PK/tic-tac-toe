import Square from "./Square";

export default function Board({ squares }) {
  return (
    <div>
      <div className="game-board">
        {squares.map((item, index) => (
          <Square key={index} value={item} index={index} />
        ))}
      </div>
    </div>
  );
}
