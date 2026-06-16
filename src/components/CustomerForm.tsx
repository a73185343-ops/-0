import React, { useState } from 'react';
import { db } from '@/database/db';
import { Customer } from '@/types';
import { generateId } from '@/utils/generateId';
import '../styles/CustomerForm.css';

interface CustomerFormProps {
  onUserLogin: (user: Customer) => void;
  currentUser: Customer | null;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onUserLogin, currentUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!email || !password) {
        setMessage('⚠️ يجب إدخال البريد الإلكتروني وكلمة المرور');
        return;
      }

      const user = db.validateCustomer(email, password);
      if (user) {
        onUserLogin(user);
        setMessage('✅ تم تسجيل الدخول بنجاح');
        setEmail('');
        setPassword('');
      } else {
        setMessage('❌ البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (error) {
      setMessage('❌ حدث خطأ: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!email || !password || !name) {
        setMessage('⚠️ يجب ملء جميع الحقول المطلوبة');
        return;
      }

      const newCustomer: Customer = {
        id: generateId(),
        email,
        password: btoa(password), // تشفير بسيط للاختبار
        name,
        phone,
        address,
        city,
        country,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const success = db.addCustomer(newCustomer);
      if (success) {
        setMessage('✅ تم إنشاء الحساب بنجاح');
        setTimeout(() => {
          onUserLogin(newCustomer);
        }, 1000);
        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
        setAddress('');
        setCity('');
        setCountry('');
      } else {
        setMessage('❌ هذا البريد الإلكتروني مسجل بالفعل');
      }
    } catch (error) {
      setMessage('❌ حدث خطأ: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (currentUser) {
    return (
      <div className="profile-container">
        <h2>الملف الشخصي</h2>
        <div className="profile-card">
          <p><strong>الاسم:</strong> {currentUser.name}</p>
          <p><strong>البريد الإلكتروني:</strong> {currentUser.email}</p>
          <p><strong>الهاتف:</strong> {currentUser.phone}</p>
          <p><strong>العنوان:</strong> {currentUser.address}</p>
          <p><strong>المدينة:</strong> {currentUser.city}</p>
          <p><strong>الدولة:</strong> {currentUser.country}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          className={`tab ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          تسجيل الدخول
        </button>
        <button
          className={`tab ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          إنشاء حساب
        </button>
      </div>

      {isLogin ? (
        <form onSubmit={handleLogin} className="auth-form">
          <h3>تسجيل الدخول</h3>
          
          <div className="form-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'جاري...' : 'دخول'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="auth-form">
          <h3>إنشاء حساب جديد</h3>
          
          <div className="form-group">
            <label>الاسم *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك"
              required
            />
          </div>

          <div className="form-group">
            <label>البريد الإلكتروني *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>كلمة المرور *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label>الهاتف</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0123456789"
            />
          </div>

          <div className="form-group">
            <label>العنوان</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="شارعك ورقمك"
            />
          </div>

          <div className="form-group">
            <label>المدينة</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="مدينتك"
            />
          </div>

          <div className="form-group">
            <label>الدولة</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="دولتك"
            />
          </div>

          {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'جاري...' : 'إنشاء حساب'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CustomerForm;
