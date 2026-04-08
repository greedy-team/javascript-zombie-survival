Cypress.Commands.add('startGame', () => {
  cy.visit('/');
});

Cypress.Commands.add('getStat', (stat) => cy.get(`#${stat}`));

Cypress.Commands.add('drawCard', () => {
  cy.get('#btn-draw').click();
});

Cypress.Commands.add('chooseA', () => {
  cy.get('#btn-choice-a').click();
});

Cypress.Commands.add('chooseB', () => {
  cy.get('#btn-choice-b').click();
});

Cypress.Commands.add('waitForChoice', () => {
  cy.get('body', { timeout: 5000 }).should(($body) => {
    const drawVisible = $body.find('#btn-draw').is(':visible');
    const resultVisible = $body.find('#result-screen').is(':visible');
    expect(drawVisible || resultVisible).to.be.true;
  });
});

Cypress.Commands.add('drawAndChooseA', () => {
  cy.drawCard();
  cy.chooseA();
  cy.waitForChoice();
});

Cypress.Commands.add('drawAndChooseB', () => {
  cy.drawCard();
  cy.chooseB();
  cy.waitForChoice();
});

Cypress.Commands.add('playUntilStarved', () => {
  cy.get('body').then(($body) => {
    if ($body.find('#result-screen:visible').length > 0) return;
    if ($body.find('#log').text().includes('식량이 없어')) return;
    cy.drawAndChooseB();
    cy.playUntilStarved();
  });
});

Cypress.Commands.add('drawUntilCard', (targetName) => {
  const tryDraw = (remaining) => {
    cy.drawCard();
    cy.get('#card-name')
      .invoke('text')
      .then((name) => {
        if (name.includes(targetName)) return;
        expect(remaining).to.be.greaterThan(
          0,
          `카드 "${targetName}"을(를) 찾지 못했습니다`,
        );
        cy.visit('/');
        tryDraw(remaining - 1);
      });
  };
  tryDraw(50);
});
