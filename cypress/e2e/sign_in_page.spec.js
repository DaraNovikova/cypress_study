const {sign_in_page} = require("../selectors/sign_in_page");

describe('UI tests for sign in page', () => {

  before('visiting sign in page', () => {
    cy.visit('/')
  })

  it('should show "Real World App logo"', () => {
    cy.get(sign_in_page.logo_image).should('be.visible').and('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
  })

  it('should show "Sign in" title', () => {
    cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    // cy.get(sign_in_page.get_selector_for_date('some_data')).click()
  })

  // Homework 14.07:
  it('should show typeable Username and Password field', () => {
    cy.get(sign_in_page.username_field)
    .type('Rick Sanchez')
    .should('have.value', 'Rick Sanchez')
    cy.get(sign_in_page.password_field)
    .type('password123')
    .should('have.value', 'password123')
  })
  // 1. should show typeable Username field +
  // 2. should show typeable Password field +
  // 3. should show Username and Password placeholders
  // 4. should show 'Username is required' error if user clicks on it and then click outside this field and didn't enter any value
  // 5. check "Remember me" checkbox
  // 6. should show disabled by default sign in btn
  // 7. should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn
  // 8. should show Cypress copyright link that leads to 'https://www.cypress.io/'
})

  // Homework 19.07:
// 1. should allow a visitor to sign-up
// 2. should allow a visitor to login
// 3. should allow a visitor to logout
// -----------------------------------

// Homework 21.07
// 4. should display login errors
// 5. should display signup errors
// 6. should error for an invalid user
// 7. should error for an invalid password for existing user
//  -------------------------------
// create new spec file for bank_accounts tests, automate following tests:
// 1. creates a new bank account
// 2. should display bank account form errors
// 3. user should be able to delete a bank account

// + create Cypress custom command for user ui_sign_up, ui_login, ui_logout, ui_onboarding

// homework 26.7 // use already existing users from database-seed.json file from app project; password - s3cret
// 1. navigates to the new transaction form, selects a user and submits a transaction payment
// 2. navigates to the new transaction form, selects a user and submits a transaction request"
// 3. displays new transaction errors
// 4. submits a transaction payment and verifies the deposit for the receiver
// 5. submits a transaction request and accepts the request for the receiver
// 6. searches for a user by attribute