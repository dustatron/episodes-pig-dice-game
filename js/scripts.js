/////////////////////////////////////////
/////////   GAME OBJECT   //////////////

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
  this.players[this.currentPlayer].updateTempScore(this.diceState);
  var temp = this.players[this.currentPlayer].tempScore.toString();

  document.writeScoreTemp(this.currentPlayer, temp);
  document.writeDiceRoll(this.diceState);

}

Game.prototype.checkForWin = function () {
  for (let i = 0; i < this.players.length; i++) {
    if(this.players[i].totalScore >= 10 ){
      return i;
    }
  }
}

Game.prototype.endTurn = function () {
  //adds tempScore to totalScore
  this.players[this.currentPlayer].totalScore += this.players[this.currentPlayer].tempScore;
  this.players[this.currentPlayer].tempScore = 0;

  var total = this.players[this.currentPlayer].totalScore.toString();
  var temp = this.players[this.currentPlayer].tempScore;
  var player = this.currentPlayer;
  
  
  //Toggle Player State
  if(this.currentPlayer === 0) {
    console.log("cp = 0");
    this.currentPlayer = 1;
  } else if(this.currentPlayer === 1) {
    console.log("cp = 1");
    this.currentPlayer = 0;
  } else {
    console.log('ERROR: current Player out of range');
  }
  document.highlightCurrentPlayer(this.currentPlayer);
  document.writeScoreTotal(player, total);
  document.writeScoreTemp(player, temp);
  var winner = this.checkForWin();
  
  if(winner){
    alert("Player "+ (winner+1)+ " wins!")
    return winner;
  }
}

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
  if(score === 1){
    this.tempScore = 0;
    game.endTurn();
  } else {
    this.tempScore += score;
  }
}

///////////////////////////////////////////////
/////////   START GAME OBJECT   //////////////
var game = new Game();


$(document).ready(function () {

  ////////////////////////////////////////////
  ////////    DOM FUNCTION     ////////////// 
  this.writeScoreTemp = function (player, turnScore) {
    console.log(player, turnScore);
    var temp = $('#p'+player+'Turn');
  
    temp.text(turnScore);
  
  }
  this.writeScoreTotal = function (player, totalScore) {
    var total = $('#p'+player+'Total');
    total.text(totalScore);
  }

  this.writeDiceRoll = function (dice) {
    var diceSides = ['img/Dice-1.png', 'img/Dice-2.png', 'img/Dice-3.png', 'img/Dice-4.png', 'img/Dice-5.png', 'img/Dice-6.png']
    $('#dice-face').attr('src', diceSides[dice -1]);
  }

  this.highlightCurrentPlayer = function() {
    var player = game.currentPlayer;
    $("#p0").removeClass("currentPlayer");
    $("#p1").removeClass("currentPlayer");
    $("#p" + player).addClass("currentPlayer");
  }

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
    document.highlightCurrentPlayer(game.currentPlayer);
    var p1 = new Player();
    var p2 = new Player();
  
    game.addPlayer(p1);
    game.addPlayer(p2);

    startBtn.hide();
    resetBtn.show();
  });
});