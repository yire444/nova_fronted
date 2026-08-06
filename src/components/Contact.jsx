import React, { useState } from 'react';
import '../styles/Contact.css';
// 1. Importamos los iconos que estás usando
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario enviados:", formData);
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      {/* Encabezado */}
      <div className="contact-header">
        <h1 className="contact-title">Ponte en contacto con <span>NOVA</span></h1>
        <p className="contact-subtitle">
          ¿Tienes dudas sobre los planes corporativos o necesitas una demo personalizada? Escríbenos y te responderemos pronto.
        </p>
      </div>

      {/* 2. El contenedor general ahora envuelve a AMBOS (info y formulario) */}
      <div className="contact-content">
        
        {/* Información de contacto (Lado Izquierdo) */}
        <div className="contact-info">
          <h3>Información de Soporte</h3>
          <p>Estamos listos para escalar la gestión de tu talento humano.</p>
          
          <div className="info-item">
            <HiMail className="info-icon" />
            <span>soporte@nova.com</span>
          </div>
          <div className="info-item">
            <HiPhone className="info-icon" />
            <span>+51 915 214 147</span>
          </div>
          <div className="info-item">
            <HiLocationMarker className="info-icon" />
            <span>Lima, Perú</span>
          </div>
        </div>

        {/* Formulario (Lado Derecho) */}
        <div className="contact-form-wrapper">
          {submitted ? (
            <div className="success-message">
              <h3>¡Mensaje enviado con éxito!</h3>
              <p>Gracias por contactarnos. Un asesor se comunicará contigo a la brevedad.</p>
              <button 
                className="btn-contact" 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', company: '', email: '', phone: '', message: '' });
                }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre completo</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              <div className="form-group">
                <label>Empresa</label>
                <input 
                  type="text" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  placeholder="Ej. Mi Empresa S.A.C."
                />
              </div>

              <div className="form-group">
                <label>Correo electrónico</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="correo@empresa.com"
                />
              </div>

              <div className="form-group">
                <label>Teléfono / Celular</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="+51 987654321"
                />
              </div>

              <div className="form-group">
                <label>Mensaje</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="Cuéntanos qué necesitas..."
                ></textarea>
              </div>

              <button type="submit" className="btn-contact">Enviar Mensaje</button>
            </form>
          )}
        </div>

      </div> {/* Fin de contact-content */}
    </div>
  );
}