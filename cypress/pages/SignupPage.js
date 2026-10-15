import BasePage from './BasePage';

class SignupPage extends BasePage {
  fillAccountInformation(user) {
    cy.get("[data-qa='password']").should('be.visible');

    cy.get(user.title === 'Mrs' ? '#id_gender2' : '#id_gender1').check();
    cy.get("[data-qa='password']").type(user.password, { log: false });
    cy.get("[data-qa='days']").select(user.birthDate);
    cy.get("[data-qa='months']").select(user.birthMonth);
    cy.get("[data-qa='years']").select(user.birthYear);

    cy.get("[data-qa='first_name']").type(user.firstName);
    cy.get("[data-qa='last_name']").type(user.lastName);
    cy.get("[data-qa='company']").type(user.company);
    cy.get("[data-qa='address']").type(user.address1);
    cy.get("[data-qa='address2']").type(user.address2);
    cy.get("[data-qa='country']").select(user.country);
    cy.get("[data-qa='state']").type(user.state);
    cy.get("[data-qa='city']").type(user.city);
    cy.get("[data-qa='zipcode']").type(user.zipcode);
    cy.get("[data-qa='mobile_number']").type(user.mobileNumber);
  }

  submit() {
    cy.get("[data-qa='create-account']").click();
  }

  accountCreatedTitle() {
    return cy.get("[data-qa='account-created']");
  }

  continue() {
    cy.get("[data-qa='continue-button']").click();
  }
}

export default new SignupPage();
