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
  this.players[this.currentPlayer].updateTempScore(this.diceState);
}

Game.prototype.showDice = function () {
  //write diceState to DOM
  console.log("diceState: " + this.diceState);
  console.log("currentPlayer: " + this.currentPlayer);
  console.log("tempScore " + this.players[this.currentPlayer].tempScore);
  console.log("totalScore: " + this.players[this.currentPlayer].totalScore);
}

Game.prototype.checkForWin = function () {
  for (let i = 0; i < this.players.length; i++) {
    if(this.players[i].totalScore >= 100 ){
      return i;
    }
  }
}

Game.prototype.endTurn = function () {
  if(this.currentPlayer === 0) {
    console.log("cp = 0");
    this.currentPlayer = 1;
  } else if(this.currentPlayer === 1) {
    console.log("cp = 1");
    this.currentPlayer = 0;
  } else {
    console.log('ERROR: current Player out of range');
  }
  //adds tempScore to totalScore
  this.players[this.currentPlayer].totalScore += this.players[this.currentPlayer].tempScore;
  this.players[this.currentPlayer].tempScore = 0;

  var winner = this.checkForWin();

  if(winner){
    return winner;
  }

  //toggle player state
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
  var rollBtn = $("#roll");
  var holdBtn = $("#hold");

  // ROLL BUTTON LISTENER
  rollBtn.click(function() {
    game.rollDice();
  })

  // HOLD BUTTON LISTENER
  holdBtn.click(function() {
    game.endTurn();
  })
  
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