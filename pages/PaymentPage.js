const BasePage = require('./BasePage');

/**
 * PaymentPage - Represents the payment page
 */
class PaymentPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define page selectors
    this.selectors = {
      nameOnCard: 'input[name="name_on_card"]',
      cardNumber: 'input[name="card_number"]',
      cvc: 'input[name="cvc"]',
      expiryMonth: 'input[name="expiry_month"]',
      expiryYear: 'input[name="expiry_year"]',
      payButton: 'button[data-qa="pay-button"]',
      paymentForm: '#payment-form',
    };
  }

  /**
   * Verify payment page is loaded
   * @returns {Promise<boolean>} True if page is loaded
   */
  async isPaymentPageLoaded() {
    // First try the canonical payment form selector with a short wait.
    try {
      await this.waitForElement(this.selectors.paymentForm, 3000);
      return true;
    } catch (err) {
      // Fallbacks: check for stable payment page markers (pay button or name-on-card field)
      const payButtonVisible = await this.isVisible(this.selectors.payButton);
      if (payButtonVisible) return true;
      const nameVisible = await this.isVisible(this.selectors.nameOnCard);
      return nameVisible;
    }
  }

  /**
   * Fill payment information
   * @param {Object} paymentInfo - Payment information object
   */
  async fillPaymentInformation(paymentInfo) {
    await this.fill(this.selectors.nameOnCard, paymentInfo.nameOnCard);
    await this.fill(this.selectors.cardNumber, paymentInfo.cardNumber);
    await this.fill(this.selectors.cvc, paymentInfo.cvc);
    await this.fill(this.selectors.expiryMonth, paymentInfo.expiryMonth);
    await this.fill(this.selectors.expiryYear, paymentInfo.expiryYear);
  }

  /**
   * Complete payment and place order
   * @param {Object} paymentInfo - Payment information object
   */
  async completePayment(paymentInfo) {
    await this.fillPaymentInformation(paymentInfo);
    await this.click(this.selectors.payButton);
    await this.waitForPageLoad();
  }

  /**
   * Verify all payment fields are visible
   * @returns {Promise<boolean>} True if all fields are visible
   */
  async arePaymentFieldsVisible() {
    const fields = [
      this.selectors.nameOnCard,
      this.selectors.cardNumber,
      this.selectors.cvc,
      this.selectors.expiryMonth,
      this.selectors.expiryYear,
    ];

    for (const field of fields) {
      const isVisible = await this.isVisible(field);
      if (!isVisible) return false;
    }
    
    return true;
  }
}

module.exports = PaymentPage;
