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

    isCheckMate(color){
        const copyBoard = [[]];
        const ownPieces = this.board.getAllOwnPieces(color, this.board);

        for(let row=0; row < 8; row++){
            for(let col=0; col < 8; col++){
                const piece = this.board[row][col];
                if(piece !== null){
                    if(piece instanceof Pawn){
                        copyBoard[row][col] = new Pawn(piece.color);
                    }
                    if(piece instanceof Rook){
                        copyBoard[row][col] = new Rook(piece.color);
                    }
                    if(piece instanceof Knight){
                        copyBoard[row][col] = new Knight(piece.color);
                    }
                    if(piece instanceof Bishop){
                        copyBoard[row][col] = new Bishop(piece.color);
                    }
                    if(piece instanceof Queen){
                        copyBoard[row][col] = new Queen(piece.color);
                    }
                    if(piece instanceof King){
                        copyBoard[row][col] = new King(piece.color);
                    }
                }
                else{
                    copyBoard[row][col] = null;
                }
            }
        }

        for(let i=0; i < ownPieces.length;){
            for(let j=0; j < 8; j++){
                for(let k=0; k < 8; k++){
                    let result = ownPieces[i].piece.isValidMove(
                        { 'row': ownPieces[i].position.row, 'col': ownPieces[i].position.col}, 
                        { 'row': j, 'col': k},
                        copyBoard
                    );
                    if(result.valid){
                        
                    }
                }
            }
            i++;
        }
    }
}

export default Chess;