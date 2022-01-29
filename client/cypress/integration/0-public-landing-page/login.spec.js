// FYI: Tests successful login attempts
//
// TODO: Test invalid accounts / logn attempts next

// Device types and sizes to simulate different viewports / breakpoints
// TODO: Find reasonble presets here - for now this must suffice
const devices = {
  mobileIsh: ["iphone-4", "samsung-s10", "ipad-2"],
  desktopIsh: [[800, 1280], [1024, 768], "macbook-13"],
};

// Holds valid accounts for login (previously seeded)
// TODO: DRY this up / auto sync these with the seed data used in the backend /
// check Cypress-best-practices for seed/dummy-data
const validAccounts = [
  {
    fullName: "Chuck Bartowski",
    firstName: "Chuck",
    email: "chuck@nerdherd.com",
    password: "Chuck99",
  },
  {
    fullName: "Ellie Bartowski",
    firstName: "Ellie",
    email: "ellie@nerdherd.com",
    password: "Ellie99",
  },
];

Cypress.Commands.add("loginAndAssertSuccess", ({ user, deviceType } = {}) => {
  cy.clickLoginBtn({ deviceType });

  // fillin form and submit
  cy.get(".LoginModal").within(() => {
    cy.get("input#email").type(user.email);
    cy.get("input#password").type(user.password);
    cy.get("button#loginBtn").click();
  });

  // User successfully logged in?
  cy.location("pathname").should("eq", "/communities");
  cy.get(".Toastify #success")
    .should("be.visible")
    .within(() => {
      cy.get("h3").should("contain.text", "Login successfull");
      cy.get("h3 ~ div").should(
        "contain.text",
        `Welcome to Edmeda, ${user.firstName} - happy socializing!`
      );
    });
});

describe("Login with pre-seeded dummy accounts", () => {
  validAccounts.forEach((user) => {
    Object.entries(devices).forEach(([deviceType, sizes]) => {
      sizes.forEach((size) => {
        it(`${user.fullName} should login successfully on ${size} screen`, () => {
          cy.setViewport(size);
          cy.visit("/");
          cy.loginAndAssertSuccess({ user: user, deviceType: deviceType });
        });
      });
    });
  });
});
