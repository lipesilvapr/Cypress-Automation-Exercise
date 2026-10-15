const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    viewportWidth: 1920,
    viewportHeight: 1080,

    // Timeouts
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    responseTimeout: 30000,

    // Evidências (os screenshots de falha são anexados automaticamente ao Allure)
    video: false,
    screenshotOnRunFailure: true,

    // Retries só no `cypress run` (CI). Mascara intermitência: acompanhe os testes que precisam dele.
    retries: { runMode: 2, openMode: 0 },

    setupNodeEvents(on, config) {
      // filtro por tag: npx cypress run --env grepTags=@smoke
      require('@cypress/grep/src/plugin')(config);

      // Allure: resultados em ./allure-results
      allureCypress(on, config, {
        resultsDir: 'allure-results',
        environmentInfo: {
          BASE_URL: config.baseUrl,
          NODE_VERSION: process.version,
        },
      });

      return config;
    },
  },
});
