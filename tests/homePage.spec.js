const { test } = require('../fixtures/pageFixtures');
const { expect } = require('@playwright/test');
const Logger = require('../utils/logger');

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.info('Navigating to home page');
    await homePage.goto();
  });

  test('TC001 - Verify home page loads successfully', async ({ homePage }) => {
    Logger.testStart('TC001 - Verify home page loads successfully');
    
    Logger.step('Step 1: Verify home page is loaded');
    const isLoaded = await homePage.isHomePageLoaded();
    expect(isLoaded).toBeTruthy();
    Logger.info('✓ Home page loaded successfully');

    Logger.step('Step 2: Verify page title');
    const title = await homePage.getHomePageTitle();
    expect(title).toContain('Automation Exercise');
    Logger.info(`✓ Page title verified: ${title}`);

    Logger.step('Step 3: Verify carousel is visible');
    const carouselVisible = await homePage.isCarouselVisible();
    expect(carouselVisible).toBeTruthy();
    Logger.info('✓ Carousel is visible');

    Logger.step('Step 4: Verify featured items are displayed');
    const itemsCount = await homePage.getFeaturedItemsCount();
    expect(itemsCount).toBeGreaterThan(0);
    Logger.info(`✓ Featured items count: ${itemsCount}`);

    Logger.testEnd('TC001 - Verify home page loads successfully', 'PASS');
  });

  test('TC002 - Verify navigation menu elements', async ({ homePage }) => {
    Logger.testStart('TC002 - Verify navigation menu elements');

    Logger.step('Step 1: Verify Products menu is visible');
    await homePage.clickProductsMenu();
    await homePage.page.waitForURL('**/products');
    expect(homePage.getCurrentUrl()).toContain('/products');
    Logger.info('✓ Products menu navigation successful');

    Logger.step('Step 2: Navigate back to home');
    await homePage.goto();
    Logger.info('✓ Navigated back to home page');

    Logger.step('Step 3: Verify Cart menu is visible');
    await homePage.clickCartMenu();
    await homePage.page.waitForURL('**/view_cart');
    expect(homePage.getCurrentUrl()).toContain('/view_cart');
    Logger.info('✓ Cart menu navigation successful');

    Logger.step('Step 4: Navigate back to home');
    await homePage.goto();
    Logger.info('✓ Navigated back to home page');

    Logger.step('Step 5: Verify Signup/Login menu is visible');
    await homePage.clickSignupLoginMenu();
    await homePage.page.waitForURL('**/login');
    expect(homePage.getCurrentUrl()).toContain('/login');
    Logger.info('✓ Signup/Login menu navigation successful');

    Logger.testEnd('TC002 - Verify navigation menu elements', 'PASS');
  });

  test('TC003 - Verify newsletter subscription', async ({ homePage }) => {
    Logger.testStart('TC003 - Verify newsletter subscription');

    Logger.step('Step 1: Scroll to footer');
    await homePage.scrollToFooter();
    Logger.info('✓ Scrolled to footer section');

    Logger.step('Step 2: Enter email and subscribe');
    const testEmail = `test_${Date.now()}@automation.com`;
    await homePage.subscribeToNewsletter(testEmail);
    Logger.info(`✓ Subscribed with email: ${testEmail}`);

    Logger.step('Step 3: Verify success message');
    await homePage.page.waitForTimeout(2000); // Wait for subscription to process
    const isSuccessful = await homePage.isSubscriptionSuccessful();
    expect(isSuccessful).toBeTruthy();
    Logger.info('✓ Newsletter subscription successful');

    Logger.testEnd('TC003 - Verify newsletter subscription', 'PASS');
  });
});
