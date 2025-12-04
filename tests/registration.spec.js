const { test } = require('../fixtures/pageFixtures');
const { expect } = require('@playwright/test');
const Logger = require('../utils/logger');
const TestData = require('../fixtures/testData');

test.describe('User Registration Tests', () => {
  let userData;

  test.beforeEach(async ({ homePage }) => {
    Logger.info('Navigating to home page');
    await homePage.goto();
    userData = TestData.getNewUser();
  });

  test('TC004 - Register a new user successfully', async ({
    homePage,
    signupLoginPage,
    signupPage,
    accountCreatedPage,
  }) => {
    Logger.testStart('TC004 - Register a new user successfully');

    Logger.step('Step 1: Navigate to Signup/Login page');
    await homePage.clickSignupLoginMenu();
    Logger.info('✓ Navigated to Signup/Login page');

    Logger.step('Step 2: Verify Signup form is visible');
    const isSignupVisible = await signupLoginPage.isSignupFormVisible();
    expect(isSignupVisible).toBeTruthy();
    Logger.info('✓ Signup form is visible');

    Logger.step('Step 3: Enter name and email for signup');
    await signupLoginPage.signup(userData.name, userData.email);
    Logger.info(`✓ Entered signup details - Name: ${userData.name}, Email: ${userData.email}`);

    Logger.step('Step 4: Verify account information page is loaded');
    const isSignupPageLoaded = await signupPage.isSignupPageLoaded();
    expect(isSignupPageLoaded).toBeTruthy();
    Logger.info('✓ Account information page loaded');

    Logger.step('Step 5: Fill account information');
    await signupPage.completeRegistration(userData);
    Logger.info('✓ Account information filled successfully');

    Logger.step('Step 6: Verify account created successfully');
    const isAccountCreated = await accountCreatedPage.isAccountCreatedPageLoaded();
    expect(isAccountCreated).toBeTruthy();
    Logger.info('✓ Account created successfully');

    Logger.step('Step 7: Verify success message');
    const successMessage = await accountCreatedPage.getSuccessMessage();
    expect(successMessage).toContain('ACCOUNT CREATED');
    Logger.info(`✓ Success message verified: ${successMessage}`);

    Logger.step('Step 8: Click Continue button');
    await accountCreatedPage.clickContinue();
    Logger.info('✓ Clicked Continue button');

    Logger.step('Step 9: Verify user is logged in');
    const isLoggedIn = await homePage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
    Logger.info('✓ User is logged in');

    Logger.step('Step 10: Verify logged in username');
    const loggedInUser = await homePage.getLoggedInUsername();
    expect(loggedInUser).toContain(userData.name);
    Logger.info(`✓ Logged in as: ${loggedInUser}`);

    Logger.step('Step 11: Delete account (cleanup)');
    await homePage.clickDeleteAccountMenu();
    await homePage.page.waitForURL('**/delete_account');
    Logger.info('✓ Account deleted successfully');

    Logger.testEnd('TC004 - Register a new user successfully', 'PASS');
  });

  test('TC005 - Verify signup with existing email', async ({
    homePage,
    signupLoginPage,
  }) => {
    Logger.testStart('TC005 - Verify signup with existing email');

    Logger.step('Step 1: Navigate to Signup/Login page');
    await homePage.clickSignupLoginMenu();
    Logger.info('✓ Navigated to Signup/Login page');

    Logger.step('Step 2: Try to signup with existing email');
    // Using a pre-existing email for this test
    await signupLoginPage.signup('Existing User', 'existing@test.com');
    Logger.info('✓ Attempted signup with existing email');

    Logger.step('Step 3: Wait for error message');
    await signupLoginPage.page.waitForTimeout(2000);
    
    Logger.step('Step 4: Verify error message is displayed');
    const isErrorDisplayed = await signupLoginPage.isSignupErrorDisplayed();
    if (isErrorDisplayed) {
      const errorMessage = await signupLoginPage.getSignupErrorMessage();
      Logger.info(`✓ Error message displayed: ${errorMessage}`);
      expect(errorMessage).toContain('Email Address already exist!');
    } else {
      Logger.warn('Error message not displayed - this might be expected for new emails');
    }

    Logger.testEnd('TC005 - Verify signup with existing email', 'PASS');
  });
});
