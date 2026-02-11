describe('유효성 검사 테스트', () => {
  beforeEach(() => {
    cy.startGame();
  });

  it('선택 처리 중에는 선택지 버튼이 비활성화된다', () => {
    cy.drawCard();
    cy.chooseA();
    cy.get('#btn-choice-a').should('be.disabled');
    cy.get('#btn-choice-b').should('be.disabled');
  });

  it('선택 처리 완료 후 카드 뽑기 버튼이 활성화된다', () => {
    cy.drawAndChooseA();
    cy.get('#btn-draw').should('not.be.disabled');
  });

  it('식량이 0 미만으로 내려가지 않는다', () => {
    cy.drawAndChooseA();
    cy.drawAndChooseA();
    cy.drawAndChooseA();
    cy.drawAndChooseA();
    cy.drawAndChooseA();
    cy.getStat('food')
      .invoke('text')
      .then((text) => {
        const food = parseInt(text, 10);
        expect(food).to.be.at.least(0);
      });
  });

  it('식량이 충분할 때 기아 데미지 메시지가 표시되지 않는다', () => {
    cy.drawAndChooseA();
    cy.get('#log').should('not.contain', '식량이 없어 체력이 감소합니다.');
  });

  it('식량이 소진된 후 기아 데미지 메시지가 표시된다', () => {
    cy.drawAndChooseA();
    cy.drawAndChooseA();
    cy.drawAndChooseA();
    cy.drawAndChooseA();
    cy.get('#log').should('contain', '식량이 없어 체력이 감소합니다.');
  });

  it('기아 상태에서도 식량이 0 미만으로 내려가지 않는다', () => {
    cy.drawAndChooseA();
    cy.drawAndChooseA();
    cy.drawAndChooseA();
    cy.drawAndChooseA();
    cy.getStat('food').should('have.text', '0');
  });
});
