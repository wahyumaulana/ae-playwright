const BasePage = require('./BasePage');

/**
 * SignupPage - Represents the account information signup page
 */
class SignupPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define page selectors
    this.selectors = {
      pageHeading: '.login-form h2 b',
      titleMr: '#id_gender1',
      titleMrs: '#id_gender2',
      password: '#password',
      dayOfBirth: '#days',
      monthOfBirth: '#months',
      yearOfBirth: '#years',
      newsletter: '#newsletter',
      specialOffers: '#optin',
      firstName: '#first_name',
      lastName: '#last_name',
      company: '#company',
      address1: '#address1',
      address2: '#address2',
      country: '#country',
      state: '#state',
      city: '#city',
      zipcode: '#zipcode',
      mobileNumber: '#mobile_number',
      createAccountButton: 'button[data-qa="create-account"]',
    };
  }

  /**
   * Verify signup page is loaded
   * @returns {Promise<boolean>} True if page is loaded
   */
  async isSignupPageLoaded() {
    return await this.isVisible(this.selectors.pageHeading);
  }

  /**
   * Get page heading text
   * @returns {Promise<string>} Heading text
   */
  async getPageHeading() {
    return await this.getText(this.selectors.pageHeading);
  }

  /**
   * Select title (Mr/Mrs)
   * @param {string} title - 'Mr' or 'Mrs'
   */
  async selectTitle(title) {
    const selector = title.toLowerCase() === 'mr' 
      ? this.selectors.titleMr 
      : this.selectors.titleMrs;
    await this.check(selector);
  }

  /**
   * Fill password
   * @param {string} password - Password
   */
  async fillPassword(password) {
    await this.fill(this.selectors.password, password);
  }

  /**
   * Select date of birth
   * @param {string} day - Day
   * @param {string} month - Month
   * @param {string} year - Year
   */
  async selectDateOfBirth(day, month, year) {
    await this.selectDropdown(this.selectors.dayOfBirth, day);
    await this.selectDropdown(this.selectors.monthOfBirth, month);
    await this.selectDropdown(this.selectors.yearOfBirth, year);
  }

  /**
   * Check newsletter subscription
   */
  async checkNewsletter() {
    await this.check(this.selectors.newsletter);
  }

  /**
   * Check special offers
   */
  async checkSpecialOffers() {
    await this.check(this.selectors.specialOffers);
  }

  /**
   * Fill address information
   * @param {Object} addressInfo - Address information object
   */
  async fillAddressInformation(addressInfo) {
    await this.fill(this.selectors.firstName, addressInfo.firstName);
    await this.fill(this.selectors.lastName, addressInfo.lastName);
    
    if (addressInfo.company) {
      await this.fill(this.selectors.company, addressInfo.company);
    }
    
    await this.fill(this.selectors.address1, addressInfo.address1);
    
    if (addressInfo.address2) {
      await this.fill(this.selectors.address2, addressInfo.address2);
    }
    
    await this.selectDropdown(this.selectors.country, addressInfo.country);
    await this.fill(this.selectors.state, addressInfo.state);
    await this.fill(this.selectors.city, addressInfo.city);
    await this.fill(this.selectors.zipcode, addressInfo.zipcode);
    await this.fill(this.selectors.mobileNumber, addressInfo.mobileNumber);
  }

  /**
   * Complete registration form
   * @param {Object} userInfo - User information object
   */
  async completeRegistration(userInfo) {
    // Select title
    await this.selectTitle(userInfo.title);
    
    // Fill password
    await this.fillPassword(userInfo.password);
    
    // Select date of birth
    await this.selectDateOfBirth(
      userInfo.dateOfBirth.day,
      userInfo.dateOfBirth.month,
      userInfo.dateOfBirth.year
    );
    
    // Check newsletter and offers if required
    if (userInfo.newsletter) {
      await this.checkNewsletter();
    }
    
    if (userInfo.specialOffers) {
      await this.checkSpecialOffers();
    }
    
    // Fill address information
    await this.fillAddressInformation(userInfo.address);
    
    // Click create account button
    await this.click(this.selectors.createAccountButton);
    await this.waitForPageLoad();
  }
}

module.exports = SignupPage;
