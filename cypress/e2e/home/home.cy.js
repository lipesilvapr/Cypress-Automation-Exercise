import { feature, story } from 'allure-js-commons';
import HomePage from '../../pages/HomePage';

describe('UI - Home page', () => {
  beforeEach(() => {
    feature('Home');
    story('Carregamento');
  });

  it('carrega com título e produtos em destaque', { tags: ['@ui', '@home', '@smoke'] }, () => {
    HomePage.open();

    cy.title().should('eq', 'Automation Exercise');
    HomePage.loginLink().should('contain.text', 'Signup / Login');
    HomePage.featuredItems().should('have.length.greaterThan', 0);
  });
});
