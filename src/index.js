import './style.css';

// Generate HTML
const component = () => {
  const element = document.createElement('section');

  // Lodash, now imported by this script
  element.innerHTML = `
  <h1 class="title">Velzck's LeaderBoard</h1>
  <div class="boardCont">
    <div class="recentCont">
      <div class="recentTop">
        <h2 class="recentTitle">recent scores</h1>
        <button class="recentButton" type="button">refresh <img src="assets/reload.svg" alt="" class="reloadIcon"></button>
      </div>
      <ul class="recentScore">

    </ul>
    </div>
    <div class="addCont">
      <form id="addScore" class="form">
        <h2 class="addTitle">Add your score</h2>
        <div class="inputs">
        <input class="input" type="text" id="name" placeholder="name" required /><br />
        <input class="input" type="text" id="score" placeholder="score" required /><br />
        </div>
        <button type="button" class="submitButton">submit</button>
    </form>
    </div>
  </div>
  `;
  element.classList.add('main');

  return element;
};

document.body.appendChild(component());

//  Get data from API
const getDataServer = async () => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/kAFFiQvmIQ5aPdguNkBq/scores/', {
      method: 'GET',
    });
    const responseDataApi = await response.json();
    return responseDataApi;
  } catch (error) {
    return error;
  }
};

//  Send data to server
const postDataServer = async (inputData) => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/kAFFiQvmIQ5aPdguNkBq/scores/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
    const responseReceived = await response.json();
    return responseReceived;
  } catch (error) {
    return error;
  }
};

//  Render scores on html after consuming API with getDataServer function
const generateScoreItem = (score, index) => {
  const scoreItem = `
    <li class="score">${index + 1} ${score.user} ${score.score}</li>
  `;
  return scoreItem;
};

const renderScores = async () => {
  try {
    const score = await getDataServer();
    const { result } = score;
    result.sort((a, b) => b.score - a.score);
    const scoreContainer = document.querySelector('.recentScore');
    scoreContainer.innerHTML = '';
    result.forEach((score, index) => {
      const scoreItem = generateScoreItem(score, index);
      scoreContainer.innerHTML += scoreItem;
    });
  } catch (error) {
    return error;
  }
  return null;
};

//  Button listeners to consume APIs
const inputName = document.querySelector('#name');
const inputScore = document.querySelector('#score');
const submitButton = document.querySelector('.submitButton');
const refreshBtn = document.querySelector('.recentButton');

refreshBtn.addEventListener('click', renderScores);

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (!inputName.value || !inputScore.value) {
    return;
  }
  postDataServer({ user: inputName.value, score: inputScore.value });
  inputName.value = '';
  inputScore.value = '';
});

renderScores();
