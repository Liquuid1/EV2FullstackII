import React, { useState } from 'react';

const ProductItem = ({ product, onDelete, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [p, setP] = useState({
    sku_base: product.sku_base || '',
    title: product.title || '',
    slug: product.slug || '',
    description: product.description || '',
    brand: product.brand || '',
    base_price: product.base_price || 0
  });

  return (
    <li>
      {editing ? (
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <input value={p.sku_base} onChange={e => setP({ ...p, sku_base: e.target.value })} />
          <input value={p.title} onChange={e => setP({ ...p, title: e.target.value })} />
          <input value={p.slug} onChange={e => setP({ ...p, slug: e.target.value })} />
          <input value={p.description} onChange={e => setP({ ...p, description: e.target.value })} />
          <input value={p.brand} onChange={e => setP({ ...p, brand: e.target.value })} />
          <input type="number" value={p.base_price} onChange={e => setP({ ...p, base_price: Number(e.target.value) })} />
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <button className="save-btn" onClick={async () => { await onSave(p); setEditing(false); }}>Guardar</button>
            <button className="cancel-btn" onClick={() => setEditing(false)}>Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          <b>{product.title}</b> - {product.brand} - ${product.base_price} <br/>
          <span style={{fontSize:'0.95em',color:'#0077b6'}}>{product.description}</span>
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <button onClick={onDelete}>Eliminar</button>
            <button className="edit-btn" onClick={() => setEditing(true)}>Editar</button>
          </div>
        </>
      )}
    </li>
  );
};

export default ProductItem;