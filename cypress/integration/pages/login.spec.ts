describe('The Login Page', () => {
  const username =  Cypress.env('username');
  const password = `${Cypress.env('password')}`;

  it('successfully login and check menu', () => {
    cy.visit('/user/login');
    cy.intercept('POST', 'api/tokens').as('login');
    cy.loginInput('account', `${username}`)
      .loginInput('password', `${password}`)
      .loginSubmit()
      .wait('@login')
      .url()
      .should('include', '/platform')
      .wait(1000)
    cy.get('.header').find('.f-middle').click()
      .wait(1000)
      .clickMenu(1, 0)
      .wait(1000)
      .url()
      .should('include', '/device/rsu');
  });

  it('successfully error username and password', () => {
    cy.visit('/user/login');
    cy.loginInput('account', `${username}1`)
      .loginInput('password', `${password}1`)
      .loginSubmit()
      .get('.ant-message')
      .should('have.length', 1);
  });
});