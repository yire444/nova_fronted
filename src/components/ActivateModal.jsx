import React, { useState } from 'react';
import { HiCheckCircle, HiMail, HiX } from 'react-icons/hi';
import '../styles/ActivateModal.css';

export function ActivateModal({ isOpen, onClose, emailInitial = '', onSwitchToLogin }) {
  const [email, setEmail] = useState(emailInitial);
  const [code, setCode] = useState('');

  if (!isOpen) return null;

  const handleActivate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:9090/api/companies/activate?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Código incorrecto o expirado");
      }

      const result = await response.json();
      alert(result.message || "¡Cuenta activada con éxito! Ya puedes iniciar sesión.");

      if (onClose) onClose();
      if (onSwitchToLogin) onSwitchToLogin();

    } catch (error) {
      console.error("Error al activar:", error);
      alert("No se pudo activar la cuenta: " + error.message);
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleOpenLogin = (e) => {
    e.preventDefault();
    if (onClose) onClose();
    if (onSwitchToLogin) onSwitchToLogin();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-activate" style={{ maxWidth: '400px' }}>
        
        <button className="modal-close-btn" onClick={handleClose} title="Cerrar">
          <HiX />
        </button>

        <div className="form-header">
          <h2>Activar Cuenta</h2>
          <p>Ingresa el código de 6 dígitos que enviamos a tu correo electrónico.</p>
        </div>

        <form onSubmit={handleActivate} className="register-form">
          
          <div className="form-group">
            <label>Correo Electrónico</label>
            <div className="input-wrapper-clean">
              <HiMail className="input-icon-fixed" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="correo@empresa.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Código de Verificación (6 caracteres)</label>
            <div className="input-wrapper-clean">
              <HiCheckCircle className="input-icon-fixed" />
              <input 
                type="text" 
                value={code} 
                onChange={(e) => setCode(e.target.value.toUpperCase())} 
                required 
                maxLength="6"
                placeholder="Ej. A1B2C3"
                style={{ letterSpacing: '4px', fontWeight: 'bold', textAlign: 'center' }}
              />
            </div>
          </div>

          <button type="submit" className="btn-register-submit">
            Activar cuenta
          </button>

          <div className="register-footer-text" style={{ marginTop: '15px' }}>
            ¿Ya tienes tu cuenta activa? <a href="#login" onClick={handleOpenLogin}>Inicia Sesión</a>
          </div>

        </form>
      </div>
    </div>
  );
}