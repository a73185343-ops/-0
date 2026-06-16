import { Product, Offer, Customer, Order } from '@/types';
import { saveToStorage, getFromStorage } from './storage';

// ============ قاعدة البيانات المحلية ============

class LocalDatabase {
  private productsKey = 'products';
  private offersKey = 'offers';
  private customersKey = 'customers';
  private ordersKey = 'orders';
  private currentUserKey = 'current_user';
  private STORAGE_PREFIX = 'sweet_shop_';

  // ============ المنتجات ============

  getProducts(): Product[] {
    return getFromStorage(this.productsKey, []);
  }

  getProductById(id: string): Product | null {
    const products = this.getProducts();
    return products.find(p => p.id === id) || null;
  }

  getProductsByCategory(category: string): Product[] {
    const products = this.getProducts();
    return products.filter(p => p.category === category);
  }

  addProduct(product: Product): boolean {
    try {
      const products = this.getProducts();
      const exists = products.find(p => p.id === product.id);
      if (exists) {
        console.warn('⚠️ المنتج موجود بالفعل');
        return false;
      }
      products.push(product);
      saveToStorage(this.productsKey, products);
      return true;
    } catch (error) {
      console.error('❌ خطأ في إضافة المنتج:', error);
      return false;
    }
  }

  updateProduct(id: string, updates: Partial<Product>): boolean {
    try {
      const products = this.getProducts();
      const index = products.findIndex(p => p.id === id);
      if (index === -1) {
        console.warn('⚠️ المنتج غير موجود');
        return false;
      }
      products[index] = {
        ...products[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      saveToStorage(this.productsKey, products);
      return true;
    } catch (error) {
      console.error('❌ خطأ في تحديث المنتج:', error);
      return false;
    }
  }

  deleteProduct(id: string): boolean {
    try {
      const products = this.getProducts();
      const filtered = products.filter(p => p.id !== id);
      if (filtered.length === products.length) {
        console.warn('⚠️ المنتج غير موجود');
        return false;
      }
      saveToStorage(this.productsKey, filtered);
      return true;
    } catch (error) {
      console.error('❌ خطأ في حذف المنتج:', error);
      return false;
    }
  }

  // ============ العروض ============

  getOffers(): Offer[] {
    return getFromStorage(this.offersKey, []);
  }

  getActiveOffers(): Offer[] {
    const offers = this.getOffers();
    const now = new Date().toISOString();
    return offers.filter(
      o => o.active && o.validFrom <= now && o.validUntil >= now
    );
  }

  getOfferById(id: string): Offer | null {
    const offers = this.getOffers();
    return offers.find(o => o.id === id) || null;
  }

  addOffer(offer: Offer): boolean {
    try {
      const offers = this.getOffers();
      const exists = offers.find(o => o.id === offer.id);
      if (exists) {
        console.warn('⚠️ العرض موجود بالفعل');
        return false;
      }
      offers.push(offer);
      saveToStorage(this.offersKey, offers);
      return true;
    } catch (error) {
      console.error('❌ خطأ في إضافة العرض:', error);
      return false;
    }
  }

  updateOffer(id: string, updates: Partial<Offer>): boolean {
    try {
      const offers = this.getOffers();
      const index = offers.findIndex(o => o.id === id);
      if (index === -1) {
        console.warn('⚠️ العرض غير موجود');
        return false;
      }
      offers[index] = { ...offers[index], ...updates };
      saveToStorage(this.offersKey, offers);
      return true;
    } catch (error) {
      console.error('❌ خطأ في تحديث العرض:', error);
      return false;
    }
  }

  deleteOffer(id: string): boolean {
    try {
      const offers = this.getOffers();
      const filtered = offers.filter(o => o.id !== id);
      if (filtered.length === offers.length) {
        console.warn('⚠️ العرض غير موجود');
        return false;
      }
      saveToStorage(this.offersKey, filtered);
      return true;
    } catch (error) {
      console.error('❌ خطأ في حذف العرض:', error);
      return false;
    }
  }

  // ============ العملاء ============

  getCustomers(): Customer[] {
    return getFromStorage(this.customersKey, []);
  }

  getCustomerById(id: string): Customer | null {
    const customers = this.getCustomers();
    return customers.find(c => c.id === id) || null;
  }

  getCustomerByEmail(email: string): Customer | null {
    const customers = this.getCustomers();
    return customers.find(c => c.email === email) || null;
  }

  addCustomer(customer: Customer): boolean {
    try {
      const customers = this.getCustomers();
      const exists = customers.find(c => c.email === customer.email);
      if (exists) {
        console.warn('⚠️ العميل موجود بالفعل');
        return false;
      }
      customers.push(customer);
      saveToStorage(this.customersKey, customers);
      return true;
    } catch (error) {
      console.error('❌ خطأ في إضافة العميل:', error);
      return false;
    }
  }

  updateCustomer(id: string, updates: Partial<Customer>): boolean {
    try {
      const customers = this.getCustomers();
      const index = customers.findIndex(c => c.id === id);
      if (index === -1) {
        console.warn('⚠️ العميل غير موجود');
        return false;
      }
      customers[index] = {
        ...customers[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      saveToStorage(this.customersKey, customers);
      return true;
    } catch (error) {
      console.error('❌ خطأ في تحديث العميل:', error);
      return false;
    }
  }

  deleteCustomer(id: string): boolean {
    try {
      const customers = this.getCustomers();
      const filtered = customers.filter(c => c.id !== id);
      if (filtered.length === customers.length) {
        console.warn('⚠️ العميل غير موجود');
        return false;
      }
      saveToStorage(this.customersKey, filtered);
      return true;
    } catch (error) {
      console.error('❌ خطأ في حذف العميل:', error);
      return false;
    }
  }

  // التحقق من بيانات المستخدم (تسجيل الدخول)
  validateCustomer(email: string, password: string): Customer | null {
    const customer = this.getCustomerByEmail(email);
    if (customer && customer.password === this.hashPassword(password)) {
      return customer;
    }
    return null;
  }

  // دالة بسيطة للتشفير (استخدم مكتبة حقيقية في الإنتاج)
  private hashPassword(password: string): string {
    return btoa(password); // Base64 encoding (غير آمن - للاختبار فقط)
  }

  getCurrentUser(): Customer | null {
    return getFromStorage(this.currentUserKey, null);
  }

  setCurrentUser(customer: Customer | null): void {
    if (customer) {
      saveToStorage(this.currentUserKey, customer);
    } else {
      localStorage.removeItem(`${this.STORAGE_PREFIX}${this.currentUserKey}`);
    }
  }

  // ============ الطلبات ============

  getOrders(): Order[] {
    return getFromStorage(this.ordersKey, []);
  }

  getOrderById(id: string): Order | null {
    const orders = this.getOrders();
    return orders.find(o => o.id === id) || null;
  }

  getOrdersByCustomer(customerId: string): Order[] {
    const orders = this.getOrders();
    return orders.filter(o => o.customerId === customerId);
  }

  addOrder(order: Order): boolean {
    try {
      const orders = this.getOrders();
      orders.push(order);
      saveToStorage(this.ordersKey, orders);
      return true;
    } catch (error) {
      console.error('❌ خطأ في إضافة الطلب:', error);
      return false;
    }
  }

  updateOrder(id: string, updates: Partial<Order>): boolean {
    try {
      const orders = this.getOrders();
      const index = orders.findIndex(o => o.id === id);
      if (index === -1) {
        console.warn('⚠️ الطلب غير موجود');
        return false;
      }
      orders[index] = {
        ...orders[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      saveToStorage(this.ordersKey, orders);
      return true;
    } catch (error) {
      console.error('❌ خطأ في تحديث الطلب:', error);
      return false;
    }
  }

  deleteOrder(id: string): boolean {
    try {
      const orders = this.getOrders();
      const filtered = orders.filter(o => o.id !== id);
      if (filtered.length === orders.length) {
        console.warn('⚠️ الطلب غير موجود');
        return false;
      }
      saveToStorage(this.ordersKey, filtered);
      return true;
    } catch (error) {
      console.error('❌ خطأ في حذف الطلب:', error);
      return false;
    }
  }
}

// تصدير نسخة واحدة من قاعدة البيانات
export const db = new LocalDatabase();
