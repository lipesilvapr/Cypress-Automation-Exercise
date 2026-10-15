# cypress-automation-exercise

Testes de **UI** do [automationexercise.com](https://automationexercise.com) com **Cypress** e relatórios **Allure**.

## Pré-requisitos

- Node.js 18+ (recomendado 20 LTS)
- Google Chrome (opcional; o Cypress também traz o Electron)
- Java 11+ (necessário só para gerar/abrir o relatório Allure)

## Instalação

```bash
npm install
```

## Estrutura

```
├── cypress.config.js          # baseUrl, timeouts, retries, plugins (tags e Allure)
├── package.json
├── jsconfig.json              # autocomplete no VS Code
├── .github/workflows/ui-tests.yml
└── cypress
    ├── e2e/                   # specs (*.cy.js), organizados por domínio
    │   ├── home/  auth/  products/
    ├── pages/                 # Page Objects: seletores e ações de cada página
    ├── support/
    │   ├── e2e.js             # setup global (bloqueio de anúncios, tratamento de erros de terceiros, tags)
    │   ├── commands.js        # cy.createUser(), cy.deleteUser(), cy.blockThirdParty()
    │   ├── api.js             # criação/remoção de usuário via cy.request
    │   └── data.js            # geração de massa (email único)
    └── fixtures/user.json     # template de usuário
```

## Executando

```bash
npm run cy:open                         # modo interativo
npm run cy:run                          # headless (Electron)
npm run cy:run:chrome                   # headless no Chrome
npm run cy:run:headed                   # Chrome visível
npm run test:smoke                      # só os testes @smoke

npx cypress run --env grepTags=@auth            # por tag
npx cypress run --env grepTags="@auth+@smoke"   # AND
npx cypress run --env grepTags="@home @products" # OR (espaço)
npx cypress run --spec "cypress/e2e/auth/*.cy.js"   # por spec
npx cypress run --config baseUrl=https://outro-host # outro ambiente
```

Screenshots de falhas: `cypress/screenshots/`.

## Relatório Allure

```bash
npm run allure:clean      # limpa allure-results/ e allure-report/ (rode ANTES de cada execução)
npm run cy:run:chrome     # executa os testes e gera allure-results/
npm run allure:serve      # gera o relatório e abre no navegador (recomendado)

npm run allure:generate   # gera o HTML estático em allure-report/
npm run allure:open       # abre o allure-report/ gerado
```

- Cada comando do Cypress vira um **step** do relatório (visit, get, type, click, request...).
- **Screenshots de falha** são anexados automaticamente ao teste.
- `@Epic` / `@Feature` / `@Story` (aba *Behaviors*) são definidos no `beforeEach` de cada spec com `allure-js-commons`.
- Os resultados se **acumulam** em `allure-results/`: sem o `allure:clean`, execuções antigas aparecem misturadas no relatório.
- Os dados de teste (inclusive senhas geradas) podem aparecer nos steps: não use credenciais reais.

## Convenções

- **Tags**: `@ui` em todos; `@smoke` para o essencial; uma por domínio (`@auth`, `@products`, `@home`). Definidas no 2º argumento do `it`.
- **Pages**: seletores e ações ficam só em `cypress/pages/`. Os specs descrevem comportamento.
- **Massa de dados**: não reutilize usuários fixos. Crie com `cy.createUser()` (API) e remova no `afterEach` com `cy.deleteUser(user)`.
- **Esperas**: não use `cy.wait(ms)`. Os comandos e asserções do Cypress repetem sozinhos até passar
  (ex.: `.should('match', /searched products/i)` aguarda o título mudar).

## Observações sobre o site

- **Anúncios e consentimento** atrapalham cliques e atrasam o `load`. O `cy.blockThirdParty()` (roda em todo `beforeEach`)
  bloqueia as requisições de Google Ads/consentimento/analytics, e `BasePage.removeAdRemnants()` remove restos no DOM.
- **Erros de JS de terceiros** (`adsbygoogle`, `googletag`...) são ignorados em `support/e2e.js`. Outros erros da aplicação continuam falhando o teste.
- **API do site**: responde sempre HTTP 200, com o status real em `responseCode` no corpo e `Content-Type: text/html`.
  `support/api.js` já trata isso.
- **Retries**: `retries.runMode = 2` (só no `cypress run`/CI). Ajuda com a instabilidade do site público, mas mascara
  intermitência: acompanhe os testes que passam só na 2ª/3ª tentativa.
