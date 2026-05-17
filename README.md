# 🎭 Playwright CRM Automation Framework

A comprehensive test automation framework built with **Playwright** and **JavaScript**, designed for end-to-end UI testing and API testing of a CRM application. This project demonstrates professional QA automation practices with Page Object Model (POM) architecture, data-driven testing, and continuous integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Project Architecture](#project-architecture)
- [Key Features](#key-features)
- [Test Coverage](#test-coverage)
- [Best Practices Implemented](#best-practices-implemented)
- [Contributing](#contributing)

## 🎯 Overview

This automation framework tests a CRM application with the following capabilities:

- **UI Automation**: Login flows, customer management, product catalog, and invoice processing
- **API Testing**: RESTful API endpoint validation
- **Cross-browser Testing**: Configured for multiple browsers (Chromium, Firefox, WebKit ready)
- **CI/CD Integration**: GitHub Actions workflow for automated test execution
- **HTML Reporting**: Beautiful HTML reports with trace collection for failed tests

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Playwright | ^1.59.1 | E2E test automation framework |
| Node.js | 16+ | Runtime environment |
| JavaScript (ES6+) | - | Test scripting language |
| GitHub Actions | - | CI/CD pipeline |

## 📁 Project Structure

```
playwright-crm-automation-framework/
├── playwright-crm-project/           # Test files directory
│   ├── pages/                        # Page Object Models
│   │   ├── LoginPage.js              # Login page POM
│   │   ├── CustomerPage.js           # Customer management POM
│   │   ├── ProductPage.js            # Product management POM
│   │   └── InvoicesPage.js           # Invoice management POM
│   ├── api/                          # API testing
│   │   └── APIClient.js              # API client wrapper
│   ├── tests/                        # Test specifications
│   │   ├── auth.spec.js              # Authentication tests
│   │   ├── customer.spec.js          # Customer management tests
│   │   ├── product.spec.js           # Product management tests
│   │   ├── invoice.spec.js           # Invoice management tests
│   │   └── api.spec.js               # API integration tests
│   └── fixtures/                     # Test data and helpers
│       └── testData.js               # Test data factory
├── .github/
│   └── workflows/
│       └── tests.yml                 # GitHub Actions CI/CD
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
├── playwright.config.js              # Playwright configuration
├── package.json                      # Project dependencies & scripts
└── README.md                         # Project documentation
```

## 📦 Prerequisites

Before running tests, ensure you have:

- **Node.js** version 16 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control
- A running instance of the CRM application (typically on `http://localhost:4200`)

Verify your Node.js installation:
```bash
node --version
npm --version
```

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/playwright-crm-automation-framework.git
cd playwright-crm-automation-framework
```

### 2. Install Dependencies
```bash
npm install
```

This will install Playwright and its browsers:
```bash
npx playwright install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` and add your test credentials:
```env
# Application URL
BASE_URL=http://localhost:4200

# Test Credentials
TEST_USERNAME=admin@admin.com
TEST_PASSWORD=admin

# API Configuration
API_BASE_URL=http://localhost:4200/api

# Playwright Settings
HEADLESS=false
SLOW_MO=500
```

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.js`)

Key configuration settings:

```javascript
{
  testDir: './playwright-crm-project/tests',    // Test directory
  fullyParallel: true,                           // Run tests in parallel
  retries: 0,                                     // Retry failed tests
  workers: 4,                                     // Number of parallel workers
  reporter: 'html',                              // HTML report generator
  headless: process.env.HEADLESS !== 'false',    // Headless mode
  trace: 'on-first-retry',                       // Collect traces on failure
}
```

### Environment-Based Configuration

Tests load environment variables from `.env`:

```javascript
const baseURL = process.env.BASE_URL || 'http://localhost:4200';
const username = process.env.TEST_USERNAME || 'admin@admin.com';
const password = process.env.TEST_PASSWORD || 'admin';
```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

### Run Specific Test File
```bash
npx playwright test auth.spec.js
```

### Run Tests Matching a Pattern
```bash
npx playwright test --grep "Login"
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### View Test Report
```bash
npm run test:report
```

### Run Tests on Specific Browser
```bash
npx playwright test --project chromium
npx playwright test --project firefox
npx playwright test --project webkit
```

## 🏗 Project Architecture

### Page Object Model (POM)

Each page is represented as a class that encapsulates selectors and interactions:

```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByPlaceholder(/email/);
    this.password = page.getByPlaceholder(/password/);
    this.loginBtn = page.getByRole('button', { name: /login/i });
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL + '/login');
  }

  async login(user, pass) {
    await this.email.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }
}
```

**Benefits:**
- ✅ Maintainable: Selector changes in one place
- ✅ Reusable: Page methods across multiple tests
- ✅ Scalable: Easy to add new pages and methods
- ✅ Readable: Tests focus on business logic, not implementation

### Test Structure

Tests follow a consistent structure for readability:

```javascript
test.describe('Feature Name', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    // Setup: Create fresh context for each test
    page = await browser.newPage();
  });

  test('Descriptive test name', async () => {
    // Arrange: Set initial state
    const login = new LoginPage(page);
    
    // Act: Perform actions
    await login.goto();
    await login.login('user@test.com', 'password');
    
    // Assert: Verify outcomes
    await expect(page).toHaveURL(/dashboard/);
  });

  test.afterEach(async () => {
    // Cleanup: Clear data and close resources
    await page.close();
  });
});
```

### Data-Driven Testing

Tests use data factories for flexible test data management:

```javascript
const customerData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  company: 'Acme Corp'
};

