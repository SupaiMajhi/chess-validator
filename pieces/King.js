import Piece from "./Piece.js";

class King extends Piece {
  getSymbol() {
    return this.color === "white" ? "WK" : "BK";
  }

  isValidMove(from, to, board, moveHistory) {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    const targetSquare = board[to.row][to.col];

    if(rowDiff <= 1 && colDiff <= 1){
      if(!targetSquare || targetSquare.color !== this.color){
        return { valid: true, capture: !!targetSquare};
      }
      else {
        return { valid: false };
      }
    }
    return { valid: false };
  }
}

export default King;
