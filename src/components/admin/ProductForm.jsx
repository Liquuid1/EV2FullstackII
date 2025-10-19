import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    sku_base: '',
    title: '',
    slug: '',
    description: '',
    brand: '',
    base_price: 0
  });

  const handleSubmit = () => {
    if (!form.sku_base || !form.title) {
      alert('Completa los campos requeridos');
      return;
    }
    onSubmit({
      sku_base: String(form.sku_base),
      title: String(form.title),
      slug: String(form.slug),
      description: String(form.description),
      brand: String(form.brand),
      base_price: Number(form.base_price)
    });
  };

  return (
    <div className="admin-form" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
      <input placeholder="SKU Base" value={form.sku_base} onChange={e => setForm({ ...form, sku_base: e.target.value })} />
      <input placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
      <input placeholder="Descripción" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Marca" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
      <input placeholder="Precio base" type="number" value={form.base_price} onChange={e => setForm({ ...form, base_price: Number(e.target.value) })} />
      <button onClick={handleSubmit}>Agregar Producto</button>
    </div>
  );
};

export default ProductForm;