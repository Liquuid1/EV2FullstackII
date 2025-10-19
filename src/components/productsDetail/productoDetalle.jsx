import React, { useState, useEffect } from 'react';
import './productoDetalle.css';
import { useParams } from 'react-router-dom';

export const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState();
  const [talla, setTalla] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const tallasDisponibles = [38, 39, 40, 41, 42, 43, 44, 45];


  useEffect(() => {
    fetch(`https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/product/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error(err));
  }, [id]);
  console.log(id);
  console.log(producto);


  const agregarAlCarrito = () => {
    if (!talla) return alert('Selecciona una talla');

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevoItem = {
      id: producto.id,
      title: producto.title || producto.nombre || '',
      image: producto.image || producto.imagen || null,
      base_price: Number(producto.base_price || producto.precio || 0),
      talla: talla,
      cantidad: cantidad || 1,
    };

    const existenteIndex = carrito.findIndex(it => it.id === nuevoItem.id && String(it.talla) === String(nuevoItem.talla));
    if (existenteIndex >= 0) {
      carrito[existenteIndex].cantidad = (carrito[existenteIndex].cantidad || 1) + nuevoItem.cantidad;
    } else {
      carrito.push(nuevoItem);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
  };

  if (!producto) return <p className="text-center">Cargando producto...</p>;

  return (
    <div className="producto-detalle container py-5">
      <div className="detalle-card">
        <img src={producto.imagen} alt={producto.nombre} />
        <div className="detalle-info">
          <h2>{producto.nombre}</h2>
          <p className="precio">${producto.base_price.toLocaleString('es-CL') || "-"}</p>
          <p className="descripcion">{producto.descripcion}</p>

          <label>Talla:</label>
            <select value={talla} onChange={(e) => setTalla(e.target.value)}>
              <option value="">Selecciona</option>
              {tallasDisponibles.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
          <label>Cantidad:</label>
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
          />

          <button className="btn-agregar" onClick={agregarAlCarrito}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
