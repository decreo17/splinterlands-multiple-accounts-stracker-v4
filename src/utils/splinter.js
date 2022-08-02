
const splinter = (team) => {
    switch(team) {
        case "Red":
          team = "Fire";
          break;
        case "Blue":
          team = "Water";
          break;
        case "Green":
          team = "Earth";
          break;
        case "White":
          team = "Life";
          break;
        case "Black":
          team = "Death";
          break;
        case "Gold":
          team = "Dragon";
          break;
        default:
          team = "undefined";
    };
    return team;
}

export default splinter