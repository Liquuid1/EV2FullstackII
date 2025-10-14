import React, { useState, useEffect } from 'react';
import './FiltroBar.css';

export const FiltroBar = ({ setFiltro, filtroActivo }) => {
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

  const manejarFiltro = (id) => {
    setFiltro(id);
    setFiltroActivo(id);
  };

  return (
    <div className="filtro-bar d-flex flex-wrap justify-content-center gap-2 mb-4">
      <button
        className={`btn filtro-btn ${filtroActivo === 'todos' ? 'active' : 'btn-outline-dark'}`}
        onClick={() => setFiltro('todos')}
      >
        Todos
      </button>

      {categorias.map((cat) => (
        <button
          key={cat.id}
          className={`btn filtro-btn ${filtroActivo === cat.id ? 'active' : 'btn-outline-dark'}`}
          onClick={() => setFiltro(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};
