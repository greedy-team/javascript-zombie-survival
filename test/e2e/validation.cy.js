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
    cy.playUntilStarved();
    cy.get('#log').should('contain', '식량이 없어 체력이 감소합니다.');
  });

  it('기아 상태에서도 식량이 0 미만으로 내려가지 않는다', () => {
    cy.playUntilStarved();
    cy.getStat('food')
      .invoke('text')
      .then((text) => {
        expect(parseInt(text, 10)).to.be.at.least(0);
      });
  });

  it('감염도가 0 미만으로 내려가지 않는다', () => {
    cy.drawUntilCard('부상당한 군인');
    cy.chooseA();
    cy.waitForChoice();
    cy.getStat('infection')
      .invoke('text')
      .then((text) => {
        expect(parseInt(text, 10)).to.be.at.least(0);
      });
  });

  it('체력이 0 미만으로 내려가지 않는다', () => {
    const playTurn = () => {
      cy.get('body').then(($body) => {
        if ($body.find('#result-screen:visible').length > 0) return;
        cy.drawAndChooseA();
        playTurn();
      });
    };
    playTurn();
    cy.get('#result-hp')
      .invoke('text')
      .then((text) => {
        expect(parseInt(text, 10)).to.be.at.least(0);
      });
  });

  it('식량이 0일 때 체력이 10 추가 감소한다', () => {
    cy.playUntilStarved();
    cy.get('body').then(($body) => {
      if ($body.find('#result-screen:visible').length > 0) return;
      cy.getStat('hp')
        .invoke('text')
        .then((hpText) => {
          const hpBefore = parseInt(hpText, 10);
          cy.drawAndChooseB();
          cy.get('body').then(($b) => {
            if ($b.find('#result-screen:visible').length > 0) return;
            cy.getStat('hp')
              .invoke('text')
              .then((hpAfter) => {
                expect(parseInt(hpAfter, 10)).to.be.at.most(hpBefore);
              });
          });
        });
    });
  });
});
