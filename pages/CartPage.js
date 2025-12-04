const BasePage = require('./BasePage');

/**
 * CartPage - Represents the shopping cart page
 */
class CartPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define page selectors
    this.selectors = {
      cartInfo: '#cart_info',
      cartItems: '.cart_info tbody tr',
      productName: '.cart_description h4 a',
      productPrice: '.cart_price p',
      productQuantity: '.cart_quantity button',
      productTotal: '.cart_total_price',
      deleteButton: '.cart_quantity_delete',
      proceedToCheckoutButton: '.btn-default.check_out',
      emptyCartMessage: '#empty_cart',
      registerLoginLink: '.modal-body a[href="/login"]',
      subscriptionHeading: '.single-widget h2',
    };
  }

  /**
   * Navigate to cart page
   */
  async goto() {
    await this.navigate('/view_cart');
    await this.waitForPageLoad();
  }

  /**
   * Verify cart page is loaded
   * @returns {Promise<boolean>} True if page is loaded
   */
  async isCartPageLoaded() {
    return await this.isVisible(this.selectors.cartInfo);
  }

  /**
   * Get number of items in cart
   * @returns {Promise<number>} Number of cart items
   */
  async getCartItemsCount() {
    return await this.getElementCount(this.selectors.cartItems);
  }

  /**
   * Verify product is in cart
   * @param {string} productName - Product name
   * @returns {Promise<boolean>} True if product is in cart
   */
  async isProductInCart(productName) {
    const products = await this.page.locator(this.selectors.productName).allTextContents();
    return products.some(name => name.includes(productName));
  }

  /**
   * Get product details by index
   * @param {number} index - Product index
   * @returns {Promise<Object>} Product details
   */
  async getProductDetails(index) {
    const items = await this.page.locator(this.selectors.cartItems).all();
    const item = items[index];
    
    return {
      name: await item.locator(this.selectors.productName).textContent(),
      price: await item.locator(this.selectors.productPrice).textContent(),
      quantity: await item.locator(this.selectors.productQuantity).textContent(),
      total: await item.locator(this.selectors.productTotal).textContent(),
    };
  }

  /**
   * Remove product from cart by index
   * @param {number} index - Product index
   */
  async removeProductByIndex(index) {
    const items = await this.page.locator(this.selectors.cartItems).all();
    await items[index].locator(this.selectors.deleteButton).click();
    await this.waitForPageLoad();
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.click(this.selectors.proceedToCheckoutButton);
  }

  /**
   * Verify cart is empty
   * @returns {Promise<boolean>} True if cart is empty
   */
  async isCartEmpty() {
    const count = await this.getCartItemsCount();
    return count === 0;
  }

  /**
   * Click register/login link from checkout modal
   */
  async clickRegisterLoginLink() {
    await this.click(this.selectors.registerLoginLink);
    await this.waitForPageLoad();
  }

  /**
   * Get all product names in cart
   * @returns {Promise<Array<string>>} Array of product names
   */
  async getAllProductNames() {
    return await this.page.locator(this.selectors.productName).allTextContents();
  }

  /**
   * Calculate total cart value
   * @returns {Promise<number>} Total cart value
   */
  async getTotalCartValue() {
    const totals = await this.page.locator(this.selectors.productTotal).allTextContents();
    return totals.reduce((sum, total) => {
      const value = parseFloat(total.replace('Rs. ', '').trim());
      return sum + value;
    }, 0);
  }
}

module.exports = CartPage;
