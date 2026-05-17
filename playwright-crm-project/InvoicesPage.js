/**
 * Invoices Page Object Model
 * Handles all invoice management related interactions
 */
class InvoicesPage {
    /**
     * Initialize InvoicesPage with Playwright page object
     * @param {import('@playwright/test').Page} page - Playwright page instance
     */
    constructor(page) {
        this.page = page;
        
        // Navigation and buttons
        this.navInvoices = page.getByTestId('nav-invoices');
        this.addBtn = page.getByRole('button', { name: /New Invoice/i });
        
        // Form fields
        this.customerName = page.getByPlaceholder(/Customer name/i);
        this.amount = page.getByPlaceholder(/0.00/i);
        this.dueDate = page.getByTestId('invoice-duedate');
        this.status = page.getByTestId('invoice-status');

        // Action buttons
        this.createInvoiceBtn = page.getByRole('button', { name: /Create Invoice/i });
        this.deleteBtn = page.getByRole('button', { name: /Delete/i }).first();
    }

    /**
     * Navigate to invoices section
     * @async
     * @returns {Promise<void>}
     */
    async navigateToInvoices() {
        await this.navInvoices.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Open new invoice form
     * @async
     * @returns {Promise<void>}
     */
    async openNewInvoiceForm() {
        await this.addBtn.click();
    }

    /**
     * Add a new invoice with provided data
     * @async
     * @param {Object} data - Invoice data
     * @param {string} data.customer - Customer name
     * @param {string} data.amount - Invoice amount
     * @param {string} data.dueDate - Invoice due date (YYYY-MM-DD)
     * @param {string} data.status - Invoice status
     * @returns {Promise<void>}
     */
    async addInvoice(data) {
        await this.navigateToInvoices();
        await this.openNewInvoiceForm();
        
        await this.customerName.fill(data.customer);
        await this.amount.fill(data.amount);
        await this.dueDate.fill(data.dueDate);
        await this.status.selectOption(data.status);
        
        await this.createInvoiceBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Delete the first invoice in the list
     * @async
     * @returns {Promise<void>}
     */
    async deleteInvoice() {
        await this.deleteBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Verify invoice is visible
     * @async
     * @param {string} customerName - Customer name to verify
     * @returns {Promise<boolean>} True if customer name is visible
     */
    async isInvoiceVisible(customerName) {
        return await this.page.getByText(customerName).isVisible().catch(() => false);
    }
}

module.exports = { InvoicesPage };