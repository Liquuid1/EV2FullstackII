import React, { useState } from 'react';

const UserItem = ({ user, onDelete, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [u, setU] = useState({
    nombre: user.nombre || user.name || '',
    correo: user.correo || user.email || '',
    rol: user.rol || user.role || ''
  });

  return (
    <li>
      {editing ? (
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <input value={u.nombre} onChange={e => setU({ ...u, nombre: e.target.value })} />
          <input value={u.correo} onChange={e => setU({ ...u, correo: e.target.value })} />
          <input value={u.rol} onChange={e => setU({ ...u, rol: e.target.value })} />
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <button className="save-btn" onClick={async () => { await onSave(u); setEditing(false); }}>Guardar</button>
            <button className="cancel-btn" onClick={() => setEditing(false)}>Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          <b>{user.nombre || user.name || ''}</b> - {user.correo || user.email || ''} <br/>
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <button onClick={onDelete}>Eliminar</button>
            <button className="edit-btn" onClick={() => setEditing(true)}>Editar</button>
          </div>
        </>
      )}
    </li>
  );
};

export default UserItem;