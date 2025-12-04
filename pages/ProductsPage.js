const BasePage = require('./BasePage');

/**
 * ProductsPage - Represents the products listing page
 */
class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define page selectors
    this.selectors = {
      pageHeading: '.features_items h2.title',
      allProducts: '.features_items',
      productItem: '.single-products',
      productName: '.productinfo p',
      productPrice: '.productinfo h2',
      addToCartButton: '.productinfo a.btn',
      viewProductButton: '.choose a',
      continueShoppingButton: '.modal-footer button',
      viewCartLink: '.modal-body a[href="/view_cart"]',
      searchInput: '#search_product',
      searchButton: '#submit_search',
      brandsList: '.brands-name',
    };
  }

  /**
   * Navigate to products page
   */
  async goto() {
    await this.navigate('/products');
    await this.waitForPageLoad();
  }

  /**
   * Verify products page is loaded
   * @returns {Promise<boolean>} True if page is loaded
   */
  async isProductsPageLoaded() {
    return await this.isVisible(this.selectors.pageHeading);
  }

  /**
   * Get page heading
   * @returns {Promise<string>} Page heading
   */
  async getPageHeading() {
    return await this.getText(this.selectors.pageHeading);
  }

  /**
   * Get total number of products
   * @returns {Promise<number>} Number of products
   */
  async getProductsCount() {
    return await this.getElementCount(this.selectors.productItem);
  }

  /**
   * Add product to cart by index
   * @param {number} index - Product index (0-based)
   */
  async addProductToCartByIndex(index) {
    const products = await this.page.locator(this.selectors.productItem).all();
    await products[index].hover();
    await products[index].locator(this.selectors.addToCartButton).click();
  }

  /**
   * Add product to cart by name
   * @param {string} productName - Product name
   */
  async addProductToCartByName(productName) {
    // Find product by name and add to cart
    const product = this.page.locator(this.selectors.productItem)
      .filter({ hasText: productName });
    await product.hover();
    await product.locator(this.selectors.addToCartButton).click();
  }

  /**
   * Click continue shopping button
   */
  async clickContinueShopping() {
    await this.click(this.selectors.continueShoppingButton);
  }

  /**
   * Click view cart link
   */
  async clickViewCart() {
    await this.click(this.selectors.viewCartLink);
    await this.waitForPageLoad();
  }

  /**
   * Search for product
   * @param {string} searchTerm - Search term
   */
  async searchProduct(searchTerm) {
    await this.fill(this.selectors.searchInput, searchTerm);
    await this.click(this.selectors.searchButton);
    await this.waitForPageLoad();
  }

  /**
   * View product details by index
   * @param {number} index - Product index
   */
  async viewProductDetailsByIndex(index) {
    const products = await this.page.locator(this.selectors.productItem).all();
    await products[index].locator(this.selectors.viewProductButton).click();
    await this.waitForPageLoad();
  }

  /**
   * Get product name by index
   * @param {number} index - Product index
   * @returns {Promise<string>} Product name
   */
  async getProductNameByIndex(index) {
    const products = await this.page.locator(this.selectors.productItem).all();
    return await products[index].locator(this.selectors.productName).textContent();
  }

  /**
   * Get product price by index
   * @param {number} index - Product index
   * @returns {Promise<string>} Product price
   */
  async getProductPriceByIndex(index) {
    const products = await this.page.locator(this.selectors.productItem).all();
    return await products[index].locator(this.selectors.productPrice).textContent();
  }

  /**
   * Add multiple products to cart
   * @param {number} count - Number of products to add
   */
  async addMultipleProductsToCart(count) {
    for (let i = 0; i < count; i++) {
      await this.addProductToCartByIndex(i);
      await this.clickContinueShopping();
      await this.wait(1000); // Wait for modal to close
    }
  }
}

module.exports = ProductsPage;
