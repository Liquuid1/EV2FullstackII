import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import ProductItem from './ProductItem';

const ProductSection = ({ admin }) => {
  const { productos, fetchProductos, agregarProducto, eliminarProducto, modificarProducto } = admin;
  const [accion, setAccion] = useState('listar');

  useEffect(() => {
    if (accion === 'listar') fetchProductos();
  }, [accion, fetchProductos]);

  return (
    <section className="admin-section">
      <h3>Productos</h3>
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <button className={`admin-btn-main${accion === 'agregar' ? ' active' : ''}`} onClick={() => setAccion('agregar')}>Agregar</button>
        <button className={`admin-btn-main${accion === 'listar' ? ' active' : ''}`} onClick={() => setAccion('listar')}>Listar</button>
      </div>

      {accion === 'agregar' && (
        <ProductForm onSubmit={async (payload) => {
          const ok = await agregarProducto(payload);
          if (ok) setAccion('listar');
        }} />
      )}

      {accion === 'listar' && (
        <ul className="admin-list">
          {productos.map(p => (
            <ProductItem key={p.id} product={p} onDelete={() => eliminarProducto(p.id)} onSave={(datos) => modificarProducto(p.id, datos)} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductSection;