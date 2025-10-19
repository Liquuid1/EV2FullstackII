import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductPreview.css';


export const ProductPreview = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Try using cached preview to avoid refetching on every visit
    const cached = sessionStorage.getItem('productPreview');
    if (cached) {
      try {
        setProductList(JSON.parse(cached));
      } catch (e) { setProductList([]); }
      setLoading(false);
      return;
    }

    fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/product')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const preview = data.slice(0, 3);
          setProductList(preview);
          try { sessionStorage.setItem('productPreview', JSON.stringify(preview)); } catch(e){}
        } else {
          console.error('La respuesta de productos no es un array:', data);
          setProductList([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProductList([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="product-preview-section">
      <h2 className="product-title">Lo más 🔥 del momento</h2>
      <div className="product-grid">
        {loading ? (
          // Simple loading placeholders
          [1,2,3].map((i) => (
            <div key={i} className="product-card placeholder">
              <div className="product-image-wrapper" style={{background:'#f0f0f0',height:140}} />
              <h3 className="product-name">Cargando...</h3>
              <p className="product-price">&nbsp;</p>
            </div>
          ))
        ) : (
          productList.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img loading="lazy" src={(product.image && product.image.url) ? product.image.url : '/placeholder.png'} alt={product.title || 'producto'} className="product-image" />
              </div>
              <h3 className="product-name">{product.title}</h3>
              <p className="product-price">
                {new Intl.NumberFormat('es-CL', {
                  style: 'currency',
                  currency: 'CLP',
                  minimumFractionDigits: 0,
                }).format(Number(product.base_price || 0))}
              </p>
            </div>
          ))
        )}
      </div>
      <Link to="/products">
        <button className="product-button">Ver todos los productos</button>
      </Link>
    </section>
  );
}
