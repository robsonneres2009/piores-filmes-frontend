describe("list spec", () => {
  it("passes", () => {
    cy.visit("https://piores-filmes-frontend.vercel.app/list");
    cy.contains("Can't Stop the Music").should("exist");

    cy.get("input").type("1981");
    cy.get("input").blur();

    cy.contains("1982").should("not.exist");

    cy.get("select").select("Yes");
    cy.contains("Mommie Dearest").should("exist");
    cy.contains("Heaven's Gate").should("not.exist");
  });
});
