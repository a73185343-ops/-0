// ============ المنتجات ============
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

// ============ العروض ============
export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number; // النسبة المئوية
  validFrom: string;
  validUntil: string;
  productIds: string[];
  active: boolean;
  createdAt: string;
}

// ============ العملاء ============
export interface Customer {
  id: string;
  email: string;
  password?: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

// ============ الطلبات ============
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
