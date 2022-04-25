// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

declare global {
  namespace Cypress {
    interface Chainable {
      loginInput: (formItemName: string, value: string) => Chainable<Element>;
      loginSubmit: () => Chainable<Element>;
      clickMenu: (menuIndex: number, subMenuIndex: number) => Chainable<Element>;
      visitPage: (page: string) => Chainable<Element>;
      login: (url: string) => Chainable<Element>;
    }
  }
}

Cypress.Commands.add("loginInput", (formItemName, value) => {
  cy.get(`#${formItemName}`).clear().type(value).blur();
});

Cypress.Commands.add("loginSubmit", () => {
  cy.get(".ant-form").find("button").click().waitFormLoading();
});

Cypress.Commands.add("clickMenu", (fatherIndex, sonIndex) => {
  const ele = cy.get(".ant-menu-dark").find(".ant-menu-submenu").eq(fatherIndex);

  ele.click();
  cy.wait(1000);
  cy.get("li.ant-menu-submenu-open").first().find("ul>li").eq(sonIndex).click();
  cy.wait(1000);
});

Cypress.Commands.add("visitPage", (url = "", isTable = true) => {
  cy.visit(url);

  cy.get("#root", { timeout: 120000 }).should("exist");
  if (url) {
    cy.wait(2000);
    if (isTable) {
      cy.get(".ant-table-wrapper", { timeout: 120000 }).should("exist");
      cy.waitTableLoading();
    }
  }
});

Cypress.Commands.add("login", (visitUrl = "") => {
  const values = {
    account: Cypress.env("account"),
    password: `${Cypress.env("password")}`
  };
  const body = { methods: ["password"], password: values };

  cy.request({
    url: "api/tokens",
    body,
    method: "POST"
  })
    .its("body.data")
    .as("data")
    .then(function () {
      cy.log(this.data);

      const params = { methods: ["token"], token: this.data };
      cy.request({
        url: "api/tokens",
        body: params,
        method: "POST"
      })
        .its("body.data")
        .as("token")
        .then(function () {
          cy.log(this.token);

          localStorage.setItem("v2v_console_token", this.token);
          cy.visit(visitUrl || "/");
        });
    });
});

export {};
