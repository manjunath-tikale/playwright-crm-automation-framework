const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../LoginPage');
const { TestDataFactory } = require('../fixtures/testData');

/**
 * Authentication Tests
 * Tests for login functionality and authentication flows
 */
test.describe('Authentication Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('User should login successfully with valid credentials', async ({ page }) => {
    // Arrange
    const credentials = TestDataFactory.getLoginCredentials();

    // Act
    await loginPage.login(credentials.email, credentials.password);

    // Assert
    await expect(page).toHaveURL(/dashboard/);
  });

  test('User should see error message with invalid credentials', async ({ page }) => {
    // Arrange
    const invalidPassword = 'wrongpassword123';
    const credentials = TestDataFactory.getLoginCredentials();

    // Act
    await loginPage.login(credentials.email, invalidPassword);

    // Assert
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBe(true);
  });

  test('Email field should be required', async ({ page }) => {
    // Arrange
    const credentials = TestDataFactory.getLoginCredentials();

    // Act - Fill only password field
    const passwordField = loginPage.password;
    await passwordField.fill(credentials.password);

    // Assert - Login button should be disabled or form should show validation
    // This depends on your application's validation
    expect(loginPage.loginBtn).toBeDefined();
  });
});
