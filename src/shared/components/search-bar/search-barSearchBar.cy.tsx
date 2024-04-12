import React from "react";
import SearchBar from "./search-bar";

describe("<SearchBar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <SearchBar
        onSearch={function (word: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  });

  it("should call onSearch with the input value when button is clicked", () => {
    const onSearchStub = cy.stub().as("onSearch");

    // Monte o componente SearchBar passando a função onSearch como prop
    cy.mount(<SearchBar onSearch={onSearchStub} />);

    // Insira um valor no campo de entrada
    cy.get("input").type("2023");

    // Clique no botão de pesquisa
    cy.contains("button", "Search").click();

    // Verifique se a função onSearch foi chamada com o valor correto
    cy.get("@onSearch").should("have.been.calledWith", "2023");
  });
});
