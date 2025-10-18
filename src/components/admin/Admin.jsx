import React, { useState, useEffect } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../../utils/auth';

export const Admin = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const user = getCurrentUser();

  // Estados para productos y usuarios
  // Estado para la sección activa
=======
>>>>>>> origin/main
  const [seccion, setSeccion] = useState('');
  const [accionProducto, setAccionProducto] = useState('listar');
  const [accionUsuario, setAccionUsuario] = useState('listar');

  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Estados para formularios (solo campos requeridos para la API)
  const [nuevoProducto, setNuevoProducto] = useState({
    sku_base: '',
    title: '',
    slug: '',
    description: '',
    brand: '',
    base_price: 0
  });

  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', correo: '', rol: '' });

  // Estados para edición en línea
  const [editandoProductoId, setEditandoProductoId] = useState(null);
  const [productoEditado, setProductoEditado] = useState({ sku_base: '', title: '', slug: '', description: '', brand: '', base_price: 0 });

  const [editandoUsuarioId, setEditandoUsuarioId] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState({ nombre: '', correo: '', rol: '' });

  // Cargar datos cuando corresponda
  useEffect(() => {
    if (seccion === 'productos' && accionProducto === 'listar') {
      fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/product')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setProductos(data);
        })
        .catch(err => console.error('Error al cargar productos:', err));
    }

    if (seccion === 'usuarios' && accionUsuario === 'listar') {
      fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/user')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setUsuarios(data);
        })
        .catch(err => console.error('Error al cargar usuarios:', err));
    }
  }, [seccion, accionProducto, accionUsuario]);

  // Agregar producto: enviar solo el esquema requerido por la API
  const agregarProducto = async () => {
    const { sku_base, title, slug, description, brand, base_price } = nuevoProducto;

    // Validación mínima
    if (!sku_base || !title || !slug || !description || !brand || base_price === '' || base_price === null || isNaN(Number(base_price))) {
      alert('Completa todos los campos requeridos correctamente.');
      return;
    }

    const payload = {
      sku_base: String(sku_base),
      title: String(title),
      slug: String(slug),
      description: String(description),
      brand: String(brand),
      base_price: Number(base_price)
    };

    try {
      const res = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Error al crear producto:', res.status, errText);
        alert('Error al agregar producto. Revisa la consola para más detalles.');
        return;
      }

      // Limpiar formulario y forzar listar
      setNuevoProducto({
        sku_base: '',
        title: '',
        slug: '',
        description: '',
        brand: '',
        base_price: 0
      });
      setAccionProducto('listar');
      // opcional: refrescar inmediatamente
      fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/product')
        .then(r => r.json())
        .then(data => { if (Array.isArray(data)) setProductos(data); })
        .catch(() => {});
    } catch (err) {
      console.error(err);
      alert('Error al agregar producto');
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const res = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/product/${id}`, { method: 'DELETE' });
      if (res.ok) setProductos(prev => prev.filter(p => p.id !== id));
      else alert('Error al eliminar producto');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar producto');
    }
  };

  const modificarProducto = async (id, datos) => {
    // Asegurar enviar únicamente campos permitidos por la API
    const payload = {
      sku_base: datos.sku_base,
      title: datos.title,
      slug: datos.slug,
      description: datos.description,
      brand: datos.brand,
      base_price: Number(datos.base_price)
    };
    try {
      const res = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/product/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        console.error('Error al modificar producto', res.status);
        alert('Error al modificar producto');
        return;
      }
      setEditandoProductoId(null);
      setAccionProducto('listar');
    } catch (err) {
      console.error(err);
      alert('Error al modificar producto');
    }
  };

  // CRUD usuarios (mantener como antes, adaptado a claves usadas en form)
  const agregarUsuario = async () => {
    try {
      await fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      });
      setNuevoUsuario({ nombre: '', correo: '', rol: '' });
      setAccionUsuario('listar');
    } catch (err) {
      console.error(err);
      alert('Error al agregar usuario');
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      const res = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/user/${id}`, { method: 'DELETE' });
      if (res.ok) setUsuarios(prev => prev.filter(u => u.id !== id));
      else alert('Error al eliminar usuario');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar usuario');
    }
  };

  const modificarUsuario = async (id, datos) => {
    try {
      const res = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      if (!res.ok) {
        alert('Error al modificar usuario');
        return;
      }
      setEditandoUsuarioId(null);
      setAccionUsuario('listar');
    } catch (err) {
      console.error(err);
      alert('Error al modificar usuario');
    }
  };

  return (
    <div className="admin-panel">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Panel de Administración</h2>
        <div>
          <span style={{marginRight:12}}>Usuario: {user?.name || user?.full_name || ''}</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: 32 }}>
        <button className={`admin-btn-main${seccion === 'productos' ? ' active' : ''}`} onClick={() => setSeccion('productos')}>Productos</button>
        <button className={`admin-btn-main${seccion === 'usuarios' ? ' active' : ''}`} onClick={() => setSeccion('usuarios')}>Usuarios</button>
      </div>

      {seccion === '' && (
        <div className="admin-welcome">
          <h3>Bienvenido/a al Panel de Administración</h3>
          <p>Selecciona una sección para gestionar productos o usuarios.</p>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Admin" style={{width: '120px', margin: '24px auto', display: 'block', opacity: 0.7}} />
        </div>
      )}

      {seccion === 'productos' && (
        <section className="admin-section">
          <h3>Productos</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: 18 }}>
            <button className={`admin-btn-main${accionProducto === 'agregar' ? ' active' : ''}`} onClick={() => setAccionProducto('agregar')}>Agregar</button>
            <button className={`admin-btn-main${accionProducto === 'listar' ? ' active' : ''}`} onClick={() => setAccionProducto('listar')}>Listar</button>
          </div>

          {accionProducto === 'agregar' && (
            <div className="admin-form" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <input placeholder="SKU Base" value={nuevoProducto.sku_base} onChange={e => setNuevoProducto({ ...nuevoProducto, sku_base: e.target.value })} />
              <input placeholder="Título" value={nuevoProducto.title} onChange={e => setNuevoProducto({ ...nuevoProducto, title: e.target.value })} />
              <input placeholder="Slug" value={nuevoProducto.slug} onChange={e => setNuevoProducto({ ...nuevoProducto, slug: e.target.value })} />
              <input placeholder="Descripción" value={nuevoProducto.description} onChange={e => setNuevoProducto({ ...nuevoProducto, description: e.target.value })} />
              <input placeholder="Marca" value={nuevoProducto.brand} onChange={e => setNuevoProducto({ ...nuevoProducto, brand: e.target.value })} />
              <input placeholder="Precio base" type="number" value={nuevoProducto.base_price} onChange={e => setNuevoProducto({ ...nuevoProducto, base_price: Number(e.target.value) })} />
              <button onClick={agregarProducto}>Agregar Producto</button>
            </div>
          )}

          {accionProducto === 'listar' && (
            <ul className="admin-list">
              {productos.map(p => (
                <li key={p.id}>
                  {editandoProductoId === p.id ? (
                    <div style={{display:'flex',flexDirection:'column',gap:8}}>
                      <input value={productoEditado.sku_base || ''} onChange={e => setProductoEditado({ ...productoEditado, sku_base: e.target.value })} placeholder="SKU Base" />
                      <input value={productoEditado.title || ''} onChange={e => setProductoEditado({ ...productoEditado, title: e.target.value })} placeholder="Título" />
                      <input value={productoEditado.slug || ''} onChange={e => setProductoEditado({ ...productoEditado, slug: e.target.value })} placeholder="Slug" />
                      <input value={productoEditado.description || ''} onChange={e => setProductoEditado({ ...productoEditado, description: e.target.value })} placeholder="Descripción" />
                      <input value={productoEditado.brand || ''} onChange={e => setProductoEditado({ ...productoEditado, brand: e.target.value })} placeholder="Marca" />
                      <input type="number" value={productoEditado.base_price || 0} onChange={e => setProductoEditado({ ...productoEditado, base_price: Number(e.target.value) })} placeholder="Precio base" />
                      <div style={{display:'flex', gap:8, marginTop:8}}>
                        <button className="save-btn" onClick={() => modificarProducto(p.id, productoEditado)}>Guardar</button>
                        <button className="cancel-btn" onClick={() => setEditandoProductoId(null)}>Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <b>{p.title}</b> - {p.brand} - ${p.base_price} <br/>
                      <span style={{fontSize:'0.95em',color:'#0077b6'}}>{p.description}</span>
                      <div style={{display:'flex', gap:8, marginTop:8}}>
                        <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
                        <button className="edit-btn" onClick={() => { setEditandoProductoId(p.id); setProductoEditado({
                          sku_base: p.sku_base || '',
                          title: p.title || '',
                          slug: p.slug || '',
                          description: p.description || '',
                          brand: p.brand || '',
                          base_price: p.base_price || 0
                        }); }}>Editar</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {seccion === 'usuarios' && (
        <section className="admin-section">
          <h3>Usuarios</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: 18 }}>
            <button className={`admin-btn-main${accionUsuario === 'agregar' ? ' active' : ''}`} onClick={() => setAccionUsuario('agregar')}>Agregar</button>
            <button className={`admin-btn-main${accionUsuario === 'listar' ? ' active' : ''}`} onClick={() => setAccionUsuario('listar')}>Listar</button>
          </div>

          {accionUsuario === 'agregar' && (
            <div className="admin-form" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <input placeholder="Nombre" value={nuevoUsuario.nombre || ''} onChange={e => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} />
              <input placeholder="Correo" value={nuevoUsuario.correo || ''} onChange={e => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })} />
              <input placeholder="Rol" value={nuevoUsuario.rol || ''} onChange={e => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })} />
              <button onClick={agregarUsuario}>Agregar Usuario</button>
            </div>
          )}

          {accionUsuario === 'listar' && (
            <ul className="admin-list">
              {usuarios.map(u => (
                <li key={u.id}>
                  {editandoUsuarioId === u.id ? (
                    <div style={{display:'flex',flexDirection:'column',gap:8}}>
                      <input value={usuarioEditado.nombre || ''} onChange={e => setUsuarioEditado({ ...usuarioEditado, nombre: e.target.value })} placeholder="Nombre" />
                      <input value={usuarioEditado.correo || ''} onChange={e => setUsuarioEditado({ ...usuarioEditado, correo: e.target.value })} placeholder="Correo" />
                      <input value={usuarioEditado.rol || ''} onChange={e => setUsuarioEditado({ ...usuarioEditado, rol: e.target.value })} placeholder="Rol" />
                      <div style={{display:'flex', gap:8, marginTop:8}}>
                        <button className="save-btn" onClick={() => modificarUsuario(u.id, usuarioEditado)}>Guardar</button>
                        <button className="cancel-btn" onClick={() => setEditandoUsuarioId(null)}>Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <b>{u.nombre || u.name || ''}</b> - {u.correo || u.email || ''} <br/>
                      <div style={{display:'flex', gap:8, marginTop:8}}>
                        <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
                        <button className="edit-btn" onClick={() => { setEditandoUsuarioId(u.id); setUsuarioEditado({
                          nombre: u.nombre || u.name || '',
                          correo: u.correo || u.email || '',
                          rol: u.rol || u.role || ''
                        }); }}>Editar</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
};
