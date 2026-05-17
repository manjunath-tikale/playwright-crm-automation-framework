/**
 * API Client Wrapper
 * Provides utility methods for API testing with Playwright
 */
class APIClient {
  /**
   * Initialize API Client
   * @param {import('@playwright/test').APIRequestContext} request - Playwright API request context
   */
  constructor(request) {
    this.request = request;
    this.baseURL = process.env.API_BASE_URL || 'http://localhost:4200/api';
  }

  /**
   * Perform login via API
   * @async
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<import('@playwright/test').APIResponse>} API response
   */
  async login(email, password) {
    return this.request.post(`${this.baseURL}/login`, {
      data: {
        email,
        password
      }
    });
  }

  /**
   * Register new user via API
   * @async
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<import('@playwright/test').APIResponse>} API response
   */
  async register(email, password) {
    return this.request.post(`${this.baseURL}/register`, {
      data: {
        email,
        password
      }
    });
  }

  /**
   * Get all customers via API
   * @async
   * @returns {Promise<import('@playwright/test').APIResponse>} API response
   */
  async getCustomers() {
    return this.request.get(`${this.baseURL}/customers`);
  }

  /**
   * Create a new customer via API
   * @async
   * @param {Object} customerData - Customer data
   * @returns {Promise<import('@playwright/test').APIResponse>} API response
   */
  async createCustomer(customerData) {
    return this.request.post(`${this.baseURL}/customers`, {
      data: customerData
    });
  }

  /**
   * Get customer by ID via API
   * @async
   * @param {string} customerId - Customer ID
   * @returns {Promise<import('@playwright/test').APIResponse>} API response
   */
  async getCustomer(customerId) {
    return this.request.get(`${this.baseURL}/customers/${customerId}`);
  }

  /**
   * Update customer via API
   * @async
   * @param {string} customerId - Customer ID
   * @param {Object} customerData - Updated customer data
   * @returns {Promise<import('@playwright/test').APIResponse>} API response
   */
  async updateCustomer(customerId, customerData) {
    return this.request.put(`${this.baseURL}/customers/${customerId}`, {
      data: customerData
    });
  }

  /**
   * Delete customer via API
   * @async
   * @param {string} customerId - Customer ID
   * @returns {Promise<import('@playwright/test').APIResponse>} API response
   */
  async deleteCustomer(customerId) {
    return this.request.delete(`${this.baseURL}/customers/${customerId}`);
  }

  /**
   * Get all products via API
   * @async
   * @returns {Promise<import('@playwright/test').APIResponse>} API response
   */
  async getProducts() {
    return this.request.get(`${this.baseURL}/products`);
  }

  /**
   * Create a new product via API
   * @async
   * @param {Object} productData - Product data
   * @returns {Promise<import('@playwright/test').APIResponse>} API response
   */
  async createProduct(productData) {
    return this.request.post(`${this.baseURL}/products`, {
      data: productData
    });
  }

  /**
   * Get all invoices via API
   * @async
   * @returns {Promise<import('@playwright/test').APIResponse>} API response
   */
  async getInvoices() {
    return this.request.get(`${this.baseURL}/invoices`);
  }

  /**
   * Create a new invoice via API
   * @async
   * @param {Object} invoiceData - Invoice data
   * @returns {Promise<import('@playwright/test').APIResponse>} API response
   */
  async createInvoice(invoiceData) {
    return this.request.post(`${this.baseURL}/invoices`, {
      data: invoiceData
    });
  }
}

module.exports = { APIClient };
