var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;




$(document).keypress(function() {

  if (started === false) {

    $("h1").text("LEVEL " + level);
    $("#your-score").text("Your Score");
    nextSequence();
    started = true;

  }
});


function nextSequence() {

  userClickedPattern = [];
  level++;
  $("h1").text("LEVEL " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}

$(".btn").click(function() {

  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePressed(userChosenColor);

  checkAnswer(userClickedPattern.length-1);


});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


      if(gamePattern.length===userClickedPattern.length){
        $("#your-score").text("Your Score:"+(level*5));
          setTimeout(nextSequence,1000);
      }
    } else {

      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
        $("#your-score").text("You Scored:"+(level*5));
startOver();
    }
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePressed(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
