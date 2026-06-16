# Sweet Shop - Local Database 🍰

متجر حلويات مع قاعدة بيانات محلية بدون أي ربط خارجي

## البنية الأساسية

✅ **Products** - المنتجات
✅ **Offers** - العروض والخصومات  
✅ **Customers** - بيانات العملاء
✅ **Orders** - الطلبات

## المميزات

- 💾 قاعدة بيانات محلية 100% (LocalStorage)
- 🔐 نظام تسجيل دخول وإنشاء حسابات
- 🛒 نظام طلبات متكامل
- 📦 إدارة المنتجات والعروض
- 🎨 تصميم احترافي مع دعم اللغة العربية

## التشغيل

```bash
# تثبيت المكتبات
npm install

# تشغيل المشروع
npm run dev

# البناء للإنتاج
npm run build
```

## هيكل المشروع

```
src/
├── components/          # مكونات React
│   ├── ProductList.tsx
│   ├── ProductCard.tsx
│   ├── OrderForm.tsx
│   └── CustomerForm.tsx
├── database/           # قاعدة البيانات المحلية
│   ├── db.ts          # نظام CRUD
│   ├── storage.ts     # تخزين LocalStorage
│   └── seedData.ts    # بيانات ابتدائية
├── styles/            # التصاميم
│   ├── App.css
│   ├── ProductList.css
│   ├── ProductCard.css
│   ├── OrderForm.css
│   └── CustomerForm.css
├── types/             # أنواع البيانات
│   └── index.ts
├── utils/             # دوال مساعدة
│   └── generateId.ts
└── App.tsx           # التطبيق الرئيسي
```

## البيانات الابتدائية

عند أول تشغيل، يتم إنشاء:
- 6 منتجات (كعكات، كب كيك، دونات)
- 2 عروض خاصة
- 2 عميل تجريبي

## الاستخدام

### تسجيل دخول تجريبي:
- **البريد:** ahmed@example.com
- **كلمة المرور:** password123

### أو إنشاء حساب جديد

---

📝 جميع البيانات محفوظة في LocalStorage على جهاز المستخدم
