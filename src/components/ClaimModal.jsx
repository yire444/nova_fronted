import React, { useState } from 'react';
import '../styles/ClaimModal.css';
import { HiX } from 'react-icons/hi';

export function ClaimModal({ isOpen, onClose }) {

  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);

  const affairs = [
    { id: 1, name: 'Servicio no recibido' },
    { id: 2, name: 'Problemas con el pago' },
    { id: 3, name: 'Mala atención al cliente' },
    { id: 5, name: 'Otros' }
  ];

  const [claimData, setClaimData] = useState({
    fullName: '',
    email: '',
    phone: '',
    affair: '',
    message: ''
  });

  const handleChange = (e) => {
    setClaimData({
      ...claimData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reclamo registrado con éxito:", claimData);
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        {/* Cabecera del Modal */}
        <div className="modal-header">
          <div className="modal-titles">
            <h2>Libro de Reclamaciones</h2>
            <p>Conforme a lo establecido en el Código de Protección y Defensa del Consumidor</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <HiX />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="modal-body">
          {submitted ? (
            <div className="modal-success">
              <h3>¡Su reclamo ha sido registrado exitosamente!</h3>
              <p>Hemos enviado una copia de los detalles a su correo electrónico. 
                Nos pondremos en contacto con usted a la brevedad para atender su solicitud.
                Gracias por comunicarse con nosotros.
              </p>
              <button className="btn-modal-action" onClick={onClose}>
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="claim-form">
              
              <div className="form-section-title">1. Datos de contacto</div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre Completo:</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={claimData.fullName} 
                    onChange={handleChange} 
                    required 
                    placeholder="Ej. María López"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Correo Electrónico:</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={claimData.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Teléfono / Celular:</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={claimData.phone} 
                    onChange={handleChange} 
                    required 
                    placeholder="+51 999999999"
                  />
                </div>
              </div>

              <div className="form-section-title">2. Reclamo</div>

              <div className="form-row">
                <div className="form-group">
                  <label>Motivo del Reclamo </label>
                  <select name="affair" value={claimData.affair} onChange={handleChange} required>
                    <option value="">Seleccione un motivo...</option>
                    {affairs.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Detalle del Reclamo</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  value={claimData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="Por favor, describa detalladamente su reclamo para que podamos atenderlo de manera efectiva."
                ></textarea>
              </div>

              <div className="modal-footer-actions">
                <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                <button type="submit" className="btn-submit-claim">Enviar Reclamo</button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}