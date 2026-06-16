import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="product-list-container">
      <h2>المنتجات</h2>
      
      {categories.map(category => (
        <div key={category} className="category-section">
          <h3>{category === 'cakes' ? '🎂 الكعكات' : category === 'cupcakes' ? '🧁 الكب كيك' : '🍩 الدونات'}</h3>
          <div className="products-grid">
            {products
              .filter(p => p.category === category)
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
