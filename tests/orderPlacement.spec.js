const { test } = require('../fixtures/pageFixtures');
const { expect } = require('@playwright/test');
const Logger = require('../utils/logger');
const TestData = require('../fixtures/testData');

test.describe('End-to-End Order Placement Tests', () => {
  let userData;
  let paymentData;

  test.beforeEach(async ({ homePage }) => {
    Logger.info('Navigating to home page');
    await homePage.goto();
    userData = TestData.getNewUser();
    paymentData = TestData.getPaymentInfo();
  });

  test('TC013 - Complete order flow - Register, Add to Cart, and Place Order', async ({
    homePage,
    signupLoginPage,
    signupPage,
    accountCreatedPage,
    productsPage,
    cartPage,
    checkoutPage,
    paymentPage,
    orderSuccessPage,
  }) => {
    Logger.testStart('TC013 - Complete order flow');

    // Step 1: Register new user
    Logger.step('Step 1: Register a new user');
    await homePage.clickSignupLoginMenu();
    await signupLoginPage.signup(userData.name, userData.email);
    await signupPage.completeRegistration(userData);
    await accountCreatedPage.clickContinue();
    Logger.info(`✓ User registered successfully: ${userData.email}`);

    // Step 2: Verify user is logged in
    Logger.step('Step 2: Verify user is logged in');
    const isLoggedIn = await homePage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
    Logger.info('✓ User is logged in');

    // Step 3: Add products to cart
    Logger.step('Step 3: Add products to cart');
    await homePage.clickProductsMenu();
    await productsPage.addMultipleProductsToCart(2);
    Logger.info('✓ Added 2 products to cart');

    // Step 4: Navigate to cart and verify
    Logger.step('Step 4: Navigate to cart and verify products');
    await cartPage.goto();
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe(2);
    Logger.info(`✓ Cart verified with ${cartItemsCount} items`);

    // Step 5: Proceed to checkout
    Logger.step('Step 5: Proceed to checkout');
    await cartPage.proceedToCheckout();
    Logger.info('✓ Navigated to checkout page');

    // Step 6: Verify checkout page and address details
    Logger.step('Step 6: Verify checkout page loaded');
    const isCheckoutLoaded = await checkoutPage.isCheckoutPageLoaded();
    expect(isCheckoutLoaded).toBeTruthy();
    Logger.info('✓ Checkout page loaded successfully');

    Logger.step('Step 7: Verify delivery address');
    const isDeliveryAddressVisible = await checkoutPage.isDeliveryAddressVisible();
    expect(isDeliveryAddressVisible).toBeTruthy();
    Logger.info('✓ Delivery address is visible');

    Logger.step('Step 8: Verify invoice address');
    const isInvoiceAddressVisible = await checkoutPage.isInvoiceAddressVisible();
    expect(isInvoiceAddressVisible).toBeTruthy();
    Logger.info('✓ Invoice address is visible');

    // Step 9: Add order comment
    Logger.step('Step 9: Add comment to order');
    const orderComment = TestData.getOrderComment();
    await checkoutPage.addOrderComment(orderComment);
    Logger.info(`✓ Added order comment: ${orderComment}`);

    // Step 10: Place order
    Logger.step('Step 10: Click Place Order button');
    await checkoutPage.placeOrder();
    Logger.info('✓ Clicked Place Order');

    // Step 11: Verify payment page
    Logger.step('Step 11: Verify payment page loaded');
    const isPaymentPageLoaded = await paymentPage.isPaymentPageLoaded();
    expect(isPaymentPageLoaded).toBeTruthy();
    Logger.info('✓ Payment page loaded');

    // Step 12: Fill payment information
    Logger.step('Step 12: Enter payment information');
    await paymentPage.completePayment(paymentData);
    Logger.info('✓ Payment information entered and submitted');

    // Step 13: Verify order success
    Logger.step('Step 13: Verify order placed successfully');
    await orderSuccessPage.page.waitForTimeout(3000);
    const isOrderPlaced = await orderSuccessPage.verifyOrderPlaced();
    expect(isOrderPlaced).toBeTruthy();
    Logger.info('✓ Order placed successfully!');

    Logger.step('Step 14: Verify success message');
    const successMessage = await orderSuccessPage.getSuccessMessage();
    expect(successMessage).toContain('ORDER PLACED');
    Logger.info(`✓ Success message: ${successMessage}`);

    // Step 15: Download invoice (optional)
    Logger.step('Step 15: Download invoice');
    try {
      const download = await orderSuccessPage.downloadInvoice();
      const downloadPath = await download.path();
      Logger.info(`✓ Invoice downloaded to: ${downloadPath}`);
    } catch (error) {
      Logger.warn('Invoice download skipped or not available');
    }

    // Step 16: Continue to home page
    Logger.step('Step 16: Continue to home page');
    await orderSuccessPage.clickContinue();
    Logger.info('✓ Returned to home page');

    // Step 17: Cleanup - Delete account
    Logger.step('Step 17: Delete test account (cleanup)');
    await homePage.clickDeleteAccountMenu();
    await homePage.page.waitForURL('**/delete_account');
    Logger.info('✓ Test account deleted');

    Logger.testEnd('TC013 - Complete order flow', 'PASS');
  });

  test('TC014 - Place order with existing account', async ({
    homePage,
    signupLoginPage,
    signupPage,
    accountCreatedPage,
    productsPage,
    cartPage,
    checkoutPage,
    paymentPage,
    orderSuccessPage,
  }) => {
    Logger.testStart('TC014 - Place order with existing account');

    // Create user first
    Logger.step('Preparation: Create test user account');
    await homePage.clickSignupLoginMenu();
    await signupLoginPage.signup(userData.name, userData.email);
    await signupPage.completeRegistration(userData);
    await accountCreatedPage.clickContinue();
    Logger.info(`✓ Test user created: ${userData.email}`);

    // Logout
    Logger.step('Step 1: Logout');
    await homePage.clickLogoutMenu();
    Logger.info('✓ Logged out');

    // Add products before login
    Logger.step('Step 2: Add products to cart without login');
    await homePage.goto();
    await homePage.clickProductsMenu();
    await productsPage.addProductToCartByIndex(0);
    await productsPage.clickContinueShopping();
    Logger.info('✓ Products added to cart');

    // Go to cart and try checkout
    Logger.step('Step 3: Navigate to cart');
    await cartPage.goto();
    Logger.info('✓ In cart page');

    Logger.step('Step 4: Proceed to checkout (should redirect to login)');
    await cartPage.proceedToCheckout();
    Logger.info('✓ Clicked proceed to checkout');

    // If redirected to login, login
    Logger.step('Step 5: Login with existing account');
    await signupLoginPage.page.waitForTimeout(2000);
    if (signupLoginPage.getCurrentUrl().includes('/login')) {
      await signupLoginPage.login(userData.email, userData.password);
      Logger.info('✓ Logged in successfully');
    } else {
      await cartPage.clickRegisterLoginLink();
      await signupLoginPage.login(userData.email, userData.password);
      Logger.info('✓ Logged in via modal link');
    }

    // Navigate back to cart and checkout
    Logger.step('Step 6: Return to cart and checkout');
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    Logger.info('✓ Proceeded to checkout');

    // Complete checkout
    Logger.step('Step 7: Place order');
    await checkoutPage.placeOrder();
    Logger.info('✓ Placing order');

    Logger.step('Step 8: Complete payment');
    await paymentPage.completePayment(paymentData);
    Logger.info('✓ Payment completed');

    Logger.step('Step 9: Verify order success');
    await orderSuccessPage.page.waitForTimeout(3000);
    const isOrderPlaced = await orderSuccessPage.verifyOrderPlaced();
    expect(isOrderPlaced).toBeTruthy();
    Logger.info('✓ Order placed successfully');

    // Cleanup
    Logger.step('Cleanup: Delete test account');
    await orderSuccessPage.clickContinue();
    await homePage.clickDeleteAccountMenu();
    Logger.info('✓ Test account deleted');

    Logger.testEnd('TC014 - Place order with existing account', 'PASS');
  });
});
