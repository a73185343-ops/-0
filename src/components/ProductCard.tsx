import React, { useState } from 'react';
import { Product } from '@/types';
import '../styles/ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (product.stock > 0 && quantity > 0) {
      // يمكنك إضافة المنتج إلى سلة التسوق
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        
        <div className="price-stock">
          <span className="price">{product.price} ريال</span>
          <span className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `${product.stock} متوفر` : 'غير متوفر'}
          </span>
        </div>

        {product.stock > 0 && (
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))} />
            <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
          </div>
        )}

        <button
          className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {addedToCart ? '✅ تمت الإضافة' : 'أضف للسلة'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
