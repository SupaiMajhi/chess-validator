import Piece from "./Piece.js";

class Pawn extends Piece {

    getSymbol() {
        return this.color === "white" ? 'WP' : 'BP';
    }

    isValidMove(from, to, board, moveHistory) {
        const direction = this.color === 'white' ? -1 : 1;
        const startingRow = this.color === 'white' ? 6 : 1;
        const promotionRow = this.color === 'white' ? 0 : 7;
        const EnPassantRow = this.color === 'white' ? 3 : 4;
        const fromRow = from.row;
        const fromCol = from.col;
        const toRow = to.row;
        const toCol = to.col;
        const targetSquare = board[toRow][toCol];

        //1-step forward
        if(toCol === fromCol && toRow === fromRow + direction && !targetSquare) {
            const isPromotion = toRow === promotionRow;
            return { valid: true, promotion: isPromotion }
        }

        //2-step forward
        if(toCol === fromCol && toRow === fromRow + 2 * direction && fromRow === startingRow && !board[fromRow + direction][fromCol] && !targetSquare) {
            return { valid: true, doubleStep: true };
        }

        //diagonal capture
        if(Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction && targetSquare && targetSquare.color !== this.color) {
            const isPromotion = toRow === promotionRow;
            return { valid: true, capture: true, promotion: isPromotion };
        }

        //En Passant
        if(Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction && !targetSquare && fromRow === EnPassantRow) {
            const lastMove = moveHistory[moveHistory.length - 1];
            if(lastMove){

                const { from:lastFrom, to:lastTo, piece } = lastMove;
                if(piece instanceof Pawn && Math.abs(lastTo.row - lastFrom.row) === 2 && piece.color !== this.color && lastTo.row === fromRow && lastTo.col === toCol) {
                    return { valid: true, enPassant: true };
                }
            }
        }

        return { valid: false };
    }
}

export default Pawn;