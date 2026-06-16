import React, { useState } from 'react';
import { db } from '@/database/db';
import { Order } from '@/types';
import { generateId } from '@/utils/generateId';
import '../styles/OrderForm.css';

interface OrderFormProps {
  customerId: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ customerId }) => {
  const [items, setItems] = useState<any[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  const handleFetchOrders = () => {
    const customerOrders = db.getOrdersByCustomer(customerId);
    setOrders(customerOrders);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (items.length === 0) {
        setMessage('⚠️ يجب إضافة منتجات للطلب');
        return;
      }

      if (!deliveryAddress.trim()) {
        setMessage('⚠️ يجب إدخال عنوان التوصيل');
        return;
      }

      const totalPrice = items.reduce((sum: number, item: any) => sum + item.total, 0);

      const newOrder: Order = {
        id: generateId(),
        customerId,
        items,
        totalPrice,
        status: 'pending',
        deliveryAddress,
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const success = db.addOrder(newOrder);

      if (success) {
        setMessage(`✅ تم إنشاء الطلب بنجاح! معرّف الطلب: ${newOrder.id}`);
        setItems([]);
        setDeliveryAddress('');
        setNotes('');
        setTimeout(() => {
          handleFetchOrders();
          setMessage('');
        }, 2000);
      } else {
        setMessage('❌ حدث خطأ في إنشاء الطلب');
      }
    } catch (error) {
      setMessage('❌ حدث خطأ: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-container">
      <div className="order-form-section">
        <h2>إنشاء طلب جديد</h2>
        
        <form onSubmit={handleSubmitOrder}>
          <div className="form-group">
            <label>عنوان التوصيل *</label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="أدخل عنوان التوصيل الكامل"
              required
            />
          </div>

          <div className="form-group">
            <label>ملاحظات إضافية</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أي طلبات خاصة أو ملاحظات"
            />
          </div>

          <div className="form-group">
            <h3>المنتجات ({items.length})</h3>
            {items.length === 0 ? (
              <p className="empty-message">لم تضف أي منتجات بعد</p>
            ) : (
              <div className="items-list">
                {items.map((item, index) => (
                  <div key={index} className="item">
                    <span>{item.productName}</span>
                    <span>الكمية: {item.quantity}</span>
                    <span>المجموع: {item.total} ريال</span>
                    <button
                      type="button"
                      onClick={() => setItems(items.filter((_, i) => i !== index))}
                      className="remove-btn"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
          </button>
        </form>
      </div>

      <div className="orders-history-section">
        <h2>سجل الطلبات</h2>
        <button onClick={handleFetchOrders} className="fetch-btn">تحديث الطلبات</button>
        
        {orders.length === 0 ? (
          <p className="empty-message">لا توجد طلبات بعد</p>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">الطلب: {order.id}</span>
                  <span className={`status ${order.status}`}>{order.status}</span>
                </div>
                <div className="order-details">
                  <p>التاريخ: {new Date(order.createdAt).toLocaleDateString('ar-EG')}</p>
                  <p>المجموع: {order.totalPrice} ريال</p>
                  <p>التوصيل: {order.deliveryAddress}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
