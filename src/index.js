const cardData = { //모각코 후 수정
    0: {
        name: "생존자 시체",
        desc: "생존자 시체",
        choiceA: "배낭째로 가져온다: 식량 +3, 감염 +8",
        resultA: "식량 +3, 감염도 +8",
        choiceB: "겉에 있는 것만 집는다: 식량 +1",
        resultB: "식량 +1",
        A: {
            food: +3,
            infection: +8
        },
        B: {
            food: +1
        }
    },
    1: {
        name: "부상당한 군인",
        desc: "부상당한 군인",
        choiceA: "식량을 건네고 약을 받는다: 식량 -1, 감염 -20",
        resultA: "식량 -1, 감염도 -20",
        choiceB: "몸싸움 끝에 식량만 챙기고 떠난다: 체력 -10, 식량 +2",
        resultB: "체력 -10, 식량 +2",
        A: {
            food: -1,
            infection: -20,
            heal: +1
        },
        B: {
            hp: -10,
            food: +2
        }
    },
    2: {
        name: "임시 수술",
        desc: "임시 수술",
        choiceA: "감염 부위를 직접 도려낸다: 체력 -25, 감염 -25",
        resultA: "체력 -25, 감염도 -25",
        choiceB: "이를 악물고 참는다: 체력 -5, 감염 +10",
        resultB: "체력 -5, 감염도 +10",
        A: {
            hp: -25,
            infection: -25,
            heal: +1
        },
        B: {
            hp: -5,
            infection: +10
        }
    },
    3: {
        name: "군용 차량 행렬",
        desc: "군용 차량 행렬",
        choiceA: "뛰어나가 신호를 보낸다: 구조 +1, 감염 +8",
        resultA: "구조 +1, 감염도 +8",
        choiceB: "몸을 낮추고 방향만 확인한다: 체력 +5",
        resultB: "체력 +5",
        A: {
            rescuePoint: +1,
            infection: +8
        },
        B: {
            hp: +5,
        }
    },
    4: {
        name: "오염된 웅덩이",
        desc: "오염된 웅덩이",
        choiceA: "그냥 마신다: 체력 +5, 감염 +15",
        resultA: "체력 +5, 감염도 +15",
        choiceB: "참는다. 빗물을 기다린다: 체력 -10",
        resultB: "체력 -10",
        A: {
            hp: +5,
            infection: +15
        },
        B: {
            hp: -10,
        }
    },
    5: {
        name: "구조 트럭",
        desc: "구조 트럭",
        choiceA: "전력으로 달려간다: 체력 -20, 구조 +1",
        resultA: "체력 -20, 구조 포인트 +1",
        choiceB: "체력을 아끼고 쉰다: 체력 +10",
        resultB: "체력 +10",
        A: {
            hp: -20,
            rescuePoint: +1
        },
        B: {
            hp: +10,
        }
    }
};
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
function shuffleCard() {
    let tmpCards = [];
    for (let i = 0; i < 20; i++) {
        tmpCards.push(i);
    }
    console.log(tmpCards);
    return tmpCards

}
function drawCard() {// view
    
    document.querySelector('#draw-area').classList.add("hidden");
    document.querySelector("#btn-draw").classList.add("hidden");
    document.querySelector('#card-area').classList.remove("hidden");
    document.querySelector('.log-wrapper').classList.add("hidden");

    cardNum = pickShuffleCard(cards);
    let cardContent = whatIsCardContent(cardNum);
    showCardContent(cardContent);
    if (!cards.length) {
        cards = shuffleCard();
    }
    document.querySelector('#deck-remaining').innerHTML = cards.length;
}
function showCardContent(cardContent) {
    const cardName = document.querySelector("#card-name");
    const cardDescription = document.querySelector("#card-description");
    const labelA = document.querySelector("#btn-choice-a .choice-label");
    const descA = document.querySelector("#btn-choice-a .choice-desc");
    const labelB = document.querySelector("#btn-choice-b .choice-label");
    const descB = document.querySelector("#btn-choice-b .choice-desc");

    cardName.innerHTML = cardContent.name;
    cardDescription.innerHTML = cardContent.desc;

    labelA.innerHTML = cardContent.choiceA;
    descA.innerHTML = cardContent.resultA;

    labelB.innerHTML = cardContent.choiceB;
    descB.innerHTML = cardContent.resultB;
}
function whatIsCardContent(card) {
    return cardData[card]
}

function pickShuffleCard(cards) { //model
    let index;
    index = Math.floor(Math.random() * cards.length);
    let card = cards.splice(index, 1)[0];
    console.log(card);
    if (card < 4) { //생존자 시체
        return 0;
    } else if (card < 8) { //부상당한 군인
        return 1;
    } else if (card < 11) {//임시수술
        return 2;
    } else if (card < 14) {//군용 차량 행렬
        return 3;
    } else if (card < 17) {// 오염된 웅덩이
        return 4;
    } else if (card < 20) {//구조 트럭
        return 5;
    }
    return 0;
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
    checkEnding();
    afterDay();
    showStates();
    continueGame();
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
function continueGame() {
    document.querySelector('#draw-area').classList.remove("hidden");
    document.querySelector("#btn-draw").classList.remove("hidden");
    document.querySelector('#card-area').classList.add("hidden");
    document.querySelector('.log-wrapper').classList.remove("hidden");
}
function showStates() {
    document.querySelector('#day').innerHTML = player.date;
    document.querySelector('#hp').innerHTML = player.hp;
    document.querySelector('#food').innerHTML = player.food;
    document.querySelector('#infection').innerHTML = player.infection;
    document.querySelector('#heal-attempts').innerHTML = player.heal;
    document.querySelector('#rescue-points').innerHTML = player.rescuePoint;

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
        return 0;
    }
    showEnding(ending);
}
function showEnding(ending) {
    //document.querySelector('#game-screen').classList.add("hidden");
    document.querySelector("#result-screen").classList.remove("hidden");
    document.querySelector("#result-days").innerHTML = player.date;
    document.querySelector("#result-hp").innerHTML = player.hp;
    document.querySelector("#result-food").innerHTML = player.food;
    document.querySelector("#result-infection").innerHTML = player.infection;
    document.querySelector("#result-ending").innerHTML = ending;
}

function restartGame() {
    cards = shuffleCard();
    document.querySelector('#game-screen').classList.remove("hidden");
    document.querySelector("#result-screen").classList.add("hidden");
    document.querySelector('#draw-area').classList.remove("hidden");
    document.querySelector('#card-area').classList.add("hidden");
    document.querySelector("#btn-draw").classList.remove("hidden");
    document.querySelector("#log").innerHTML=`<p></p>`
    player = {
        date: 1,
        hp: 100,
        food: 3,
        infection: 10,
        heal: 0,
        rescuePoint: 0
    }
    if (!cards.length) {
        cards = shuffleCard();
    }
    document.querySelector('#deck-remaining').innerHTML = cards.length;
    showStates();
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
giveUpBtn.onclick = () => showEnding("포기");
restartBtn.onclick = restartGame;

