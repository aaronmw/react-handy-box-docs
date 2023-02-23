/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/docs/form');
  });

  it('Can handle checkboxes', () => {
    cy.get('form').find('input[type="checkbox"]').as('checkboxes');

    cy.get('@checkboxes').eq(0).as('first');
    cy.get('@checkboxes').eq(1).as('second');
    cy.get('@checkboxes').eq(2).as('third');

    cy.get('@first').check();
    cy.get('@second').check();

    cy.get('@first').should('be.checked');
    cy.get('@second').should('be.checked');
    cy.get('@third').should('not.be.checked');
  });

  it('Can handle radios', () => {
    cy.get('form').find('input[type="radio"]').as('radios');

    cy.get('@radios').eq(0).as('first');
    cy.get('@radios').eq(1).as('second');
    cy.get('@radios').eq(2).as('third');

    cy.get('@first').check();
    cy.get('@second').check();

    cy.get('@first').should('not.be.checked');
    cy.get('@second').should('be.checked');
    cy.get('@third').should('not.be.checked');
  });

  it.only('Can handle single selection', () => {
    cy.get('select[name="single_select_field"]').as('single-select');

    cy.get('@single-select').select(1).should('have.value', 'second');
  });
});
