import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import './NavBar.css'

export const NavBar = () => {
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
                <Link className="nav-link" to="/contact">Contacto</Link>
                </li>
            </ul>

            {/* Derecha: Botones */}
            <div className="d-flex gap-2">
                <Link className="btn btn-outline-primary" to="/login">Login</Link>
                <Link className="btn btn-outline-secondary" to="/registro">Registrarse</Link>
                <Link className="btn btn-outline-success" to="/carrito">Carrito</Link>
            </div>
            </div>
        </div>
    </nav>
    );
};
