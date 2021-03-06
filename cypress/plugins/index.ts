/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const { getConfig } = require("../utils");
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const conf = getConfig();
  // eslint-disable-next-line no-unused-vars
  const { baseUrl, testFiles = [], translate, env = {} } = conf;
  if (baseUrl) {
    config.baseUrl = baseUrl;
  }
  if (testFiles && testFiles.length) {
    config.testFiles = testFiles;
  }
  if (translate) {
    config.env.translate = translate;
  }
  config.env = {
    ...(config.env || {}),
    ...env
  };

  require("@cypress/code-coverage/task")(on, config);
  return config;
};
