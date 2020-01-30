function Game() {
  this.players = [];
  this.currentPlayer = 0;
  this.diceState = 0;
  this.id;

  return 'game created';
}

Game.prototype.addPlayer = function (player) {
  this.players.push(player);
}

Game.prototype.rollDice = function () {
  this.diceState = Math.floor(Math.random() * 6 + 1);
  this.showDice();
}

Game.prototype.showDice = function () {
  //write diceState to DOM
  console.log(this.diceState);
}

Game.prototype.checkForWin = function () {
  for (let i = 0; i < this.players.length; i++) {
    if(this.players[i].totalScore >= 100 ){
      return i;
    }
  }
}

Game.prototype.endTurn = function () {
  //adds tempScore to totalScore
  this.players[this.currentPlayer].totalScore += this.players[this.currentPlayer].tempScore;

  var winner = this.checkForWin();

  if(winner){
    return winner;
  }

  //toggle player state
  if(this.currentPlayer === 0) {
    this.currentPlayer = 1;
  } else if(this.currentPlayer === 1) {
    this.currentPlayer = 0;
  } else {
    console.log('ERROR: current Player out of range');
  }
}

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
  if(score === 1){
    this.tempScore = 0;
    game.endTurn();
  } else {
    this.tempScore += score;
  }
}

var game = new Game();

$(document).ready(function () {
  console.log('ready')

  //Interface selectors
  var startBtn = $('#startBtn');
  var resetBtn = $('#reset');
  var rollBtn;
  var holdBtn;


  
  // START BUTTON LISTENER
  startBtn.click(function(){
    console.log('start click');
    var p1 = new Player();
    var p2 = new Player();
  
    game.addPlayer(p1);
    game.addPlayer(p2);

    startBtn.hide();
    resetBtn.show();
  });
});