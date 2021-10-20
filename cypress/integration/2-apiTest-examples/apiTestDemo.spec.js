/**
 * Api Testing
 */

describe("Basic Api Testing", () => {
  beforeEach(function () {
    cy.request("GET", "http://localhost:3000/todos").as("todos");
  });
  it("Body Length - Test", () => {
    cy.request("http://localhost:3000/todos")
      .its("body")
      .should("have.length", 2);
  });

  it("Request Status - Test", () => {
    cy.request("http://localhost:3000/todos").its("status").should("eq", 200);
  });

  it("Header/Content-Type - Test", () => {
    cy.request("http://localhost:3000/todos")
      .its("headers")
      .its("content-type")
      .should("include", "application/json")
      .and("include", "charset=utf-8");
  });

  const ApiItems = [
    {
      id: 1,
      title: "todo1",
      completed: true,
    },
    {
      id: 2,
      title: "todo2",
      completed: false,
    },
  ];

  it("Initial items from End Point - Test", () => {
    cy.request("http://localhost:3000/todos")
      .its("body")
      .should("deep.eq", ApiItems);
  });

  it("Json Schema Check - Test", () => {
    cy.request("http://localhost:3000/todos")
      .its("body")
      .each((value) => {
        expect(value).to.have.all.keys("id", "title", "completed");
      });
  });

  it("Using Alias Request", function () {
    cy.get("@todos").should((response) => {
      expect(response.body).to.have.length(2);
      expect(response).to.have.property("headers");
      expect(response).to.have.property("duration");
    });
  });
});
