const { test } = require('../fixtures/pageFixtures');
const { expect } = require('@playwright/test');
const Logger = require('../utils/logger');
const TestData = require('../fixtures/testData');

test.describe('User Login Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.info('Navigating to home page');
    await homePage.goto();
  });

  test('TC006 - Login with valid credentials', async ({
    homePage,
    signupLoginPage,
    signupPage,
    accountCreatedPage,
  }) => {
    Logger.testStart('TC006 - Login with valid credentials');

    // First, create a new user for this test
    Logger.step('Preparation: Create a test user account');
    const userData = TestData.getNewUser();
    
    await homePage.clickSignupLoginMenu();
    await signupLoginPage.signup(userData.name, userData.email);
    await signupPage.completeRegistration(userData);
    await accountCreatedPage.clickContinue();
    Logger.info(`✓ Test user created: ${userData.email}`);

    Logger.step('Step 1: Logout from current session');
    await homePage.clickLogoutMenu();
    await homePage.page.waitForURL('**/login');
    Logger.info('✓ Logged out successfully');

    Logger.step('Step 2: Verify Login form is visible');
    const isLoginVisible = await signupLoginPage.isLoginFormVisible();
    expect(isLoginVisible).toBeTruthy();
    Logger.info('✓ Login form is visible');

    Logger.step('Step 3: Enter valid credentials and login');
    await signupLoginPage.login(userData.email, userData.password);
    Logger.info(`✓ Logged in with email: ${userData.email}`);

    Logger.step('Step 4: Verify user is logged in');
    const isLoggedIn = await homePage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
    Logger.info('✓ User successfully logged in');

    Logger.step('Step 5: Verify logged in username');
    const loggedInUser = await homePage.getLoggedInUsername();
    expect(loggedInUser).toContain(userData.name);
    Logger.info(`✓ Logged in as: ${loggedInUser}`);

    Logger.step('Cleanup: Delete test account');
    await homePage.clickDeleteAccountMenu();
    await homePage.page.waitForURL('**/delete_account');
    Logger.info('✓ Test account deleted');

    Logger.testEnd('TC006 - Login with valid credentials', 'PASS');
  });

  test('TC007 - Login with invalid credentials', async ({
    homePage,
    signupLoginPage,
  }) => {
    Logger.testStart('TC007 - Login with invalid credentials');

    Logger.step('Step 1: Navigate to Login page');
    await homePage.clickSignupLoginMenu();
    Logger.info('✓ Navigated to Login page');

    Logger.step('Step 2: Verify Login form is visible');
    const isLoginVisible = await signupLoginPage.isLoginFormVisible();
    expect(isLoginVisible).toBeTruthy();
    Logger.info('✓ Login form is visible');

    Logger.step('Step 3: Enter invalid credentials');
    const invalidCreds = TestData.getInvalidCredentials();
    await signupLoginPage.login(invalidCreds.email, invalidCreds.password);
    Logger.info(`✓ Attempted login with invalid credentials: ${invalidCreds.email}`);

    Logger.step('Step 4: Verify error message is displayed');
    await signupLoginPage.page.waitForTimeout(2000);
    const isErrorDisplayed = await signupLoginPage.isLoginErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    Logger.info('✓ Error message displayed');

    Logger.step('Step 5: Verify error message text');
    const errorMessage = await signupLoginPage.getLoginErrorMessage();
    expect(errorMessage).toContain('Your email or password is incorrect!');
    Logger.info(`✓ Error message verified: ${errorMessage}`);

    Logger.testEnd('TC007 - Login with invalid credentials', 'PASS');
  });

  test('TC008 - Logout functionality', async ({
    homePage,
    signupLoginPage,
    signupPage,
    accountCreatedPage,
  }) => {
    Logger.testStart('TC008 - Logout functionality');

    // Create and login with a test user
    Logger.step('Preparation: Create and login with test user');
    const userData = TestData.getNewUser();
    
    await homePage.clickSignupLoginMenu();
    await signupLoginPage.signup(userData.name, userData.email);
    await signupPage.completeRegistration(userData);
    await accountCreatedPage.clickContinue();
    Logger.info(`✓ Test user created and logged in: ${userData.email}`);

    Logger.step('Step 1: Verify user is logged in');
    const isLoggedIn = await homePage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
    Logger.info('✓ User is logged in');

    Logger.step('Step 2: Click Logout button');
    await homePage.clickLogoutMenu();
    Logger.info('✓ Clicked Logout button');

    Logger.step('Step 3: Verify redirected to login page');
    await homePage.page.waitForURL('**/login');
    expect(homePage.getCurrentUrl()).toContain('/login');
    Logger.info('✓ Redirected to login page');

    Logger.step('Step 4: Verify login form is visible');
    const isLoginFormVisible = await signupLoginPage.isLoginFormVisible();
    expect(isLoginFormVisible).toBeTruthy();
    Logger.info('✓ Login form is visible - logout successful');

    Logger.step('Cleanup: Login and delete test account');
    await signupLoginPage.login(userData.email, userData.password);
    await homePage.clickDeleteAccountMenu();
    Logger.info('✓ Test account deleted');

    Logger.testEnd('TC008 - Logout functionality', 'PASS');
  });
});
