export function Turn_dictionary_to_string_location(dictionary_location) {
    return `${dictionary_location.x},${dictionary_location.y}`;
}

export function Turn_coordinates_to_dictionary_location(x, y) {
    return {
        x: x,
        y: y
    };
}

export function Turn_coordinates_to_string_location(x, y) {
    return `${x},${y}`;
}

export function Are_added_coordinates_even(x, y) {
    if((x + y) % 2 == 0) 
        return true;
    return false;
}

export function Turn_id_to_dictionary_location(id) {
    let x = parseInt(id.substring(0, id.indexOf(",")));
    let y = parseInt(id.substring(id.indexOf(",") + 1));
    return Turn_coordinates_to_dictionary_location(x, y);
} 

export function Turn_id_to_string_location(id) {
    let x = parseInt(id.substring(0, id.indexOf(",")));
    let y = parseInt(id.substring((id.indexOf(",") + 1)));
    return Turn_coordinates_to_string_location(x, y);
}

export function Turn_string_location_to_dictionary_location(string_location) {
    let x = parseInt(string_location.substring(0, string_location.indexOf(",")));
    let y = parseInt(string_location.substring(string_location.indexOf(",") + 1));
    return {
        x: x,
        y: y
    };
}