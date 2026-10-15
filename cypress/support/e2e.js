import 'allure-cypress';
import { epic } from 'allure-js-commons';
import './commands';
import registerCypressGrep from '@cypress/grep';

registerCypressGrep();

// Erros JS de scripts de terceiros (anúncios etc.) não devem derrubar o teste.
// Qualquer outro erro da aplicação continua falhando o teste.
const IGNORED_ERRORS = [/adsbygoogle/i, /googletag/i, /Script error/i, /ResizeObserver/i];

Cypress.on('uncaught:exception', (err) => {
  if (IGNORED_ERRORS.some((re) => re.test(err.message))) {
    return false; // suprime
  }
  return true; // deixa falhar
});

beforeEach(() => {
  epic('Automation Exercise UI');
  cy.blockThirdParty();
});
