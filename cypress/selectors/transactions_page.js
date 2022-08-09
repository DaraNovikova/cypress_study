export const transactions_page = {
    new_transaction_btn: '[data-test="nav-top-new-transaction"]',
    first_user: '[data-test="users-list"] li:first-child',
    users_search_input: '#user-list-search-input',
    payment_amount_field: '#amount',
    amount_required_error: '#transaction-create-amount-input-helper-text',
    transaction_description_field: '#transaction-create-description-input',
    transaction_description_required_error: '#transaction-create-description-input-helper-text',
    transaction_request_btn: '[data-test="transaction-create-submit-request"]',
    transaction_pay_btn: '[data-test="transaction-create-submit-payment"]',
    success_transaction_message: '[data-test="alert-bar-success"]',
    mine_transaction_tab: '[data-test="nav-personal-tab"]',
    mine_transactions: '[data-test*="transaction-item"]',
    transaction_description_text: '[data-test="transaction-description"]',
    accept_request_btn: '[data-test*="transaction-accept-request"]',
 
    verifyTransactionStepTitle(title){ return `//*[text()="${title}"]`},
    verifyUserIsDisplayed(){ return `//*[@data-test="users-list"]/li[1]/div/span`},
}