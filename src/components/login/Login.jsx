import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:cRiGHljp/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Guardar token o datos si es necesario
      localStorage.setItem('user', JSON.stringify(data));

      const token = data.authToken
      localStorage.setItem('token', token);

      const user = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:cRiGHljp/auth/me', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const userData = await user.json();

      if (!user.ok) {
        throw new Error(userData.message || 'Error al obtener datos del usuario');
      }

      // Guardar datos del usuario si es necesario
      localStorage.setItem('userData', JSON.stringify(userData));

      // Redirigir según el ID
      if (userData.id === 17) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page container py-5">
      <h1 className="text-center mb-4">Iniciar sesión</h1>
      <form className="login-form mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-danger text-center">{error}</p>}
        <button type="submit" className="btn w-100">Entrar</button>
      </form>
    </div>
  );
};
