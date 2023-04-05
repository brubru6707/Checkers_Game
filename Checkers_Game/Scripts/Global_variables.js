let checker_board_holder = document.getElementById("checkers_game_holder");
let current_player = document.getElementById("current_player");
let player_piece_images = {
    1: "./png/blue-big.png",
    2: "./png/red-big.png"
}
let current_locations_selected = {}; //1 is for piece, 2 is for empty place
let checkers_board_size = 8;
let opposite_player_count = {1: 2, 2: 1}
let current_team_number = 1;