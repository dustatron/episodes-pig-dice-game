/////////////////////////////////////////
/////////   GAME OBJECT   //////////////

function Game() {
  this.players = [];
  this.currentPlayer = 0;
  this.diceState = 0;
  this.id;
  this.winner;

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
    if (this.players[i].totalScore >= 2) {
      return this.winner = i.toString();
    }
  }
}

Game.prototype.resetGame = function () {
  this.currentPlayer = 0;

  this.players.forEach(function (player, index) {
    player.tempScore = 0;
    player.totalScore = 0;
    document.writeScoreTemp(index, 0);
    document.writeScoreTotal(index, 0);
    if (index === this.winner) { 
      player.wins++;
    }
    document.highlightCurrentPlayer();
    this.winner = '';
  });
}

Game.prototype.endTurn = function () {
  //adds tempScore to totalScore
  this.players[this.currentPlayer].totalScore += this.players[this.currentPlayer].tempScore;
  this.players[this.currentPlayer].tempScore = 0;

  var total = this.players[this.currentPlayer].totalScore.toString();
  var temp = this.players[this.currentPlayer].tempScore;
  var player = this.currentPlayer;


  //Toggle Player State
  if (this.currentPlayer === 0) {
    this.currentPlayer = 1;
  } else if (this.currentPlayer === 1) {
    this.currentPlayer = 0;
  } else {
    console.log('ERROR: current Player out of range');
  }

  document.highlightCurrentPlayer(this.currentPlayer);
  document.writeScoreTotal(player, total);
  document.writeScoreTemp(player, temp);
  
  var winner = this.checkForWin();
  console.log('winner is = ' + winner);

  if (this.checkForWin()) {
    console.log('this is a win');
    $('#p' + winner + 'Wins').html(this.players[winner].wins);
    alert("Player " + (this.players[winner].character.name) + " wins!")
    this.resetGame();
    $('#p1Wins').html(game.players[1].wins);
    $('#p0Wins').html(game.players[0].wins);
    return winner;
  }
}