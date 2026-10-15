import BasePage from './BasePage';

class LoginPage extends BasePage {
  open() {
    this.visit('/login');
    cy.get("form[action='/login']").should('be.visible');
  }

  login(email, password) {
    cy.get("[data-qa='login-email']").type(email);
    cy.get("[data-qa='login-password']").type(password, { log: false });
    cy.get("[data-qa='login-button']").click();
  }

  startSignup(name, email) {
    cy.get("[data-qa='signup-name']").type(name);
    cy.get("[data-qa='signup-email']").type(email);
    cy.get("[data-qa='signup-button']").click();
  }

  loginError() {
    return cy.get("form[action='/login'] p");
  }

  signupError() {
    return cy.get("form[action='/signup'] p");
  }
}

export default new LoginPage();
