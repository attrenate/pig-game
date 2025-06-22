
let activePlayer = 1;        
const diceRolls = [];

function rollDice() {
  const number = Math.floor(Math.random() * 6) + 1;
  console.log('dice has been rolled:', number);

  // Get the active player's score element
  const playerScore = document.getElementById(`h${activePlayer}-s`);
  let currentScore = parseInt(playerScore.textContent) || 0;

  if (number === 1) {
    console.log("opponent's turn.");
    diceRolls.length = 0;               
    playerScore.textContent = 0;       
    switchPlayer();                    
  } else {
    playerScore.textContent = currentScore + number;
    diceRolls.push(number);            
  }

  return number;
}

function switchPlayer() {
  activePlayer = activePlayer === 1 ? 2 : 1;
  
  document.getElementById('player1-panel').classList.toggle('active', activePlayer === 1);
  document.getElementById('player2-panel').classList.toggle('active', activePlayer === 2);
}


document.getElementById('roll').addEventListener('click', rollDice);
