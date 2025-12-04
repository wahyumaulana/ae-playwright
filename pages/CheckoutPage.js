const BasePage = require('./BasePage');

/**
 * CheckoutPage - Represents the checkout page
 */
class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define page selectors
    this.selectors = {
      addressDetails: '#address_delivery',
      invoiceAddress: '#address_invoice',
      reviewOrder: '#cart_info',
      commentTextArea: 'textarea[name="message"]',
      placeOrderButton: 'a[href="/payment"]',
      productRow: '.cart_info tbody tr',
      totalAmount: '.cart_total_price',
    };
  }

  /**
   * Verify checkout page is loaded
   * @returns {Promise<boolean>} True if page is loaded
   */
  async isCheckoutPageLoaded() {
    return await this.isVisible(this.selectors.addressDetails);
  }

  /**
   * Verify delivery address
   * @returns {Promise<boolean>} True if address is visible
   */
  async isDeliveryAddressVisible() {
    return await this.isVisible(this.selectors.addressDetails);
  }

  /**
   * Verify invoice address
   * @returns {Promise<boolean>} True if address is visible
   */
  async isInvoiceAddressVisible() {
    return await this.isVisible(this.selectors.invoiceAddress);
  }

  /**
   * Verify order review section
   * @returns {Promise<boolean>} True if order review is visible
   */
  async isOrderReviewVisible() {
    return await this.isVisible(this.selectors.reviewOrder);
  }

  /**
   * Add comment to order
   * @param {string} comment - Order comment
   */
  async addOrderComment(comment) {
    await this.fill(this.selectors.commentTextArea, comment);
  }

  /**
   * Get products count in order
   * @returns {Promise<number>} Number of products
   */
  async getOrderProductsCount() {
    return await this.getElementCount(this.selectors.productRow);
  }

  /**
   * Place order
   */
  async placeOrder() {
    await this.click(this.selectors.placeOrderButton);
    await this.waitForPageLoad();
  }

  /**
   * Get delivery address text
   * @returns {Promise<string>} Address text
   */
  async getDeliveryAddress() {
    return await this.getText(this.selectors.addressDetails);
  }

  /**
   * Get invoice address text
   * @returns {Promise<string>} Address text
   */
  async getInvoiceAddress() {
    return await this.getText(this.selectors.invoiceAddress);
  }

  /**
   * Verify address contains specific text
   * @param {string} text - Text to verify
   * @returns {Promise<boolean>} True if text is found in address
   */
  async verifyAddressContains(text) {
    const deliveryAddress = await this.getDeliveryAddress();
    return deliveryAddress.includes(text);
  }
}

module.exports = CheckoutPage;
