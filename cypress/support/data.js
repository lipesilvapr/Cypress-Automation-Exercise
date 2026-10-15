import template from '../fixtures/user.json';

/**
 * Gera um usuário com email único (a partir do template em fixtures/user.json).
 * Use `overrides` para trocar qualquer campo.
 */
export function buildUser(overrides = {}) {
  const id = `${Date.now()}${Cypress._.random(0, 99999)}`;
  return { ...template, email: `cypress_${id}@example.com`, ...overrides };
}
