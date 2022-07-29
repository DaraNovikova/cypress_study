const {sign_in_page} = require("../selectors/sign_in_page");
const {onboarding_page} = require("../selectors/onboarding_page");
const {navigation_menu} = require("../selectors/navigation_menu");

Cypress.Commands.add("signUp", (user) => {
  cy.get(sign_in_page.first_name_field)
  .type(user.firstName)

  cy.get(sign_in_page.last_name_field)
  .type(user.lastName)
  
  cy.get(sign_in_page.username_field)
  .type(user.username)
  
  cy.get(sign_in_page.password_field)
  .type(user.password)
  
  cy.get(sign_in_page.confirm_password_field)
  .type(user.password)

  cy.get(sign_in_page.sign_in_btn)
  .click()
})

Cypress.Commands.add("login", (user) => {
  cy.get(sign_in_page.username_field)
  .type(user.username)
  
  cy.get(sign_in_page.password_field)
  .type(user.password)

  cy.get(sign_in_page.sign_in_btn)
  .click()
})

Cypress.Commands.add("logout", () => {
  cy.get(navigation_menu.logout_btn)
  .click()
})

Cypress.Commands.add("onboarding", (bankInfo) => {
  cy.get(onboarding_page.next_btn)
  .click()
  cy.get(onboarding_page.bank_name_field)
  .type(bankInfo.bankName)
  cy.get(onboarding_page.routing_number_field)
  .type(bankInfo.routingNumber)
  cy.get(onboarding_page.account_number_field)
  .type(bankInfo.accountNumber)
  cy.get(onboarding_page.save_btn)
  .click()
  cy.get(onboarding_page.done_btn)
  .click()
})
