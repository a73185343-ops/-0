import { db } from './db';
import { Product, Offer, Customer } from '@/types';

// دالة بسيطة لتوليد ID
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const seedDatabase = (): void => {
  // التحقق إذا كانت البيانات موجودة
  if (db.getProducts().length > 0) {
    console.log('✅ البيانات موجودة بالفعل');
    return;
  }

  console.log('🌱 جاري إضافة البيانات الابتدائية...');

  // ============ إضافة المنتجات ============
  const products: Product[] = [
    {
      id: generateUUID(),
      name: 'كعكة الشوكولاتة',
      description: 'كعكة حلوة بالشوكولاتة الداكنة اللذيذة',
      price: 50,
      image: 'https://via.placeholder.com/300?text=Chocolate+Cake',
      category: 'cakes',
      stock: 20,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: generateUUID(),
      name: 'كعكة الفانيليا',
      description: 'كعكة كلاسيكية بنكهة الفانيليا الطبيعية',
      price: 40,
      image: 'https://via.placeholder.com/300?text=Vanilla+Cake',
      category: 'cakes',
      stock: 25,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: generateUUID(),
      name: 'كعكة الفراولة',
      description: 'كعكة طازة مع الفراولة الحمراء',
      price: 60,
      image: 'https://via.placeholder.com/300?text=Strawberry+Cake',
      category: 'cakes',
      stock: 15,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: generateUUID(),
      name: 'كب كيك التوت',
      description: 'كب كيك طازج مع التوت الطبيعي',
      price: 30,
      image: 'https://via.placeholder.com/300?text=Berry+Cupcake',
      category: 'cupcakes',
      stock: 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: generateUUID(),
      name: 'كب كيك الشوكولاتة',
      description: 'كب كيك بالشوكولاتة مع الكريمة',
      price: 25,
      image: 'https://via.placeholder.com/300?text=Choco+Cupcake',
      category: 'cupcakes',
      stock: 40,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: generateUUID(),
      name: 'دونات الكاكاو',
      description: 'دونات ناعمة بطعم الكاكاو الغني',
      price: 20,
      image: 'https://via.placeholder.com/300?text=Cocoa+Donut',
      category: 'donuts',
      stock: 60,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  products.forEach(product => {
    db.addProduct(product);
  });
  console.log(`✅ تم إضافة ${products.length} منتجات`);

  // ============ إضافة العروض ============
  const offers: Offer[] = [
    {
      id: generateUUID(),
      title: 'عرض الصيف 🌞',
      description: 'خصم 20% على جميع الكعكات',
      discount: 20,
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      productIds: products.slice(0, 3).map(p => p.id),
      active: true,
      createdAt: new Date().toISOString()
    },
    {
      id: generateUUID(),
      title: 'عرض الكب كيك 🧁',
      description: 'خصم 15% على جميع الكب كيك',
      discount: 15,
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      productIds: products.slice(3, 5).map(p => p.id),
      active: true,
      createdAt: new Date().toISOString()
    }
  ];

  offers.forEach(offer => {
    db.addOffer(offer);
  });
  console.log(`✅ تم إضافة ${offers.length} عروض`);

  // ============ إضافة عملاء تجريبيين ============
  const customers: Customer[] = [
    {
      id: generateUUID(),
      email: 'ahmed@example.com',
      password: 'cGFzc3dvcmQxMjM=', // password123 مشفر بـ Base64
      name: 'أحمد علي',
      phone: '0123456789',
      address: 'شارع النيل',
      city: 'القاهرة',
      country: 'مصر',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: generateUUID(),
      email: 'fatima@example.com',
      password: 'cGFzc3dvcmQ0NTY=', // password456 مشفر بـ Base64
      name: 'فاطمة محمد',
      phone: '0987654321',
      address: 'شارع التحرير',
      city: 'الإسكندرية',
      country: 'مصر',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  customers.forEach(customer => {
    db.addCustomer(customer);
  });
  console.log(`✅ تم إضافة ${customers.length} عملاء`);

  console.log('🎉 تم إنشاء قاعدة البيانات بنجاح!');
};
