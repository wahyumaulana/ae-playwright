const { test } = require('../fixtures/pageFixtures');
const { expect } = require('@playwright/test');
const Logger = require('../utils/logger');

test.describe('Products and Cart Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.info('Navigating to home page');
    await homePage.goto();
  });

  test('TC009 - Verify products page and add products to cart', async ({
    homePage,
    productsPage,
    cartPage,
  }) => {
    Logger.testStart('TC009 - Verify products page and add products to cart');

    Logger.step('Step 1: Navigate to Products page');
    await homePage.clickProductsMenu();
    Logger.info('✓ Navigated to Products page');

    Logger.step('Step 2: Verify products page is loaded');
    const isLoaded = await productsPage.isProductsPageLoaded();
    expect(isLoaded).toBeTruthy();
    Logger.info('✓ Products page loaded successfully');

    Logger.step('Step 3: Verify products are displayed');
    const productsCount = await productsPage.getProductsCount();
    expect(productsCount).toBeGreaterThan(0);
    Logger.info(`✓ Total products displayed: ${productsCount}`);

    Logger.step('Step 4: Add first product to cart');
    await productsPage.addProductToCartByIndex(0);
    Logger.info('✓ First product added to cart');

    Logger.step('Step 5: Click Continue Shopping');
    await productsPage.clickContinueShopping();
    Logger.info('✓ Clicked Continue Shopping');

    Logger.step('Step 6: Add second product to cart');
    await productsPage.addProductToCartByIndex(1);
    Logger.info('✓ Second product added to cart');

    Logger.step('Step 7: Click View Cart');
    await productsPage.clickViewCart();
    Logger.info('✓ Navigated to Cart page');

    Logger.step('Step 8: Verify cart page is loaded');
    const isCartLoaded = await cartPage.isCartPageLoaded();
    expect(isCartLoaded).toBeTruthy();
    Logger.info('✓ Cart page loaded successfully');

    Logger.step('Step 9: Verify both products are in cart');
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe(2);
    Logger.info(`✓ Cart contains ${cartItemsCount} items`);

    Logger.step('Step 10: Verify product details');
    for (let i = 0; i < cartItemsCount; i++) {
      const productDetails = await cartPage.getProductDetails(i);
      Logger.info(`Product ${i + 1}: ${productDetails.name} - ${productDetails.price}`);
      expect(productDetails.name).toBeTruthy();
      expect(productDetails.price).toBeTruthy();
    }
    Logger.info('✓ All product details verified');

    Logger.testEnd('TC009 - Verify products page and add products to cart', 'PASS');
  });

  test('TC010 - Verify product quantity in cart', async ({
    homePage,
    productsPage,
    cartPage,
  }) => {
    Logger.testStart('TC010 - Verify product quantity in cart');

    Logger.step('Step 1: Navigate to Products page');
    await homePage.clickProductsMenu();
    Logger.info('✓ Navigated to Products page');

    Logger.step('Step 2: View first product details');
    await productsPage.viewProductDetailsByIndex(0);
    Logger.info('✓ Viewed product details');

    Logger.step('Step 3: Increase product quantity');
    // On product detail page, update quantity
    await productsPage.page.fill('#quantity', '4');
    Logger.info('✓ Updated quantity to 4');

    Logger.step('Step 4: Add product to cart');
    await productsPage.page.click('button.cart');
    Logger.info('✓ Added product to cart');

    Logger.step('Step 5: View cart');
    await productsPage.clickViewCart();
    Logger.info('✓ Navigated to cart');

    Logger.step('Step 6: Verify product quantity is 4');
    const productDetails = await cartPage.getProductDetails(0);
    expect(productDetails.quantity.trim()).toBe('4');
    Logger.info(`✓ Product quantity verified: ${productDetails.quantity}`);

    Logger.testEnd('TC010 - Verify product quantity in cart', 'PASS');
  });

  test('TC011 - Remove products from cart', async ({
    homePage,
    productsPage,
    cartPage,
  }) => {
    Logger.testStart('TC011 - Remove products from cart');

    Logger.step('Step 1: Add products to cart');
    await homePage.clickProductsMenu();
    await productsPage.addMultipleProductsToCart(2);
    Logger.info('✓ Added 2 products to cart');

    Logger.step('Step 2: Navigate to cart');
    await cartPage.goto();
    Logger.info('✓ Navigated to cart page');

    Logger.step('Step 3: Verify products are in cart');
    let itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(2);
    Logger.info(`✓ Cart has ${itemsCount} items`);

    Logger.step('Step 4: Remove first product');
    await cartPage.removeProductByIndex(0);
    Logger.info('✓ Removed first product from cart');

    Logger.step('Step 5: Verify product is removed');
    await cartPage.page.waitForTimeout(2000);
    itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(1);
    Logger.info(`✓ Cart now has ${itemsCount} item`);

    Logger.step('Step 6: Remove remaining product');
    await cartPage.removeProductByIndex(0);
    Logger.info('✓ Removed last product from cart');

    Logger.step('Step 7: Verify cart is empty');
    await cartPage.page.waitForTimeout(2000);
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeTruthy();
    Logger.info('✓ Cart is now empty');

    Logger.testEnd('TC011 - Remove products from cart', 'PASS');
  });

  test('TC012 - Search product functionality', async ({ homePage, productsPage }) => {
    Logger.testStart('TC012 - Search product functionality');

    Logger.step('Step 1: Navigate to Products page');
    await homePage.clickProductsMenu();
    Logger.info('✓ Navigated to Products page');

    Logger.step('Step 2: Search for product');
    const searchTerm = 'Dress';
    await productsPage.searchProduct(searchTerm);
    Logger.info(`✓ Searched for: ${searchTerm}`);

    Logger.step('Step 3: Verify search results');
    await productsPage.page.waitForTimeout(2000);
    const heading = await productsPage.getPageHeading();
    expect(heading).toContain('SEARCHED PRODUCTS');
    Logger.info('✓ Search results page loaded');

    Logger.step('Step 4: Verify products are displayed');
    const productsCount = await productsPage.getProductsCount();
    expect(productsCount).toBeGreaterThan(0);
    Logger.info(`✓ Found ${productsCount} products matching search`);

    Logger.testEnd('TC012 - Search product functionality', 'PASS');
  });
});
