import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';


export const ProductCard = ({ producto, agregarAlCarrito }) => {

  return (
    <div className="card product-card h-100 shadow-sm">
      <Link to={`/producto/${producto.id}`} className="text-decoration-none text-dark">
        <img
          src={producto.image.url || '/img/default.jpg'}
          alt={producto.title}
          className="card-img-top"
        />
        <h5 className="card-title mt-2">{producto.title}</h5>
      </Link>
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{producto.title}</h5>
        <p className="card-text text-muted">{producto.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold">${producto.base_price.toLocaleString('es-CL')}</span>
          <button
            className="btn btn-success btn-sm"
            onClick={() => agregarAlCarrito(producto)}
          >
            Agregar 🛒
          </button>
        </div>
      </div>
    </div>
  );
};
