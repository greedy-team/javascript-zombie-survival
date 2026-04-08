describe('게임 종료 테스트', () => {
  beforeEach(() => {
    cy.startGame();
  });

  it('포기 버튼 클릭 시 게임이 종료된다', () => {
    cy.get('#btn-giveup').click();
    cy.get('#result-screen').should('be.visible');
    cy.get('#result-ending').should('have.text', '포기');
  });

  it('게임 종료 시 결과 화면에 생존 일수가 표시된다', () => {
    cy.get('#btn-giveup').click();
    cy.get('#result-days').should('not.be.empty');
  });

  it('게임 종료 시 결과 화면에 최종 체력이 표시된다', () => {
    cy.get('#btn-giveup').click();
    cy.get('#result-hp').should('not.be.empty');
  });

  it('게임 종료 시 결과 화면에 최종 식량이 표시된다', () => {
    cy.get('#btn-giveup').click();
    cy.get('#result-food').should('not.be.empty');
  });

  it('게임 종료 시 결과 화면에 최종 감염도가 표시된다', () => {
    cy.get('#btn-giveup').click();
    cy.get('#result-infection').should('not.be.empty');
  });

  it('게임 종료 시 결과 화면에 엔딩이 표시된다', () => {
    cy.get('#btn-giveup').click();
    cy.get('#result-ending').should('not.be.empty');
  });

  it('체력 또는 감염도 조건에 의해 게임이 종료된다', () => {
    const playTurn = () => {
      cy.get('body').then(($body) => {
        if ($body.find('#result-screen:visible').length > 0) return;
        cy.drawAndChooseA();
        playTurn();
      });
    };
    playTurn();
    cy.get('#result-screen').should('be.visible');
    cy.get('#result-ending')
      .invoke('text')
      .then((ending) => {
        expect([
          '사망',
          '좀비화',
          '생존 성공',
          '치료 성공',
          '구조 성공',
        ]).to.include(ending);
      });
  });
});
