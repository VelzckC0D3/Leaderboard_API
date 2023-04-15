import './style.css';

function component() {
  const element = document.createElement('section');

  // Lodash, now imported by this script
  element.innerHTML = `
  <h1 class="title">Velzck's LeaderBoard</h1>
  <div class="boardCont">
    <div class="recentCont">
      <div class="recentTop">
        <h2 class="recentTitle">recent scores</h1>
          <button class="recentButton" type="button">refresh</button>
      </div>
      <ul class="recentScore">
      <!-- this hardcode will be replaced in the next PR --> 
      <li class="score">Name: 100</li>
      <li class="score">Name: 20</li>
      <li class="score">Name: 50</li>
      <li class="score">Name: 78</li>
      <li class="score">Name: 125</li>
      <li class="score">Name: 77</li>
      <li class="score">Name: 42</li>
    </ul>
    </div>
    <div class="addCont">
      <form id="addScore" class="form">
        <h2 class="addTitle">Add your score</h2>
        <div class="inputs">
        <input class="input" type="text" id="name" placeholder="name" required /><br />
        <input class="input" type="text" id="score" placeholder="score" required /><br />
        </div>
        <button type="button" id="submitButton">submit</button>
    </form>
    </div>
  </div>
  `;
  element.classList.add('main');

  return element;
}

document.body.appendChild(component());
