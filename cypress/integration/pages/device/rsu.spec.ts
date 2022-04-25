describe("The RSU Page", () => {
  const listUrl = "/device/rsu";
  const uuid = Cypress._.random(0, 1e6);
  const serialNumber = `${uuid}`;
  const name = `rsu_name_${uuid}`;

  beforeEach(() => {
    cy.login(listUrl);
  });

  it("create rsu", () => {
    cy.clickHeaderButton(0).formInput("name", name).formInput("sn", serialNumber).formCascader("province", 0, 1).formInput("address", serialNumber).formSubmit();
    cy.checkItemExist("name", name);
  });

  it("delete rsu", () => {
    cy.searchText("name", "rsu_name_753133").clickActionByTitle("删除").clickConfirmActionSubmitButton().checkEmptyTable().clearSearchInput();
  });
});
