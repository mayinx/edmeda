// Device sizes to simulate different viewports / breakpoints
// TODO: Find reasonble presets here - for now this must suffice
const smallDevices = ["iphone-4", "samsung-s10", "ipad-2"];
const largerDevices = [[800, 1280], [1024, 768], "macbook-13"];

describe("The Public Edmeda Landing Page with accessible Login- & Signup-Options", () => {
  smallDevices.forEach((size) => {
    it(`Should load successfully on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }

      cy.visit("/");

      cy.get("nav.AppNav")
        .should("be.visible")
        .within(() => {
          cy.get("#app_logo").should("be.visible");
          cy.get(".NavItem--ToggleNavBtn").should("be.visible");
          cy.get(".AppNav__Center").should("not.be.visible");
          cy.get(".NavItem--LoginBtn").should("not.be.visible");
          cy.get(".NavItem--SignUpBtn").should("not.be.visible");
        });

      // Toggle hamburger nav reveals call to action btns for login + signup
      cy.get(".NavItem--ToggleNavBtn").click();
      cy.get(".AppNav__Center")
        .should("be.visible")
        .within(() => {
          cy.get(".NavItem--LoginBtn")
            .should("be.visible")
            .within(() => {
              cy.get("span").should("contain.text", "Login");
            });
          cy.get(".NavItem--SignUpBtn")
            .should("be.visible")
            .within(() => {
              cy.get("span").should("contain.text", "Get Started");
            });
        });

      // Toggle hamburger nav again / hide cta-btns
      cy.get(".NavItem--ToggleNavBtn").should("be.visible");
      cy.get(".NavItem--ToggleNavBtn").click();
      cy.get(".AppNav__Center")
        .should("not.be.visible")
        .within(() => {
          cy.get(".NavItem--LoginBtn").should("not.be.visible");
          cy.get(".NavItem--SignUpBtn").should("not.be.visible");
        });
    });
  });

  largerDevices.forEach((size) => {
    it(`Should load successfully on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }

      cy.visit("/");

      cy.get("nav.AppNav")
        .should("be.visible")
        .within(() => {
          cy.get("#app_logo").should("be.visible");
          cy.get(".AppNav__Right .NavItem--LoginBtn")
            .should("be.visible")
            .within(() => {
              cy.get("span").should("contain.text", "Login");
            });
          cy.get(".AppNav__Right .NavItem--SignUpBtn")
            .should("be.visible")
            .within(() => {
              cy.get("span").should("contain.text", "Get Started");
            });
        });
    });
  });
});
