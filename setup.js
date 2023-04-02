let checkers_game_holder = document.getElementById("checkers_game_holder");
let current_player = document.getElementById("current_player");
let player_one_square_image_html = "<img src='png/red-big.png' height=35 width=35>";
let player_two_square_image_html = "<img src='png/blue-big.png' height=35 width=35>";
let current_location_choices = {};
let current_player_count = 1;

function Create_Checkers_Board(){
    let checkers_board_size = 8;
    for(let y = checkers_board_size; y > 0; y--) {
        for(let x = 1; x <= checkers_board_size; x++) {
            Place_Squares(checkers_board_size, x, y);
            Place_Square_Images(checkers_board_size, x, y);
        }
    }
}

function Place_Square_Images(checkers_board_size, x, y) {
    let is_even_piece = (x + y) % 2 == 0;
    let current_square_id = `${x},${y}`;
    if(y >= checkers_board_size - 1 && is_even_piece) 
        document.getElementById((current_square_id + ",H")).innerHTML = player_one_square_image_html;
    if(y < 3 && is_even_piece) 
        document.getElementById((current_square_id + ",H")).innerHTML = player_two_square_image_html;
}

function Place_Squares(checkers_board_size, x, y) {
    let square = document.createElement("div");
    let checker_holder = document.createElement("div");
    square.id = `${x},${y}`;
    Create_Board_Events(square);
    checker_holder.id = `${x},${y},H`
    if((y + x)%2 == 0 )
        square.classList.add("square_one", "square");
    else 
        square.classList.add("square_two", "square");
    checker_holder.classList.add("checker_holder");
    square.append(checker_holder);
    checkers_game_holder.append(square);
    if(x == checkers_board_size) 
        checkers_game_holder.append(document.createElement("br"));
}

function Create_Board_Events(square) {
    square.addEventListener("click", e=>{
        let square_id;
        if(e.target.localName == "img")
            square_id = e.target.offsetParent.id;
        else 
            square_id = e.target.id
        Add_Location(square_id);
    })
}

function State_Current_Player() {
    current_player.innerHTML = `Current Player: ${current_player_count}`
}

function Add_Location(location) {
    //location will be the coordinates
    if(Location_Has_Piece(location)) 
        current_location_choices[1] = location;
    else 
        current_location_choices[2] = location;
    console.log(current_location_choices)
    Highlight_Locations();
}

function Location_Has_Piece(location) {
   let piece_index = document.getElementById(location).innerHTML.indexOf("img");
   return piece_index != -1 ? true : false;
}

function Highlight_Locations() {
    for(let location_choices_index = 1; location_choices_index <= Object.keys(current_location_choices).length ; location_choices_index++) {
        let location = current_location_choices[location_choices_index];
        let element = document.getElementById(location);
        element.classList.add("clicked");
    }
}

Create_Checkers_Board();

State_Current_Player();