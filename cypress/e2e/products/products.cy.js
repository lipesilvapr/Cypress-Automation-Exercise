import { feature, story } from 'allure-js-commons';
import ProductsPage from '../../pages/ProductsPage';

describe('UI - Produtos', () => {
  beforeEach(() => {
    feature('Produtos');
    story('Listagem e busca');
    ProductsPage.open();
  });

  it('página de produtos lista itens', { tags: ['@ui', '@products', '@smoke'] }, () => {
    ProductsPage.title().invoke('text').should('match', /all products/i);
    ProductsPage.items().should('have.length.greaterThan', 0);
  });

  ['top', 'jean', 'dress'].forEach((term) => {
    it(`buscar produto por "${term}"`, { tags: ['@ui', '@products'] }, () => {
      ProductsPage.search(term);

      // o Cypress repete a asserção até o título mudar (não depende de sleeps)
      ProductsPage.title().invoke('text').should('match', /searched products/i);
      ProductsPage.items().should('have.length.greaterThan', 0);
    });
  });
});
