import BasePage from './BasePage';

class HomePage extends BasePage {
  open() {
    this.visit('/');
    this.productsLink().should('be.visible');
  }

  featuredItems() {
    return cy.get('.features_items .product-image-wrapper');
  }
}

export default new HomePage();
