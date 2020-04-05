const input = "The Lord Of The Rings";

const shouldTypeSearch = () => {
  cy.get("#finder-search-input").type(input).should("have.value", input);
};

const shouldMakeRequestOn = (action) => {
  cy.server();

  cy.route("GET", "http://openlibrary.org/*").as("searchRequest");

  action();

  cy.wait("@searchRequest").its("status").should("eq", 200);
};

describe("Finder", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Searchs for a book when click the button search", () => {
    shouldTypeSearch();
    shouldMakeRequestOn(() => cy.get("#finder-search-button").click());
  });

  it("Searchs for a book when type enter", () => {
    shouldMakeRequestOn(() =>
      cy.get("#finder-search-input").type(input).type("{enter}")
    );
  });

  it("Adds a book to user library", () => {
    shouldMakeRequestOn(() =>
      cy.get("#finder-search-input").type(input).type("{enter}")
    );

    cy.get(".book-result-item button").eq(0).click();
    cy.get(".book-result-item--added");
  });
});
