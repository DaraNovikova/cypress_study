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
      cy.intercept("GET", "/transactions").as("personalTransactions");
      cy.intercept("PATCH", "/transactions/*").as("updateTransaction");
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
    .type('Edgar')
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

  it('displays new transaction errors', () => {
    cy.fixture('user_data').its('test_user2').then((user) => {
    cy.login(user)
    })
    cy.get(transactions_page.new_transaction_btn)
    .click()
    cy.wait('@usersList')
    cy.get(transactions_page.users_search_input)
    .type('Edgar')
    cy.get(transactions_page.first_user)
    .click()
    cy.get(transactions_page.payment_amount_field)
    .type('10')
    .clear()
    .blur();
    cy.get(transactions_page.amount_required_error)
    .should("be.visible")
    .and("contain", "Please enter a valid amount");
    cy.get(transactions_page.transaction_description_field)
    .type(transaction_description)
    .clear()
    .blur();
    cy.get(transactions_page.transaction_description_required_error)
    .should("be.visible")
    .and("contain", "Please enter a note");
    cy.get(transactions_page.transaction_pay_btn)
    .should("be.disabled");
    cy.get(transactions_page.transaction_request_btn)
    .should("be.disabled");
    
})

  // 4. submits a transaction payment and verifies the deposit for the receiver

  it('submits a transaction payment and verifies the deposit for the receiver', () => {
    cy.fixture('user_data').its('test_user2').then((user) => {
      cy.login(user)
    })
    let startBalance;
    cy.get("[data-test=sidenav-user-balance]")
        .invoke("text")
        .then((x) => {
          startBalance = +x
          .replace(',', '')
          .match(/[\d.]+/g)[0];
        })
    cy.logout()
    cy.fixture('user_data').its('test_user').then((user) => {
      cy.login(user)
    })  
    cy.get(transactions_page.new_transaction_btn)
    .click()
    cy.wait('@usersList')
    cy.get(transactions_page.users_search_input)
    .type('Arely')
    cy.get(transactions_page.first_user)
    .click()
    cy.get(transactions_page.payment_amount_field)
    .type('10')
    cy.get(transactions_page.transaction_description_field)
    .type(transaction_description)
    cy.get(transactions_page.transaction_request_btn)
    .click()
    cy.get(transactions_page.success_transaction_message)
    .should("be.visible")
    .and("have.text", "Transaction Submitted!");
    cy.logout()
    cy.fixture('user_data').its('test_user2').then((user) => {
      cy.login(user)
    })

    let newBalance;
    cy.get("[data-test=sidenav-user-balance]")
        .invoke("text")
        .then((x) => {
          newBalance = +x
          .replace(',', '')
          .match(/[\d.]+/g)[0];
          console.log(startBalance)
          console.log(newBalance)
          expect(newBalance).to.be.equal(startBalance + 10);
        })
})
  // 5. submits a transaction request and accepts the request for the receiver

  it('submits a transaction request and accepts the request for the receiver', () => {
    cy.fixture('user_data').its('test_user2').then((user) => {
      cy.login(user)
    }) 
    let startBalance;
    cy.get("[data-test=sidenav-user-balance]")
        .invoke("text")
        .then((x) => {
          startBalance = +x
          .replace(',', '')
          .match(/[\d.]+/g)[0];
    }) 
    cy.get(transactions_page.new_transaction_btn)
    .click()
    cy.wait('@usersList')
    cy.get(transactions_page.users_search_input)
    .type('Edgar')
    cy.get(transactions_page.first_user)
    .click()
    cy.get(transactions_page.payment_amount_field)
    .type('10')
    cy.get(transactions_page.transaction_description_field)
    .type(transaction_description)
    cy.get(transactions_page.transaction_request_btn)
    .click()
    cy.get(transactions_page.success_transaction_message)
    .should("be.visible")
    .and("have.text", "Transaction Submitted!");
    cy.logout()
    cy.fixture('user_data').its('test_user').then((user) => {
      cy.login(user)
    })

    cy.get(transactions_page.mine_transaction_tab).click();
    cy.wait("@personalTransactions");
    cy.get(transactions_page.mine_transactions)
    .first()
    .click({ force: true });

    cy.get(transactions_page.transaction_description_text)
    .should("contain", transaction_description)
    cy.get(transactions_page.accept_request_btn)
    .click();
    cy.wait("@updateTransaction").its("response.statusCode").should("eq", 204);
    cy.logout()
    cy.fixture('user_data').its('test_user2').then((user) => {
      cy.login(user)
    })
    let newBalance;
    cy.get("[data-test=sidenav-user-balance]")
        .invoke("text")
        .then((x) => {
          newBalance = +x
          .replace(',', '')
          .match(/[\d.]+/g)[0];
          console.log(startBalance)
          console.log(newBalance)
          expect(newBalance).to.be.equal(startBalance + 10);
        })
})

  // 6. searches for a user by attribute
  it('searches for a user by attribute', () => {
    const searchUser =  'Edgar Johns';
    cy.fixture('user_data').its('test_user2').then((user) => {
    cy.login(user)
    })
    cy.get(transactions_page.new_transaction_btn)
    .click()
    cy.xpath(transactions_page.verifyTransactionStepTitle('Select Contact'))
    .should('be.visible')
    cy.wait('@usersList')
    cy.fixture('user_data').its('test_user').then((user2) => {
      cy.get(transactions_page.users_search_input)
      .type(user2.firstName)
      cy.xpath(transactions_page.verifyUserIsDisplayed())
      .should('have.text', searchUser)
      cy.get(transactions_page.users_search_input).clear()
      cy.get(transactions_page.users_search_input)
      .type(user2.lastName)
      cy.xpath(transactions_page.verifyUserIsDisplayed())
      .should('have.text', searchUser)
      cy.get(transactions_page.users_search_input).clear()
      cy.get(transactions_page.users_search_input)
      .type(user2.username)
      cy.xpath(transactions_page.verifyUserIsDisplayed())
      .should('have.text', searchUser)
    })
})

  })
