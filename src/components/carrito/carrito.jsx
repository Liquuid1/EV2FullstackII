import React, { useEffect, useState } from 'react';
import './carrito.css';

export const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
  const handleFocus = () => {
    const stored = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(stored);
  };

  window.addEventListener('focus', handleFocus);
  return () => window.removeEventListener('focus', handleFocus);
}, []);


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(stored);
  }, []);

  useEffect(() => {
    const subtotal = carrito.reduce((acc, item) => acc + item.base_price, 0);
    setTotal(subtotal);
    console.log(subtotal);
  }, [carrito]);

  const eliminarProducto = (id) => {
    const actualizado = carrito.filter(item => item.id !== id);
    setCarrito(actualizado);
    localStorage.setItem('carrito', JSON.stringify(actualizado));
  };

  return (
    <div className="carrito-page container py-5">
      <h1 className="text-center mb-4">Tu carrito 🛒</h1>

      {carrito.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <div className="carrito-lista">
          {carrito.map((item) => (
            <div key={item.id} className="carrito-item">
              <img src={item.image.url} alt={item.title} />
              <div className="carrito-detalle">
                <h5>{item.title}</h5>
                <p>Talla: 39</p>
                <p>Cantidad: 1</p>
                <p>Precio: ${item.base_price.toLocaleString('es-CL')}</p>
                <button onClick={() => eliminarProducto(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}
          <div className="carrito-total">
            <h4>Total: ${total.toLocaleString('es-CL')}</h4>
            <button className="btn btn-checkout">Ir a pagar</button>
          </div>
        </div>
      )}
    </div>
  );
};
