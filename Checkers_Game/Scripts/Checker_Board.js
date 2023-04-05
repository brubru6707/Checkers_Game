import Piece from './Piece.js'
import {Turn_coordinates_to_dictionary_location, Are_added_coordinates_even, Turn_dictionary_to_string_location} from './Basic_Functions.js';


export default class Checker_Board {
   constructor(size) {
      this.size = size;
      this.mini_dictionary_board = {};
      this.pieces_dictionary = {};
      this.Make_mini_dictionary_board();
      this.Make_pieces_dictionary();
   }

   Make_mini_dictionary_board() {
      for(let y = this.size - 1; y >= 0; y--) {
         this.mini_dictionary_board[y] = [];
         for(let x = 0; x < this.size; x++) {
            let dictionary_location = Turn_coordinates_to_dictionary_location(x, y);
            this.Determine_placement_of_pieces_on_mini_board(dictionary_location);
         }
      }
   }

   Make_pieces_dictionary() {
      for(let y = this.size - 1; y >= 0; y--) {
         for(let x = 0; x < this.size; x++) {
            let dictionary_location = Turn_coordinates_to_dictionary_location(x, y);
            this.Determine_piece_on_pieces_dictionary(dictionary_location);
         }
      }
   }

   Determine_placement_of_pieces_on_mini_board(dictionary_location) {
      if(Are_added_coordinates_even(dictionary_location.x, dictionary_location.y) && this.Is_piece_on_either_side(dictionary_location.y))
         this.Set_mini_dictionary_board_location_to_filled(dictionary_location.y);
      else 
         this.Set_mini_dictionary_board_location_to_empty(dictionary_location.y);
   }  

   Determine_piece_on_pieces_dictionary(dictionary_location) {
      let string_location = Turn_dictionary_to_string_location(dictionary_location);
      if(this.Is_piece_player_one(dictionary_location.y) && Are_added_coordinates_even(dictionary_location.x, dictionary_location.y)) {
         this.pieces_dictionary[string_location] = new Piece(dictionary_location, 1);
      } else if(this.Is_piece_player_two(dictionary_location.y) && Are_added_coordinates_even(dictionary_location.x, dictionary_location.y)) {
         this.pieces_dictionary[string_location] = new Piece(dictionary_location, 2);
      }
   }

   Set_mini_dictionary_board_location_to_empty(y) {
      this.mini_dictionary_board[y].push(0);
   }

   Set_mini_dictionary_board_location_to_filled(y) {
      let team_number = 0;
      if(this.Is_piece_player_one(y))
         team_number = 1;
      else if(this.Is_piece_player_two(y))
        team_number = 2;
      this.mini_dictionary_board[y].push(team_number);
   }

   Is_piece_on_either_side(y) {
      return (this.Is_piece_player_one(y) || this.Is_piece_player_two(y));
   }

   Is_piece_player_two(y) {
      return y >= (this.size - 2)
   }

   Is_piece_player_one(y) {
      return y <= 1;
   }

   Is_square_even(dictionary_location) {
      if((dictionary_location.x + dictionary_location.y) % 2 == 0)
         return true;
      return false;
   }
}