import React, { useState, useEffect } from 'react';
import './Admin.css';

export const Admin = () => {

  // Estados para productos y usuarios
  // Estado para la sección activa
  const [seccion, setSeccion] = useState('');
  const [accionProducto, setAccionProducto] = useState('listar');
  const [accionUsuario, setAccionUsuario] = useState('listar');
  const [productos, setProductos] = useState([]);
  // Cargar productos desde Xano al listar
  useEffect(() => {
    if (seccion === 'productos' && accionProducto === 'listar') {
      fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/productos')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setProductos(data);
          }
        })
        .catch(err => console.error('Error al cargar productos:', err));
    }
    if (seccion === 'usuarios' && accionUsuario === 'listar') {
      fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/user')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setUsuarios(data);
          }
        })
        .catch(err => console.error('Error al cargar usuarios:', err));
    }
  }, [seccion, accionProducto, accionUsuario]);
  const [usuarios, setUsuarios] = useState([]);
  // Estados para formularios
  const [nuevoProducto, setNuevoProducto] = useState({
    sku_base: '',
    title: '',
    slug: '',
    description: '',
    brand: '',
    base_price: '',
    release_date: '',
    is_active: false,
    updated_at: 0,
    category_id: '',
    stock: '',
    talla: Array(31).fill(0),
    image: {
      access: 'public',
      path: '',
      name: '',
      type: '',
      size: 0,
      mime: '',
      meta: {},
      url: ''
    }
  });
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', correo: '', rol: '' });
  // Estados para edición en línea
  const [editandoProductoId, setEditandoProductoId] = useState(null);
  const [productoEditado, setProductoEditado] = useState({ nombre: '', precio: '', descripcion: '' });
  const [editandoUsuarioId, setEditandoUsuarioId] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState({ nombre: '', correo: '', rol: '' });

  // Funciones CRUD para productos
  const agregarProducto = async () => {
    // Validación básica
    if (!nuevoProducto.sku_base || !nuevoProducto.title || !nuevoProducto.slug || !nuevoProducto.description || !nuevoProducto.brand || !nuevoProducto.base_price || !nuevoProducto.release_date || !nuevoProducto.category_id || !nuevoProducto.stock) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }
    try {
      // Construir objeto producto completo
      const productoCompleto = {
        sku_base: nuevoProducto.sku_base,
        title: nuevoProducto.title,
        slug: nuevoProducto.slug,
        description: nuevoProducto.description,
        brand: nuevoProducto.brand,
        base_price: Number(nuevoProducto.base_price),
        release_date: nuevoProducto.release_date,
        is_active: nuevoProducto.is_active,
        updated_at: Date.now(),
        category_id: Number(nuevoProducto.category_id),
        stock: Number(nuevoProducto.stock),
        talla: nuevoProducto.talla && nuevoProducto.talla.length === 31 ? nuevoProducto.talla : Array(31).fill(0),
        image: {
          access: 'public',
          path: nuevoProducto.image?.path || '',
          name: nuevoProducto.image?.name || '',
          type: nuevoProducto.image?.type || '',
          size: Number(nuevoProducto.image?.size) || 0,
          mime: nuevoProducto.image?.mime || '',
          meta: {},
          url: nuevoProducto.image?.url || ''
        }
      };
      await fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoCompleto)
      });
      setNuevoProducto({
        sku_base: '',
        title: '',
        slug: '',
        description: '',
        brand: '',
        base_price: '',
        release_date: '',
        is_active: false,
        updated_at: 0,
        category_id: '',
        stock: '',
        talla: Array(31).fill(0),
        image: {
          access: 'public',
          path: '',
          name: '',
          type: '',
          size: 0,
          mime: '',
          meta: {},
          url: ''
        }
      });
      setAccionProducto('listar');
    } catch (err) {
      alert('Error al agregar producto');
    }
  };
  const eliminarProducto = async (id) => {
    try {
      await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/productos/${id}`, {
        method: 'DELETE'
      });
      setProductos(productos.filter(p => p.id !== id));
    } catch (err) {
      alert('Error al eliminar producto');
    }
  };
  const modificarProducto = async (id, datos) => {
    try {
      await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      setEditandoProductoId(null);
      setAccionProducto('listar');
    } catch (err) {
      alert('Error al modificar producto');
    }
  };

  // Funciones CRUD para usuarios
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
      alert('Error al agregar usuario');
    }
  };
  const eliminarUsuario = async (id) => {
    try {
      await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/user/${id}`, {
        method: 'DELETE'
      });
      setUsuarios(usuarios.filter(u => u.id !== id));
    } catch (err) {
      alert('Error al eliminar usuario');
    }
  };
  const modificarUsuario = async (id, datos) => {
    try {
      await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      setEditandoUsuarioId(null);
      setAccionUsuario('listar');
    } catch (err) {
      alert('Error al modificar usuario');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
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
            <div className="admin-form" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
              <input placeholder="SKU Base" value={nuevoProducto.sku_base || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, sku_base: e.target.value })} />
              <input placeholder="Título" value={nuevoProducto.title || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, title: e.target.value })} />
              <input placeholder="Slug" value={nuevoProducto.slug || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, slug: e.target.value })} />
              <input placeholder="Descripción" value={nuevoProducto.description || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, description: e.target.value })} />
              <input placeholder="Marca" value={nuevoProducto.brand || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, brand: e.target.value })} />
              <input placeholder="Precio base" type="number" value={nuevoProducto.base_price || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, base_price: Number(e.target.value) })} />
              <input placeholder="Fecha de lanzamiento" type="date" value={nuevoProducto.release_date || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, release_date: e.target.value })} />
              <label style={{margin:'8px 0 0 0'}}><input type="checkbox" checked={nuevoProducto.is_active || false} onChange={e => setNuevoProducto({ ...nuevoProducto, is_active: e.target.checked })} /> Activo</label>
              <input placeholder="Categoría ID" type="number" value={nuevoProducto.category_id || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, category_id: Number(e.target.value) })} />
              <input placeholder="Stock" type="number" value={nuevoProducto.stock || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, stock: Number(e.target.value) })} />
              <label style={{margin:'8px 0 0 0'}}>Tallas (separadas por coma):
                <input placeholder="Ej: 40,41,42" value={nuevoProducto.talla ? nuevoProducto.talla.join(',') : ''} onChange={e => setNuevoProducto({ ...nuevoProducto, talla: e.target.value.split(',').map(x => Number(x.trim()) || 0) })} />
              </label>
              <input placeholder="Imagen (path)" value={nuevoProducto.image?.path || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, image: { ...nuevoProducto.image, path: e.target.value } })} />
              <input placeholder="Imagen (name)" value={nuevoProducto.image?.name || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, image: { ...nuevoProducto.image, name: e.target.value } })} />
              <input placeholder="Imagen (type)" value={nuevoProducto.image?.type || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, image: { ...nuevoProducto.image, type: e.target.value } })} />
              <input placeholder="Imagen (size)" type="number" value={nuevoProducto.image?.size || 0} onChange={e => setNuevoProducto({ ...nuevoProducto, image: { ...nuevoProducto.image, size: Number(e.target.value) } })} />
              <input placeholder="Imagen (mime)" value={nuevoProducto.image?.mime || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, image: { ...nuevoProducto.image, mime: e.target.value } })} />
              <input placeholder="Imagen (url)" value={nuevoProducto.image?.url || ''} onChange={e => setNuevoProducto({ ...nuevoProducto, image: { ...nuevoProducto.image, url: e.target.value } })} />
              <button onClick={agregarProducto}>Agregar Producto</button>
            </div>
          )}
          {accionProducto === 'listar' && (
            <ul className="admin-list">
              {productos.map(p => (
                <li key={p.id}>
                  {editandoProductoId === p.id ? (
                    <div style={{display:'flex',flexDirection:'column',gap:0}}>
                      <input value={productoEditado.sku_base || ''} onChange={e => setProductoEditado({ ...productoEditado, sku_base: e.target.value })} placeholder="SKU Base" />
                      <input value={productoEditado.title || ''} onChange={e => setProductoEditado({ ...productoEditado, title: e.target.value })} placeholder="Título" />
                      <input value={productoEditado.slug || ''} onChange={e => setProductoEditado({ ...productoEditado, slug: e.target.value })} placeholder="Slug" />
                      <input value={productoEditado.description || ''} onChange={e => setProductoEditado({ ...productoEditado, description: e.target.value })} placeholder="Descripción" />
                      <input value={productoEditado.brand || ''} onChange={e => setProductoEditado({ ...productoEditado, brand: e.target.value })} placeholder="Marca" />
                      <input type="number" value={productoEditado.base_price || ''} onChange={e => setProductoEditado({ ...productoEditado, base_price: Number(e.target.value) })} placeholder="Precio base" />
                      <input type="date" value={productoEditado.release_date || ''} onChange={e => setProductoEditado({ ...productoEditado, release_date: e.target.value })} placeholder="Fecha de lanzamiento" />
                      <label style={{margin:'8px 0 0 0'}}><input type="checkbox" checked={productoEditado.is_active || false} onChange={e => setProductoEditado({ ...productoEditado, is_active: e.target.checked })} /> Activo</label>
                      <input type="number" value={productoEditado.category_id || ''} onChange={e => setProductoEditado({ ...productoEditado, category_id: Number(e.target.value) })} placeholder="Categoría ID" />
                      <input type="number" value={productoEditado.stock || ''} onChange={e => setProductoEditado({ ...productoEditado, stock: Number(e.target.value) })} placeholder="Stock" />
                      <input value={productoEditado.image?.path || ''} onChange={e => setProductoEditado({ ...productoEditado, image: { ...productoEditado.image, path: e.target.value } })} placeholder="Imagen (URL o path)" />
                      <button className="save-btn" onClick={() => modificarProducto(p.id, {
                        ...productoEditado,
                        base_price: Number(productoEditado.base_price),
                        category_id: Number(productoEditado.category_id),
                        stock: Number(productoEditado.stock),
                        talla: Array(31).fill(0),
                        image: {
                          ...productoEditado.image,
                          access: 'public',
                          name: '',
                          type: '',
                          size: 0,
                          mime: '',
                          meta: {},
                          url: ''
                        }
                      })}>Guardar</button>
                      <button className="cancel-btn" onClick={() => setEditandoProductoId(null)}>Cancelar</button>
                    </div>
                  ) : (
                    <>
                      <b>{p.title}</b> - {p.brand} - ${p.base_price} <br/>
                      <span style={{fontSize:'0.95em',color:'#0077b6'}}>{p.description}</span>
                      <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
                      <button className="edit-btn" onClick={() => setEditandoProductoId(p.id) || setProductoEditado(p)}>Editar</button>
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
            <div className="admin-form" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
              <input placeholder="Nombre" value={nuevoUsuario.name || ''} onChange={e => setNuevoUsuario({ ...nuevoUsuario, name: e.target.value })} />
              <input placeholder="Email" value={nuevoUsuario.email || ''} onChange={e => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })} />
              <input placeholder="Contraseña" type="password" value={nuevoUsuario.password || ''} onChange={e => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />
              <input placeholder="Full Name" value={nuevoUsuario.full_name || ''} onChange={e => setNuevoUsuario({ ...nuevoUsuario, full_name: e.target.value })} />
              <input placeholder="Teléfono" value={nuevoUsuario.phone || ''} onChange={e => setNuevoUsuario({ ...nuevoUsuario, phone: e.target.value })} />
              <label style={{margin:'8px 0 0 0'}}><input type="checkbox" checked={nuevoUsuario.is_active || false} onChange={e => setNuevoUsuario({ ...nuevoUsuario, is_active: e.target.checked })} /> Activo</label>
              <input placeholder="Role ID" type="number" value={nuevoUsuario.role_id || ''} onChange={e => setNuevoUsuario({ ...nuevoUsuario, role_id: Number(e.target.value) })} />
              <button onClick={agregarUsuario}>Agregar Usuario</button>
            </div>
          )}
          {accionUsuario === 'listar' && (
            <ul className="admin-list">
              {usuarios.map(u => (
                <li key={u.id}>
                  {editandoUsuarioId === u.id ? (
                    <div style={{display:'flex',flexDirection:'column',gap:0}}>
                      <input value={usuarioEditado.name || ''} onChange={e => setUsuarioEditado({ ...usuarioEditado, name: e.target.value })} placeholder="Nombre" />
                      <input value={usuarioEditado.email || ''} onChange={e => setUsuarioEditado({ ...usuarioEditado, email: e.target.value })} placeholder="Email" />
                      <input value={usuarioEditado.password || ''} onChange={e => setUsuarioEditado({ ...usuarioEditado, password: e.target.value })} placeholder="Contraseña" />
                      <input value={usuarioEditado.full_name || ''} onChange={e => setUsuarioEditado({ ...usuarioEditado, full_name: e.target.value })} placeholder="Full Name" />
                      <input value={usuarioEditado.phone || ''} onChange={e => setUsuarioEditado({ ...usuarioEditado, phone: e.target.value })} placeholder="Teléfono" />
                      <label style={{margin:'8px 0 0 0'}}><input type="checkbox" checked={usuarioEditado.is_active || false} onChange={e => setUsuarioEditado({ ...usuarioEditado, is_active: e.target.checked })} /> Activo</label>
                      <input type="number" value={usuarioEditado.role_id || ''} onChange={e => setUsuarioEditado({ ...usuarioEditado, role_id: Number(e.target.value) })} placeholder="Role ID" />
                      <button className="save-btn" onClick={() => modificarUsuario(u.id, usuarioEditado)}>Guardar</button>
                      <button className="cancel-btn" onClick={() => setEditandoUsuarioId(null)}>Cancelar</button>
                    </div>
                  ) : (
                    <>
                      <b>{u.name}</b> - {u.email} - {u.full_name} <br/>
                      <span style={{fontSize:'0.95em',color:'#0077b6'}}>{u.phone}</span>
                      <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
                      <button className="edit-btn" onClick={() => { setEditandoUsuarioId(u.id); setUsuarioEditado(u); }}>Editar</button>
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
