# Contributing to Playwright CRM Automation Framework

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 📋 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on code quality and maintainability

## 🚀 Getting Started

### 1. Fork and Clone
```bash
git clone https://github.com/yourusername/playwright-crm-automation-framework.git
cd playwright-crm-automation-framework
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Set Up Development Environment
```bash
npm install
npx playwright install
cp .env.example .env
```

## 📝 Making Changes

### Code Style

- Follow existing naming conventions
- Use camelCase for variables and methods
- Use UPPER_CASE for constants
- Write JSDoc comments for all public methods
- Keep methods focused and single-purpose

### Page Object Model

When adding new pages:

```javascript
/**
 * Page description
 */
class NewPage {
  constructor(page) {
    this.page = page;
    // Selectors here
  }

  /**
   * Method description
   * @async
   * @param {type} param - Parameter description
   * @returns {Promise<type>} Return description
   */
  async methodName(param) {
    // Implementation
  }
}
```

### Writing Tests

Tests should follow the AAA pattern:

```javascript
test('Should do something', async ({ page }) => {
  // Arrange
  const data = TestDataFactory.generateData();

  // Act
  await page.performAction(data);

  // Assert
  await expect(result).toBeTruthy();
});
```

### Test Structure

- One assertion per test when possible
- Use descriptive test names
- Setup/teardown for each test
- Independent tests (no dependencies)

## 🧪 Testing

Before submitting a PR:

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test auth.spec.js

# Run in debug mode
npm run test:debug

# View report
npm run test:report
```

## 📦 Committing Changes

### Commit Messages

```
type(scope): brief description

Detailed explanation of changes (if needed)
- Bullet point 1
- Bullet point 2
```

**Types:** feat, fix, docs, style, refactor, test, chore

**Examples:**
```
feat(customer): Add customer search functionality
fix(login): Resolve login timeout issue
docs(readme): Update installation instructions
```

## 🔄 Pull Request Process

1. **Update your branch**: `git pull origin main`
2. **Run tests locally**: `npm test`
3. **Push changes**: `git push origin feature/your-feature`
4. **Create PR** with description of changes
5. **Link related issues**: Use `closes #123`
6. **Wait for review** and CI/CD to pass
7. **Address feedback** and update PR
8. **Merge** when approved

### PR Checklist

- [ ] Tests pass locally
- [ ] All new methods have JSDoc comments
- [ ] No hard-coded credentials
- [ ] Environment variables used for configuration
- [ ] Updated relevant documentation
- [ ] Follows code style guidelines
- [ ] No unnecessary dependencies added

## 🎯 Adding New Features

### New Test Suite

1. Create test file: `playwright-crm-project/tests/feature.spec.js`
2. Implement tests using AAA pattern
3. Use `TestDataFactory` for test data
4. Add JSDoc comments
5. Update README with new test coverage

### New Page Object

1. Create page file: `playwright-crm-project/pages/NewPage.js`
2. Implement all selectors and methods
3. Add JSDoc comments for every method
4. Use semantic locators (getByRole, etc.)
5. Test with existing tests

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Semantic HTML](https://www.w3.org/WAI/WCAG21/Techniques/html/)

## 🐛 Reporting Issues

When reporting bugs, include:

- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshot/video if applicable
- Playwright version
- Browser and OS

## ❓ Questions?

- Check existing [issues](https://github.com/yourusername/playwright-crm-automation-framework/issues)
- Review [README](README.md)
- Check [Playwright docs](https://playwright.dev)

---

**Thank you for contributing!** 🎉
