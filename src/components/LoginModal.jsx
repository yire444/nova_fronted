import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginModal.css';
import { HiMail, HiLockClosed, HiX } from 'react-icons/hi';

export function Login({ isOpen, onClose, onSwitchToRegister, onSwitchToActivate }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/api/companies/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        
        // Si la cuenta no está activa, avisa y salta al modal de activación globalmente
        if (errorText.toLowerCase().includes("activada") || errorText.toLowerCase().includes("código")) {
          alert("Tu cuenta aún no está activada. Ingresa tu código.");
          if (onClose) onClose();
          if (onSwitchToActivate) onSwitchToActivate(formData.email);
          return;
        }

        throw new Error(errorText || "Credenciales incorrectas");
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('companyEmail', formData.email);

      alert(data.message || "¡Inicio de sesión exitoso!");
      if (onClose) onClose();
      navigate('/dashboard');

    } catch (error) {
      console.error("Error en el login:", error);
      alert("No se pudo iniciar sesión: " + error.message);
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleOpenRegister = (e) => {
    e.preventDefault();
    if (onClose) onClose(); 
    if (onSwitchToRegister) onSwitchToRegister(); 
  };

  const handleOpenActivate = (e) => {
    e.preventDefault();
    if (onClose) onClose();
    if (onSwitchToActivate) onSwitchToActivate(formData.email);
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

          <div className="login-footer-text" style={{ marginTop: '12px' }}>
            <a href="#activate" onClick={handleOpenActivate} style={{ color: '#00ff88', fontSize: '0.85rem' }}>
              ¿Ya te registraste pero no activaste tu cuenta? Ingresa tu código aquí
            </a>
          </div>

          <div className="login-footer-text">
            ¿Aún no tienes una empresa registrada? <a href="#register" onClick={handleOpenRegister}>Regístrate aquí</a>
          </div>

        </form>
      </div>
    </div>
  );
}