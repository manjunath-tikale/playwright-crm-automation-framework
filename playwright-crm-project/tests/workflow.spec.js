const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../LoginPage');
const { CustomerPage } = require('../CustomerPage');
const { ProductPage } = require('../ProductPage');
const { InvoicesPage } = require('../InvoicesPage');
const { TestDataFactory } = require('../fixtures/testData');

/**
 * Complete Workflow Tests
 * End-to-end tests for complete CRM workflows
 */
test.describe('Complete CRM Workflow', () => {
  let loginPage;
  let customerPage;
  let productPage;
  let invoicesPage;

  test.beforeEach(async ({ page }) => {
    // Setup: Initialize all page objects
    loginPage = new LoginPage(page);
    customerPage = new CustomerPage(page);
    productPage = new ProductPage(page);
    invoicesPage = new InvoicesPage(page);

    // Login before each test
    await loginPage.goto();
    const credentials = TestDataFactory.getLoginCredentials();
    await loginPage.login(credentials.email, credentials.password);
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Complete CRM workflow - Add customer, product, and invoice', async ({ page }) => {
    // Arrange
    const customerData = TestDataFactory.generateCustomerData({
      name: 'Workflow Customer',
      email: 'workflow@example.com'
    });
    const productData = TestDataFactory.generateProductData({
      name: 'Workflow Product',
      sku: 'WF001'
    });
    const invoiceData = TestDataFactory.generateInvoiceData({
      customer: customerData.name,
      amount: '750'
    });

    // Act & Assert - Step 1: Add customer
    await customerPage.addCustomer(customerData);
    let isVisible = await customerPage.isCustomerVisible(customerData.name);
    expect(isVisible).toBe(true);

    // Act & Assert - Step 2: Add product
    await productPage.addProduct(productData);
    isVisible = await productPage.isProductVisible(productData.name);
    expect(isVisible).toBe(true);

    // Act & Assert - Step 3: Create invoice for customer
    await invoicesPage.addInvoice(invoiceData);
    isVisible = await invoicesPage.isInvoiceVisible(invoiceData.customer);
    expect(isVisible).toBe(true);
  });

  test('Full workflow with multiple items', async ({ page }) => {
    // Arrange - Create multiple items
    const customers = [
      TestDataFactory.generateCustomerData({ name: 'Customer 1', email: 'cust1@example.com' }),
      TestDataFactory.generateCustomerData({ name: 'Customer 2', email: 'cust2@example.com' })
    ];
    const products = [
      TestDataFactory.generateProductData({ name: 'Product 1', sku: 'P001' }),
      TestDataFactory.generateProductData({ name: 'Product 2', sku: 'P002' })
    ];

    // Act & Assert - Add customers
    for (const customer of customers) {
      await customerPage.addCustomer(customer);
      const isVisible = await customerPage.isCustomerVisible(customer.name);
      expect(isVisible).toBe(true);
    }

    // Act & Assert - Add products
    for (const product of products) {
      await productPage.addProduct(product);
      const isVisible = await productPage.isProductVisible(product.name);
      expect(isVisible).toBe(true);
    }
  });
});
