const BasePage = require('./BasePage');

/**
 * SignupLoginPage - Represents the signup/login page
 */
class SignupLoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define page selectors
    this.selectors = {
      // Signup section
      signupName: 'input[data-qa="signup-name"]',
      signupEmail: 'input[data-qa="signup-email"]',
      signupButton: 'button[data-qa="signup-button"]',
      signupHeading: '.signup-form h2',
      
      // Login section
      loginEmail: 'input[data-qa="login-email"]',
      loginPassword: 'input[data-qa="login-password"]',
      loginButton: 'button[data-qa="login-button"]',
      loginHeading: '.login-form h2',
      
      // Error messages
      loginError: '.login-form p[style*="color: red"]',
      signupError: '.signup-form p[style*="color: red"]',
    };
  }

  /**
   * Navigate to signup/login page
   */
  async goto() {
    await this.navigate('/login');
    await this.waitForPageLoad();
  }

  /**
   * Verify signup form is visible
   * @returns {Promise<boolean>} True if signup form is visible
   */
  async isSignupFormVisible() {
    return await this.isVisible(this.selectors.signupHeading);
  }

  /**
   * Verify login form is visible
   * @returns {Promise<boolean>} True if login form is visible
   */
  async isLoginFormVisible() {
    return await this.isVisible(this.selectors.loginHeading);
  }

  /**
   * Fill signup form and submit
   * @param {string} name - User name
   * @param {string} email - User email
   */
  async signup(name, email) {
    await this.fill(this.selectors.signupName, name);
    await this.fill(this.selectors.signupEmail, email);
    await this.click(this.selectors.signupButton);
  }

  /**
   * Fill login form and submit
   * @param {string} email - User email
   * @param {string} password - User password
   */
  async login(email, password) {
    await this.fill(this.selectors.loginEmail, email);
    await this.fill(this.selectors.loginPassword, password);
    await this.click(this.selectors.loginButton);
    await this.waitForPageLoad();
  }

  /**
   * Get login error message
   * @returns {Promise<string>} Error message
   */
  async getLoginErrorMessage() {
    return await this.getText(this.selectors.loginError);
  }

  /**
   * Verify login error is displayed
   * @returns {Promise<boolean>} True if error is visible
   */
  async isLoginErrorDisplayed() {
    return await this.isVisible(this.selectors.loginError);
  }

  /**
   * Get signup error message
   * @returns {Promise<string>} Error message
   */
  async getSignupErrorMessage() {
    return await this.getText(this.selectors.signupError);
  }

  /**
   * Verify signup error is displayed
   * @returns {Promise<boolean>} True if error is visible
   */
  async isSignupErrorDisplayed() {
    return await this.isVisible(this.selectors.signupError);
  }
}

module.exports = SignupLoginPage;
