import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiUser, HiMail, HiPhone, HiLockClosed, HiOfficeBuilding, HiIdentification, HiCash, HiX } from 'react-icons/hi';
import '../styles/RegisterModal.css';

export function Register({ isOpen, onClose, onSwitchToLogin }) {

  // TRAER LOS TIPOS DE DOCUMENTOS DESDE EL BACKEND
  const [documentType, setDocumentType] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9090/api/document-type')
      .then((response) => response.json())
      .then((data) => { setDocumentType(data); })
      .catch((error) => { console.error('Error al obtener los datos', error); });
  }, []);

  //TRAER LOS PLANES DESDE EL BACKEND
  const [planType, setPlanType] = useState([]); 
  useEffect(() => {
    fetch('http://localhost:9090/api/plan-type')
    .then((response) => response.json())
    .then((data) => {setPlanType(data);})
    .catch((error) => {console.error('Error al obtener los datos', error);});
  }, []);


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    companyRuc: '',
    billingCycle: 'mensual',
    planType: '',
    name: '',
    lastName: '',
    documentType: '',
    documentNumber: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, revísalas.");
      return;
    }

    if (formData.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (onClose) onClose();
    navigate('/dashboard');
  };

  // Precios dinámicos según el ciclo
  const isAnnual = formData.billingCycle === 'anual';
  const prices = {
    starter: isAnnual ? { total: '$288', perMonth: '$24/mes' } : { total: '$29', perMonth: '$29/mes' },
    business: isAnnual ? { total: '$756', perMonth: '$63/mes' } : { total: '$79', perMonth: '$79/mes' },
    enterprise: isAnnual ? { total: '$1,908', perMonth: '$159/mes' } : { total: '$199', perMonth: '$199/mes' }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleOpenLogin = (e) => {
    e.preventDefault();
    if (onClose) onClose(); 
    if (onSwitchToLogin) onSwitchToLogin(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-register">
        
        {/* Botón flotante para cerrar el modal */}
        <button className="modal-close-btn" onClick={handleClose} title="Cerrar">
          <HiX />
        </button>

        <div className="form-header">
          <h2>Crear Cuenta</h2>
          <p>Selecciona tu modalidad y registra los datos de tu empresa</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          
          <div className="form-group">
            <label>Tipo de Facturación</label>
            <div className="input-wrapper-clean">
              <HiCash className="input-icon-fixed" />
              <select 
                name="billingCycle" 
                value={formData.billingCycle} 
                onChange={handleChange}
                required
                className="select-custom-clean"
              >
                <option value="mensual">Mensual</option>
                <option value="anual">Anual (¡20% OFF!)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Selecciona el Plan</label>
            <div className="input-wrapper-clean">
              <HiCash className="input-icon-fixed" />
              <select 
                name="planType" 
                value={formData.planType} 
                onChange={handleChange}
                required
                className="select-custom-clean"
              >
                <option value="">--SELECCIONE UNA PLAN--</option>
                {planType.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} — {'$' + plan.price}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Nombre de la Empresa</label>
            <div className="input-wrapper-clean">
              <HiOfficeBuilding className="input-icon-fixed" />
              <input 
                type="text" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                required 
                placeholder="Ej. Soluciones S.A.C."
              />
            </div>
          </div>

          <div className="form-group">
            <label>RUC de la Empresa</label>
            <div className="input-wrapper-clean">
              <HiIdentification className="input-icon-fixed" />
              <input 
                type="text" 
                name="companyRuc" 
                value={formData.companyRuc} 
                onChange={handleChange} 
                required 
                placeholder="Ej. 20123456789"
                maxLength="11"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Nombres del titular</label>
            <div className="input-wrapper-clean">
              <HiUser className="input-icon-fixed" />
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="Ej. Juan José"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Apellidos del titular</label>
            <div className="input-wrapper-clean">
              <HiUser className="input-icon-fixed" />
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                required 
                placeholder="Ej. García Pérez"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Tipo de documento</label>
            <div className="input-wrapper-clean">
              <HiIdentification className="input-icon-fixed" />
              <select 
                name="documentType" 
                value={formData.documentType}
                onChange={handleChange}
                required
                className="select-custom-clean"
              >
                <option value="">--SELECCIONE UNA OPCIÓN--</option>
                {documentType.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Número de documento</label>
            <div className="input-wrapper-clean">
              <HiIdentification className="input-icon-fixed" />
              <input 
                type="text" 
                name="documentNumber" 
                value={formData.documentNumber} 
                onChange={handleChange} 
                required 
                placeholder="Ingrese el número de documento"
              />
            </div>
          </div>

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
            <label>Número celular</label>
            <div className="input-wrapper-clean">
              <HiPhone className="input-icon-fixed" />
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
                placeholder="Ingrese su número de celular"
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
                placeholder="Mínimo 8 caracteres"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <div className="input-wrapper-clean">
              <HiLockClosed className="input-icon-fixed" />
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
                placeholder="Repita su contraseña"
              />
            </div>
          </div>

          <button type="submit" className="btn-register-submit">
            Registrarse
          </button>

          <div className="register-footer-text">
            ¿Ya tienes una cuenta en NOVA? <a href="#login" onClick={handleOpenLogin}>Inicia Sesión</a>
          </div>

        </form>
      </div>
    </div>
  );
}