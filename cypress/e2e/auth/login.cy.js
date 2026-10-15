import { feature, story } from 'allure-js-commons';
import LoginPage from '../../pages/LoginPage';

describe('UI - Login', () => {
  let user;

  beforeEach(() => {
    feature('Autenticação');
    story('Login');
  });

  afterEach(() => {
    if (user) {
      cy.deleteUser(user);
      user = undefined;
    }
  });

  it('login com credenciais válidas', { tags: ['@ui', '@auth', '@smoke'] }, () => {
    // massa criada via API (rápido e isolado) e removida no afterEach
    cy.createUser().then((created) => {
      user = created;

      LoginPage.open();
      LoginPage.login(user.email, user.password);

      LoginPage.loggedInAs().should('contain.text', user.name);
    });
  });

  const invalidCredentials = [
    { caso: 'usuário inexistente', email: 'nao.existe@example.com', password: 'Qualquer123' },
    { caso: 'senha qualquer', email: 'outro.fake@example.com', password: '123456' },
  ];

  invalidCredentials.forEach(({ caso, email, password }) => {
    it(`login inválido - ${caso}`, { tags: ['@ui', '@auth'] }, () => {
      LoginPage.open();
      LoginPage.login(email, password);

      LoginPage.loginError().should('contain.text', 'Your email or password is incorrect!');
    });
  });
});
