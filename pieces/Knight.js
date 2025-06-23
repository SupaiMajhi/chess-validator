import Piece from "./Piece.js";

class Knight extends Piece {

    getSymbol() {
        return this.color === "white" ? "WN" : "BN";
    }

    isValidMove(from, to, board){
        const rowDiff = Math.abs(from.row - to.row);
        const colDiff = Math.abs(from.col - to.col);
        const targetSquare = board[to.row][to.col];

        if((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)){
            if(!targetSquare || (targetSquare.color !== this.color)){
                return { valid: true, capture: !!targetSquare};
            }
            else return { valid: false };
        }
        return { valid: false };
    }
}

export default Knight;