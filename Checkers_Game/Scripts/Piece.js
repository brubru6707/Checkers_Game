import {Turn_coordinates_to_string_location, Turn_string_location_to_dictionary_location, Turn_dictionary_to_string_location} from "./Basic_Functions.js"

export default class Piece {
    constructor(dictionary_location, team_number) {
        this.dictionary_location = dictionary_location;
        this.team_number = team_number;
        this.possible_hops = [];
    }   

    Fidn_available_locations() {
        let available_locations = (this.Find_an_empty_square_nearby());
        this.Find_hop(); //this.possible.hops
        return {
            'jump': this.possible_hops,
            'empty': available_locations
        };
    }

    Find_an_empty_square_nearby() {
        let empty_squares_nearby = [];
        let y_change = current_team_number == 1 ? 1 : -1;
        for(let i = -1; i < 2 && !this.Is_passing_x_boudary(this.dictionary_location.x + i) ; i++) { 
            let possible_string_location = Turn_coordinates_to_string_location(this.dictionary_location.x + i, this.dictionary_location.y + y_change);
            if(this.Is_there_an_empty_square(possible_string_location) && i != 0)
                empty_squares_nearby.push(possible_string_location);
        }
        return empty_squares_nearby;
    }

    Find_a_nearby_enemy(dictionary_location = this.dictionary_location) {
        let enemey_nearby = [];
        let y_change = current_team_number == 1 ? 1 : -1;
        for(let i = -1; i < 2 && !this.Is_passing_x_boudary(dictionary_location.x + i) ; i++) { 
            let possible_string_location = Turn_coordinates_to_string_location(dictionary_location.x + i, dictionary_location.y + y_change);
            if(!this.Is_there_an_empty_square(possible_string_location) && i != 0 && this.Is_enemy(possible_string_location))
                enemey_nearby.push(possible_string_location);
        }
        return enemey_nearby;
    }

    Find_hop(check_location = this.dictionary_location) {
        let nearby_enemies = this.Find_a_nearby_enemy(check_location);
        let enemies_found = []
        if(nearby_enemies.length == 0) {
            this.possible_hops.push(Turn_dictionary_to_string_location(check_location));
            return;
        }
        for(let nearby_enemy_string_location of nearby_enemies) {
            let nearby_enemy_dictionary_location = Turn_string_location_to_dictionary_location(nearby_enemy_string_location);
            let possible_string_hoping_location = this.Make_possible_string_hoping_location(check_location, nearby_enemy_dictionary_location);
            let possible_dictionary_hoping_location = Turn_string_location_to_dictionary_location(possible_string_hoping_location);
            if(this.Is_passing_boundary(possible_dictionary_hoping_location))
                return;
            this.possible_hops.push(possible_string_hoping_location);
            enemies_found.concat(this.Find_hop(possible_dictionary_hoping_location));
        }
    }

    Make_possible_string_hoping_location(dictionary_location = this.dictionary_location, enemy_dictionary_location) {
        let x_change = (enemy_dictionary_location.x - dictionary_location.x );
        let y_change = (enemy_dictionary_location.y - dictionary_location.y);
        return `${enemy_dictionary_location.x + x_change},${enemy_dictionary_location.y + y_change}`;
    }

    Is_enemy(string_location) {
        let opposite_player_color = current_team_number == 1 ? "red" : "blue";
        if(-1 != document.getElementById(string_location).innerHTML.indexOf(opposite_player_color)) 
            return true;
        return false;   
    }

    Is_passing_boundary(dictionary_location = this.dictionary_location) {
        return this.Is_passing_x_boudary(dictionary_location.x) || this.Is_passing_y_boudary(dictionary_location.y);
    }

    Is_passing_x_boudary(x) {
        return x < 0 || x > checkers_board_size - 1;
    }

    Is_passing_y_boudary(y) {
        return y < 0 || y > checkers_board_size - 1;
    }

    Is_there_an_empty_square(string_location) {
        if(-1 == document.getElementById(string_location).innerHTML.indexOf("img")) 
            return true;
        return false;   
    }
}