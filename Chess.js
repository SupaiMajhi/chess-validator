import Board from "./ChessBoard.js";
import Bishop from "./pieces/Bishop.js";
import King from "./pieces/King.js";
import Knight from "./pieces/Knight.js";
import Pawn from "./pieces/Pawn.js";
import Queen from "./pieces/Queen.js";
import Rook from "./pieces/Rook.js";

class Chess {
    constructor(){
        this.board = new Board();
        this.turn = 'white';
    }

    isInCheck(){
        const opponentPieces = this.board.getAllOpponentPieces(this.turn, this.board);

        const ownKingPosi = this.board.findOwnKing(this.turn, this.board);

        for(let i=0; i < opponentPieces.length; i++){
            const result = opponentPieces[i].piece.isValidMove({ 'row': opponentPieces[i].position.row, 'col': opponentPieces[i].position.col }, { 'row': ownKingPosi.position.row, 'col': ownKingPosi.position.col }, this.board);
            if(result.valid){
                return true;
            }else {
                return false;
            }
        }
    }

    isCheckmate(color, board, moveHistory) {
    // Step 1: Check if the king is currently in check
    if (!isKingInCheck(color, board)) return false;

    // Step 2: Try every legal move to escape check
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        
        // Skip if empty or not player's piece
        if (!piece || piece.color !== color) continue;

        // Try every square as a potential destination
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
            const from = { row, col };
            const to = { row: r, col: c };

            // Check piece-specific movement rules
            if (!piece.isValidMove(from, to, board, moveHistory)) continue;

            // Simulate the move
            const movingPiece = board[from.row][from.col];
            const capturedPiece = board[to.row][to.col];
            board[to.row][to.col] = movingPiece;
            board[from.row][from.col] = null;

            const stillInCheck = isKingInCheck(color, board);

            // Undo the move
            board[from.row][from.col] = movingPiece;
            board[to.row][to.col] = capturedPiece;

            if (!stillInCheck) {
                return false; // Found at least one move that escapes check
            }
            }
        }
        }
    }

        // No move escapes check → checkmate
        return true;
    }
}

export default Chess;