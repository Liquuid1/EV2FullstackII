import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ nombre: '', correo: '', rol: '' });

  const handleSubmit = () => {
    if (!form.nombre || !form.correo) {
      alert('Completa nombre y correo');
      return;
    }
    onSubmit({
      nombre: String(form.nombre),
      correo: String(form.correo),
      rol: String(form.rol)
    });
  };

  return (
    <div className="admin-form" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
      <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
      <input placeholder="Correo" value={form.correo} onChange={e => setForm({ ...form, correo: e.target.value })} />
      <input placeholder="Rol" value={form.rol} onChange={e => setForm({ ...form, rol: e.target.value })} />
      <button onClick={handleSubmit}>Agregar Usuario</button>
    </div>
  );
};

export default UserForm;