const BASE_URL = 'http://localhost:5000/api';

class APIClient {
  constructor(request) {
    this.request = request;
  }

  async login(email, password) {
    return await this.request.post(`${BASE_URL}/auth/login`, {
      data: { email, password }
    });
  }

  async register(email, password) {
    return await this.request.post(`${BASE_URL}/auth/register`, {
      data: { email, password }
    });
  }

  async getCustomers() {
    return await this.request.get(`${BASE_URL}/customers`);
  }

  async getCustomer(id) {
    return await this.request.get(`${BASE_URL}/customers/${id}`);
  }

  async createCustomer(customer) {
    return await this.request.post(`${BASE_URL}/customers`, {
      data: customer
    });
  }

  async updateCustomer(id, customer) {
    return await this.request.put(`${BASE_URL}/customers/${id}`, {
      data: customer
    });
  }

  async deleteCustomer(id) {
    return await this.request.delete(`${BASE_URL}/customers/${id}`);
  }

  async getProducts() {
    return await this.request.get(`${BASE_URL}/products`);
  }

  async getProduct(id) {
    return await this.request.get(`${BASE_URL}/products/${id}`);
  }

  async createProduct(product) {
    return await this.request.post(`${BASE_URL}/products`, {
      data: product
    });
  }

  async updateProduct(id, product) {
    return await this.request.put(`${BASE_URL}/products/${id}`, {
      data: product
    });
  }

  async deleteProduct(id) {
    return await this.request.delete(`${BASE_URL}/products/${id}`);
  }
}

module.exports = { APIClient };
