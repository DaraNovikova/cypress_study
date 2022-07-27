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
  })

  // Homework 14.07:

  // 1. should show typeable Username field

  it('should show typeable Username field', () => {
    cy.get(sign_in_page.username_field)
    .type('Rick Sanchez')
    .should('have.value', 'Rick Sanchez')
  })

  // 2. should show typeable Password field

  it('should show typeable Password field', () => {
    cy.get(sign_in_page.password_field)
    .type('password123')
    .should('have.value', 'password123')
  })

  // 3. should show Username and Password placeholders

  it('should show Username and Password placeholders', () => {
    cy.get(sign_in_page.username_field)
    .clear()
    .blur()
    cy.get(sign_in_page.username_placeholder)
    .should('have.text', 'Username')
    cy.get(sign_in_page.password_field)
    .clear()
    .blur()
    cy.get(sign_in_page.password_placeholder)
    .should('have.text', 'Password')
  })

 // 4. should show 'Username is required' error if user clicks on it and then click outside this field and didn't enter any value

  it('should show "Username is required" error', () => {
    cy.get(sign_in_page.username_field)
    .clear()
    .click()
    .blur()
    cy.get(sign_in_page.username_required_error)
    .should('be.visible')
    .and("contain", "Username is required")
  })

   // 5. check "Remember me" checkbox

  it('check "Remember me" checkbox', () => {
    cy.get(sign_in_page.remember_me_checkbox)
    .check()
    .should('have.value', 'true')
  })

  // 6. should show disabled by default sign in btn

  it('should show disabled by default sign in btn', () => {
    cy.get(sign_in_page.sign_in_btn)
    .should('be.disabled')
  })

  // 7. should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn
  
  it(`should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn`, () => {
    cy.get(sign_in_page.sign_up_link)
    .click()
    cy.location('pathname').should('eq', '/signup')
    cy.go('back')
  })

  // 8. should show Cypress copyright link that leads to 'https://www.cypress.io/'

  it(`should show Cypress copyright link that leads to 'https://www.cypress.io/'`, () => {
    cy.get(sign_in_page.cypress_copyright_block)
    .should('be.visible')
    .and('have.attr', 'href', 'https://cypress.io')
  })

  // Homework 19.07:

  // 1. should allow a visitor to sign-up

  it('should allow a visitor to sign-up', () => {
    cy.get(sign_in_page.sign_up_link)
    .click()
    cy.get(sign_in_page.title_text)
    .should('be.visible')
    .and('have.text', 'Sign Up')
  })


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
})
