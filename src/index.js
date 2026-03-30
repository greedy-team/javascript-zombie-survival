const drawBtn = document.getElementById("btn-draw");
const cardData = { //모각코 후 수정
    0: {
        name: "생존자 시체",
        desc: "생존자 시체2",
        choiceA: "배낭째로 가져온다",
        resultA: "식량 +3, 감염도 +8",
        choiceB: "겉에 있는 것만 집는다",
        resultB: "식량 +1"
    },
    1: {
        name: "부상당한 군인",
        desc: "부상당한 군인2",
        choiceA: "식량을 건네고 약을 받는다",
        resultA: "식량 -1, 감염도 -20",
        choiceB: "몸싸움 끝에 식량만 챙기고 떠난다",
        resultB: "체력 -10, 식량 +2"
    },
    2: {
        name: "임시 수술",
        desc: "임시 수술2",
        choiceA: "감염 부위를 직접 도려낸다",
        resultA: "체력 -25, 감염도 -25",
        choiceB: "이를 악물고 참는다",
        resultB: "체력 -5, 감염도 +1"
    },
    3: {
        name: "군용 차량 행렬",
        desc: "군용 차량 행렬2",
        choiceA: "뛰어나가 신호를 보낸다",
        resultA: "구조 포인트 +1, 감염도 +8",
        choiceB: "몸을 낮추고 방향만 확인한다",
        resultB: "체력 +5"
    },
    4: {
        name: "오염된 웅덩이",
        desc: "오염된 웅덩이2",
        choiceA: "그냥 마신다. 탈수보다 낫다",
        resultA: "체력 +5, 감염도 +15",
        choiceB: "참는다. 빗물을 기다린다",
        resultB: "체력 -10"
    },
    5: {
        name: "구조 트럭",
        desc: "구조 트럭2",
        choiceA: "전력으로 달려간다",
        resultA: "체력 -20, 구조 포인트 +1",
        choiceB: "체력을 아끼고 쉰다",
        resultB: "체력 +10"
    }
};
let cards = []
for (let i = 0; i < 20; i++) {
    cards[i] = i;
}

function drawCard() {// view
    const cardArea = document.getElementById("card-area");
    cardArea.classList.remove("hidden");
    let card = pickShuffleCard(cards);
    let cardContent = whatIsCardContent(card);
    showCardContent(cardContent);

}
function showCardContent(cardContent) {
    const cardName = document.getElementById("card-name");
    const cardDescription = document.getElementById("card-description");
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
    return cardData[card];
}
// function whatIsCardContent(card) { //모각코 통해 개선
//     let cardContent = [];
//     if (card === 0) { //생존자 시체
//         cardContent[0] = "생존자 시체";
//         cardContent[1] = "생존자 시체2";
//         cardContent[2] = "배낭째로 가져온다";
//         cardContent[3] = "식량 +3, 감염도 +8";
//         cardContent[4] = "겉에 있는 것만 집는다";
//         cardContent[5] = "식량 +1";
//     } else if (card === 1) { //부상당한 군인
//         cardContent[0] = "부상당한 군인"
//         cardContent[1] = "부상당한 군인2"
//         cardContent[2] = "식량을 건네고 약을 받는다"
//         cardContent[3] = "식량 -1, 감염도 -20"
//         cardContent[4] = "몸싸움 끝에 식량만 챙기고 떠난다";
//         cardContent[5] = "체력 -10, 식량 +2";
//     } else if (card === 2) {//임시수술
//         cardContent[0] = "임시 수술"
//         cardContent[1] = "임시 수술2"
//         cardContent[2] = "감염 부위를 직접 도려낸다"
//         cardContent[3] = "체력 -25, 감염도 -25"
//         cardContent[4] = "이를 악물고 참는다";
//         cardContent[5] = "체력 -5, 감염도 +1";
//     } else if (card === 3) {//군용 차량 행렬
//         cardContent[0] = "군용 차량 행렬"
//         cardContent[1] = "군용 차량 행렬2"
//         cardContent[2] = "뛰어나가 신호를 보낸다"
//         cardContent[3] = "구조 포인트 +1, 감염도 +8"
//         cardContent[4] = "몸을 낮추고 방향만 확인한다";
//         cardContent[5] = "체력 +5";
//     } else if (card === 4) {// 오염된 웅덩이
//         cardContent[0] = "오염된 웅덩이"
//         cardContent[1] = "오염된 웅덩이2"
//         cardContent[2] = "그냥 마신다. 탈수보다 낫다"
//         cardContent[3] = "체력 +5, 감염도 +15"
//         cardContent[4] = "참는다. 빗물을 기다린다";
//         cardContent[5] = "체력 -10";
//     } else if (card === 5) {//구조 트럭
//         cardContent[0] = "구조 트럭"
//         cardContent[1] = "구조 트럭2"
//         cardContent[2] = "전력으로 달려간다"
//         cardContent[3] = "체력 -20, 구조 포인트 +1"
//         cardContent[4] = "체력을 아끼고 쉰다";
//         cardContent[5] = "체력 +10";
//     }
//     return cardContent
// }
function pickShuffleCard(cards) { //model
    let index;
    index = Math.floor(Math.random() * cards.length);
    let card = cards[index];
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




//pickShuffleCard();

drawBtn.onclick = drawCard;