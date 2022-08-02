const {transactions_page} = require("../selectors/transactions_page");

function generateRandomText (length) {
    let randomText = '';
    let possibleText = 'abcdefghijklmnqoprstuvwxyz'
    for (let i = 0; i < length; i++) {
      randomText += possibleText[Math.floor(Math.random() * possibleText.length)];
    }
    return randomText;
  }
  
const transaction_description = generateRandomText(5);
  
  describe('UI tests for transactions page', () => {

    beforeEach('visiting sign in page', () => {
      cy.intercept("GET", "/users*").as("usersList");
      cy.visit('/')
    })
  
    // homework 26.7 // use already existing users from database-seed.json file from app project; password - s3cret

    // 1. navigates to the new transaction form, selects a user and submits a transaction payment

    it('navigates to the new transaction form, selects a user and submits a transaction payment', () => {
        cy.fixture('user_data').its('test_user').then((user) => {
          cy.login(user)
        })
        cy.get(transactions_page.new_transaction_btn)
        .click()
        cy.xpath(transactions_page.verifyTransactionStepTitle('Select Contact'))
        .should('be.visible')
        cy.wait('@usersList')
        cy.get(transactions_page.users_search_input)
        .type('Arely')
        cy.get(transactions_page.first_user)
        .click()
        cy.xpath(transactions_page.verifyTransactionStepTitle('Payment'))
        .should('be.visible')
        cy.get(transactions_page.payment_amount_field)
        .type('10')
        cy.get(transactions_page.transaction_description_field)
        .type(transaction_description)
        cy.get(transactions_page.transaction_pay_btn)
        .click()
        cy.xpath(transactions_page.verifyTransactionStepTitle('Complete'))
        .should('be.visible')
        cy.get(transactions_page.success_transaction_message)
        .should("be.visible")
        .and("have.text", "Transaction Submitted!");
    })

  // 2. navigates to the new transaction form, selects a user and submits a transaction request"

  it('navigates to the new transaction form, selects a user and submits a transaction payment', () => {
    cy.fixture('user_data').its('test_user2').then((user) => {
    cy.login(user)
    })
    cy.get(transactions_page.new_transaction_btn)
    .click()
    cy.xpath(transactions_page.verifyTransactionStepTitle('Select Contact'))
    .should('be.visible')
    cy.wait('@usersList')
    cy.get(transactions_page.users_search_input)
    .type('Arely')
    cy.get(transactions_page.first_user)
    .click()
    cy.xpath(transactions_page.verifyTransactionStepTitle('Payment'))
    .should('be.visible')
    cy.get(transactions_page.payment_amount_field)
    .type('10')
    cy.get(transactions_page.transaction_description_field)
    .type(transaction_description)
    cy.get(transactions_page.transaction_request_btn)
    .click()
    cy.xpath(transactions_page.verifyTransactionStepTitle('Complete'))
    .should('be.visible')
    cy.get(transactions_page.success_transaction_message)
    .should("be.visible")
    .and("have.text", "Transaction Submitted!");
})
  // 3. displays new transaction errors
  // 4. submits a transaction payment and verifies the deposit for the receiver
  // 5. submits a transaction request and accepts the request for the receiver
  // 6. searches for a user by attribute

  })
