/* GAME FUNCTION
 1. player must guess a number between min and max
 2. player has a certain amount of guesses
 3. notify the player of the remaining guesses
 4. notify the player of the correct answer if they lose
 5. let player choose to play again
*/

//Game values
let min = 1,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

//UI elements
const game = document.getElementById('game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.getElementById('guess-btn'),
  guessInput = document.getElementById('guess-input'),
  message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'try-again') {
    window.location.reload();
  }
})

//Listen for guesses
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  //Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else {
    //Check if won
    if (guess === winningNum) {
      //Disable input
      guessInput.disabled = true;
      gameOver(true, `${winningNum} is correct, You Win!`);
      playAgain()
    } else {
      //reduce guess after wrong number is entered
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        //Game Over ==> lost
        //Disable input
        guessInput.disabled = true;
        gameOver(false, `Game over! You Lost. The correct number was ${winningNum}.`);
        playAgain();
      } else {
        //Game continues with wrong answers
        gameOver(false, `${guess} is not correct. You have  ${guessesLeft} guesses left.`)
      }
    }
  }

});

//game over function
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  //change border color
  guessInput.style.borderColor = color;
  //Let user know game is won
  setMessage(msg, color);
}
//play again FUNCTION
function playAgain() {
  //Play again
  guessBtn.value = 'Play Again!';
  guessBtn.className += 'try-again';
}
//Get winning number
function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set message function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
