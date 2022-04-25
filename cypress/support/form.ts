declare global {
  namespace Cypress {
    interface Chainable {
      waitFormLoading: () => Chainable<Element>;
      formInput: (formItemName: string, value: string, index?: number) => Chainable<Element>;
      formSelect: (formItemName: string, index?: number) => Chainable<Element>;
      formCascader: (formItemName: string, index?: number, subIndex?: number) => Chainable<Element>;
      formSubmit: () => Chainable<Element>;
    }
  }
}

function getId(formItemName) {
  return `.antd-form-item-${formItemName}`;
}

Cypress.Commands.add("waitFormLoading", () => {
  cy.get(".ant-btn-loading", { timeout: 600000 }).should("not.exist");
});

Cypress.Commands.add("formInput", (formItemName, value, index) => {
  if (!index) {
    cy.get(`${getId(formItemName)}`)
      .find("input")
      .first()
      .clear()
      .type(value)
      .blur();
  } else {
    cy.get(`${getId(formItemName)}`)
      .find("input")
      .eq(index)
      .clear()
      .type(value)
      .blur();
  }
});

Cypress.Commands.add("formCascader", (formItemName, index, subIndex) => {
  cy.get(getId(formItemName)).find(".ant-cascader").click();
  cy.get(".ant-cascader-dropdown").find(".ant-cascader-menu-item").eq(index).click();
  cy.get(".ant-cascader-dropdown").find(".ant-cascader-menu-item").eq(subIndex).click();
});

Cypress.Commands.add("formSubmit", () => {
  cy.get(".ant-modal-footer").find("button").eq(1).click().waitFormLoading();
});

export {};
