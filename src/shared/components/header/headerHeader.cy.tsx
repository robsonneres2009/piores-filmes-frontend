import React from "react";
import Header from "./header";

describe("<Header />", () => {
  it("renders", () => {
    cy.mount(<Header />);
  });
  it("search text", () => {
    cy.mount(<Header />);
    cy.contains("Frontend React Test");
  });
});
