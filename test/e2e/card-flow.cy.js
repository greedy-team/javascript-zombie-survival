describe('카드 흐름 테스트', () => {
  beforeEach(() => {
    cy.startGame();
  });

  it('카드 뽑기 버튼 클릭 시 카드가 표시된다', () => {
    cy.drawCard();
    cy.get('#card-area').should('be.visible');
    cy.get('#card-name').should('not.be.empty');
    cy.get('#card-description').should('not.be.empty');
  });

  it('카드 뽑기 후 선택지 버튼 2개가 표시된다', () => {
    cy.drawCard();
    cy.get('#btn-choice-a').should('be.visible').and('not.be.empty');
    cy.get('#btn-choice-b').should('be.visible').and('not.be.empty');
  });

  it('카드 뽑기 후 뽑기 버튼이 숨겨진다', () => {
    cy.drawCard();
    cy.get('#btn-draw').should('not.be.visible');
  });

  it('카드 뽑기 후 남은 카드 수가 감소한다', () => {
    cy.drawCard();
    cy.get('#deck-remaining').should('have.text', '19');
  });

  it('선택지 클릭 후 2초간 로딩이 표시된다', () => {
    cy.drawCard();
    cy.chooseA();
    cy.get('#loading').should('be.visible');
    cy.get('#btn-choice-a').should('be.disabled');
    cy.get('#btn-choice-b').should('be.disabled');
    cy.get('#loading').should('not.be.visible', { timeout: 5000 });
  });

  it('선택 완료 후 로그에 결과가 표시된다', () => {
    cy.drawAndChooseA();
    cy.get('#log p').should('have.length.at.least', 3);
  });

  it('선택 완료 후 Day가 증가한다', () => {
    cy.drawAndChooseA();
    cy.getStat('day').should('have.text', '2');
  });

  it('선택 완료 후 카드 뽑기 버튼이 다시 표시된다', () => {
    cy.drawAndChooseA();
    cy.get('#btn-draw').should('be.visible');
    cy.get('#card-area').should('not.be.visible');
  });
});
