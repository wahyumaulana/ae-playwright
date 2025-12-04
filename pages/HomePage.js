const BasePage = require('./BasePage');

/**
 * HomePage - Represents the home page of AutomationExercise
 */
class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define page selectors
    this.selectors = {
      logo: '.logo',
      homeMenu: 'a[href="/"]',
      productsMenu: 'a[href="/products"]',
      cartMenu: 'a[href="/view_cart"]',
      signupLoginMenu: 'a[href="/login"]',
      logoutMenu: 'a[href="/logout"]',
      deleteAccountMenu: 'a[href="/delete_account"]',
      loggedInUser: 'a:has-text("Logged in as")',
      carousel: '#slider-carousel',
      featuredItems: '.features_items',
      productItem: '.product-image-wrapper',
      subscriptionEmail: '#susbscribe_email',
      subscriptionButton: '#subscribe',
      categoryProducts: '.category-products',
      footer: 'footer',
    };
  }

  /**
   * Navigate to home page
   */
  async goto() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  /**
   * Verify home page is loaded
   * @returns {Promise<boolean>} True if home page is loaded
   */
  async isHomePageLoaded() {
    return await this.isVisible(this.selectors.logo);
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title
   */
  async getHomePageTitle() {
    return await this.getTitle();
  }

  /**
   * Verify home page title
   * @returns {Promise<boolean>} True if title matches
   */
  async verifyHomePageTitle() {
    const title = await this.getTitle();
    return title.includes('Automation Exercise');
  }

  /**
   * Click on Products menu
   */
  async clickProductsMenu() {
    await this.click(this.selectors.productsMenu);
  }

  /**
   * Click on Cart menu
   */
  async clickCartMenu() {
    await this.click(this.selectors.cartMenu);
  }

  /**
   * Click on Signup/Login menu
   */
  async clickSignupLoginMenu() {
    await this.click(this.selectors.signupLoginMenu);
  }

  /**
   * Click on Logout menu
   */
  async clickLogoutMenu() {
    await this.click(this.selectors.logoutMenu);
  }

  /**
   * Click on Delete Account menu
   */
  async clickDeleteAccountMenu() {
    await this.click(this.selectors.deleteAccountMenu);
  }

  /**
   * Check if user is logged in
   * @returns {Promise<boolean>} True if user is logged in
   */
  async isUserLoggedIn() {
    return await this.isVisible(this.selectors.loggedInUser);
  }

  /**
   * Get logged in username
   * @returns {Promise<string>} Username
   */
  async getLoggedInUsername() {
    const text = await this.getText(this.selectors.loggedInUser);
    return text.replace('Logged in as ', '').trim();
  }

  /**
   * Verify carousel is visible
   * @returns {Promise<boolean>} True if carousel is visible
   */
  async isCarouselVisible() {
    return await this.isVisible(this.selectors.carousel);
  }

  /**
   * Get count of featured items
   * @returns {Promise<number>} Count of products
   */
  async getFeaturedItemsCount() {
    return await this.getElementCount(this.selectors.productItem);
  }

  /**
   * Subscribe to newsletter
   * @param {string} email - Email address
   */
  async subscribeToNewsletter(email) {
    await this.scrollToElement(this.selectors.footer);
    await this.fill(this.selectors.subscriptionEmail, email);
    await this.click(this.selectors.subscriptionButton);
  }

  /**
   * Verify subscription success message
   * @returns {Promise<boolean>} True if success message is visible
   */
  async isSubscriptionSuccessful() {
    const successMessage = '#success-subscribe';
    return await this.isVisible(successMessage);
  }

  /**
   * Scroll to top of page
   */
  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  /**
   * Scroll to footer
   */
  async scrollToFooter() {
    await this.scrollToElement(this.selectors.footer);
  }
}

module.exports = HomePage;
