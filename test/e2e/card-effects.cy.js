describe('카드 선택지 효과 테스트', () => {
  beforeEach(() => {
    cy.startGame();
  });

  describe('생존자 시체', () => {
    it('선택지 A: 식량 +3, 감염도 +8', () => {
      cy.drawUntilCard('생존자 시체');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '100');
      cy.getStat('food').should('have.text', '5');
      cy.getStat('infection').should('have.text', '21');
    });

    it('선택지 B: 식량 +1', () => {
      cy.drawUntilCard('생존자 시체');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '100');
      cy.getStat('food').should('have.text', '3');
      cy.getStat('infection').should('have.text', '13');
    });
  });

  describe('부상당한 군인', () => {
    it('선택지 A: 식량 -1, 감염도 -20, 치료 횟수 +1', () => {
      cy.drawUntilCard('부상당한 군인');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '100');
      cy.getStat('food').should('have.text', '1');
      cy.getStat('infection').should('have.text', '3');
      cy.getStat('heal-attempts').should('have.text', '1');
    });

    it('선택지 B: 체력 -10, 식량 +2', () => {
      cy.drawUntilCard('부상당한 군인');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '90');
      cy.getStat('food').should('have.text', '4');
      cy.getStat('infection').should('have.text', '13');
    });
  });

  describe('임시 수술', () => {
    it('선택지 A: 체력 -25, 감염도 -25, 치료 횟수 +1', () => {
      cy.drawUntilCard('임시 수술');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '75');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '3');
      cy.getStat('heal-attempts').should('have.text', '1');
    });

    it('선택지 B: 체력 -5, 감염도 +10', () => {
      cy.drawUntilCard('임시 수술');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '95');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '23');
    });
  });

  describe('군용 차량 행렬', () => {
    it('선택지 A: 구조 포인트 +1, 감염도 +8', () => {
      cy.drawUntilCard('군용 차량 행렬');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '100');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '21');
      cy.getStat('rescue-points').should('have.text', '1');
    });

    it('선택지 B: 체력 +5', () => {
      cy.drawUntilCard('군용 차량 행렬');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '105');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '13');
    });
  });

  describe('오염된 웅덩이', () => {
    it('선택지 A: 체력 +5, 감염도 +15', () => {
      cy.drawUntilCard('오염된 웅덩이');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '105');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '28');
    });

    it('선택지 B: 체력 -10', () => {
      cy.drawUntilCard('오염된 웅덩이');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '90');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '13');
    });
  });

  describe('구조 트럭', () => {
    it('선택지 A: 체력 -20, 구조 포인트 +1', () => {
      cy.drawUntilCard('구조 트럭');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '80');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '13');
      cy.getStat('rescue-points').should('have.text', '1');
    });

    it('선택지 B: 체력 +10', () => {
      cy.drawUntilCard('구조 트럭');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '110');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '13');
    });
  });
});
