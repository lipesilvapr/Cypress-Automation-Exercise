/**
 * Elementos e ações comuns a todas as páginas (cabeçalho, navegação).
 * Seletores ficam SOMENTE nas pages; os specs descrevem comportamento.
 */
export default class BasePage {
  visit(path = '/') {
    cy.visit(path);
    this.removeAdRemnants();
  }

  /** Remove restos de anúncios que escaparam do bloqueio e poderiam cobrir elementos. */
  removeAdRemnants() {
    cy.document().then((doc) => {
      doc
        .querySelectorAll('ins.adsbygoogle, iframe[id^="aswift_"], iframe[id^="google_ads"]')
        .forEach((el) => el.remove());
    });
  }

  loginLink() {
    return cy.get("a[href='/login']");
  }

  productsLink() {
    return cy.get("a[href='/products']");
  }

  loggedInAs() {
    return cy.contains('a', 'Logged in as');
  }
}
