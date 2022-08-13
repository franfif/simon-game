var buttonColours = new Array('red', 'blue', 'green', 'yellow');
var gamePattern = new Array();
var userClickedPattern = new Array();
var gameStarted = false;
var level = 0;
var clickable = false;

$(document).keypress(function() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

function nextSequence() {
  $("#level-title").text("Level " + ++level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  console.log(gamePattern);
  userClickedPattern = [];
  clickable = true;
}

$(".btn").click(function() {
  if (gameStarted && clickable) {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    if (correctBtn()) {
      playSound(userChosenColour);
      animatedPress(userChosenColour);
      if (userClickedPattern.length === gamePattern.length) {
        clickable = false;
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    } else {
      clickable = false;
      gameOver();
    }
  }
});

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatedPress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function correctBtn() {
  let i = userClickedPattern.length - 1;
  return (userClickedPattern[i] === gamePattern[i]);
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  $("#level-title").html("/!\\ Game Over! /!\\<br>Press Any Key To Resart");
}
