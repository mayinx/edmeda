// import { cy } from "gender-detection/genders/male";

// uh. ah. awesome. tets multiple viewports in one go.
// TODO: Find reasonble presets - for now this must suffice
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

      cy.visit("http://localhost:3000");

      cy.get("nav.AppNav")
        .should("be.visible")
        .within(() => {
          cy.get("#app_logo").should("be.visible");
          cy.get(".NavItem--ToggleNavBtn").should("be.visible");
          cy.get(".AppNav__Center").should("not.be.visible");
          cy.get(".NavItem--LoginBtn").should("not.be.visible");
          cy.get(".NavItem--LoginBtn").should("not.be.visible");
        });

      // Toggle hamburger nav revelas call to action btns for login+ ignup
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

      // Toggle hamburger nav again jidescta-btns
      cy.get(".NavItem--ToggleNavBtn").should("be.visible");
      cy.get(".NavItem--ToggleNavBtn").click();
      cy.get(".AppNav__Center")
        .should("not.be.visible")
        .within(() => {
          cy.get(".NavItem--LoginBtn").should("not.be.visible");
          cy.get(".NavItem--LoginBtn").should("not.be.visible");
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

      cy.visit("http://localhost:3000");

      cy.get("nav.AppNav")
        .should("be.visible")
        .within(() => {
          cy.get("#app_logo").should("be.visible");
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
    });
  });
});
