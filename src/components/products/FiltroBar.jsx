import React, { useState, useEffect } from 'react';
import './FiltroBar.css';

export const FiltroBar = ({ setFiltro }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect (() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/category');
        const data = await response.json();
        setCategorias(data);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <div className="filtro-bar d-flex flex-wrap justify-content-center gap-2 mb-4">
      {categorias.map((cat) => (
        <button
          key={cat.id}
          className="btn btn-outline-dark filtro-btn"
          onClick={() => setFiltro(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};
