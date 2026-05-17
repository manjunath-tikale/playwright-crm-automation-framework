/**
 * Customer Page Object Model
 * Handles all customer management related interactions
 */
class CustomerPage {
  /**
   * Initialize CustomerPage with Playwright page object
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;

    // Navigation and buttons
    this.navCustomers = page.getByTestId('nav-customers');
    this.addBtn = page.getByRole('button', { name: /Add Customer/i });

    // Form fields
    this.name = page.getByPlaceholder(/Customer Name/i);
    this.email = page.getByPlaceholder(/customer@example.com/i);
    this.phone = page.getByPlaceholder(/555-1234/i);
    this.company = page.getByPlaceholder(/Company name/i);

    // Save button
    this.saveBtn = page.getByRole('button', { name: /Save Customer/i });
    
    // Success message
    this.successMessage = page.getByRole('alert');
  }

  /**
   * Navigate to customers section
   * @async
   * @returns {Promise<void>}
   */
  async navigateToCustomers() {
    await this.navCustomers.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Open add customer form
   * @async
   * @returns {Promise<void>}
   */
  async openAddForm() {
    await this.addBtn.click();
  }

  /**
   * Add a new customer with provided data
   * @async
   * @param {Object} data - Customer data
   * @param {string} data.name - Customer name
   * @param {string} data.email - Customer email
   * @param {string} data.phone - Customer phone number
   * @param {string} data.company - Customer company name
   * @returns {Promise<void>}
   */
  async addCustomer(data) {
    await this.navigateToCustomers();
    await this.openAddForm();

    await this.name.fill(data.name);
    await this.email.fill(data.email);
    await this.phone.fill(data.phone);
    await this.company.fill(data.company);

    await this.saveBtn.click();
    // Wait for success message or navigation
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify customer was added successfully
   * @async
   * @param {string} customerName - Name to verify
   * @returns {Promise<boolean>} True if customer name is visible
   */
  async isCustomerVisible(customerName) {
    return await this.page.getByText(customerName).isVisible().catch(() => false);
  }
}

module.exports = { CustomerPage };