const TestDataHelper = require('../utils/testDataHelper');

/**
 * Test Data - Reusable test data for different scenarios
 */
class TestData {
  /**
   * Get new user data for registration
   * @returns {Object} User data
   */
  static getNewUser() {
    return TestDataHelper.generateUserData();
  }

  /**
   * Get payment information
   * @returns {Object} Payment data
   */
  static getPaymentInfo() {
    return TestDataHelper.generatePaymentData();
  }

  /**
   * Get existing user credentials (for login tests)
   * @returns {Object} User credentials
   */
  static getExistingUser() {
    return {
      email: process.env.TEST_USER_EMAIL || 'testuser@example.com',
      password: process.env.TEST_USER_PASSWORD || 'TestPassword123',
    };
  }

  /**
   * Get invalid login credentials
   * @returns {Object} Invalid credentials
   */
  static getInvalidCredentials() {
    return {
      email: 'invalid@email.com',
      password: 'WrongPassword123',
    };
  }

  /**
   * Get product search terms
   * @returns {Array<string>} Search terms
   */
  static getProductSearchTerms() {
    return ['Dress', 'Jeans', 'Top', 'Saree', 'Shirt'];
  }

  /**
   * Get order comment
   * @returns {string} Order comment
   */
  static getOrderComment() {
    return 'This is an automated test order. Please process quickly.';
  }

  /**
   * Get test credit card (test mode)
   * @returns {Object} Credit card data
   */
  static getTestCreditCard() {
    return {
      nameOnCard: 'Test User',
      cardNumber: '4532015112830366',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2027',
    };
  }

  /**
   * Get newsletter email
   * @returns {string} Email for newsletter
   */
  static getNewsletterEmail() {
    return TestDataHelper.generateRandomEmail();
  }
}

module.exports = TestData;
