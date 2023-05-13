const highscoreData = [
  { name: 'Luke', score: 300 },
  { name: 'Leia', score: 200 },
  { name: 'Han', score: 100 }
];

document.addEventListener('DOMContentLoaded', () => {
  const highscoreBtn = document.getElementById('highscore-btn');
  const highscoreList = document.getElementById('highscore-list');

  highscoreBtn.addEventListener('click', () => {
    // Clear any previous highscore data
    highscoreList.innerHTML = '';

    // Loop through the highscore data and create list items
    for (const { name, score } of highscoreData) {
      const listItem = document.createElement('li');
      listItem.textContent = `${name}: ${score}`;
      highscoreList.appendChild(listItem);
    }
  });
});
