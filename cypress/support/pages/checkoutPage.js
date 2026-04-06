class CheckoutPage {
  fillCheckoutInformation(firstName, lastName, zipCode) {
    if (firstName) cy.get('[data-test="firstName"]').clear().type(firstName)
    if (lastName) cy.get('[data-test="lastName"]').clear().type(lastName)
    if (zipCode) cy.get('[data-test="postalCode"]').clear().type(zipCode)
  }

  continueCheckout() {
    cy.get('[data-test="continue"]').click()
  }

  // Function to calculate and assert tax and totals
  assertCalculatedTotals() {
    // Get item prices
    cy.get('.inventory_item_price').then($prices => {
      const prices = Array.from($prices).map(el => parseFloat(el.textContent.replace('$', '')))
      const itemTotal = prices.reduce((sum, price) => sum + price, 0)
      
      // Calculate tax and total
      const tax = itemTotal * 0.08
      const total = itemTotal + tax

      // Get actual values from page and assert
      // Assertion is done with some tollerances since it looks like the app is also rounding tax calculation
      cy.get('.summary_subtotal_label').invoke('text').then(subtotalText => {
        const actualItemTotal = parseFloat(subtotalText.match(/\$([0-9]+\.[0-9]{2})/)[1])
        expect(actualItemTotal).to.be.closeTo(itemTotal, 0.01)
        
        cy.get('.summary_tax_label').invoke('text').then(taxText => {
          const actualTax = parseFloat(taxText.match(/\$([0-9]+\.[0-9]{2})/)[1])
          expect(actualTax).to.be.closeTo(tax, 0.05)
          
          cy.get('.summary_total_label').invoke('text').then(totalText => {
            const actualTotal = parseFloat(totalText.match(/\$([0-9]+\.[0-9]{2})/)[1])
            expect(actualTotal).to.be.closeTo(total, 0.01)
          })
        })
      })
    })
  }

  finishOrder() {
    cy.get('[data-test="finish"]').click()
  }

  assertOrderComplete() {
    cy.get('.complete-header').should('exist')
  }

  assertErrorMessage(message) {
    cy.findByRole('heading', { level: 3 }).should('contain.text', message)
  }
}

export default new CheckoutPage()