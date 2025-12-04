const BasePage = require('./BasePage');

/**
 * OrderSuccessPage - Represents the order success confirmation page
 */
class OrderSuccessPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define page selectors
    this.selectors = {
      successMessage: 'p[style*="color: green"]',
      orderPlacedText: 'h2[data-qa="order-placed"] b',
      congratsMessage: '.col-sm-9 p',
      continueButton: 'a[data-qa="continue-button"]',
      downloadInvoiceButton: 'a[href="/download_invoice/"]',
    };
  }

  /**
   * Verify order success page is loaded
   * @returns {Promise<boolean>} True if page is loaded
   */
  async isOrderSuccessPageLoaded() {
    return await this.isVisible(this.selectors.orderPlacedText);
  }

  /**
   * Get success message
   * @returns {Promise<string>} Success message
   */
  async getSuccessMessage() {
    return await this.getText(this.selectors.orderPlacedText);
  }

  /**
   * Verify order placed successfully
   * @returns {Promise<boolean>} True if order placed
   */
  async verifyOrderPlaced() {
    const message = await this.getSuccessMessage();
    return message.includes('ORDER PLACED');
  }

  /**
   * Click continue button
   */
  async clickContinue() {
    await this.click(this.selectors.continueButton);
    await this.waitForPageLoad();
  }

  /**
   * Download invoice
   */
  async downloadInvoice() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.click(this.selectors.downloadInvoiceButton),
    ]);
    return download;
  }

  /**
   * Verify success message is visible
   * @returns {Promise<boolean>} True if message is visible
   */
  async isSuccessMessageVisible() {
    return await this.isVisible(this.selectors.successMessage);
  }

  /**
   * Get congratulations message
   * @returns {Promise<string>} Congratulations message
   */
  async getCongratsMessage() {
    return await this.getText(this.selectors.congratsMessage);
  }
}

module.exports = OrderSuccessPage;
