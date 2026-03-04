describe('카드 선택지 효과 테스트', () => {
  // 초기: hp=100, food=3, infection=10
  // 일일: food-1, infection+3

  beforeEach(() => {
    cy.startGame();
  });

  describe('생존자 시체', () => {
    it('배낭째로 가져온다: 식량 +3, 감염 +8', () => {
      cy.drawUntilCard('생존자 시체');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '100');
      cy.getStat('food').should('have.text', '5');
      cy.getStat('infection').should('have.text', '21');
    });

    it('겉에 있는 것만 집는다: 식량 +1', () => {
      cy.drawUntilCard('생존자 시체');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '100');
      cy.getStat('food').should('have.text', '3');
      cy.getStat('infection').should('have.text', '13');
    });
  });

  describe('부상당한 군인', () => {
    it('식량을 건네고 약을 받는다: 식량 -1, 감염 -20', () => {
      cy.drawUntilCard('부상당한 군인');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '100');
      cy.getStat('food').should('have.text', '1');
      cy.getStat('infection').should('have.text', '3');
      cy.getStat('heal-attempts').should('have.text', '1');
    });

    it('몸싸움 끝에 식량만 챙기고 떠난다: 체력 -10, 식량 +2', () => {
      cy.drawUntilCard('부상당한 군인');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '90');
      cy.getStat('food').should('have.text', '4');
      cy.getStat('infection').should('have.text', '13');
    });
  });

  describe('임시 수술', () => {
    it('감염 부위를 직접 도려낸다: 체력 -25, 감염 -25', () => {
      cy.drawUntilCard('임시 수술');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '75');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '3');
      cy.getStat('heal-attempts').should('have.text', '1');
    });

    it('이를 악물고 참는다: 체력 -5, 감염 +10', () => {
      cy.drawUntilCard('임시 수술');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '95');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '23');
    });
  });

  describe('군용 차량 행렬', () => {
    it('뛰어나가 신호를 보낸다: 구조 +1, 감염 +8', () => {
      cy.drawUntilCard('군용 차량 행렬');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '100');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '21');
      cy.getStat('rescue-points').should('have.text', '1');
    });

    it('몸을 낮추고 방향만 확인한다: 체력 +5', () => {
      cy.drawUntilCard('군용 차량 행렬');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '105');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '13');
    });
  });

  describe('오염된 웅덩이', () => {
    it('그냥 마신다: 체력 +5, 감염 +15', () => {
      cy.drawUntilCard('오염된 웅덩이');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '105');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '28');
    });

    it('참는다. 빗물을 기다린다: 체력 -10', () => {
      cy.drawUntilCard('오염된 웅덩이');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '90');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '13');
    });
  });

  describe('구조 트럭', () => {
    it('전력으로 달려간다: 체력 -20, 구조 +1', () => {
      cy.drawUntilCard('구조 트럭');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '80');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '13');
      cy.getStat('rescue-points').should('have.text', '1');
    });

    it('체력을 아끼고 쉰다: 체력 +10', () => {
      cy.drawUntilCard('구조 트럭');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '110');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '13');
    });
  });
});
