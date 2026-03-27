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

  it(
    '치료 선택 5회 누적 시 치료 성공 엔딩으로 종료된다',
    { timeout: 120000 },
    () => {
      const playForHeal = () => {
        cy.get('body').then(($body) => {
          if ($body.find('#result-screen:visible').length > 0) return;
          cy.drawCard();
          cy.get('#card-name')
            .invoke('text')
            .then((name) => {
              if (name.includes('부상당한 군인')) {
                cy.getStat('food')
                  .invoke('text')
                  .then((food) => {
                    if (parseInt(food, 10) > 0) {
                      cy.chooseA();
                    } else {
                      cy.chooseB();
                    }
                    cy.waitForChoice();
                    playForHeal();
                  });
              } else if (name.includes('임시 수술')) {
                cy.getStat('hp')
                  .invoke('text')
                  .then((hp) => {
                    if (parseInt(hp, 10) > 25) {
                      cy.chooseA();
                    } else {
                      cy.chooseB();
                    }
                    cy.waitForChoice();
                    playForHeal();
                  });
              } else if (name.includes('생존자 시체')) {
                cy.getStat('food')
                  .invoke('text')
                  .then((food) => {
                    if (parseInt(food, 10) < 5) {
                      cy.chooseA();
                    } else {
                      cy.chooseB();
                    }
                    cy.waitForChoice();
                    playForHeal();
                  });
              } else if (name.includes('오염된 웅덩이')) {
                cy.chooseA();
                cy.waitForChoice();
                playForHeal();
              } else {
                cy.chooseB();
                cy.waitForChoice();
                playForHeal();
              }
            });
        });
      };
      playForHeal();
      cy.get('#result-screen').should('be.visible');
      cy.get('#result-ending').should('have.text', '치료 성공');
    },
  );

  it(
    '구조 포인트 3 이상 + Day > 10 조건으로 구조 성공 엔딩이 된다',
    { timeout: 120000 },
    () => {
      const playForRescue = () => {
        cy.get('body').then(($body) => {
          if ($body.find('#result-screen:visible').length > 0) return;
          cy.drawCard();
          cy.get('#card-name')
            .invoke('text')
            .then((name) => {
              if (name.includes('군용 차량')) {
                cy.chooseA();
                cy.waitForChoice();
                playForRescue();
              } else if (name.includes('구조 트럭')) {
                cy.getStat('hp')
                  .invoke('text')
                  .then((hp) => {
                    if (parseInt(hp, 10) > 25) {
                      cy.chooseA();
                    } else {
                      cy.chooseB();
                    }
                    cy.waitForChoice();
                    playForRescue();
                  });
              } else if (name.includes('부상당한 군인')) {
                cy.getStat('food')
                  .invoke('text')
                  .then((food) => {
                    if (parseInt(food, 10) > 0) {
                      cy.chooseA();
                    } else {
                      cy.chooseB();
                    }
                    cy.waitForChoice();
                    playForRescue();
                  });
              } else if (name.includes('생존자 시체')) {
                cy.getStat('food')
                  .invoke('text')
                  .then((food) => {
                    if (parseInt(food, 10) < 3) {
                      cy.chooseA();
                    } else {
                      cy.chooseB();
                    }
                    cy.waitForChoice();
                    playForRescue();
                  });
              } else if (name.includes('오염된 웅덩이')) {
                cy.chooseA();
                cy.waitForChoice();
                playForRescue();
              } else {
                cy.chooseB();
                cy.waitForChoice();
                playForRescue();
              }
            });
        });
      };
      playForRescue();
      cy.get('#result-screen').should('be.visible');
      cy.get('#result-ending').should('have.text', '구조 성공');
    },
  );

  it('Day > 15 조건으로 생존 성공 엔딩이 된다', { timeout: 120000 }, () => {
    const playForSurvival = () => {
      cy.get('body').then(($body) => {
        if ($body.find('#result-screen:visible').length > 0) return;
        cy.drawCard();
        cy.get('#card-name')
          .invoke('text')
          .then((name) => {
            if (name.includes('부상당한 군인')) {
              cy.getStat('food')
                .invoke('text')
                .then((food) => {
                  if (parseInt(food, 10) > 0) {
                    cy.chooseA();
                  } else {
                    cy.chooseB();
                  }
                  cy.waitForChoice();
                  playForSurvival();
                });
            } else if (name.includes('임시 수술')) {
              cy.getStat('hp')
                .invoke('text')
                .then((hp) => {
                  if (parseInt(hp, 10) > 30) {
                    cy.chooseA();
                  } else {
                    cy.chooseB();
                  }
                  cy.waitForChoice();
                  playForSurvival();
                });
            } else if (name.includes('생존자 시체')) {
              cy.getStat('food')
                .invoke('text')
                .then((food) => {
                  if (parseInt(food, 10) < 5) {
                    cy.chooseA();
                  } else {
                    cy.chooseB();
                  }
                  cy.waitForChoice();
                  playForSurvival();
                });
            } else if (name.includes('오염된 웅덩이')) {
              cy.chooseA();
              cy.waitForChoice();
              playForSurvival();
            } else {
              cy.chooseB();
              cy.waitForChoice();
              playForSurvival();
            }
          });
      });
    };
    playForSurvival();
    cy.get('#result-screen').should('be.visible');
    cy.get('#result-ending').should('have.text', '생존 성공');
  });
});
