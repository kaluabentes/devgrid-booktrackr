describe("Finder", () => {
  it("Searchs for book", () => {
    const input = "The Lord Of The Rings";

    cy.visit("http://localhost:3000");
    cy.get("#finder-search-input").type(input).should("have.value", input);
    cy.server();
    cy.route("GET", "http://openlibrary.org/*").as("searchRequest");
    cy.get("#finder-search-button").click();
    cy.wait("@searchRequest").its("status").should("eq", 200);

    expect(true).to.equal(true);
  });
});
