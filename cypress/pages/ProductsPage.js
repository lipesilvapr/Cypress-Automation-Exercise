import BasePage from './BasePage';

class ProductsPage extends BasePage {
  open() {
    this.visit('/products');
    this.title().should('be.visible');
  }

  search(term) {
    cy.get('#search_product').type(term);
    cy.get('#submit_search').click();
  }

  title() {
    return cy.get('.features_items h2.title');
  }

  items() {
    return cy.get('.features_items .product-image-wrapper');
  }
}

export default new ProductsPage();
