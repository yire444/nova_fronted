import React, { useState } from 'react';
import '../styles/Navbar.css';
import { Register } from './RegisterModal'; 
import { Login } from './LoginModal';

export const PublicNavOptions = [
    { id: 1, option: 'Inicio', url: '/' },
    { id: 2, option: 'Características', url: '/features' },
    { id: 3, option: 'Planes y Precios', url: '/pricing' }, 
    { id: 4, option: 'Contacto', url: '/contact' },
    { id: 5, option: 'Iniciar Sesión', action: 'login' }, 
    { id: 6, option: 'Registrarse', action: 'register' }    
];

const PrivateNavOptions = [
    { id: 1, option: 'Dashboard', url: '/dashboard' },
    { id: 2, option: 'Empleados', url: '/employees' },
    { id: 3, option: 'Departamentos y puestos', url: '/departments' },
    { id: 4, option: 'Tareas', url: '/tasks' },
    { id: 5, option: 'Licencias', url: '/licences' },
    { id: 6, option: 'Planilla / Pagos', url: '/payments' },
];

export const Navbar = ({ isLogged }) => {
    const [activeModal, setActiveModal] = useState(null);

    const currentOptions = isLogged ? PrivateNavOptions : PublicNavOptions;

    const handleMenuClick = (e, item) => {
        if (item.action) {
            e.preventDefault();
            setActiveModal(item.action);
        }
    };

    return (
        <>
            <nav className='nav'>
                <div className='nav-container'>
                    <div className='logo'>
                        <a href={isLogged ? "/dashboard" : "/"}>NOVA</a>
                    </div>

                    <div className='nav-right-side'>
                        <ul className='nav-menu'>
                            {currentOptions.map((i) => (
                                <li key={i.id} className='nav-item'>
                                    <a
                                        href={i.url || '#'}
                                        className='nav-link'
                                        onClick={(e) => handleMenuClick(e, i)}
                                    >
                                        {i.option}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Modales */}
            {activeModal === 'register' && (
                <Register
                    onClose={() => setActiveModal(null)}
                    onSwitchToLogin={() => setActiveModal('login')}
                />
            )}

            {activeModal === 'login' && (
                <Login
                    onClose={() => setActiveModal(null)}
                    onSwitchToRegister={() => setActiveModal('register')}
                />
            )}
        </>
    );
};