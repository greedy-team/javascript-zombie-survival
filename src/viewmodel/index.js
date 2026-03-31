import { showTwoChoice } from "../view/index.js";
import { continueGame } from "../view/index.js";
import { showStates } from "../view/index.js";
import { showEnding } from "../view/index.js";
import { restartScreen } from "../view/index.js";
import { shuffleCard } from "../model/index.js";
import { pickShuffleCard } from "../model/index.js";
import { whatIsCardContent } from "../model/index.js";
let player = {
    date: 1,
    hp: 100,
    food: 3,
    infection: 10,
    heal: 0,
    rescuePoint: 0
}
let cards = []
let cardNum;

function drawCard() {   
    cardNum = pickShuffleCard(cards);

    let cardContent = whatIsCardContent(cardNum);
    showTwoChoice(cardContent,cards);
    if (!cards.length) {
        cards = shuffleCard();
    }
}
function clickChoiceBtn(choice) {
    document.querySelector('#btn-choice-a').disabled = true;
    document.querySelector('#btn-choice-b').disabled = true;
    document.querySelector('#loading').classList.remove("hidden");
    setTimeout(function () {
        updateStates(choice);
    },2000)

}
function updateStates(choice) {
    document.querySelector('#loading').classList.add("hidden");
    document.querySelector('#btn-choice-a').disabled = false;
    document.querySelector('#btn-choice-b').disabled = false;
    const card = whatIsCardContent(cardNum);
    const effect = card[choice];
    for (let key in effect) {
        player[key] += effect[key];
    }
    updateLogs(card[`choice${choice}`]);
    for(let key in effect){
        updateLogs(`${key}: ${effect[key]}`);
    }
    checkStates();
    // if(checkEnding()){return;}
    checkEnding();
    afterDay();
    showStates(player);
    continueGame();
    //if(checkEnding()){return;}
    checkEnding();
}
function updateLogs(result) {
    document.querySelector("#log").innerHTML+=`<p>${result}</p>`;
    return 0;
}
function afterDay() {
    player.date++;
    if (player.food <= 0) {
        player.hp -= 10;
        player.food = 0;
        updateLogs("식량이 없어 체력이 감소합니다.");
    } else {
        player.food -= 1;
    }
    player.infection += 3;
}

function checkStates() {
    if (player.food < 0) {
        player.food = 0;
    }
    if (player.hp < 0) {
        player.hp = 0;
    }
    if (player.infection < 0) {
        player.infection = 0;
    }

}
function checkEnding() {
    let ending;
    if (player.hp === 0) {
        ending = "사망";
    } else if (player.infection >= 100) {
        ending = "좀비화";
    } else if (player.heal >= 5) {
        ending = "치료 성공";
    } else if (player.rescuePoint >= 3 && player.date > 10) {
        ending = "구조 성공";
    } else if (player.date > 15) {
        ending = "생존 성공";
    } else {
        return false;
    }
    showEnding(player,ending);
    return true;
}

function restartGame() {
    cards = shuffleCard();
    restartScreen(cards)
    player = {
        date: 1,
        hp: 100,
        food: 3,
        infection: 10,
        heal: 0,
        rescuePoint: 0
    }
    showStates(player);
}

cards = shuffleCard();

const drawBtn = document.querySelector('#btn-draw');
drawBtn.onclick = drawCard;

const choiceBtnA = document.querySelector('#btn-choice-a');
const choiceBtnB = document.querySelector('#btn-choice-b');
const giveUpBtn = document.querySelector('#btn-giveup');
const restartBtn = document.querySelector('#btn-restart');

choiceBtnA.onclick = () => clickChoiceBtn("A");
choiceBtnB.onclick = () => clickChoiceBtn("B");
giveUpBtn.onclick = () => showEnding(player,"포기");
restartBtn.onclick = restartGame;

