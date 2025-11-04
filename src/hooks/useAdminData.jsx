import { useState, useCallback } from 'react';

const BASE = 'https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2';

export const useAdminData = () => {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const fetchProductos = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/product`);
      const data = await res.json();
      if (Array.isArray(data)) setProductos(data);
    } catch (err) {
      console.error('fetchProductos error', err);
    }
  }, []);

  const fetchUsuarios = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/user`);
      const data = await res.json();
      if (Array.isArray(data)) setUsuarios(data);
    } catch (err) {
      console.error('fetchUsuarios error', err);
    }
  }, []);

  const agregarProducto = async (payload) => {
    try {
      const res = await fetch(`${BASE}/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchProductos();
        return true;
      }
      console.error('agregarProducto fallo', await res.text());
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const res = await fetch(`${BASE}/product/${id}`, { method: 'DELETE' });
      if (res.ok) setProductos(prev => prev.filter(p => p.id !== id));
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const modificarProducto = async (id, payload) => {
    try {
      const res = await fetch(`${BASE}/product/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchProductos();
        return true;
      }
      console.error('modificarProducto fallo', res.status);
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const agregarUsuario = async (payload) => {
    try {
      const res = await fetch(`${BASE}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchUsuarios();
        return true;
      }
      console.error('agregarUsuario fallo', await res.text());
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      const res = await fetch(`${BASE}/user/${id}`, { method: 'DELETE' });
      if (res.ok) setUsuarios(prev => prev.filter(u => u.id !== id));
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const modificarUsuario = async (id, payload) => {
    try {
      const res = await fetch(`${BASE}/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchUsuarios();
        return true;
      }
      console.error('modificarUsuario fallo', res.status);
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return {
    productos,
    usuarios,
    fetchProductos,
    fetchUsuarios,
    agregarProducto,
    eliminarProducto,
    modificarProducto,
    agregarUsuario,
    eliminarUsuario,
    modificarUsuario
  };
};