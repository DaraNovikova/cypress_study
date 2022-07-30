export const transactions_page = {
    new_transaction_btn: '[data-test="nav-top-new-transaction"]',
    first_user: '[data-test="users-list"] li:first-child',
    users_search_input: '#user-list-search-input',
    payment_amount_field: '#amount',
    transaction_description_field: '#transaction-create-description-input',
    transaction_request_btn: '[data-test="transaction-create-submit-request"]',
    transaction_pay_btn: '[data-test="transaction-create-submit-payment"]',
    success_transaction_message: '[data-test="alert-bar-success"]',

    verifyTransactionStepTitle(title){ return `//*[text()="${title}"]`}
}