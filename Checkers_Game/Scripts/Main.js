import Checker_Board from './Checker_Board.js';
import Page from './Page.js';
import Piece from './Piece.js';

let checker_board = new Checker_Board(8); 
let mini_dictionary_board = checker_board.mini_dictionary_board;
let pieces_dictionary = checker_board.pieces_dictionary;
pieces_dictionary['2,2'] = new Piece({x: 2, y: 2}, 1);
pieces_dictionary['3,3'] = new Piece({x: 3, y: 3}, 2);
pieces_dictionary['2,4'] = new Piece({x: 2, y: 4}, 2);
delete pieces_dictionary['6,2'];
mini_dictionary_board[2][2] = 1;
mini_dictionary_board[3][3] = 2;
mini_dictionary_board[5][3] = 2;
mini_dictionary_board[6][2] = 0;
console.log(mini_dictionary_board)
let page = new Page(mini_dictionary_board, pieces_dictionary);

