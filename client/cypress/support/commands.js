// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// How awesome is this ?!
Cypress.Commands.add("setViewport", (size) => {
  if (Cypress._.isArray(size)) {
    cy.viewport(size[0], size[1]);
  } else {
    cy.viewport(size);
  }
});

Cypress.Commands.add("clickLoginBtn", ({ deviceType } = {}) => {
  if (deviceType === "mobileIsh") {
    // Toggle hamburger nav reveals login btn
    cy.get(".NavItem--ToggleNavBtn").click();
    cy.get(".AppNav__Center").within(() => {
      cy.get(".NavItem--LoginBtn").click();
    });
  } else {
    cy.get(".AppNav__Right").within(() => {
      cy.get(".NavItem--LoginBtn").click();
    });
  }
});
