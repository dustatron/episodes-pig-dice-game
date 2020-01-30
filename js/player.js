
///////////////////////////////////////////
/////////   player OBJECT   //////////////

function Player() {
  this.tempScore = 0;
  this.totalScore = 0;
  this.wins = 0;
  this.character = this.pickChar();

  return 'player created';
}

Player.prototype.pickChar = function () {
  //take the character and push it to the player object
  return 'character coming soon';
}

Player.prototype.updateTempScore = function (score) {
  if (score === 1) {
    this.tempScore = 0;
    game.endTurn();
  } else {
    this.tempScore += score;
  }
}