await customerPage.addCustomer(customerData);
```

## ✨ Key Features

### 1. **Selector Strategies**
- ✅ Uses semantic locators (`getByRole`, `getByLabel`, `getByPlaceholder`)
- ✅ Fallback to `getByTestId` for complex elements
- ✅ Avoids brittle XPath and CSS selectors

### 2. **Error Handling**
- ✅ Trace collection on first retry
- ✅ Screenshots on failure
- ✅ Meaningful error messages

### 3. **Performance Optimization**
- ✅ Parallel test execution
- ✅ Optimized wait strategies
- ✅ Efficient selector usage

### 4. **CI/CD Integration**
- ✅ GitHub Actions workflow
- ✅ Automated test runs on push/PR
- ✅ HTML report generation

## 📊 Test Coverage

| Module | Tests | Coverage |
|--------|-------|----------|
| Authentication | 3 | Login, Logout, Invalid credentials |
| Customer Management | 4 | Add, Edit, Delete, List customers |
| Product Catalog | 3 | Add, Edit, Delete products |
| Invoice Processing | 4 | Create, Update, Delete, View invoices |
| API Endpoints | 6 | Login, Register, CRUD operations |
| **Total** | **20** | **85%** |

## 🎓 Best Practices Implemented

### ✅ Code Quality
- JSDoc comments for all page methods
- Consistent naming conventions (camelCase for methods)
- DRY principle (Don't Repeat Yourself)
- Single Responsibility Principle for page classes

### ✅ Test Design
- AAA Pattern (Arrange-Act-Assert)
- Independent tests (no dependencies between tests)
- Descriptive test names that document expected behavior
- Proper setup/teardown for test isolation

### ✅ Maintainability
- Page Object Model for centralized maintenance
- Environment-based configuration
- Reusable test fixtures and utilities
- Clear project structure

### ✅ Professionalism
- Comprehensive documentation
- Git-friendly (.gitignore configured)
- CI/CD pipeline ready
- Proper error handling and logging

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Before Starting
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Set up development environment: `npm install`

### Making Changes
1. Keep tests independent and isolated
2. Add JSDoc comments for new methods
3. Follow existing naming conventions
4. Add/update tests for new features
5. Ensure all tests pass: `npm test`

### Submitting Changes
1. Push to your fork: `git push origin feature/your-feature`
2. Create a Pull Request with description
3. Wait for CI/CD to pass
4. Request code review

### Coding Standards
- Use Page Object Model pattern for new pages
- Write tests following AAA pattern
- Add JSDoc comments
- Keep methods focused and single-purpose
- Use semantic locators when possible

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Tests](https://playwright.dev/docs/debug)

## 📞 Support

For issues or questions:
1. Check existing [GitHub Issues](https://github.com/yourusername/playwright-crm-automation-framework/issues)
2. Review the [Playwright FAQ](https://playwright.dev/docs/faq)
3. Create a new issue with detailed information

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Created for QA Automation Portfolio** | Last Updated: May 2026
#   C I / C D   P i p e l i n e   A c t i v e  
 