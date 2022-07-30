const {onboarding_page} = require("../selectors/onboarding_page");
const {navigation_menu} = require("../selectors/navigation_menu");
const {bank_accounts_page} = require("../selectors/bank_accounts_page");

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
  bankName: randomizeUserData('Best Bank'),
  routingNumber: generateRandomNumber(9),
  accountNumber: generateRandomNumber(9),
}

describe('UI tests for bank accounts page', () => {

  before (() => {
    cy.visit('/signup')
    cy.signUp(user);
    cy.login(user)
    cy.onboarding(bankInfo)
    cy.logout()
  })

  beforeEach('visiting sign in page', () => {
    cy.visit('/')
  })

  // create new spec file for bank_accounts tests, automate following tests:

  // 1. creates a new bank account
  it('creates a new bank account', () => {
    let bank = {
      bankName: randomizeUserData('Best Bank'),
      routingNumber: generateRandomNumber(9),
      accountNumber: generateRandomNumber(9),
    }
    cy.login(user)
    cy.createBankAccount(bank)
    cy.get(bank_accounts_page.bank_accounts_list)
    .should('be.visible')
    .contains(bank.bankName)
    cy.xpath(bank_accounts_page.deleteBankAccount(bank.bankName))
    .click()
  })

  // 2. should display bank account form errors
  it('creates a new bank account', () => {
    cy.login(user)
    cy.get(navigation_menu.bank_account_btn)
    .click()
    cy.get(bank_accounts_page.create_bank_account_btn)
    .click()
    cy.get(onboarding_page.bank_name_field)
    .type('Bank')
    .blur()
    cy.get(bank_accounts_page.bank_name_required_error)
    .should('be.visible')
    .and("have.text", "Must contain at least 5 characters")
    cy.get(onboarding_page.bank_name_field)
    .clear()
    cy.get(bank_accounts_page.bank_name_required_error)
    .should('be.visible')
    .and("have.text", "Enter a bank name")
    cy.get(onboarding_page.routing_number_field)
    .type('123')
    .blur()
    cy.get(bank_accounts_page.routing_number_required_error)
    .should('be.visible')
    .and("have.text", "Must contain a valid routing number")
    cy.get(onboarding_page.routing_number_field)
    .clear()
    cy.get(bank_accounts_page.routing_number_required_error)
    .should('be.visible')
    .and("have.text", "Enter a valid bank routing number")
    cy.get(onboarding_page.account_number_field)
    .type('123')
    .blur()
    cy.get(bank_accounts_page.account_number_required_error)
    .should('be.visible')
    .and("have.text", "Must contain at least 9 digits")
    cy.get(onboarding_page.account_number_field)
    .clear()
    cy.get(bank_accounts_page.account_number_required_error)
    .should('be.visible')
    .and("have.text", "Enter a valid bank account number")
    cy.get(onboarding_page.save_btn)
    .should('be.disabled')
  })

  // 3. user should be able to delete a bank account
  
  it('creates a new bank account', () => {
    let bank = {
      bankName: randomizeUserData('Best Bank'),
      routingNumber: generateRandomNumber(9),
      accountNumber: generateRandomNumber(9),
    }
    cy.login(user)
    cy.createBankAccount(bank)
    cy.xpath(bank_accounts_page.deleteBankAccount(bank.bankName))
    .click()
    cy.get(bank_accounts_page.bank_accounts_list)
    .contains(`${bank.bankName} (Deleted)`)
  })

  // + create Cypress custom command for user ui_sign_up, ui_login, ui_logout, ui_onboarding
  
  // homework 26.7 // use already existing users from database-seed.json file from app project; password - s3cret
  // 1. navigates to the new transaction form, selects a user and submits a transaction payment
  // 2. navigates to the new transaction form, selects a user and submits a transaction request"
  // 3. displays new transaction errors
  // 4. submits a transaction payment and verifies the deposit for the receiver
  // 5. submits a transaction request and accepts the request for the receiver
  // 6. searches for a user by attribute
})
