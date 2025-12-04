const BasePage = require('./BasePage');

/**
 * AccountCreatedPage - Represents the account created success page
 */
class AccountCreatedPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define page selectors
    this.selectors = {
      pageHeading: 'h2[data-qa="account-created"]',
      successMessage: 'h2 b',
      continueButton: 'a[data-qa="continue-button"]',
      congratsText: '.col-sm-9 > p',
    };
  }

  /**
   * Verify account created page is loaded
   * @returns {Promise<boolean>} True if page is loaded
   */
  async isAccountCreatedPageLoaded() {
    return await this.isVisible(this.selectors.pageHeading);
  }

  /**
   * Get success message
   * @returns {Promise<string>} Success message
   */
  async getSuccessMessage() {
    return await this.getText(this.selectors.pageHeading);
  }

  /**
   * Click continue button
   */
  async clickContinue() {
    await this.click(this.selectors.continueButton);
    await this.waitForPageLoad();
  }

  /**
   * Verify account creation success
   * @returns {Promise<boolean>} True if account created successfully
   */
  async verifyAccountCreated() {
    const message = await this.getSuccessMessage();
    return message.includes('ACCOUNT CREATED');
  }
}

module.exports = AccountCreatedPage;
