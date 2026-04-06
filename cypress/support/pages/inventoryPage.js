class InventoryPage {
  get cartBadge() {
    return cy.get('.shopping_cart_badge')
  }

  get cartLink() {
    return cy.get('.shopping_cart_link')
  }

  addItemToCart(itemName) {
    cy.contains('.inventory_item', itemName)
      .find('[data-test*="add-to-cart"]')
      .click()
  }

  assertCartBadgeCount(count) {
    this.cartBadge.should('have.text', count.toString())
  }

  navigateToCart() {
    this.cartLink.click()
  }
}

export default new InventoryPage()