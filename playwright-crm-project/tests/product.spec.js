const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../LoginPage');
const { ProductPage } = require('../ProductPage');
const { TestDataFactory } = require('../fixtures/testData');

/**
 * Product Management Tests
 * Tests for product catalog management
 */
test.describe('Product Management', () => {
  let loginPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    // Setup: Login before each test
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    
    await loginPage.goto();
    const credentials = TestDataFactory.getLoginCredentials();
    await loginPage.login(credentials.email, credentials.password);
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Admin should add a new product successfully', async ({ page }) => {
    // Arrange
    const productData = TestDataFactory.generateProductData({
      name: 'Samsung Galaxy S24',
      sku: 'SGS24',
      price: '899'
    });

    // Act
    await productPage.addProduct(productData);

    // Assert
    const isVisible = await productPage.isProductVisible(productData.name);
    expect(isVisible).toBe(true);
  });

  test('Product details should be saved correctly', async ({ page }) => {
    // Arrange
    const productData = TestDataFactory.generateProductData({
      name: 'MacBook Pro 16"',
      sku: 'MBP16',
      price: '2499',
      stock: '20',
      category: 'Laptops'
    });

    // Act
    await productPage.addProduct(productData);

    // Assert - Verify product is visible
    const isVisible = await productPage.isProductVisible(productData.name);
    expect(isVisible).toBe(true);
  });

  test('Multiple products should be added to catalog', async ({ page }) => {
    // Arrange
    const product1 = TestDataFactory.generateProductData({
      name: 'Product Alpha',
      sku: 'ALPHA001'
    });
    const product2 = TestDataFactory.generateProductData({
      name: 'Product Beta',
      sku: 'BETA001'
    });

    // Act - Add first product
    await productPage.addProduct(product1);
    let isVisible = await productPage.isProductVisible(product1.name);
    expect(isVisible).toBe(true);

    // Act - Add second product
    await productPage.addProduct(product2);

    // Assert - Both products should be visible
    isVisible = await productPage.isProductVisible(product2.name);
    expect(isVisible).toBe(true);
  });
});
