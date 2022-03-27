const {resolve} = require('path');
const root = resolve(__dirname, '..');
const rootConfig = require(`${root}/jest.config.js`);

module.exports = {...rootConfig, ...{
  rootDir: root,
  displayName: "end2end-tests",
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"], // vem a ser um arquivo que vai rodar antes de rodar os testes. Isso é bom para fazer setup de DB, iniciar o servidor, entre outras coisas.
  testMatch: ["<rootDir>/test/**/*.test.ts"], // só entram os arquivos que estão dentro da pasta test
}}