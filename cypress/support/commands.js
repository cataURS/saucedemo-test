import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/')
  cy.findByPlaceholderText('Username').type(username)
  cy.findByPlaceholderText('Password').type(password)
  cy.findByRole('button', { name: /login/i }).click()
})

Cypress.Commands.add('addItemToCart', (itemName) => {
  cy.findByText(itemName)
    .parent()
    .findByRole('button', { name: /add to cart/i })
    .click()
})