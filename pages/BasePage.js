/**
 * BasePage - Parent class for all page objects
 * Contains common methods and utilities used across all pages
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - URL to navigate to
   */
  async navigate(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on an element
   * @param {string} selector - Element selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill input field
   * @param {string} selector - Input field selector
   * @param {string} text - Text to fill
   */
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content of an element
   * @param {string} selector - Element selector
   * @returns {Promise<string>} Text content
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Check if element is visible
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} Visibility status
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Take screenshot
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ 
      path: `reports/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Get current URL
   * @returns {string} Current URL
   */
  getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Scroll to element
   * @param {string} selector - Element selector
   */
  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Select dropdown option by value
   * @param {string} selector - Dropdown selector
   * @param {string} value - Option value
   */
  async selectDropdown(selector, value) {
    await this.page.selectOption(selector, value);
  }

  /**
   * Check if checkbox/radio button
   * @param {string} selector - Element selector
   */
  async check(selector) {
    await this.page.check(selector);
  }

  /**
   * Wait for specified time (use sparingly)
   * @param {number} ms - Milliseconds to wait
   */
  async wait(ms) {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Press keyboard key
   * @param {string} key - Key name
   */
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  /**
   * Get element count
   * @param {string} selector - Element selector
   * @returns {Promise<number>} Number of elements
   */
  async getElementCount(selector) {
    return await this.page.locator(selector).count();
  }

  /**
   * Switch to iframe
   * @param {string} selector - Iframe selector
   * @returns {Promise<Frame>} Frame object
   */
  async switchToFrame(selector) {
    const frameElement = await this.page.$(selector);
    return await frameElement.contentFrame();
  }

  /**
   * Accept alert dialog
   */
  async acceptAlert() {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
  }

  /**
   * Dismiss alert dialog
   */
  async dismissAlert() {
    this.page.on('dialog', async (dialog) => {
      await dialog.dismiss();
    });
  }
}

module.exports = BasePage;
