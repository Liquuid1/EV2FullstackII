import React from 'react';
import { ProductCard } from './ProductCard';
import './ProductGrid.css';

export const ProductGrid = ({ productos, agregarAlCarrito }) => {
  if (productos.length === 0) {
    return <p className="text-center text-muted">No se encontraron productos 😕</p>;
  }

  return (
    <div className="row">
      {productos.map((producto) => (
        <div key={producto.id} className="col-6 col-md-4 col-lg-3 mb-4">
          <ProductCard producto={producto} agregarAlCarrito={agregarAlCarrito} />
        </div>
      ))}
    </div>
  );
};
