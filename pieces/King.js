import Piece from "./Piece.js";

class King extends Piece {
  getSymbol() {
    return this.color === "white" ? "WK" : "BK";
  }

  isValidMove(from, to, board) {
    const fromRow = from.row;
    const fromCol = from.col;
    const toRow = to.row;
    const toCol = to.col;
    const targetSquare = board[toRow][toCol];

    if(Math.abs(toRow - fromRow) === 1 || Math.abs(toCol - fromCol) === 1){
        
        //capture logic
        if(!targetSquare || (targetSquare.color !== this.color)){
            return { valid: true, capture: !!targetSquare };
        }
        else return { valid: false };
    }
    return { valid: false };
  }
}

export default King;
