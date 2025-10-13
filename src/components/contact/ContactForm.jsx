import React, { useState } from 'react';
import './ContactForm.css';
export const ContactForm = () => {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', form);
    // Aquí puedes integrar con tu backend o servicio de correo
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" name="nombre" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input type="email" name="email" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Mensaje</label>
        <textarea name="mensaje" className="form-control" rows="4" onChange={handleChange} required></textarea>
      </div>
      <button type="submit" className="btn btn-dark w-100">Enviar</button>
    </form>
  );
};

