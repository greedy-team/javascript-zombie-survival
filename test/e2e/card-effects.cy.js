describe('카드 선택지 효과 테스트', () => {
  // 초기: hp=100, food=3, infection=10
  // 일일: food-1, infection+3

  beforeEach(() => {
    cy.startGame();
  });

  describe('좀비 무리', () => {
    it('맞서 싸운다: 체력 -15', () => {
      cy.drawUntilCard('좀비 무리');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '85');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '13');
    });

    it('숨을 죽인다: 체력 -5, 감염 +3', () => {
      cy.drawUntilCard('좀비 무리');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '95');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '16');
    });
  });

  describe('약국 잔해', () => {
    it('안으로 들어간다: 감염 -10, 체력 -5', () => {
      cy.drawUntilCard('약국 잔해');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '95');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '3');
    });

    it('밖의 식량만 줍는다: 식량 +2', () => {
      cy.drawUntilCard('약국 잔해');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '100');
      cy.getStat('food').should('have.text', '4');
      cy.getStat('infection').should('have.text', '13');
    });
  });

  describe('빈 아파트', () => {
    it('문을 잠그고 쉰다: 체력 +15', () => {
      cy.drawUntilCard('빈 아파트');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '115');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '13');
    });

    it('방마다 뒤진다: 식량 +2, 체력 -5', () => {
      cy.drawUntilCard('빈 아파트');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '95');
      cy.getStat('food').should('have.text', '4');
      cy.getStat('infection').should('have.text', '13');
    });
  });

  describe('무장한 생존자', () => {
    it('식량을 건넨다: 체력 +5, 식량 -1', () => {
      cy.drawUntilCard('무장한 생존자');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '105');
      cy.getStat('food').should('have.text', '1');
      cy.getStat('infection').should('have.text', '13');
    });

    it('치료를 부탁한다: 감염 -15, 식량 -1', () => {
      cy.drawUntilCard('무장한 생존자');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '100');
      cy.getStat('food').should('have.text', '1');
      cy.getStat('infection').should('have.text', '-2');
    });
  });

  describe('감염 발작', () => {
    it('이를 악물고 견딘다: 감염 +10', () => {
      cy.drawUntilCard('감염 발작');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '100');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '23');
    });

    it('감염 부위를 도려낸다: 체력 -20, 감염 -10', () => {
      cy.drawUntilCard('감염 발작');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '80');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '3');
    });
  });

  describe('무전 신호', () => {
    it('위치를 송신한다: 구조 +1, 체력 -5', () => {
      cy.drawUntilCard('무전 신호');
      cy.chooseA();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '95');
      cy.getStat('food').should('have.text', '2');
      cy.getStat('infection').should('have.text', '13');
    });

    it('덫일 수 있다... 무시: 식량 +1', () => {
      cy.drawUntilCard('무전 신호');
      cy.chooseB();
      cy.waitForChoice();
      cy.getStat('hp').should('have.text', '100');
      cy.getStat('food').should('have.text', '3');
      cy.getStat('infection').should('have.text', '13');
    });
  });
});
