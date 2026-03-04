describe('재시작 테스트', () => {
  beforeEach(() => {
    cy.startGame();
  });

  it('게임 종료 후 다시 시작 버튼이 표시된다', () => {
    cy.get('#btn-giveup').click();
    cy.get('#btn-restart').should('be.visible');
  });

  it('다시 시작 버튼 클릭 시 게임이 초기화된다', () => {
    cy.get('#btn-giveup').click();
    cy.get('#btn-restart').click();
    cy.get('#game-screen').should('be.visible');
    cy.get('#result-screen').should('not.be.visible');
  });

  it('다시 시작 후 초기 상태로 복원된다', () => {
    cy.get('#btn-giveup').click();
    cy.get('#btn-restart').click();
    cy.getStat('hp').should('have.text', '100');
    cy.getStat('food').should('have.text', '3');
    cy.getStat('infection').should('have.text', '10');
    cy.getStat('day').should('have.text', '1');
  });

  it('다시 시작 후 덱이 20장으로 초기화된다', () => {
    cy.drawAndChooseA();
    cy.get('#btn-giveup').click();
    cy.get('#btn-restart').click();
    cy.get('#deck-remaining').should('have.text', '20');
  });

  it('다시 시작 후 로그가 초기화된다', () => {
    cy.drawAndChooseA();
    cy.get('#log p').should('have.length.at.least', 3);
    cy.get('#btn-giveup').click();
    cy.get('#btn-restart').click();
    cy.get('#log p').should('have.length', 1);
  });

  it('선택 후 재시작하면 선택지 버튼이 활성화된다', () => {
    cy.drawAndChooseA();
    cy.get('#btn-giveup').click();
    cy.get('#btn-restart').click();
    cy.drawCard();
    cy.get('#btn-choice-a').should('not.be.disabled');
    cy.get('#btn-choice-b').should('not.be.disabled');
  });
});
