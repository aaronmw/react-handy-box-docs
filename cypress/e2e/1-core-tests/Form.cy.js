/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/docs/form');
  });

  it('Can accept values on every field type', () => {
    cy.get('form')
      .find('[name="single_line_input"]')
      .type('Single Line Input Box');

    cy.get('form').find('[name="elastic_text_input"]').as('ElasticTextInput');
    cy.get('@ElasticTextInput').type(
      'This is a whole bunch of text that should wrap to at least another line. By that time, the field should have grown in height.'
    );
    cy.get('@ElasticTextInput').invoke('outerHeight').should('be.gt', 50);
  });

  it.only('Can handle checkboxes', () => {
    cy.get('form').find('input[type="checkbox"]').as('checkboxes');

    cy.get('@checkboxes').eq(0).as('first');
    cy.get('@checkboxes').eq(1).as('second');
    cy.get('@checkboxes').eq(2).as('third');

    cy.get('@first').check();
    cy.get('@second').check();

    cy.wait(500);

    cy.get('@first').should('be.checked');
    cy.get('@second').should('be.checked');
    cy.get('@third').should('not.be.checked');
  });

  it('Can handle radios', () => {
    cy.get('form').find('input[type="radio"]').eq(0).as('first');
    cy.get('form').find('input[type="radio"]').eq(1).as('second');
    cy.get('form').find('input[type="radio"]').eq(2).as('third');

    cy.get('@first').check();
    cy.get('@second').check();

    cy.get('@first').should('not.be.checked');
    cy.get('@second').should('be.checked');
    cy.get('@third').should('not.be.checked');
  });
});
