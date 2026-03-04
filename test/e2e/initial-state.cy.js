describe('초기 상태 테스트', () => {
  beforeEach(() => {
    cy.startGame();
  });

  it('게임 시작 시 초기 체력이 100이다', () => {
    cy.getStat('hp').should('have.text', '100');
  });

  it('게임 시작 시 초기 식량이 3이다', () => {
    cy.getStat('food').should('have.text', '3');
  });

  it('게임 시작 시 초기 감염도가 10이다', () => {
    cy.getStat('infection').should('have.text', '10');
  });

  it('게임 시작 시 Day 1이다', () => {
    cy.getStat('day').should('have.text', '1');
  });

  it('게임 시작 시 카드 뽑기 버튼이 표시된다', () => {
    cy.get('#btn-draw').should('be.visible').and('not.be.disabled');
  });

  it('게임 시작 시 남은 카드가 20장이다', () => {
    cy.get('#deck-remaining').should('have.text', '20');
  });

  it('게임 시작 시 카드 영역이 숨겨져 있다', () => {
    cy.get('#card-area').should('not.be.visible');
  });

  it('게임 시작 시 결과 화면이 숨겨져 있다', () => {
    cy.get('#result-screen').should('not.be.visible');
  });

  it('게임 시작 시 로딩 표시가 숨겨져 있다', () => {
    cy.get('#loading').should('not.be.visible');
  });

  it('게임 시작 시 포기 버튼이 표시된다', () => {
    cy.get('#btn-giveup').should('be.visible').and('not.be.disabled');
  });

  it('게임 시작 시 치료 횟수가 0이다', () => {
    cy.getStat('heal-attempts').should('have.text', '0');
  });

  it('게임 시작 시 구조 포인트가 0이다', () => {
    cy.getStat('rescue-points').should('have.text', '0');
  });
});
