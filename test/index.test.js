import ChessBoard from "../ChessBoard.js";
import Bishop from "../pieces/Bishop.js";
import King from "../pieces/King.js";
import Pawn from "../pieces/Pawn.js";
import Rook from "../pieces/Rook.js";

describe.skip('Pawn', () => {
    const baord = new ChessBoard();
    const myPawn = new Pawn('white');

    test('noramal move of Pawn', () => {
        expect(myPawn.isValidMove({row: 6, col: 0}, {row: 5, col: 0}, baord.board)).toEqual({ promotion: false, valid: true});
    });

    test('2 step move of Pawn', () => {
        expect(myPawn.isValidMove({row: 6, col: 0}, {row: 4, col: 0}, baord.board)).toEqual({ doubleStep: true, valid: true});
    });

    test('try to capture the opponent pawn', () => {
        const opponentPawn = new Pawn('black');
        baord.board[4][1] = opponentPawn;
        expect(myPawn.isValidMove({row: 5, col: 2}, {row: 4, col: 1}, baord.board)).toEqual({ valid: true, capture: true, promotion: false });
    });

    test('promotion', () => {
        const opponentRook = new Rook('black');
        baord.board[0][1] = opponentRook;
        expect(myPawn.isValidMove({row: 1, col: 1}, {row: 0, col: 0}, baord.board)).toEqual({ valid: true, promotion: true, capture: true });
    });

    test('try to jump pass the opponent pawn', () => {
        const opponentPawn = new Pawn('black');
        baord.board[4][1] = opponentPawn;
        expect(myPawn.isValidMove({row: 5, col: 2}, {row: 4, col: 1}, baord.board)).toEqual({ valid: true, capture: true, promotion: false });
    });

    test('wrong diagonal move of Pawn', () => {
        expect(myPawn.isValidMove({row: 6, col: 0}, {row: 5, col: 1}, baord.board)).toEqual({ valid: false});
    });

    test('out of board move of Pawn', () => {
        expect(myPawn.isValidMove({row: 6, col: 0}, {row: 7, col: 0}, baord.board)).toEqual({ valid: false});
    });

    test('try to capture the opponent pawn straight', () => {
        const opponentPawn = new Pawn('black');
        baord.board[4][1] = opponentPawn;
        expect(myPawn.isValidMove({row: 5, col: 1}, {row: 4, col: 1}, baord.board)).toEqual({ valid: false});
    });

    test('try to jump pass the opponent pawn', () => {
        const opponentPawn = new Pawn('black');
        baord.board[4][1] = opponentPawn;
        expect(myPawn.isValidMove({row: 5, col: 1}, {row: 3, col: 1}, baord.board)).toEqual({ valid: false});
    });
});

describe.skip('Rook', () => {
    const board = new ChessBoard();
    const myRook = new Rook('white');
    const myPawn = new Pawn('white');
    const opponentPawn = new Pawn('black');

    test('try to move diagonally', () => {
        expect(myRook.isValidMove({ row: 7, col: 0 }, { row: 6, col: 1 }, board.board)).toEqual({ valid: false });
    });

    test('try to jump over own color piece  or try to capture own color', () => {
        board.board[7][0] = myRook;
        board.board[6][0] = myPawn;
        expect(myRook.isValidMove({ row: 7, col: 0 }, { row: 5, col: 0 }, board.board)).toEqual({ valid: false });
    });

    test('try to capture own color', () => {
        board.board[7][0] = myRook;
        board.board[6][0] = null;
        board.board[5][0] = myPawn;
        expect(myRook.isValidMove({ row: 7, col: 0 }, { row: 5, col: 0 }, board.board)).toEqual({ valid: false });
    });

    test('try to move horizontally or vertically', () => {
        board.board[5][0] = null;
        expect(myRook.isValidMove({ row: 7, col: 0 }, { row: 5, col: 0 }, board.board)).toEqual({ valid: true, capture: false });
    });

    test('capture opponent piece', () => {
        board.board[5][0] = opponentPawn;
        expect(myRook.isValidMove({ row: 7, col: 0 }, { row: 5, col: 0 }, board.board)).toEqual({ valid: true, capture: true });
    });
});

describe.skip('Bishop', () => {
    const board = new ChessBoard();
    const myBishop = new Bishop('white');
    const myPawn = new Pawn('white');
    const opponentPawn = new Pawn('black');

    test('try to move diagonally', () => {
        board.board[6][3] = null;
        expect(myBishop.isValidMove({ row: 7, col: 2 }, { row: 5, col: 4 }, board.board)).toEqual({ valid: true, capture: false });
    });

    test('try to jump over piece is invalid', () => {
        board.board[7][2] = myBishop;
        board.board[6][3] = opponentPawn;
        expect(myBishop.isValidMove({ row: 7, col: 2 }, { row: 5, col: 4 }, board.board)).toEqual({ valid: false });
    });

    test('try to capture own color is invalid', () => {
        board.board[7][2] = myBishop;
        board.board[6][0] = null;
        board.board[5][4] = myPawn;
        expect(myBishop.isValidMove({ row: 7, col: 2 }, { row: 5, col: 4 }, board.board)).toEqual({ valid: false });
    });

    test('try to move horizontally or vertically is invalid', () => {
        board.board[7][2] = myBishop;
        board.board[6][2] = null;
        expect(myBishop.isValidMove({ row: 7, col: 2 }, { row: 5, col: 2 }, board.board)).toEqual({ valid: false });
    });

    test('capture opponent piece', () => {
        board.board[7][2] = myBishop;
        board.board[6][3] = null;
        board.board[5][4] = opponentPawn;
        expect(myBishop.isValidMove({ row: 7, col: 2 }, { row: 5, col: 4 }, board.board)).toEqual({ valid: true, capture: true });
    });
});

describe('King', () => {
    const chess = new ChessBoard();
    const myKing = new King('white');
    const myPawn = new Pawn('white');
    const opponentPawn = new Pawn('black');

    test('should move horizontally or vertically', () => {
        chess.board[6][4] = null;
        expect(myKing.isValidMove({row: 7, col: 4}, {row: 6, col: 4}, chess.board)).toEqual({ valid: true, capture: false });
    });

    test('should not move 2 squares horizontally or vertically', () => {
        chess.board[6][4] = null;
        expect(myKing.isValidMove({row: 7, col: 4}, {row: 5, col: 4}, chess.board)).toEqual({ valid: false });
    });

    test('should move diagonally 1 square', () => {
        chess.board[6][5] = null;
        expect(myKing.isValidMove({row: 7, col: 4}, {row: 6, col: 5}, chess.board)).toEqual({ valid: true, capture: false });
    });

    test('should not move 2 sqaures diagonally', () => {
        chess.board[6][5] = null;
        expect(myKing.isValidMove({row: 7, col: 4}, {row: 5, col: 6}, chess.board)).toEqual({ valid: false });
    });

    test('try to capture own color piece', () => {
        chess.board[6][4] = null;
        chess.board[5][4] = myPawn;
        expect(myKing.isValidMove({row: 7, col: 4}, {row: 5, col: 4}, chess.board)).toEqual({ valid: false });
    });

    test('try to capture own color piece', () => {
        chess.board[6][4] = opponentPawn;
        expect(myKing.isValidMove({row: 7, col: 4}, {row: 6, col: 4}, chess.board)).toEqual({ valid: true, capture: true });
    });
})