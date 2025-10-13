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

        // Asegurarse de que los datos estén en formato de array
        const productosAdaptados = Array.isArray(data)
          ? data.map((item) => ({
              id: item.id,
              title: item.title,
              price: item.base_price,
              description: item.description,
              imagen: item.imagen || 'https://storage.googleapis.com/x8ki-letl-twmt.n7.xano.io/vault/UHIZ7yLi/VA5fKOFhqmLuNPf8TvFBSQU4Pus/LXrZbA../96b99b4a/adg.jpg',
              category_id: item.category_id,
            }))
          : [];

        setProductos(productosAdaptados);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const agregarAlCarrito = (producto) => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const nuevoItem = {
    id: producto.id,
    nombre: producto.title,
    imagen: producto.imagen,
    precio: producto.price,
    talla: null,
    cantidad: 1,
  };
  localStorage.setItem('carrito', JSON.stringify([...carrito, nuevoItem]));
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

      <FiltroBar setFiltro={setFiltro} />

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
