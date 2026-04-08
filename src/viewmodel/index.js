import {
  showTwoChoice,
  continueGame,
  showStates,
  showEnding,
  restartScreen,
  hideLoading,
  showLoading,
} from '../view/index.js';

import {
  createCardPack,
  pickShuffleCard,
  loadCardContent,
} from '../model/index.js';

let player = {
  date: 1,
  hp: 100,
  food: 3,
  infection: 10,
  heal: 0,
  rescuePoint: 0,
};
let cards = [];
let cardNum;

function updateLogs(result) {
  document.querySelector('#log').innerHTML += `<p>${result}</p>`;
  return 0;
}
function caculateAfterDay(newState) {
  newState.date += 1;
  if (newState.food <= 0) {
    newState.hp -= 10;
    newState.food = 0;
    updateLogs('식량이 없어 체력이 감소합니다.');
  } else {
    newState.food -= 1;
  }
  newState.infection += 3;
  return newState;
}

function checkStates(newState) {
  if (newState.food < 0) {
    newState.food = 0;
  }
  if (newState.hp < 0) {
    newState.hp = 0;
  }
  if (newState.infection < 0) {
    newState.infection = 0;
  }
  return newState;
}
function checkEnding() {
  let ending;
  if (player.hp === 0) {
    ending = '사망';
  } else if (player.infection >= 100) {
    ending = '좀비화';
  } else if (player.heal >= 5) {
    ending = '치료 성공';
  } else if (player.rescuePoint >= 3 && player.date > 10) {
    ending = '구조 성공';
  } else if (player.date > 15) {
    ending = '생존 성공';
  } else {
    return false;
  }
  showEnding(player, ending);
  return true;
}
function calculateEffect(effect) {
  let newState = { ...player };
  for (let key in effect) {
    newState[key] += effect[key];
  }
  return newState;
}

function updateStates(choice) {
  hideLoading();
  const card = loadCardContent(cardNum);
  const effect = card[choice];
  let newState = calculateEffect(effect);
  updateLogs(card[`choice${choice}`]);
  for (let key in effect) {
    updateLogs(`${key}: ${effect[key]}`);
  }
  newState = checkStates(newState);
  newState = caculateAfterDay(newState);
  player = newState;
  showStates(player);
  continueGame();
  checkEnding();
}
function restartGame() {
  cards = createCardPack();
  restartScreen(cards);
  player = {
    date: 1,
    hp: 100,
    food: 3,
    infection: 10,
    heal: 0,
    rescuePoint: 0,
  };
  showStates(player);
}
function drawCard() {
  cardNum = pickShuffleCard(cards);

  const cardContent = loadCardContent(cardNum);
  showTwoChoice(cardContent, cards);
  if (!cards.length) {
    cards = createCardPack();
  }
}
function clickChoiceBtn(choice) {
  showLoading();
  setTimeout(function () {
    updateStates(choice);
  }, 2000);
}
cards = createCardPack();

const drawBtn = document.querySelector('#btn-draw');
drawBtn.onclick = drawCard;

const choiceBtnA = document.querySelector('#btn-choice-a');
const choiceBtnB = document.querySelector('#btn-choice-b');
const giveUpBtn = document.querySelector('#btn-giveup');
const restartBtn = document.querySelector('#btn-restart');

choiceBtnA.onclick = () => clickChoiceBtn('A');
choiceBtnB.onclick = () => clickChoiceBtn('B');
giveUpBtn.onclick = () => showEnding(player, '포기');
restartBtn.onclick = restartGame;
