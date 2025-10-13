import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';


export const ProductCard = ({ producto, agregarAlCarrito }) => {
  const { title, price, imagen, description } = producto;

  return (
    <div className="card product-card h-100 shadow-sm">
      <Link to={`/producto/${producto.id}`} className="text-decoration-none text-dark">
        <img
          src={imagen || '/img/default.jpg'}
          alt={title}
          className="card-img-top"
        />
        <h5 className="card-title mt-2">{title}</h5>
      </Link>
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-muted">{description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold">${price.toLocaleString('es-CL')}</span>
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
