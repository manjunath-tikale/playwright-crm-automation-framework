const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./LoginPage');
const { CustomerPage } = require('./CustomerPage');
const { ProductPage } = require('./ProductPage');
const { InvoicesPage } = require('./InvoicesPage');

test('Complete Test', async ({ page }) => {

  const login = new LoginPage(page);
  const customer = new CustomerPage(page);
  const product = new ProductPage(page);
  const invoices = new InvoicesPage(page);
  await login.goto();
  await login.login('admin@admin.com', 'admin');

  await expect(page).toHaveURL(/dashboard/);

  await customer.addCustomer({
    name: 'Spider',
    email: 'spider@example.com',
    phone: '1234567890',
    company: 'TCS'
  });

  await expect(page.getByText('THANOS').first()).toBeVisible();

  await product.addProduct({
    name: 'iphone 17',
    sku: 'IP17',
    price: '500',
    stock: '100',
    category: 'Smartphones'
  });

    await product.addProduct({
    name: 'NOKIA',
    sku: 'NK78',
    price: '99',
    stock: '9',
    category: 'Smartphones'
  });

  await expect(page.getByText('iphone 17').first()).toBeVisible();
  await expect(page.getByText('NOKIA').first()).toBeVisible();

   await invoices.addInvoice({
    customer: 'Spider',
    amount: '500',
    dueDate: '2025-06-01',
    status: 'Paid'
  });

  await expect(page.getByText('Spider').first()).toBeVisible();
});