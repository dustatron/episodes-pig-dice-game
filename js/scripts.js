


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

    diceFace.attr('src', diceSides[Math.floor(Math.random() * 6 + 1)]).css('transform', 'scale(.9)'); //transform: scale()

    setTimeout(function () {
      diceFace.attr('src', diceSides[Math.floor(Math.random() * 6 + 1)]);
    }, 150);

    setTimeout(function () {
      diceFace.attr('src', diceSides[Math.floor(Math.random() * 6 + 1)]);
    }, 250);

    setTimeout(function () {
      diceFace.attr('src', diceSides[Math.floor(Math.random() * 6 + 1)]);
    }, 350);

    setTimeout(function () {
      diceFace.attr('src', diceSides[dice - 1]).css('transform', 'scale(1)');
    }, 450);


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
  var playerBoard = $('#playerBoard');
  var playerSelect = $('.char-area');

  // ROLL BUTTON LISTENER
  rollBtn.click(function () {
    game.rollDice();
  })

  // HOLD BUTTON LISTENER
  holdBtn.click(function () {
    game.endTurn();
  })

  // ----------- START BUTTON LISTENER -----------
  startBtn.click(function () {
    document.highlightCurrentPlayer(game.currentPlayer);

    startBtn.hide();
    resetBtn.show();
    playerBoard.slideDown();
    playerSelect.slideUp();

  });

  resetBtn.click(function () {
    game.resetGame();
  });

  function charBoard() {
    var printOutString = "";
    characters.forEach(function (char, i) {
      printOutString += '<div id="' + i + '" class="char-square"><img src="' + char.img + '">' +
        '<h3>' + char.name + '</h3></div>'

    });

    $('.character-board').html(printOutString);
  };

  var charId;

  //Character btns
  $('#pick-for-1').click(function () {

    if(!characters[charId]){
      alert('choose a character')
    } else {
      var p1 = new Player();
      game.addPlayer(p1);
      game.players[0].pickChar(characters[charId].name, characters[charId].img);
      game.currentPlayer = 1;
      $('#p0-name').html(characters[charId].name);
      $('#pick-for-1').hide();
      $('#pick-for-2').show();
      $('#p0-profile-image').attr('src', characters[charId].img)
      charId = false;
    }
  });

  $('#pick-for-2').click(function () {
    if(!characters[charId]){
      alert('choose a character')
    } else {
      var p2 = new Player();
      game.addPlayer(p2);
      game.players[1].pickChar(characters[charId].name, characters[charId].img);
  
      game.currentPlayer = 0;
      $('#pick-for-2').hide();
      $('#startBtn').show();
      $('#p1-name').html(characters[charId].name);
      $('#p1-profile-image').attr('src', characters[charId].img)


    }


  })

  //character board listeners
  $('.character-board').on('click', '.char-square', function () {
    $("#p" + (game.currentPlayer + 1) + "Pic").attr('src', characters[this.id].img)
    $("#p" + game.currentPlayer + "-turn-to-pic").html(characters[this.id].name)
    charId = this.id;

  })

  charBoard();

});//end document.ready