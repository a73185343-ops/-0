import React, { useState, useEffect } from 'react';
import { db } from '@/database/db';
import { seedDatabase } from '@/database/seedData';
import { Product, Customer } from '@/types';
import ProductList from '@/components/ProductList';
import OrderForm from '@/components/OrderForm';
import CustomerForm from '@/components/CustomerForm';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'orders' | 'profile'>('home');
  const [currentUser, setCurrentUser] = useState<Customer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // تهيئة قاعدة البيانات عند التحميل
  useEffect(() => {
    try {
      seedDatabase();
      setProducts(db.getProducts());
      const user = db.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('خطأ في تحميل البيانات:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    db.setCurrentUser(null);
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleUserLogin = (user: Customer) => {
    setCurrentUser(user);
    db.setCurrentUser(user);
    setCurrentPage('home');
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>جاري تحميل البيانات...</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🍰 متجر الحلويات</h1>
        <nav className="navbar">
          <button onClick={() => setCurrentPage('home')}>الرئيسية</button>
          <button onClick={() => setCurrentPage('products')}>المنتجات</button>
          {currentUser ? (
            <>
              <button onClick={() => setCurrentPage('orders')}>الطلبات</button>
              <button onClick={() => setCurrentPage('profile')}>الملف الشخصي</button>
              <button onClick={handleLogout} className="logout-btn">تسجيل خروج</button>
              <span className="user-name">مرحباً {currentUser.name}</span>
            </>
          ) : (
            <button onClick={() => setCurrentPage('profile')}>تسجيل دخول</button>
          )}
        </nav>
      </header>

      <main className="main-content">
        {currentPage === 'home' && (
          <section className="home">
            <h2>مرحباً بك في متجرنا</h2>
            <p>نقدم أفضل الحلويات والمعجنات الطازة</p>
            <button onClick={() => setCurrentPage('products')} className="btn-primary">
              تصفح المنتجات
            </button>
          </section>
        )}

        {currentPage === 'products' && <ProductList products={products} />}

        {currentPage === 'orders' && currentUser && (
          <OrderForm customerId={currentUser.id} />
        )}

        {currentPage === 'profile' && (
          <CustomerForm onUserLogin={handleUserLogin} currentUser={currentUser} />
        )}
      </main>

      <footer className="footer">
        <p>© 2024 متجر الحلويات. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}

export default App;
