import Piece from "./Piece.js";

class Rook extends Piece {

    getSymbol() {
        return this.color === "white" ? "WR" : "BR";
    }

    isPathClear(from, to, board) {
        console.log(board)
        const fromRow = from.row;
        const fromCol = from.col;
        const toRow = to.row;
        const toCol = to.col;
        if( fromCol === toCol ){
            const step = toRow < fromRow ? -1 : 1;
            for(let row = fromRow + step; row !== toRow; row += step){
                if(board[row][fromCol]) return false;
            }
        }
        else if( fromRow === toRow ){
            const step = toCol < fromCol ? -1 : 1;
            for(let col = fromCol + step; col !== toCol; col += step){
                if(board[fromRow][col]) return false;
            }
        }
        else return false;
        return true;
    }

    isValidMove(from, to, board) {
        const fromRow = from.row;
        const fromCol = from.col;
        const toRow = to.row;
        const toCol = to.col;
        const targetSquare = board[toRow][toCol];

        console.log(board);
        if(Math.abs(toRow - fromRow) <= 7 && Math.abs(toRow - fromRow) >= 0) {
            if(this.isPathClear(from, to, board)){
                if(!targetSquare || (targetSquare.color !== this.color)){
                    return { valid: true, capture: !!targetSquare }
                }
                else {
                    return{ valid: false };
                }
            }
            else return { valid: false };
        }
    }

}

export default Rook;