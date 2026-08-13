import { useEffect, useState } from 'react';
import { HiCash, HiIdentification, HiLockClosed, HiMail, HiOfficeBuilding, HiPhone, HiUser, HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterModal.css';

export function Register({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }) {

  // ESTADOS PARA OBTENER DATOS DESDE EL BACKEND
  const [documentTypes, setDocumentTypes] = useState([]);
  const [planTypes, setPlanTypes] = useState([]); 
  const [billingCycles, setBillingCycles] = useState([]); 

  // OBTENER TIPOS DE DOCUMENTO
  useEffect(() => {
    fetch('http://localhost:9090/api/document-type') 
      .then((response) => response.json())
      .then((data) => { setDocumentTypes(data); })
      .catch((error) => { console.error('Error al obtener documentos', error); });
  }, []);

  // OBTENER CICLOS DE FACTURACIÓN
  useEffect(() => {
    fetch('http://localhost:9090/api/billing-cycle')
      .then((response) => response.json())
      .then((data) => { setBillingCycles(data); })
      .catch((error) => { console.error('Error al obtener ciclos', error); });
  }, []);

  // OBTENER PLANES
  useEffect(() => {
    fetch('http://localhost:9090/api/plan-type')
      .then((response) => response.json())
      .then((data) => { setPlanTypes(data); })
      .catch((error) => { console.error('Error al obtener planes', error); });
  }, []);

  const navigate = useNavigate();

  // ESTADO ALINEADO CON EL CompanyRequestDto DE JAVA
  const [formData, setFormData] = useState({
    nameCompany: '',
    ruc: '',
    billingCycleId: '', 
    planTypeId: '',
    nameHolder: '',
    lastNameHolder: '',
    documentTypeId: '',
    documentNumber: '',
    emailCompany: '',
    phoneCompany: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones estrictas de selectores para evitar enviar IDs vacíos o nulos
    if (!formData.billingCycleId) {
      alert("Por favor, selecciona un tipo de facturación.");
      return;
    }

    if (!formData.planTypeId) {
      alert("Por favor, selecciona un plan.");
      return;
    }

    if (!formData.documentTypeId) {
      alert("Por favor, selecciona un tipo de documento.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, revísalas.");
      return;
    }

    if (formData.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      const payload = {
        nameCompany: formData.nameCompany,
        ruc: formData.ruc,
        nameHolder: formData.nameHolder,
        lastNameHolder: formData.lastNameHolder,
        documentNumber: formData.documentNumber,
        emailCompany: formData.emailCompany,
        phoneCompany: formData.phoneCompany,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        documentTypeId: Number(formData.documentTypeId),
        planTypeId: Number(formData.planTypeId),
        billingCycleId: Number(formData.billingCycleId)
      };

      const response = await fetch('http://localhost:9090/api/companies/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Error al registrar la empresa");
      }

      const result = await response.json();
      alert("¡Registro exitoso! Revisa tu correo electrónico para obtener el código de activación de 6 dígitos.");

      if (onClose) onClose();
      
      // REDIRIGIR AL MODAL DE ACTIVACIÓN O LOGIN
      if (onRegisterSuccess) {
        onRegisterSuccess(formData.emailCompany);
      } else {
        onSwitchToLogin();
      }

    } catch (error) {
      console.error("Error en el registro:", error);
      alert("No se pudo completar el registro: " + error.message);
    }
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

  // VARIABLES DINÁMICAS PARA CALCULAR PRECIOS EN EL FRONTEND
  const selectedCycle = billingCycles.find(c => c.id == parseInt(formData.billingCycleId));
  const currentDiscount = selectedCycle ? parseFloat(selectedCycle.discount) : 0;
  const currentMonths = selectedCycle ? selectedCycle.months : 1;

  return (
    <div className="modal-overlay">
      <div className="modal-content-register">
        
        <button className="modal-close-btn" onClick={handleClose} title="Cerrar">
          <HiX />
        </button>

        <div className="form-header">
          <h2>Crear Cuenta</h2>
          <p>Selecciona tu modalidad y registra los datos de tu empresa</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          
          {/* Tipo de Facturación */}
          <div className="form-group">
            <label>Tipo de Facturación</label>
            <div className="input-wrapper-clean">
              <HiCash className="input-icon-fixed" />
              <select 
                name="billingCycleId" 
                value={formData.billingCycleId} 
                onChange={handleChange}
                required
                className="select-custom-clean"
              >
                <option value="">--SELECCIONE CICLO--</option>
                {billingCycles.map((cycle) => (
                  <option key={cycle.id} value={cycle.id}>
                    {cycle.name} {cycle.discount > 0 ? `(¡${parseInt(cycle.discount)}% OFF!)` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selecciona el Plan */}
          <div className="form-group">
            <label>Selecciona el Plan</label>
            <div className="input-wrapper-clean">
              <HiCash className="input-icon-fixed" />
              <select 
                name="planTypeId" 
                value={formData.planTypeId} 
                onChange={handleChange}
                required
                disabled={!formData.billingCycleId}
                className="select-custom-clean"
              >
                <option value="">--SELECCIONE UN PLAN--</option>
                {planTypes.map((plan) => {
                  const subtotal = plan.price * currentMonths;
                  const discountAmount = subtotal * (currentDiscount / 100);
                  const finalPrice = subtotal - discountAmount;

                  return (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} — ${finalPrice.toFixed(2)} {currentMonths > 1 ? '/ año' : '/ mes'}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Nombre de la Empresa</label>
            <div className="input-wrapper-clean">
              <HiOfficeBuilding className="input-icon-fixed" />
              <input 
                type="text" 
                name="nameCompany" 
                value={formData.nameCompany} 
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
                name="ruc" 
                value={formData.ruc} 
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
                name="nameHolder" 
                value={formData.nameHolder} 
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
                name="lastNameHolder" 
                value={formData.lastNameHolder} 
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
                name="documentTypeId" 
                value={formData.documentTypeId}
                onChange={handleChange}
                required
                className="select-custom-clean"
              >
                <option value="">--SELECCIONE UNA OPCIÓN--</option>
                {documentTypes.map((type) => (
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
                name="emailCompany" 
                value={formData.emailCompany} 
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
                name="phoneCompany" 
                value={formData.phoneCompany} 
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