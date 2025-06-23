import Piece from "./Piece.js";

class Bishop extends Piece {

    getSymbol() {
        return this.color === "white" ? "WB" : 'BB';
    }

    isValidMove(from, to, board){
        const fromRow = from.row;
        const fromCol = from.col;
        const toRow = to.row;
        const toCol = to.col;
        const rowStep = fromRow < toRow ? 1 : -1;
        const colStep = fromCol < toCol ? 1 : -1;
        let currentRow = fromRow + rowStep;
        let currentCol = fromCol + colStep;
        const targetSquare = board[toRow][toCol];

        if(Math.abs(toRow - fromRow) === Math.abs(toCol - fromCol)){
            while(currentRow !== toRow && currentCol !== toCol){
                if(board[currentRow][currentCol] !== null) return { valid: false };
                currentRow += rowStep;
                currentCol += colStep;
            }
            if(!targetSquare || (targetSquare.color !== this.color)){
                return { valid: true, capture: !!targetSquare };
            }
            return { valid: false };
        }
        return { valid: false };
    }
}

export default Bishop;