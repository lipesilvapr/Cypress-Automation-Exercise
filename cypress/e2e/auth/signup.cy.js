import { feature, story } from 'allure-js-commons';
import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import { buildUser } from '../../support/data';

describe('UI - Cadastro de usuário', () => {
  let user;

  // gerado a cada tentativa (inclui retries) para evitar email repetido
  beforeEach(() => {
    feature('Autenticação');
    story('Cadastro');
    user = buildUser();
  });

  afterEach(() => {
    if (user) {
      cy.deleteUser(user);
    }
  });

  it('cadastro completo com sucesso', { tags: ['@ui', '@auth', '@smoke'] }, () => {
    LoginPage.open();
    LoginPage.startSignup(user.name, user.email);

    SignupPage.fillAccountInformation(user);
    SignupPage.submit();

    SignupPage.accountCreatedTitle().invoke('text').should('match', /account created!/i);

    SignupPage.continue();
    SignupPage.loggedInAs().should('contain.text', user.name);
  });

  it('cadastro com email já existente', { tags: ['@ui', '@auth'] }, () => {
    cy.createUser().then((existing) => {
      user = existing; // garante a limpeza do usuário criado via API

      LoginPage.open();
      LoginPage.startSignup(existing.name, existing.email);

      LoginPage.signupError().should('contain.text', 'Email Address already exist!');
    });
  });
});
