/**
 * Login Page Object Model
 * Encapsulates all selectors and interactions for the login page
 */
class LoginPage {
  /**
   * Initialize LoginPage with Playwright page object
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;

    // Selectors - Using semantic locators for better maintainability
    this.email = page.getByPlaceholder(/email/i);
    this.password = page.getByPlaceholder(/password/i);
    this.loginBtn = page.getByRole('button', { name: /login/i });
    this.errorMessage = page.getByRole('alert');
  }

  /**
   * Navigate to the login page
   * @async
   * @returns {Promise<void>}
   */
  async goto() {
    const baseURL = process.env.BASE_URL || 'http://localhost:4200';
    await this.page.goto(`${baseURL}/login`);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Perform login with provided credentials
   * @async
   * @param {string} email - User email address
   * @param {string} password - User password
   * @returns {Promise<void>}
   * @throws {Error} If login elements are not found or not interactable
   */
  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
    // Wait for navigation after login
    await this.page.waitForURL(/dashboard/, { timeout: 5000 });
  }

  /**
   * Check if error message is displayed
   * @async
   * @returns {Promise<boolean>} True if error message is visible
   */
  async isErrorMessageDisplayed() {
    return await this.errorMessage.isVisible().catch(() => false);
  }

  /**
   * Get error message text
   * @async
   * @returns {Promise<string>} Error message content
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };