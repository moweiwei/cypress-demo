import getTitle from "./common";

declare global {
  namespace Cypress {
    interface Chainable {
      waitTableLoading: () => Chainable<Element>;
      clickHeaderButton: (index: number, timeout?: number) => Chainable<Element>;
      checkItemExist: (index: string, value: string) => Chainable<Element>;
      searchText: (name: string, value: string) => Chainable<Element>;
      clickActionByTitle: (title: string) => Chainable<Element>;
      clickConfirmActionSubmitButton: (waitTime?: number) => Chainable<Element>;
      checkEmptyTable: () => Chainable<Element>;
      clearSearchInput: () => Chainable<Element>;
    }
  }
}

Cypress.Commands.add("waitTableLoading", () => {
  cy.get(".ant-spin-spinning", { timeout: 120000 }).should("not.exist");
});

Cypress.Commands.add("clickHeaderButton", (buttonIndex, waitTime = 2000) => {
  cy.get(".ant-pro-table-list-toolbar-right").find("button").eq(buttonIndex).click({ force: true });
  cy.wait(waitTime);
});

Cypress.Commands.add("searchText", (name, value) => {
  cy.get(`#${name}.ant-input`).first().clear().type(value).blur();
  cy.get(".ant-pro-table-search").find("button").eq(1).click({ force: true });
});

Cypress.Commands.add("checkItemExist", (name, value) => {
  cy.searchText(name, value);
  cy.get(".ant-table-tbody").find(".ant-table-row").eq(0).contains(name).should("exist");
});

Cypress.Commands.add("clickActionByTitle", (title) => {
  // const realTitle = getTitle(title);
  cy.get(".ant-table-row")
    .first()
    .find("a")
    .contains(title) //TODO: need to use realTitle after i18n is ready
    .click({ force: true });
});

Cypress.Commands.add("clickConfirmActionSubmitButton", (waitTime) => {
  cy.get(".ant-modal-confirm-btns").find("button").eq(1).click().waitFormLoading();
  if (waitTime) {
    cy.wait(waitTime);
  }
});

Cypress.Commands.add("checkEmptyTable", () => {
  cy.get(".ant-empty-normal").should("have.length", 1);
  cy.wait(2000);
});

Cypress.Commands.add("clearSearchInput", () => {
  cy.get(".ant-pro-table-search").find("button").eq(0).click({ force: true });
});

export {};
