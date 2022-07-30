const {sign_in_page} = require("../selectors/sign_in_page");
const {onboarding_page} = require("../selectors/onboarding_page");
const {navigation_menu} = require("../selectors/navigation_menu");

function generateRandomNumber (length) {
  let randomNumber = '';
  let possibleNumbers = '0123456789'
  for (let i = 0; i < length; i++) {
    randomNumber += possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
  }
  return randomNumber;
}

function randomizeUserData(str){
  return str + generateRandomNumber(3);
}

let user = {
  firstName: 'Auto', 
  lastName: 'Tester',
  username: randomizeUserData('autoTester'), 
  password: randomizeUserData('password'),
}

let bankInfo = {
  bankName: 'Best Bank',
  routingNumber: generateRandomNumber(9),
  accountNumber: generateRandomNumber(9),
}

describe('UI tests for sign in page', () => {

  beforeEach('visiting sign in page', () => {
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
    cy.get(sign_in_page.username_field)
    .clear()
    .blur()
    cy.get(sign_in_page.sign_in_btn)
    .should('be.disabled')
  })

  // 7. should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn
  
  it(`should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn`, () => {
    cy.get(sign_in_page.sign_up_link)
    .click()
    cy.location('pathname').should('eq', '/signup')
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
    cy.signUp(user);
    cy.get(sign_in_page.title_text)
    .should('be.visible')
    .and('have.text', 'Sign in')
    cy.login(user)
    cy.onboarding(bankInfo)
    cy.logout()
    cy.get(sign_in_page.title_text)
    .should('be.visible')
    .and('have.text', 'Sign in')
  })


  // 2. should allow a visitor to login

  it('should allow a visitor to login', () => {
    cy.fixture('user_data').its('test_user').then((user) => {
      cy.login(user)
      cy.get(navigation_menu.nav_menu)
      .should('be.visible')
      cy.logout()
    })
  })

  // 3. should allow a visitor to logout

  it('should allow a visitor to logout', () => {
    cy.fixture('user_data').its('test_user').then((user) => {
      cy.login(user)
      cy.logout()
      cy.get(sign_in_page.title_text)
      .should('be.visible')
      .and('have.text', 'Sign in')
    })
  })
  // -----------------------------------

  // Homework 21.07

  // 4. should display login errors

  it("should display login errors", function () {
    cy.get(sign_in_page.username_field)
    .type('user')
    .clear()
    .blur()
    cy.get(sign_in_page.username_required_error)
    .should('be.visible')
    .and("contain", "Username is required")
    cy.get(sign_in_page.password_field)
    .type('abc')
    .blur()
    cy.get(sign_in_page.password_required_error)
    .should('be.visible')
    .and("contain", "Password must contain at least 4 characters")
    
    cy.get(sign_in_page.sign_in_btn)
    .should('be.disabled')
  });

  // 5. should display signup errors

  it("should display signup errors", function () {
    cy.get(sign_in_page.sign_up_link)
    .click()

    cy.get(sign_in_page.first_name_field)
    .type('first')
    .clear()
    .blur()
    cy.get(sign_in_page.first_name_required_error)
    .should('be.visible')
    .and("contain", "First Name is required")

    cy.get(sign_in_page.last_name_field)
    .type('last')
    .clear()
    .blur()
    cy.get(sign_in_page.last_name_required_error)
    .should('be.visible')
    .and("contain", "Last Name is required")

    cy.get(sign_in_page.username_field)
    .type('user')
    .clear()
    .blur()
    cy.get(sign_in_page.username_required_error)
    .should('be.visible')
    .and("contain", "Username is required")

    cy.get(sign_in_page.password_field)
    .type('abc')
    cy.get(sign_in_page.password_required_error)
    .should('be.visible')
    .and("contain", "Password must contain at least 4 characters")
    cy.get(sign_in_page.password_field)
    .clear()
    .blur()
    cy.get(sign_in_page.password_required_error)
    .should('be.visible')
    .and("contain", "Enter your password")

    cy.get(sign_in_page.confirm_password_field)
    .type('abc')
    cy.get(sign_in_page.confirm_passw_required_error)
    .should('be.visible')
    .and("contain", "Password does not match")
    cy.get(sign_in_page.confirm_password_field)
    .clear()
    .blur()
    cy.get(sign_in_page.confirm_passw_required_error)
    .should('be.visible')
    .and("contain", "Confirm your password")

    cy.get(sign_in_page.sign_in_btn)
    .should('be.disabled')
  });

  // 6. should error for an invalid user

  it("should error for an invalid user", function () {
    const invalidUser = {
      username: 'UserName',
      password: 'invalidPa$$word',

    }
    cy.login(invalidUser);

    cy.get(sign_in_page.sign_in_error)
    .should("be.visible")
    .and("have.text", "Username or password is invalid");
  });

  // 7. should error for an invalid password for existing user

  it('should allow a visitor to logout', () => {
    cy.fixture('user_data').its('test_user').then((user) => {
      const notValidUserData = {
        username: user.username,
        password: 'invalidPassword'
      }
      cy.login(notValidUserData)
      cy.get(sign_in_page.sign_in_error)
      .should("be.visible")
      .and("have.text", "Username or password is invalid");
    })
  }) 

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
