


///////////////////////////////////////////////
/////////   START GAME OBJECT   //////////////
var game = new Game();


$(document).ready(function () {

  ////////////////////////////////////////////
  ////////    DOM FUNCTION     ////////////// 
  this.writeScoreTemp = function (player, turnScore) {
    var temp = $('#p' + player + 'Turn');

    temp.text(turnScore);

  }
  this.writeScoreTotal = function (player, totalScore) {
    var total = $('#p' + player + 'Total');
    total.text(totalScore);
  }

  this.writeDiceRoll = function (dice) {
    var diceFace = $('#dice-face');
    var diceSides = ['img/Dice-1.png', 'img/Dice-2.png', 'img/Dice-3.png', 'img/Dice-4.png', 'img/Dice-5.png', 'img/Dice-6.png'];
    
    diceFace.attr('src', diceSides[Math.floor(Math.random() * 6 +1 )]).css('transform', 'scale(.9)'); //transform: scale()

    setTimeout(function () {
      diceFace.attr('src', diceSides[Math.floor(Math.random() * 6 +1 )]);     
    }, 150);

    setTimeout(function () {
      diceFace.attr('src', diceSides[Math.floor(Math.random() * 6 +1 )]);     
    }, 250);

    setTimeout(function () {
      diceFace.attr('src', diceSides[Math.floor(Math.random() * 6 +1 )]);     
    }, 350);

    setTimeout(function () {
      diceFace.attr('src', diceSides[dice - 1]).css('transform', 'scale(1)');
    }, 450);

    // for (let i = 0; i < 10; i++) {

    //   setTimeout(function(){
    //     diceFace.attr('src', diceSides[Math.floor(Math.random() * 6 +1 )]);
    //   }, 400);
    // }

  
  }

  this.highlightCurrentPlayer = function () {
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
  rollBtn.click(function () {
    game.rollDice();
  })

  // HOLD BUTTON LISTENER
  holdBtn.click(function () {
    game.endTurn();
  })

  // START BUTTON LISTENER
  startBtn.click(function () {
    document.highlightCurrentPlayer(game.currentPlayer);
    var p1 = new Player();
    var p2 = new Player();

    game.addPlayer(p1);
    game.addPlayer(p2);

    startBtn.hide();
    resetBtn.show();
  });

  resetBtn.click(function () {
    game.resetGame();
  });

  function charBoard () {
    var printOutString = "";

    characters.forEach(function (char) {
      printOutString += '<div class="char-square"><img src="'+char.img+'">'+
      '<h3>'+char.name+'</h3></div>'

    });

    $('.character-board').html(printOutString);
  };

  charBoard();
});