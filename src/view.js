import { EFFECT_LABEL, GAME_STATE } from './constants.js';

export default class GameView {
  constructor(viewModel) {
    this.vm = viewModel;
    this.initElements();
    this.bindEvents();
    this.vm.subscribe(() => this.render());
    this.render();
  }

  initElements() {
    // 화면 요소들을 초기화하는 부분
    this.gameScreen = document.querySelector('#game-screen');
    this.resultScreen = document.querySelector('#result-screen');

    // 상태 표시 요소들
    this.day = document.querySelector('#day');
    this.hp = document.querySelector('#hp');
    this.food = document.querySelector('#food');
    this.infection = document.querySelector('#infection');
    this.healAttempts = document.querySelector('#heal-attempts');
    this.rescuePoints = document.querySelector('#rescue-points');

    // 카드 관련 요소들
    this.drawArea = document.querySelector('#draw-area');
    this.btnDraw = document.querySelector('#btn-draw');
    this.deckRemaining = document.querySelector('#deck-remaining');

    // 카드 선택 요소들
    this.cardArea = document.querySelector('#card-area');
    this.cardName = document.querySelector('#card-name');
    this.cardDescription = document.querySelector('#card-description');
    this.btnChoiceA = document.querySelector('#btn-choice-a');
    this.btnChoiceB = document.querySelector('#btn-choice-b');
    this.choiceLabelA = this.btnChoiceA.querySelector('.choice-label');
    this.choiceDescA = this.btnChoiceA.querySelector('.choice-desc');
    this.choiceLabelB = this.btnChoiceB.querySelector('.choice-label');
    this.choiceDescB = this.btnChoiceB.querySelector('.choice-desc');

    // 로딩 및 포기 버튼
    this.loading = document.querySelector('#loading');
    this.btnGiveup = document.querySelector('#btn-giveup');
    this.log = document.querySelector('#log');

    // 결과 화면 요소들
    this.resultEnding = document.querySelector('#result-ending');
    this.resultDays = document.querySelector('#result-days');
    this.resultHp = document.querySelector('#result-hp');
    this.resultFood = document.querySelector('#result-food');
    this.resultInfection = document.querySelector('#result-infection');
    this.btnRestart = document.querySelector('#btn-restart');
  }

  bindEvents() {
    this.btnDraw.addEventListener('click', () => {
      this.vm.handleDrawCard();
    });
    this.btnChoiceA.addEventListener('click', () => {
      this.vm.handleChoice('A');
    });
    this.btnChoiceB.addEventListener('click', () => {
      this.vm.handleChoice('B');
    });
    this.btnGiveup.addEventListener('click', () => {
      this.vm.handleGiveUp();
    });
    this.btnRestart.addEventListener('click', () => {
      this.vm.handleRestart();
    });
  }

  render() {
    if (this.vm.state === GAME_STATE.DRAW) {
      this.renderDraw();
    } else if (this.vm.state === GAME_STATE.CHOOSING) {
      this.renderChoosing();
    } else if (this.vm.state === GAME_STATE.LOADING) {
      this.renderLoading();
    } else if (this.vm.state === GAME_STATE.RESULT) {
      this.renderResult();
    }
  }

  renderLog() {
    this.log.innerHTML = this.vm.log
      .map((message) => `<p>${message}</p>`)
      .join('');
  }

  // 5. 일차 진행
  // - 선택 완료 후 Day 1 증가
  // - 스탯 실시간 업데이트 (치료 횟수, 구조 포인트 포함)
  // - 카드 뽑기 버튼 재표시, 선택지 영역 숨김
  renderDraw() {
    this.gameScreen.classList.remove('hidden');
    this.resultScreen.classList.add('hidden');
    this.loading.classList.add('hidden');
    this.cardArea.classList.add('hidden');
    this.btnChoiceA.disabled = false;
    this.btnChoiceB.disabled = false;
    this.showDrawButton();
    this.updateStats();
    this.deckRemaining.textContent = this.vm.deckRemaining;
    this.renderLog();
  }

  // 3. 카드 뽑기
  // - 카드 뽑기 버튼 클릭 시 덱에서 1장 뽑기
  // - 남은 카드 수 업데이트
  // - 카드 이름, 설명, 선택지 A/B 표시
  // - 카드 뽑기 버튼 숨김, 선택지 영역 표시
  renderChoosing() {
    this.hideDrawButton();
    this.updateCard(this.vm.currentCard);
    this.cardArea.classList.remove('hidden');
    this.deckRemaining.textContent = this.vm.deckRemaining;
  }

  // 4. 선택지 선택 및 효과 적용
  // - 선택지 클릭 시 버튼 비활성화, 로딩 표시
  // - 2초(2000ms) 후 결과 적용
  renderLoading() {
    this.btnChoiceA.disabled = true;
    this.btnChoiceB.disabled = true;
    this.cardArea.classList.add('hidden');
    this.loading.classList.remove('hidden');
  }

  // 7. 게임 종료 및 결과 화면
  // - 결과: 생존 일수, 최종 체력, 최종 식량, 최종 감염도, 엔딩 표시
  renderResult() {
    this.gameScreen.classList.add('hidden');
    this.resultScreen.classList.remove('hidden');
    this.resultEnding.textContent = this.vm.ending;
    this.resultDays.textContent = this.vm.stats.day;
    this.resultHp.textContent = this.vm.stats.hp;
    this.resultFood.textContent = this.vm.stats.food;
    this.resultInfection.textContent = this.vm.stats.infection;
  }

  updateStats() {
    this.day.textContent = this.vm.stats.day;
    this.hp.textContent = this.vm.stats.hp;
    this.food.textContent = this.vm.stats.food;
    this.infection.textContent = this.vm.stats.infection;
    this.healAttempts.textContent = this.vm.stats.healAttempts;
    this.rescuePoints.textContent = this.vm.stats.rescuePoints;
  }

  updateCard(viewData) {
    // 카드 정보
    this.cardName.textContent = viewData.name;
    this.cardDescription.textContent = viewData.description;
    this.choiceLabelA.textContent = viewData.choiceA.label;
    // 카드의 선택 정보
    this.choiceDescA.textContent = GameView.formatEffect(
      viewData.choiceA.effect,
    );
    this.choiceLabelB.textContent = viewData.choiceB.label;
    this.choiceDescB.textContent = GameView.formatEffect(
      viewData.choiceB.effect,
    );
  }

  // 음수는 문자 그대로, 양수는 앞에 + 붙이기
  static formatEffect(effect) {
    const parts = [];
    if (effect.hp)
      parts.push(`${EFFECT_LABEL.hp} ${effect.hp > 0 ? '+' : ''}${effect.hp}`);
    if (effect.food)
      parts.push(
        `${EFFECT_LABEL.food} ${effect.food > 0 ? '+' : ''}${effect.food}`,
      );
    if (effect.infection)
      parts.push(
        `${EFFECT_LABEL.infection} ${effect.infection > 0 ? '+' : ''}${effect.infection}`,
      );
    if (effect.rescue)
      parts.push(
        `${EFFECT_LABEL.rescue} ${effect.rescue > 0 ? '+' : ''}${effect.rescue}`,
      );
    return parts.join(', ');
  }

  hideDrawButton() {
    this.btnDraw.classList.add('hidden');
  }

  showDrawButton() {
    this.btnDraw.classList.remove('hidden');
  }
}
