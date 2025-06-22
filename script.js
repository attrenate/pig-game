// Game state variables
let scores, currentTurnScore, activePlayer, isGamePlaying;

const diceImg = document.getElementById('dice');
const rollBtn = document.getElementById('roll');
const holdBtn = document.getElementById('hold');
const newGameBtn = document.getElementById('game');

// Initialize/reset the game
function initGame() {
  scores = [0, 0];               // Total scores: index 0 = player1, 1 = player2
  currentTurnScore = 0;          // Current turn score (temp)
  activePlayer = 0;              // 0 = player1, 1 = player2
  isGamePlaying = true;

  // Reset UI total scores
  document.getElementById('h1-s').textContent = '0';
  document.getElementById('h2-s').textContent = '0';

  // Reset current scores UI
  document.querySelector('#player1-panel .current-score').textContent = 'Current\n0';
  document.querySelector('#player2-panel .current-score').textContent = 'Current\n0';

  // Reset player panel active/winner classes
  document.getElementById('player1-panel').classList.add('active');
  document.getElementById('player2-panel').classList.remove('active');
  document.getElementById('player1-panel').classList.remove('winner');
  document.getElementById('player2-panel').classList.remove('winner');

  // Reset dice image to default or hide
  diceImg.src = 'https://www.media4math.com/sites/default/files/library_asset/images/MathClipArt--Single-Die-with-1-Showing.png';
  diceImg.style.visibility = 'visible';

  // Enable buttons
  rollBtn.disabled = false;
  holdBtn.disabled = false;
}

// Switch active player helper
function switchPlayer() {
  // Reset current turn score UI for active player
  document.querySelector(`#player${activePlayer + 1}-panel .current-score`).textContent = 'Current\n0';

  currentTurnScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle active player UI highlight
  document.getElementById('player1-panel').classList.toggle('active', activePlayer === 0);
  document.getElementById('player2-panel').classList.toggle('active', activePlayer === 1);
}

// Roll dice button click handler
function rollDice() {
  if (!isGamePlaying) return;  // Do nothing if game ended

  // Generate dice roll between 1 and 6
  const dice = Math.floor(Math.random() * 6) + 1;

  // Update dice image src dynamically — using media4math images for faces 1 to 6
  diceImg.src = `https://www.media4math.com/sites/default/files/library_asset/images/MathClipArt--Single-Die-with-${dice}-Showing.png`;

  if (dice !== 1) {
    // Add dice to current turn score
    currentTurnScore += dice;

    // Update UI current score
    document.querySelector(`#player${activePlayer + 1}-panel .current-score`).textContent = `Current\n${currentTurnScore}`;
  } else {
    // Rolled 1 — lose current turn points and switch player
    switchPlayer();
  }
}

// Hold button click handler
function handleHold() {
  if (!isGamePlaying) return; // Ignore if game ended

  // Add current turn score to total score
  scores[activePlayer] += currentTurnScore;

  // Update total score UI
  document.getElementById(`h${activePlayer + 1}-s`).textContent = scores[activePlayer];

  // Check if player won
  if (scores[activePlayer] >= 100) {
    // Player wins
    isGamePlaying = false;

    // Highlight winner panel
    document.getElementById(`player${activePlayer + 1}-panel`).classList.add('winner');
    document.getElementById(`player${activePlayer + 1}-panel`).classList.remove('active');

    // Show winner message - you could enhance this with a modal or alert
    alert(`Player ${activePlayer + 1} Wins! 🎉`);

    // Disable buttons
    rollBtn.disabled = true;
    holdBtn.disabled = true;

    // Keep dice frozen on last roll (already set by rollDice)
  } else {
    // No winner yet — switch player
    switchPlayer();
  }

  // Reset current turn score UI for next player
  currentTurnScore = 0;
  document.querySelector(`#player${activePlayer + 1}-panel .current-score`).textContent = `Current\n0`;
}

// Initialize game on page load
initGame();

// Event listeners
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', handleHold);
newGameBtn.addEventListener('click', initGame);
