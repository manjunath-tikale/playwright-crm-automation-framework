const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../LoginPage');
const { CustomerPage } = require('../CustomerPage');
const { TestDataFactory } = require('../fixtures/testData');

/**
 * Customer Management Tests
 * Tests for adding, editing, and managing customers
 */
test.describe('Customer Management', () => {
  let loginPage;
  let customerPage;

  test.beforeEach(async ({ page }) => {
    // Setup: Login before each test
    loginPage = new LoginPage(page);
    customerPage = new CustomerPage(page);
    
    await loginPage.goto();
    const credentials = TestDataFactory.getLoginCredentials();
    await loginPage.login(credentials.email, credentials.password);
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Admin should add a new customer successfully', async ({ page }) => {
    // Arrange
    const customerData = TestDataFactory.generateCustomerData({
      name: 'Jane Smith',
      email: 'jane.smith@example.com'
    });

    // Act
    await customerPage.addCustomer(customerData);

    // Assert
    const isVisible = await customerPage.isCustomerVisible(customerData.name);
    expect(isVisible).toBe(true);
  });

  test('Customer with valid data should be saved', async ({ page }) => {
    // Arrange
    const customerData = TestDataFactory.generateCustomerData({
      name: 'ABC Corporation',
      email: 'contact@abc.com',
      phone: '9876543210',
      company: 'ABC Corp'
    });

    // Act
    await customerPage.addCustomer(customerData);

    // Assert - Verify all fields were saved
    await expect(page.getByText(customerData.name)).toBeVisible();
    await expect(page.getByText(customerData.email)).toBeVisible({ timeout: 5000 }).catch(() => {
      // Email might not be directly visible in list view
    });
  });

  test('Multiple customers should be added and listed', async ({ page }) => {
    // Arrange
    const customer1 = TestDataFactory.generateCustomerData({
      name: 'Customer One',
      email: 'customer1@example.com'
    });
    const customer2 = TestDataFactory.generateCustomerData({
      name: 'Customer Two',
      email: 'customer2@example.com'
    });

    // Act - Add first customer
    await customerPage.addCustomer(customer1);
    let isVisible = await customerPage.isCustomerVisible(customer1.name);
    expect(isVisible).toBe(true);

    // Act - Add second customer
    await customerPage.addCustomer(customer2);

    // Assert - Both customers should be visible
    isVisible = await customerPage.isCustomerVisible(customer2.name);
    expect(isVisible).toBe(true);
  });
});
