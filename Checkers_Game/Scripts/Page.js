import {Turn_string_location_to_dictionary_location, Turn_coordinates_to_string_location, Turn_id_to_string_location, Are_added_coordinates_even, Turn_id_to_dictionary_location} from "./Basic_Functions.js"
import Piece from "./Piece.js";

export default class Page {
    constructor(mini_dictionary_board, pieces_dictionary) {
        this.mini_dictionary_board = mini_dictionary_board;
        this.pieces_dictionary = pieces_dictionary;
        this.available_locations = [];
        this.jumping_in_progress = false
        this.Paste_mini_dictionary_board_On_Page(this.mini_dictionary_board);
        this.Create_event_for_complete_checker_pieces();
    }

    Create_event_for_complete_checker_pieces() {
        this.Display_current_player();
        Object.keys(document.getElementsByClassName("square")).forEach(key => {
            let square = document.getElementsByClassName("square")[key];
            square.addEventListener('click', e => {
                this.Get_locations_selected(e.target.id);
                if(current_locations_selected[1])
                    this.Run_piece_selected(); //piece has been chosen, get available locations
                this.Any_available_locations(); //
                this.Highlight_available_locations();
                this.De_highlight_available_location_locations();
                // this.Check_if_player_moved();
            })
        })
    }

    Run_piece_selected() {
        let piece = this.Get_piece_from_piece_location(current_locations_selected[1]);
        let available_locations_dictionary = piece.Find_available_locations();//jump or empty or both
        if(available_locations_dictionary["jump"]) {
            this.available_locations = available_locations_dictionary["jump"];
            this.jumping_in_progress = true;
        } else if(available_locations_dictionary["empty"])
            this.available_locations = available_locations_dictionary["empty"];
        else 
            this.available_locations = [];
    }

    Any_available_locations() {
        if(this.available_locations.length != 0) {
            this.Highlight_selected_locations();
            this.Highlight_available_locations();
            if(this.jumping_in_progress) {
                this.Selected_piece_needs_to_jump();
            } else {
                this.Selected_piece_can_move();
            }
        }
    }

    Get_piece_from_piece_location(string_location) {
        return this.pieces_dictionary[string_location]
    }

    Selected_piece_needs_to_jump() {
        if(this.available_locations[0] == this.current_locations_selected[2]) {
            this.Selected_piece_needs_to_jump();
            this.available_locations.shift();
            this.De_highlight_available_location_locations();
        }
    }

    Get_locations_selected(id) {
        let square_string_location = Turn_id_to_string_location(id);
        let square_dictionary_location = Turn_id_to_dictionary_location(id);
        if(this.Is_there_a_piece(square_string_location) && this.Is_correct_piece(square_string_location))
            current_locations_selected[1] = Turn_id_to_string_location(id);
        else if(!this.Is_there_a_piece(square_string_location) &&  current_locations_selected[1] && Are_added_coordinates_even(square_dictionary_location.x, square_dictionary_location.y)) 
            current_locations_selected[2] = Turn_id_to_string_location(id);
    }

    Change_player_number(){
        current_team_number = current_team_number == 1 ? 2 : 1; 
        this.Display_current_player();
    }

    Display_current_player() {
        document.getElementById("current_player").innerHTML = `The current player is ${current_team_number}`
    }

    Mandatory_jump(mandatory = true) {
        if(mandatory) {
            document.getElementById("jump").innerHTML = "Mandatory jump";
            this.jumping_in_progress = true;
        } else {
            document.getElementById("jump").innerHTML = "";
            this.jumping_in_progress = false;
        }

    }

    Highlight_available_locations() {
        this.available_locations.forEach(string_location => {
            let available_loctation = document.getElementById(string_location);
            available_loctation.classList.add("available_location");
        }) 
    }

    De_highlight_available_location_locations() {
        let available_location_elements = document.getElementsByClassName("available_location");
        let not_found_locations = [];
        Object.keys(available_location_elements).forEach(key => {
            let string_location = available_location_elements[key].id;
            if(!this.available_locations.includes(string_location)) 
                not_found_locations.push(string_location);
        })
        not_found_locations.forEach(string_location => {
            document.getElementById(string_location).classList.remove("available_location");
        })
    }

    Highlight_selected_locations() {
        Object.keys(current_locations_selected).forEach(key => {
            let selected = document.getElementById(current_locations_selected[key]);
            selected.classList.add("selected");
        })
    
    }

    De_highlight_selected_locations() {
        let selected_elements = document.getElementsByClassName("selected");
        for (const [key, element] of Object.entries(selected_elements)) {
            let selected_element_string_location = Turn_id_to_string_location(element.id);
            if(!(selected_element_string_location == current_locations_selected[1] || selected_element_string_location == current_locations_selected[2])){
                element.classList.remove("selected")
            }
        }

    }

    Is_correct_piece(string_location) {
        return this.Is_piece_in_current_team(this.Get_piece(string_location));
    }

    Is_there_a_piece(string_location) {
        if(this.pieces_dictionary[string_location])
            return true;
        return false
    }

    Get_piece(string_location) {
        return this.pieces_dictionary[string_location];
    }

    Is_piece_in_current_team(piece) {
        return piece.team_number == current_team_number;
    }

    Paste_mini_dictionary_board_On_Page(mini_dictionary_board) {
        Object.keys(mini_dictionary_board).forEach(reverse_y_key => {
            let y_key = checkers_board_size - reverse_y_key - 1
            for(let x_key = 0; x_key < mini_dictionary_board[y_key].length; x_key++) {
                let location_value = mini_dictionary_board[y_key][x_key];
                let complete_checker_piece = this.Make_complete_checker_piece(x_key, parseInt(y_key), location_value);         
                checker_board_holder.append(complete_checker_piece);
            }
            checker_board_holder.append(this.Make_new_line());
        })
    }

    Make_complete_checker_piece(x, y, location_value) {
        let string_location = Turn_coordinates_to_string_location(x, y);
        let square = this.Make_square(string_location);
        this.Determine_square_color(x, y, square);
        let piece_holder = this.Make_piece_holder(string_location);
        let piece = this.Make_correct_piece(string_location, location_value)
        if(this.Is_piece_need(location_value))
            piece_holder.append(piece);
        square.append(piece_holder)
        return square;
    }

    Determine_square_color(x, y, square) {
        if(Are_added_coordinates_even(x, y)) 
            square.classList.add("square_one");
        else 
            square.classList.add("square_two");
    }

    Make_square(string_location) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.id = string_location;
        return square;
    }

    Make_piece_holder(string_location) {
        let square_holder = document.createElement("div");
        square_holder.classList.add("square_holder")
        square_holder.id = string_location + " H"; //H is for holder
        return square_holder
    }

    Make_correct_piece(string_location, location_value) {
        let piece = document.createElement("img");
        piece.classList.add("piece")
        piece.id = string_location + " I"; //i is for image
        piece.src = player_piece_images[location_value];
        return piece;
    }

    Make_new_line() {
        return document.createElement("br");
    }

    Is_piece_need(location_value) {

        if(location_value == 0) 
            return false;
        return true;
    }

}