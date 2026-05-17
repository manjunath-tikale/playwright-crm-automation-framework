/**
 * Product Page Object Model
 * Handles all product management related interactions
 */
class ProductPage {
  /**
   * Initialize ProductPage with Playwright page object
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;

    // Navigation and buttons
    this.navProducts = page.getByTestId('nav-products');
    this.addBtn = page.getByRole('button', { name: /Add Product/i });

    // Form fields
    this.name = page.getByTestId('product-name');
    this.sku = page.getByTestId('product-sku');
    this.price = page.getByTestId('product-price');
    this.stock = page.getByTestId('product-stock');
    this.category = page.getByTestId('product-category');

    // Save button
    this.saveBtn = page.getByText('Save Product');
  }

  /**
   * Navigate to products section
   * @async
   * @returns {Promise<void>}
   */
  async navigateToProducts() {
    await this.navProducts.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Open add product form
   * @async
   * @returns {Promise<void>}
   */
  async openAddForm() {
    await this.addBtn.click();
  }

  /**
   * Add a new product with provided data
   * @async
   * @param {Object} data - Product data
   * @param {string} data.name - Product name
   * @param {string} data.sku - Product SKU
   * @param {string} data.price - Product price
   * @param {string} data.stock - Product stock quantity
   * @param {string} data.category - Product category
   * @returns {Promise<void>}
   */
  async addProduct(data) {
    await this.navigateToProducts();
    await this.openAddForm();

    await this.name.fill(data.name);
    await this.sku.fill(data.sku);
    await this.price.fill(data.price);
    await this.stock.fill(data.stock);
    await this.category.fill(data.category);

    await this.saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify product was added successfully
   * @async
   * @param {string} productName - Product name to verify
   * @returns {Promise<boolean>} True if product name is visible
   */
  async isProductVisible(productName) {
    return await this.page.getByText(productName).isVisible().catch(() => false);
  }
}

module.exports = { ProductPage };