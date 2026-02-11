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
    name: '좀비 무리',
    description: '어둠 속에서 신음 소리가 점점 가까워진다.',
    choiceA: { label: '맞서 싸운다', desc: '체력 -15', hp: -15, food: 0, infection: 0 },
    choiceB: { label: '숨을 죽인다', desc: '체력 -5, 감염 +3', hp: -5, food: 0, infection: 3 },
  },
  {
    name: '약국 잔해',
    description: '무너진 약국 안에 약품이 보인다. 하지만 안에서 뭔가 움직인다.',
    choiceA: { label: '안으로 들어간다', desc: '감염 -10, 체력 -5', hp: -5, food: 0, infection: -10 },
    choiceB: { label: '밖의 식량만 줍는다', desc: '식량 +2', hp: 0, food: 2, infection: 0 },
  },
  {
    name: '빈 아파트',
    description: '바리케이드가 쳐진 아파트. 안은 조용하다.',
    choiceA: { label: '문을 잠그고 쉰다', desc: '체력 +15', hp: 15, food: 0, infection: 0 },
    choiceB: { label: '방마다 뒤진다', desc: '식량 +2, 체력 -5', hp: -5, food: 2, infection: 0 },
  },
  {
    name: '무장한 생존자',
    description: "총구가 이쪽을 향한다. '물렸냐?' 감염을 숨길 수 없다.",
    choiceA: { label: '식량을 건넨다', desc: '체력 +5, 식량 -1', hp: 5, food: -1, infection: 0 },
    choiceB: { label: '치료를 부탁한다', desc: '감염 -15, 식량 -1', hp: 0, food: -1, infection: -15, isHeal: true },
  },
  {
    name: '감염 발작',
    description: '팔의 상처가 검게 변하고 있다. 맥박이 빨라진다.',
    choiceA: { label: '이를 악물고 견딘다', desc: '감염 +10', hp: 0, food: 0, infection: 10 },
    choiceB: { label: '감염 부위를 도려낸다', desc: '체력 -20, 감염 -10', hp: -20, food: 0, infection: -10, isHeal: true },
  },
  {
    name: '무전 신호',
    description: "'여기는 구조 헬기... 좌표를 보내라...' 신호가 끊길 것 같다.",
    choiceA: { label: '위치를 송신한다', desc: '구조 +1, 체력 -5', hp: -5, food: 0, infection: 0, isRescue: true },
    choiceB: { label: '덫일 수 있다... 무시', desc: '식량 +1', hp: 0, food: 1, infection: 0 },
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
