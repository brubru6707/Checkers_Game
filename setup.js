let checkers_game_holder = document.getElementById("checkers_game_holder");
let current_player = document.getElementById("current_player");
let player_one_square_image_html = "<img src='png/red-big.png' height=35 width=35>";
let player_two_square_image_html = "<img src='png/blue-big.png' height=35 width=35>";
let current_location_choices = {};
let current_player_count = 1;

function Create_Checkers_Board() {
   let checkers_board_size = 8;
   for (let y = checkers_board_size; y > 0; y--) {
      for (let x = 1; x <= checkers_board_size; x++) {
         Place_Squares(checkers_board_size, x, y);
         Place_Square_Images(checkers_board_size, x, y);
      }
   }
}

function Place_Square_Images(checkers_board_size, x, y) {
   let is_even_piece = (x + y) % 2 == 0;
   let current_square_id = `${x},${y}`;
   if (y >= checkers_board_size - 1 && is_even_piece)
      document.getElementById((current_square_id + ",H")).innerHTML = player_one_square_image_html;
   if (y < 3 && is_even_piece)
      document.getElementById((current_square_id + ",H")).innerHTML = player_two_square_image_html;
}

function Place_Squares(checkers_board_size, x, y) {
   let square = document.createElement("div");
   let checker_holder = document.createElement("div");
   square.id = `${x},${y}`;
   Create_Board_Events(square);
   checker_holder.id = `${x},${y},H`
   if ((y + x) % 2 == 0)
      square.classList.add("square_one", "square");
   else
      square.classList.add("square_two", "square");
   checker_holder.classList.add("checker_holder");
   square.append(checker_holder);
   checkers_game_holder.append(square);
   if (x == checkers_board_size)
      checkers_game_holder.append(document.createElement("br"));
}

function Create_Board_Events(square) {
   square.addEventListener("click", e => {
      let square_id;
      if (e.target.localName == "img")
         square_id = e.target.offsetParent.id;
      else
         square_id = e.target.id
      Add_Location(square_id);
   })
}

function State_Current_Player() {
   current_player.innerHTML = `Current Player: ${current_player_count}`
}

//--------------------------------

function Add_Location(location) {
   //location will be the coordinates
   let current_location_choices_index = 0;
   if (Location_Has_Right_Piece(location))
      current_location_choices_index = 1;
   else if (Location_Is_Appropritate(location))
      current_location_choices_index = 2;

   if (current_location_choices_index != 0) {
      De_Highlight_Location(current_location_choices_index);
      current_location_choices[current_location_choices_index] = location;
      Highlight_Locations();
   }

   Find_Out_Piece_Available_Locations()
}

function Location_Has_Right_Piece(location) {
   let element = document.getElementById(location);
   let piece_index = element.innerHTML.indexOf("img");
   // console.log(-1 != element.innerHTML.indexOf("red"), current_player_count == 2)
   if (-1 != element.innerHTML.indexOf("blue"))
      return current_player_count == 1;
   else if (-1 != element.innerHTML.indexOf("red"))
      return current_player_count == 2;
   else
      return false;
}

function Location_Is_Appropritate(location) {
   let element = document.getElementById(location);
   return -1 == element.innerHTML.indexOf("img") && [...element.classList].includes("square_one");
}

function Highlight_Locations() {
   Object.keys(current_location_choices).forEach(key => {
      let location = current_location_choices[key];
      let element = document.getElementById(location);
      element.classList.add("clicked");
   })
}

function De_Highlight_Location(index_location) {
   if (index_location == 1 && current_location_choices[index_location]) {
      let location = current_location_choices[index_location];
      let element = document.getElementById(location);
      element.classList.remove("clicked");
   } else if (index_location == 2 && current_location_choices[index_location]) {
      let location = current_location_choices[index_location];
      let element = document.getElementById(location);
      element.classList.remove("clicked");
   }

}

function Find_Out_Piece_Available_Locations() {
   if(!current_location_choices[1])
      return
   let piece_location = current_location_choices[1]; 
   let piece_x_pos_char = piece_location.substring(0, piece_location.indexOf(","));
   let piece_y_pos_char = piece_location.substring(piece_location.indexOf(",") + 1);
   let piece_x_pos = parseInt(piece_x_pos_char);
   let piece_y_pos = parseInt(piece_y_pos_char);
   let available_locations = [];
   if(current_player_count == 1) {
      for(let i = -1; i < 2; i++) {
         let y = piece_y_pos + 1;
         let x = piece_x_pos + i;
         let does_not_cross_boundaries = (piece_x_pos + i > 0 && piece_x_pos + i < 9);
         let check_location = `${x},${y}`;
         console.log(check_location)
         let no_friendly_fire = doesLocation_Is_Appropritate(check_location);
         if(no_friendly_fire && does_not_cross_boundaries) 
            available_locations.push(check_location);
      }
   }
   console.log(available_locations)
}

Create_Checkers_Board();

State_Current_Player();
