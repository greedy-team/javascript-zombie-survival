// 플레이어 초기 상태
export const INITIAL_HP = 100;
export const INITIAL_FOOD = 3;
export const INITIAL_INFECTION = 10;
export const INITIAL_DAY = 1;
export const INITIAL_HEAL_ATTEMPTS = 0;
export const INITIAL_RESCUE_POINTS = 0;

// 매일 적용되는 효과
export const DAILY_FOOD_COST = 1;
export const DAILY_INFECTION_INCREASE = 3;
export const STARVATION_HP_PENALTY = 10;

// 스탯 최솟값
export const MIN_STAT = 0;

// 엔딩 조건
export const DEATH_HP_THRESHOLD = 0; // 체력 <= 0 사망
export const ZOMBIE_INFECTION_THRESHOLD = 100; // 감염도 >= 100 좀비화
export const CURE_HEAL_REQUIRED = 5; // 치료 선택 5회 누적 시 치료 성공
export const RESCUE_POINTS_REQUIRED = 3; // 구조 포인트 >= 3 and Day > 10 시 구조 성공
export const RESCUE_DAY_REQUIRED = 10; // 구조 성공 조건: Day > 10
export const SURVIVAL_DAY_REQUIRED = 15; // Day > 15 시 생존 성공

// 게임 상태
export const GAME_STATE = Object.freeze({
  DRAW: 'draw',
  CHOOSING: 'choosing',
  LOADING: 'loading',
  RESULT: 'result',
});

// 타이머
export const RESULT_DELAY_MS = 2000;

// 효과 한글 매핑
export const EFFECT_LABEL = {
  hp: '체력',
  food: '식량',
  infection: '감염도',
  rescue: '구조 포인트',
};

// 카드 데이터
export const CARD_DATA = [
  {
    name: '생존자 시체',
    description:
      '누군가의 마지막이 배낭 속 통조림으로 남았다. 손등의 물린 자국이 말해준다 — 이것은 유산이 아니라 저주일 수도 있다.',
    count: 4,
    isChoiceCure: false,
    choiceA: {
      label: '배낭째로 가져온다',
      effect: { food: 3, infection: 8 },
    },
    choiceB: {
      label: '겉에 있는 것만 집는다',
      effect: { food: 1 },
    },
  },
  {
    name: '부상당한 군인',
    description:
      '피 묻은 군복 사이로 약병이 보인다. 떨리는 손이 무언가를 내밀고 있다. 이 세상에 공짜 자비란 없다.',
    count: 4,
    isChoiceCure: true,
    choiceA: {
      label: '식량을 건네고 약을 받는다',
      effect: { food: -1, infection: -20 },
    },
    choiceB: {
      label: '몸싸움 끝에 식량만 챙기고 떠난다',
      effect: { hp: -10, food: 2 },
    },
  },
  {
    name: '임시 수술',
    description:
      '깨진 거울에 비친 팔은 이미 내 것이 아닌 색이다. 칼날 위에 올린 손이 떨린다 — 망설이면 사람이길 포기하는 것이다.',
    count: 3,
    isChoiceCure: true,
    choiceA: {
      label: '감염 부위를 직접 도려낸다',
      effect: { hp: -25, infection: -25 },
    },
    choiceB: {
      label: '이를 악물고 참는다',
      effect: { hp: -5, infection: 10 },
    },
  },
  {
    name: '군용 차량 행렬',
    description:
      '지평선 위로 먼지 기둥이 피어오른다. 엔진 소리가 심장보다 빠르게 멀어지고 있다. 이 순간이 지나면 다시는 오지 않는다.',
    count: 3,
    isChoiceCure: false,
    choiceA: {
      label: '뛰어나가 신호를 보낸다',
      effect: { rescue: 1, infection: 8 },
    },
    choiceB: {
      label: '몸을 낮추고 방향만 확인한다',
      effect: { hp: 5 },
    },
  },
  {
    name: '오염된 웅덩이',
    description:
      '웅덩이 표면에 기름 같은 무지개가 번진다. 갈라진 입술이 먼저 답을 알고 있다 — 이성은 갈증 앞에서 늘 진다.',
    count: 3,
    isChoiceCure: false,
    choiceA: {
      label: '그냥 마신다. 탈수보다 낫다',
      effect: { hp: 5, infection: 15 },
    },
    choiceB: {
      label: '참는다. 빗물을 기다린다',
      effect: { hp: -10 },
    },
  },
  {
    name: '구조 트럭',
    description:
      '적십자 깃발이 석양 아래 펄럭인다. 희망은 저 트럭 위에 있는데, 다리는 이미 절망을 택한 듯 움직이지 않는다.',
    count: 3,
    isChoiceCure: false,
    choiceA: {
      label: '전력으로 달려간다',
      effect: { hp: -20, rescue: 1 },
    },
    choiceB: {
      label: '체력을 아끼고 쉰다',
      effect: { hp: 10 },
    },
  },
];
