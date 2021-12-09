import GameMoves from "./GameMoves";

export default function GameInfo({ status, handleSort }) {
  return (
    <div className="game-info">
      <div class="game-status">{status}</div>
      <button type="button" onClick={handleSort}>
        Toggle Sort
      </button>

      <GameMoves />
    </div>
  );
}
