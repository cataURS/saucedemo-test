import inventoryPage from '../support/pages/inventoryPage';
import cartPage from '../support/pages/cartPage';
import checkoutPage from '../support/pages/checkoutPage';
import { TEST_ITEMS, CHECKOUT_INFO, EXPECTED_CART_COUNT } from '../support/fixtures/testValues';

describe('Sauce Demo Regression Test Suite', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.env(['username', 'password']).then(envVars => {
      const username = envVars.username;
      const password = envVars.password;
      cy.login(username, password);
    });
  });

  describe('Negative Flow - Empty Basket', () => {
    it('should handle empty cart navigation appropriately', () => {
      inventoryPage.navigateToCart();
      cartPage.assertCartEmpty();
      cartPage.checkoutButton().should('be.disabled');
    });
  });

  describe('Positive Flow - Full Purchase', () => {
    it('should complete a full purchase flow successfully', () => {
      inventoryPage.addItemToCart(TEST_ITEMS.BACKPACK);
      inventoryPage.addItemToCart(TEST_ITEMS.BIKE_LIGHT);
      inventoryPage.assertCartBadgeCount(EXPECTED_CART_COUNT);
      inventoryPage.navigateToCart();
      cartPage.assertItemInCart(TEST_ITEMS.BACKPACK);
      cartPage.assertItemInCart(TEST_ITEMS.BIKE_LIGHT);
      cartPage.navigateToCheckout();
      checkoutPage.fillCheckoutInformation(CHECKOUT_INFO.FIRST_NAME, CHECKOUT_INFO.LAST_NAME, CHECKOUT_INFO.ZIP_CODE);
      checkoutPage.continueCheckout();
      cy.get('.title').should('contain.text', 'Checkout: Overview');
      // checking also that totals and taxes are calculated correctly
      checkoutPage.assertCalculatedTotals();
      checkoutPage.finishOrder();
      checkoutPage.assertOrderComplete();
    });
  });

  describe('Negative Flow - Missing Fields', () => {
    it('should display error messages for missing checkout fields', () => {
      inventoryPage.addItemToCart('Sauce Labs Backpack');
      inventoryPage.navigateToCart();
      cartPage.navigateToCheckout();

      // continue with missing fields and assert error messages
      checkoutPage.continueCheckout();
      checkoutPage.assertErrorMessage('Error: First Name is required');

      checkoutPage.fillCheckoutInformation('John', '', '');
      checkoutPage.continueCheckout();
      checkoutPage.assertErrorMessage('Error: Last Name is required');

      checkoutPage.fillCheckoutInformation('John', 'Doe', '');
      checkoutPage.continueCheckout();
      checkoutPage.assertErrorMessage('Error: Postal Code is required');
    });
  });

  describe('Positive Flow - Payment Screen', () => {
    xit('should redirect to payment screen after placement', () => {
      // test is skipped because the payment page/step is missing     
      inventoryPage.addItemToCart('Sauce Labs Backpack');
      inventoryPage.navigateToCart();
      cartPage.navigateToCheckout();
      checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      checkoutPage.continueCheckout();
      checkoutPage.finishOrder();
      cy.url().should('include', '/payment');
    });
  });
});