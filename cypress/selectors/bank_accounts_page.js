export const bank_accounts_page = {
    create_bank_account_btn: '[data-test="bankaccount-new"]',
    bank_accounts_list: '[data-test="bankaccount-list"]',
    bank_name_required_error: '#bankaccount-bankName-input-helper-text',
    routing_number_required_error: '#bankaccount-routingNumber-input-helper-text',
    account_number_required_error: '#bankaccount-accountNumber-input-helper-text',

    deleteBankAccount(bankName){ return `//*[text()="${bankName}"]/following::button[1]`}
}