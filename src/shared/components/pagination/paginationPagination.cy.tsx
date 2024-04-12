import React from "react";
import Pagination from "./pagination";

describe("<Pagination />", () => {
  it("renders", () => {
    cy.mount(<Pagination limit={0} selectedPage={0} />);
  });

  it("renders with other params", () => {
    cy.mount(<Pagination limit={5} selectedPage={0} />);
    cy.contains("1");
  });

  it("renders with other params with errors", () => {
    cy.mount(<Pagination limit={5} selectedPage={0} />);
    cy.contains("6").should("not.exist");
  });

  it("renders with other params with errors and other page active", () => {
    cy.mount(<Pagination limit={5} selectedPage={1} />);
    cy.contains("6").should("not.exist");
    cy.contains("2")
      .should("exist")
      .should("have.css", "color", "rgb(255, 255, 255)");
  });
});
