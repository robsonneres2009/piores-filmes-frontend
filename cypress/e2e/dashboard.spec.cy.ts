describe("dashboard spec", () => {
  it("passes", () => {
    cy.visit("https://piores-filmes-frontend.vercel.app");
    cy.contains("1986").should("exist");
    cy.contains("Matthew Vaughn").should("exist");
    cy.contains("Warner Bros.").should("exist");
  });
});
