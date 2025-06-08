const newGame = document.getElementById("game");
newGame.addEventListener('click', resetGame);

const score1 = document.getElementById('h1-s');
const score2 = document.getElementById('h2-s');
const currentScores = document.querySelectorAll('.current-score');

// A function to reset the values 
function resetGame(){
    score1.textContent = '0';
    score2.textContent = '0';

    currentScores.forEach(score => {
    score.innerHTML = 'Current <br> 0';
  });
}