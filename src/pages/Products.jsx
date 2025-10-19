import React, { useState, useEffect } from 'react';
import { FiltroBar } from '../components/products/FiltroBar';
import { Search } from '../components/products/Search';
import { ProductGrid } from '../components/products/ProductGrid';
import './Products.css';

export const Products = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Consumir el endpoint al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/product');
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const agregarAlCarrito = (producto, talla) => {
    if (!talla) return alert('Selecciona una talla');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Crear item estándar
    const item = {
      id: producto.id,
      title: producto.title || producto.nombre || '',
      image: producto.image || producto.imagen || null,
      base_price: Number(producto.base_price || producto.precio || 0),
      talla: talla,
      cantidad: 1
    };

    // Si ya existe el mismo producto con misma talla, incrementar cantidad
    const existenteIndex = carrito.findIndex(it => it.id === item.id && String(it.talla) === String(item.talla));
    if (existenteIndex >= 0) {
      carrito[existenteIndex].cantidad = (carrito[existenteIndex].cantidad || 1) + 1;
    } else {
      carrito.push(item);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
  };

  // 🔍 Filtrar productos según búsqueda y categoría
  const productosFiltrados = productos.filter((p) => {
    const coincideBusqueda = p.title.toLowerCase().includes(busqueda.toLowerCase());
    const coincideFiltro =
      filtro === 'todos' || p.category_id === filtro || p.category_id === parseInt(filtro);
    return coincideBusqueda && coincideFiltro;
  });

  return (
    <div className="container-fluid mt-5 productos-page">
      <h1 className="text-center mb-4">Productos 🔥</h1>
      <p className="text-center mb-5">Encuentra tu estilo, camina con actitud.</p>

      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <Search setBusqueda={setBusqueda} />
        </div>
      </div>
      <FiltroBar setFiltro={setFiltro} filtroActivo={filtro} />

      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : (
        <ProductGrid productos={productosFiltrados} agregarAlCarrito={agregarAlCarrito} />
      )}
    </div>
  );
};
