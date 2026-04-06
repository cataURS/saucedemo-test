class CartPage {
  get checkoutButton() {
    return cy.get('[data-test="checkout"]')
  }

  assertItemInCart(itemName) {
    cy.get('.inventory_item_name').should('contain.text', itemName)
  }

  navigateToCheckout() {
    this.checkoutButton.click()
  }

  assertCartEmpty() {
    // Check that cart-list parent does not contain any inventory-item children
    cy.get('[data-test="cart-list"]').should('not.contain', '[data-test="inventory-item"]')
  }
}

export default new CartPage()