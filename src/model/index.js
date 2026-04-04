const cardData = {
  // 모각코 후 수정
  0: {
    name: '생존자 시체',
    desc: '생존자 시체',
    choiceA: '배낭째로 가져온다: 식량 +3, 감염 +8',
    resultA: '식량 +3, 감염도 +8',
    choiceB: '겉에 있는 것만 집는다: 식량 +1',
    resultB: '식량 +1',
    A: {
      food: +3,
      infection: +8,
    },
    B: {
      food: +1,
    },
  },
  1: {
    name: '부상당한 군인',
    desc: '부상당한 군인',
    choiceA: '식량을 건네고 약을 받는다: 식량 -1, 감염 -20',
    resultA: '식량 -1, 감염도 -20',
    choiceB: '몸싸움 끝에 식량만 챙기고 떠난다: 체력 -10, 식량 +2',
    resultB: '체력 -10, 식량 +2',
    A: {
      food: -1,
      infection: -20,
      heal: +1,
    },
    B: {
      hp: -10,
      food: +2,
    },
  },
  2: {
    name: '임시 수술',
    desc: '임시 수술',
    choiceA: '감염 부위를 직접 도려낸다: 체력 -25, 감염 -25',
    resultA: '체력 -25, 감염도 -25',
    choiceB: '이를 악물고 참는다: 체력 -5, 감염 +10',
    resultB: '체력 -5, 감염도 +10',
    A: {
      hp: -25,
      infection: -25,
      heal: +1,
    },
    B: {
      hp: -5,
      infection: +10,
    },
  },
  3: {
    name: '군용 차량 행렬',
    desc: '군용 차량 행렬',
    choiceA: '뛰어나가 신호를 보낸다: 구조 +1, 감염 +8',
    resultA: '구조 +1, 감염도 +8',
    choiceB: '몸을 낮추고 방향만 확인한다: 체력 +5',
    resultB: '체력 +5',
    A: {
      rescuePoint: +1,
      infection: +8,
    },
    B: {
      hp: +5,
    },
  },
  4: {
    name: '오염된 웅덩이',
    desc: '오염된 웅덩이',
    choiceA: '그냥 마신다: 체력 +5, 감염 +15',
    resultA: '체력 +5, 감염도 +15',
    choiceB: '참는다. 빗물을 기다린다: 체력 -10',
    resultB: '체력 -10',
    A: {
      hp: +5,
      infection: +15,
    },
    B: {
      hp: -10,
    },
  },
  5: {
    name: '구조 트럭',
    desc: '구조 트럭',
    choiceA: '전력으로 달려간다: 체력 -20, 구조 +1',
    resultA: '체력 -20, 구조 포인트 +1',
    choiceB: '체력을 아끼고 쉰다: 체력 +10',
    resultB: '체력 +10',
    A: {
      hp: -20,
      rescuePoint: +1,
    },
    B: {
      hp: +10,
    },
  },
};
const status = {
  DEADBODY: 0,
  SOLDIER: 1,
  OPERATION: 2,
  CAR: 3,
  POOL: 4,
  RESCUETRUCK: 5,
};
function loadCardContent(card) {
  return cardData[card];
}
function createCardPack() {
  const tmpCards = [];
  for (let i = 0; i < 20; i += 1) {
    tmpCards.push(i);
  }
  return tmpCards;
}
function pickShuffleCard(cards) {
  const index = Math.floor(Math.random() * cards.length);
  const card = cards.splice(index, 1)[0];
  if (card < 4) {
    // 생존자 시체
    return status.DEADBODY;
  }
  if (card < 8) {
    // 부상당한 군인
    return status.SOLDIER;
  }
  if (card < 11) {
    // 임시수술
    return status.OPERATION;
  }
  if (card < 14) {
    // 군용 차량 행렬
    return status.CAR;
  }
  if (card < 17) {
    // 오염된 웅덩이
    return status.POOL;
  }
  if (card < 20) {
    // 구조 트럭
    return status.RESCUETRUCK;
  }
  return 0;
}

export { pickShuffleCard, createCardPack, loadCardContent };
