const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../LoginPage');
const { InvoicesPage } = require('../InvoicesPage');
const { TestDataFactory } = require('../fixtures/testData');

/**
 * Invoice Management Tests
 * Tests for invoice creation and processing
 */
test.describe('Invoice Management', () => {
  let loginPage;
  let invoicesPage;

  test.beforeEach(async ({ page }) => {
    // Setup: Login before each test
    loginPage = new LoginPage(page);
    invoicesPage = new InvoicesPage(page);
    
    await loginPage.goto();
    const credentials = TestDataFactory.getLoginCredentials();
    await loginPage.login(credentials.email, credentials.password);
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Admin should create a new invoice', async ({ page }) => {
    // Arrange
    const invoiceData = TestDataFactory.generateInvoiceData({
      customer: 'Spider',
      amount: '500',
      status: 'Paid'
    });

    // Act
    await invoicesPage.addInvoice(invoiceData);

    // Assert
    const isVisible = await invoicesPage.isInvoiceVisible(invoiceData.customer);
    expect(isVisible).toBe(true);
  });

  test('Invoice with valid data should be saved', async ({ page }) => {
    // Arrange
    const invoiceData = TestDataFactory.generateInvoiceData({
      customer: 'THANOS',
      amount: '1500',
      status: 'Pending'
    });

    // Act
    await invoicesPage.addInvoice(invoiceData);

    // Assert
    const isVisible = await invoicesPage.isInvoiceVisible(invoiceData.customer);
    expect(isVisible).toBe(true);
  });

  test('Multiple invoices can be created', async ({ page }) => {
    // Arrange
    const invoice1 = TestDataFactory.generateInvoiceData({
      customer: 'Customer A',
      amount: '1000'
    });
    const invoice2 = TestDataFactory.generateInvoiceData({
      customer: 'Customer B',
      amount: '2000'
    });

    // Act - Create first invoice
    await invoicesPage.addInvoice(invoice1);
    let isVisible = await invoicesPage.isInvoiceVisible(invoice1.customer);
    expect(isVisible).toBe(true);

    // Act - Create second invoice
    await invoicesPage.addInvoice(invoice2);

    // Assert - Both invoices should be visible
    isVisible = await invoicesPage.isInvoiceVisible(invoice2.customer);
    expect(isVisible).toBe(true);
  });
});
