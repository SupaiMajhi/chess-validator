import Piece from "./Piece.js";

export default class Queen extends Piece {
  getSymbol() {
    return this.color === "white" ? "WQ" : "BQ";
  }

  isPathClear(from, to, board) {
    const fromRow = from.row;
    const fromCol = from.col;
    const toRow = to.row;
    const toCol = to.col;
    const rowStep = fromRow > toRow ? -1 : 1;
    const colStep = fromCol > toCol ? -1 : 1;
    const currentRow = fromRow + rowStep;
    const currentCol = fromCol + colStep;

    while(currentRow !== toRow && currentCol !== toCol){
        if(board[currentRow][currentCol] !== null) return false;
    }
    return true;
  }

  isValidMove(from, to, board) {
    const fromRow = from.row;
    const fromCol = from.col;
    const toRow = to.row;
    const toCol = to.col;
    const targetSquare = board[toRow][toCol];

    if(fromRow === toRow || fromCol === toCol || (Math.abs(toRow - fromRow) === Math.abs(toCol - fromCol))) {
        if(this.isPathClear(from, to, board)){
            if(!targetSquare || targetSquare.color !== this.color){
                return { valid: true, capture: !!targetSquare};
            }
            else{
                return { valid: false }
            }
        }
        else return { valid: false };
    }
    return { valid: false };
  }
}
