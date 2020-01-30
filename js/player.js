
///////////////////////////////////////////
/////////   player OBJECT   //////////////

function Player() {
  this.tempScore = 0;
  this.totalScore = 0;
  this.wins = 0;
  this.character = {};

  return 'player created';
}

Player.prototype.pickChar = function (name, img) {
  var charObj = {
    name: name,
    img: img
  }
  this.character = charObj;
}

Player.prototype.updateTempScore = function (score) {
  if (score === 1) {
    this.tempScore = 0;
    game.endTurn();
  } else {
    this.tempScore += score;
  }
} 