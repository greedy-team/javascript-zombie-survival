const INITIAL_STATE = {
  hp: 100,
  food: 3,
  infection: 10,
  day: 1,
  healAttempts: 0,
  rescuePoints: 0,
};

const CARDS = [
  {
    name: '생존자 시체',
    description: '쓰러진 생존자 옆에 배낭이 있다. 감염된 것처럼 보이지만, 안에 식량이 있다.',
    choiceA: { label: '배낭째로 가져온다', desc: '식량 +3, 감염 +8', hp: 0, food: 3, infection: 8 },
    choiceB: { label: '겉에 있는 것만 집는다', desc: '식량 +1', hp: 0, food: 1, infection: 0 },
  },
  {
    name: '부상당한 군인',
    description: '총상을 입은 군인이 구석에 쓰러져 있다. 아직 살아있다. 배낭에 치료제와 식량이 보인다.',
    choiceA: { label: '식량을 건네고 약을 받는다', desc: '식량 -1, 감염 -20', hp: 0, food: -1, infection: -20, isHeal: true },
    choiceB: { label: '몸싸움 끝에 식량만 챙기고 떠난다', desc: '체력 -10, 식량 +2', hp: -10, food: 2, infection: 0 },
  },
  {
    name: '임시 수술',
    description: '상처 주위가 검게 번지고 있다. 모닥불이 있고 칼이 있다. 늦기 전에.',
    choiceA: { label: '감염 부위를 직접 도려낸다', desc: '체력 -25, 감염 -25', hp: -25, food: 0, infection: -25, isHeal: true },
    choiceB: { label: '이를 악물고 참는다', desc: '체력 -5, 감염 +10', hp: -5, food: 0, infection: 10 },
  },
  {
    name: '군용 차량 행렬',
    description: '군용 차량이 저 멀리서 움직이고 있다. 소리를 지르면 좀비도 들린다.',
    choiceA: { label: '뛰어나가 신호를 보낸다', desc: '구조 +1, 감염 +8', hp: 0, food: 0, infection: 8, isRescue: true },
    choiceB: { label: '몸을 낮추고 방향만 확인한다', desc: '체력 +5', hp: 5, food: 0, infection: 0 },
  },
  {
    name: '오염된 웅덩이',
    description: '목이 말라 죽을 것 같은데 발견한 건 웅덩이 하나. 색이 좀 이상하다. 그래도 물이다.',
    choiceA: { label: '그냥 마신다. 탈수보다 낫다', desc: '체력 +5, 감염 +15', hp: 5, food: 0, infection: 15 },
    choiceB: { label: '참는다. 빗물을 기다린다', desc: '체력 -10', hp: -10, food: 0, infection: 0 },
  },
  {
    name: '구조 트럭',
    description: '구조 트럭이 저 멀리 보인다. 좀비는 없다. 하지만 2km는 달려야 한다.',
    choiceA: { label: '전력으로 달려간다', desc: '체력 -20, 구조 +1', hp: -20, food: 0, infection: 0, isRescue: true },
    choiceB: { label: '체력을 아끼고 쉰다', desc: '체력 +10', hp: 10, food: 0, infection: 0 },
  },
];

const DECK_DISTRIBUTION = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5];

const DAILY_FOOD_CONSUME = 1;
const DAILY_INFECTION_INCREASE = 3;
const STARVATION_DAMAGE = 10;

const ACTION_DELAY = 2000;

export {
  INITIAL_STATE,
  CARDS,
  DECK_DISTRIBUTION,
  DAILY_FOOD_CONSUME,
  DAILY_INFECTION_INCREASE,
  STARVATION_DAMAGE,
  ACTION_DELAY,
};
