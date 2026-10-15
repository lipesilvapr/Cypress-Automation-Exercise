import { buildUser } from './data';
import { createUserViaApi, deleteUserViaApi } from './api';

// Padrão de requests de anúncios/consentimento/analytics de terceiros.
const THIRD_PARTY = /googlesyndication|doubleclick|googleadservices|adservice\.google|fundingchoices|googletagmanager|google-analytics/i;

/** Bloqueia anúncios e o banner de consentimento (evitam cliques interceptados e lentidão no load). */
Cypress.Commands.add('blockThirdParty', () => {
  cy.intercept(THIRD_PARTY, (req) => req.destroy());
});

/** Cria um usuário via API e devolve o objeto (com email único). */
Cypress.Commands.add('createUser', (overrides = {}) => createUserViaApi(buildUser(overrides)));

/** Remove o usuário via API (idempotente: se já não existe, a API só responde 404 no corpo). */
Cypress.Commands.add('deleteUser', (user) => deleteUserViaApi(user));
