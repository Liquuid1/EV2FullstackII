import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductPreview.css';


export const ProductPreview = () => {
  const [productList, setProductList] = useState([]);
  
  useEffect(() => {
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/product')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProductList(data);
        } else {
          console.error('La respuesta de productos no es un array:', data);
          setProductList([]);
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);
  console.log(productList[0].image.url);

  return (
    <section className="product-preview-section">
      <h2 className="product-title">Lo más 🔥 del momento</h2>
      <div className="product-grid">
        {productList.slice(0, 3).map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.image.url} alt={product.title} className="product-image" />
            </div>
            <h3 className="product-name">{product.title}</h3>
            <p className="product-price">
              {new Intl.NumberFormat('es-CL', {
                style: 'currency',
                currency: 'CLP',
                minimumFractionDigits: 0,
              }).format(Number(product.base_price))}
            </p>
          </div>
        ))}
      </div>
      <Link to="/productos">
        <button className="product-button">Ver todos los productos</button>
      </Link>
    </section>
  );
}
