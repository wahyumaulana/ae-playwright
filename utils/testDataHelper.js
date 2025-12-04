/**
 * TestDataHelper - Utility for generating test data
 */
class TestDataHelper {
  /**
   * Generate random string
   * @param {number} length - Length of string
   * @returns {string} Random string
   */
  static generateRandomString(length = 10) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate random number
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random number
   */
  static generateRandomNumber(min = 1, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random email
   * @returns {string} Random email
   */
  static generateRandomEmail() {
    const timestamp = Date.now();
    const randomString = this.generateRandomString(8);
    return `test_${randomString}_${timestamp}@automation.com`;
  }

  /**
   * Generate random user data
   * @returns {Object} User data object
   */
  static generateUserData() {
    const firstName = `Test${this.generateRandomString(5)}`;
    const lastName = `User${this.generateRandomString(5)}`;
    const timestamp = Date.now();
    
    return {
      name: `${firstName} ${lastName}`,
      email: this.generateRandomEmail(),
      password: 'Test@123456',
      title: Math.random() > 0.5 ? 'Mr' : 'Mrs',
      dateOfBirth: {
        day: String(this.generateRandomNumber(1, 28)),
        month: String(this.generateRandomNumber(1, 12)),
        year: String(this.generateRandomNumber(1980, 2005)),
      },
      newsletter: true,
      specialOffers: true,
      address: {
        firstName: firstName,
        lastName: lastName,
        company: `TestCompany${this.generateRandomNumber(1, 100)}`,
        address1: `${this.generateRandomNumber(1, 999)} Test Street`,
        address2: `Apartment ${this.generateRandomNumber(1, 50)}`,
        country: 'United States',
        state: 'California',
        city: 'Los Angeles',
        zipcode: String(this.generateRandomNumber(10000, 99999)),
        mobileNumber: `555${this.generateRandomNumber(1000000, 9999999)}`,
      },
    };
  }

  /**
   * Generate payment data
   * @returns {Object} Payment data object
   */
  static generatePaymentData() {
    return {
      nameOnCard: `Test User ${this.generateRandomNumber(1, 100)}`,
      cardNumber: '4532015112830366', // Test card number
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2027',
    };
  }

  /**
   * Generate random phone number
   * @returns {string} Phone number
   */
  static generatePhoneNumber() {
    return `555${this.generateRandomNumber(1000000, 9999999)}`;
  }

  /**
   * Generate random address
   * @returns {Object} Address object
   */
  static generateAddress() {
    return {
      street: `${this.generateRandomNumber(1, 999)} ${this.generateRandomString(8)} Street`,
      city: 'Test City',
      state: 'Test State',
      zipcode: String(this.generateRandomNumber(10000, 99999)),
      country: 'United States',
    };
  }

  /**
   * Get current timestamp
   * @returns {string} Current timestamp
   */
  static getTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }

  /**
   * Generate unique identifier
   * @returns {string} Unique ID
   */
  static generateUniqueId() {
    return `${Date.now()}_${this.generateRandomString(6)}`;
  }
}

module.exports = TestDataHelper;
