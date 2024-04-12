describe("dashboard spec", () => {
  it("passes", () => {
    cy.visit("https://piores-filmes-frontend.vercel.app");
    cy.contains("1986").should("exist");
    cy.contains("Matthew Vaughn").should("exist");
    cy.contains("Warner Bros.").should("exist");

    cy.get("input").type("1980");
    cy.contains("button", "Search").click();

    cy.contains("Can't Stop the Music").should("exist");
  });
});
