import React, { useState } from "react";
import Tile from "./Tile";

const WIN_PATTERNS = [
  [0,1,2], [3,4,5], [6,7,8],   // rows
  [0,3,6], [1,4,7], [2,5,8],   // columns
  [0,4,8], [2,4,6]             // diagonals
];

function Board() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  function checkWinner(newBoard) {
    for (let combo of WIN_PATTERNS) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return null;
  }

  function handleClick(index) {
    if (board[index] !== "" || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      return;
    }

    if (!newBoard.includes("")) {
      setWinner("Draw");
      return;
    }

    setTurn(turn === "X" ? "O" : "X");
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setWinner(null);
  }

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>

      <div className="status">
        {winner
          ? winner === "Draw"
            ? "It's a draw!"
            : `${winner} wins!`
          : `Turn: ${turn}`}
      </div>

      <div className="board">
        {board.map((value, i) => (
          <Tile key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default Board;
