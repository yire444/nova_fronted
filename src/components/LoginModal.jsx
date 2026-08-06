import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginModal.css';
import { HiMail, HiLockClosed, HiX } from 'react-icons/hi';

export function Login({ isOpen, onClose, onSwitchToRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    
    if (onClose) onClose();
    navigate('/dashboard');
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleOpenRegister = (e) => {
    e.preventDefault();
    if (onClose) onClose(); 
    if (onSwitchToRegister) onSwitchToRegister(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-login">
        
        <button className="modal-close-btn" onClick={handleClose} title="Cerrar">
          <HiX />
        </button>

        <div className="form-header">
          <h2>Iniciar Sesión</h2>
          <p>Ingresa a tu cuenta de NOVA para gestionar tu empresa</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          
          <div className="form-group">
            <label>Correo Electrónico Corporativo</label>
            <div className="input-wrapper-clean">
              <HiMail className="input-icon-fixed" />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="correo@empresa.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <div className="input-wrapper-clean">
              <HiLockClosed className="input-icon-fixed" />
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" className="btn-login-submit">
            Ingresar
          </button>

          <div className="login-footer-text">
            ¿Aún no tienes una empresa registrada? <a href="#register" onClick={handleOpenRegister}>Regístrate aquí</a>
          </div>

        </form>
      </div>
    </div>
  );
}