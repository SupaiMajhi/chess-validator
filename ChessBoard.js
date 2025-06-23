import Pawn from "./pieces/Pawn.js";
import Rook from "./pieces/Rook.js";
import Knight from "./pieces/Knight.js";
import Bishop from "./pieces/Bishop.js";
import Queen from "./pieces/Queen.js";
import King from "./pieces/King.js";

class Board {
    
    constructor() {
        this.createEmptyBoard();
        this.setUpPieces();
    }

    createEmptyBoard() {
        return Array.from({ length: 8 }, () => Array(8).fill(null));
    }

    setUpPieces() {
        //set-up pawns
        for(let i = 0; i < 8; i++) {
            this.board[1][i] = new Pawn('black');
            this.board[6][i] = new Pawn('white');
        }

        //set-up major pieces
        const order = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];

        for(let i = 0; i < 8; i++) {
            this.board[0][i] = new order[i]('black');
            this.board[7][i] = new order[i]('white');
        }
    }

    printBoard() {
        for(let row = 0; row < 8; row++){
            let rowStr = '';
            for(let col = 0; col < 8; col++){
                const piece = this.board[row][col];
                rowStr += piece ? piece.getSymbol() + ' ' : '. ';
            }
            console.log(8 - row + ' ' + rowStr);
        }
        console.log('   a b c d e f g h\n');
    }

    getAllOpponentPieces(color, board){
        const opponentPieces = [];

        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                if(board[i][j] && board[i][j].color !== color){
                    opponentPieces.push({ "piece": board[i][j], "position": { 'row': i, 'col': j}});
                }
            }
        }
        return opponentPieces;
    }

    getAllOwnPieces(color, board){
        const ownPieces = [];

        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                if(board[i][j] && board[i][j].color === color){
                    ownPieces.push({ "piece": board[i][j], "position": { 'row': i, 'col': j}});
                }
            }
        }
        return ownPieces;
    }

    findOwnKing(color, board){
        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                if(board[i][j] && board[i][j].color === color && board[i][j] instanceof King){
                    return { 'position': { 'row': i, 'col': j}};
                }
            }
        }
    }

    isCheck(color, from, to, board){
        const kingPosi = this.findOwnKing(color, board);

        const opponentPieces = this.getAllOpponentPieces(color, board);
    }
}

export default Board;