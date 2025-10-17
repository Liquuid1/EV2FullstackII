import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout, getCurrentUser } from '../utils/auth'
import logo from '../assets/logo.jpg'
import './NavBar.css'

export const NavBar = () => {
        const navigate = useNavigate();
        const [isLogged, setIsLogged] = React.useState(!!(getCurrentUser() || localStorage.getItem('token')));

        React.useEffect(() => {
            const handler = () => setIsLogged(!!(getCurrentUser() || localStorage.getItem('token')));
            window.addEventListener('authChanged', handler);
            return () => window.removeEventListener('authChanged', handler);
        }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-2">
        <div className="container-fluid">
            {/* Izquierda: Logo y nombre */}
            <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
                src={logo}
                alt="Logo"
                width="30"
                height="30"
                className="d-inline-block align-text-top me-2"
            />
            SNKR HOOD
            </Link>

            {/* Botón hamburguesa para responsive */}
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>

            {/* Contenido colapsable */}
            <div className="collapse navbar-collapse" id="navbarContent">
            {/* Centro: Navegación */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/products">Productos</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/about">Nosotros</Link>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contacto</a>
                </li>
            </ul>

            {/* Derecha: Botones */}
                                    <div className="d-flex gap-2 align-items-center">
                                            <Link className="btn btn-outline-primary" to="/login">Login</Link>
                                            <Link className="btn btn-outline-secondary" to="/registro">Registrarse</Link>
                                            <Link className="btn btn-outline-success" to="/carrito">Carrito</Link>
                                            {isLogged && (
                                                <button className="btn btn-outline-danger" onClick={() => logout(navigate)}>Cerrar sesión</button>
                                            )}
                                    </div>
            </div>
        </div>
    </nav>
    );
};
