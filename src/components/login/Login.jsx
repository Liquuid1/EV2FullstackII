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

      // Guardar token y pedir datos del usuario para obtener el role
      const token = data.authToken || data.token || (data?.tokenValue) || null;
      if (token) localStorage.setItem('token', token);

      const meRes = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:cRiGHljp/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const userData = await meRes.json();
      if (!meRes.ok) throw new Error(userData.message || 'Error al obtener datos del usuario');

      // Guardar datos de usuario incluyendo el role
      // Normalize: user may be nested in userData.user or userData.data
      const savedUser = userData.user || userData.data || userData;
      localStorage.setItem('user', JSON.stringify(savedUser));
      localStorage.setItem('userData', JSON.stringify(userData));

      // Detect role in multiple possible shapes
      let roleVal = '';
      if (savedUser.role) {
        if (typeof savedUser.role === 'string') roleVal = savedUser.role;
        else if (savedUser.role.name) roleVal = savedUser.role.name;
      }
      if (!roleVal && savedUser.role_id) roleVal = String(savedUser.role_id);
      if (!roleVal && savedUser.roles && Array.isArray(savedUser.roles) && savedUser.roles[0]) {
        roleVal = savedUser.roles[0].name || savedUser.roles[0].role || '';
      }
      // Fallback: some APIs return email under different fields
      const emailCandidate = (savedUser.email || savedUser.email_address || savedUser.correo || savedUser.username || '').toString().toLowerCase();
      // If role not detected but email matches known admin, assume admin
      if (!roleVal && emailCandidate === 'admin@snkrhood.com') {
        roleVal = 'administrador';
      }
      roleVal = (roleVal || '').toString().toLowerCase();
      localStorage.setItem('role', roleVal);

      // Decide admin by role or by specific id fallback
      const isAdmin = roleVal.includes('admin') || roleVal === '1' || roleVal.includes('administrador') || (savedUser.id === 23) || (userData.id === 23);

      // notify listeners and redirect accordingly
      try { window.dispatchEvent(new Event('authChanged')); } catch (e) {}
      if (isAdmin) navigate('/admin'); else navigate('/cliente');
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
