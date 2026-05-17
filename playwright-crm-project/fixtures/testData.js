/**
 * Test data factory for generating test data
 * Centralizes test data management for maintainability
 */

class TestDataFactory {
  /**
   * Generate valid customer data
   * @param {Object} overrides - Override default values
   * @returns {Object} Customer data object
   */
  static generateCustomerData(overrides = {}) {
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      company: 'Acme Corp',
      ...overrides
    };
  }

  /**
   * Generate valid product data
   * @param {Object} overrides - Override default values
   * @returns {Object} Product data object
   */
  static generateProductData(overrides = {}) {
    return {
      name: 'iPhone 15 Pro',
      sku: 'IP15PRO',
      price: '999',
      stock: '50',
      category: 'Smartphones',
      ...overrides
    };
  }

  /**
   * Generate valid invoice data
   * @param {Object} overrides - Override default values
   * @returns {Object} Invoice data object
   */
  static generateInvoiceData(overrides = {}) {
    const today = new Date();
    const dueDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const dueDateString = dueDate.toISOString().split('T')[0];

    return {
      customer: 'John Doe',
      amount: '1000',
      dueDate: dueDateString,
      status: 'Pending',
      ...overrides
    };
  }

  /**
   * Generate login credentials from environment or defaults
   * @returns {Object} Login credentials
   */
  static getLoginCredentials() {
    return {
      email: process.env.TEST_USERNAME || 'admin@admin.com',
      password: process.env.TEST_PASSWORD || 'admin'
    };
  }
}

module.exports = { TestDataFactory };
