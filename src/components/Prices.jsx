import React, { useState, useEffect } from 'react';
import '../styles/Prices.css';
import { HiCheck, HiX } from 'react-icons/hi';
import { Register } from './RegisterModal';

//ARREGLO DE CARACTERÍSTICAS DE PLANES
const plans = [
  { 
    name: 'Starter', 
    description: "Ideal para pequeños equipos que inician su organización.",
    features: [
      { text: "Hasta 25 colaboradores", included: true },
      { text: "Módulo de Empleados", included: true },
      { text: "Departamentos y Puestos", included: true },
      { text: "Control de Tareas", included: false },
      { text: "Planilla y Pagos", included: false },
    ]
  },
  { 
    name: 'Business', 
    description: "Para PyMES en crecimiento que buscan automatización.",
    features: [
      { text: "Hasta 100 colaboradores", included: true },
      { text: "Módulo de Empleados", included: true },
      { text: "Departamentos y Puestos", included: true },
      { text: "Asignación de Tareas", included: true },
      { text: "Licencias y Permisos", included: true },
    ]
  },
  { 
    name: 'Enterprise', 
    description: "Solución corporativa completa sin restricciones.",
    features: [
      { text: "Colaboradores ilimitados", included: true },
      { text: "Todos los módulos anteriores", included: true },
      { text: "Planilla / Pagos completa", included: true },
      { text: "Soporte prioritario 24/7", included: true },
      { text: "Roles granulares avanzados", included: true },
    ]
  }
];

export function Prices() {
  
  //ESTADOS PARA EL COMPONENTE
  const [isAnnual, setIsAnnual] = useState(false);

  //ESTADO PARA EL MODAL DE REGISTRO
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); 
  
  // OBTENER PLANES DESDE LA BASE DE DATOS
  const [dbplans, setDbPlans] = useState([]);
  useEffect(() => {
    fetch('http://localhost:9090/api/plan-type')
      .then(response => response.json())
      .then(data => { setDbPlans(data); })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div className="pricing-container">

      {/* Encabezado */}
      <div className="pricing-header">
        <h1 className="pricing-title">Planes adaptados a tu <span>Empresa</span></h1>
        <p className="pricing-subtitle">
          Elige el plan ideal para gestionar tu talento humano de forma eficiente y escalable.
        </p>

        {/* CHECKBOX PARACAMBIAR PRECIOS SEGÚN MENSUAL O ANUAL */}
        <div className="billing-toggle">
          <span className={!isAnnual ? 'active' : ''}>Mensual</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isAnnual} 
              onChange={() => setIsAnnual(!isAnnual)} 
            />
            <span className="slider round"></span>
          </label>
          <span className={isAnnual ? 'active' : ''}>
            Anual <span className="discount-badge">¡20% OFF!</span>
          </span>
        </div>
      </div>

      {/* Tarjetas de Precios Dinámicas */}
      <div className="pricing-grid">
        
        {dbplans.map((dbPlan) => {

          const visualDetails = plans.find(plan => plan.name === dbPlan.name);
          if (!visualDetails) return null;
          
          //CALCULAR MÉTODOS DE PAGO SEGÚN SI ES ANUAL O MENSUAL
          const displayedPrice = isAnnual ? Math.round(dbPlan.price * 0.8) : dbPlan.price;
          
          //OBTENER PLAN MÁS POPULAR PARA DESTACARLO
          const isPopular = dbPlan.name === 'Business';

          // 3. EL RETURN DEBE IR AQUÍ ADENTRO DEL MAP
          return (
            <div key={dbPlan.id} className={`pricing-card ${isPopular ? 'popular' : ''}`}>
              
              {isPopular && <div className="popular-tag">Más Popular</div>}
              
              <h2 className="plan-name">{dbPlan.name}</h2>
              <p className="plan-description">{visualDetails.description}</p>
              
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">{displayedPrice}</span>
                <span className="period">/{isAnnual ? 'año' : 'mes'}</span>
              </div>

              {/* Lista de características que viene del frontend */}
              <ul className="features-list">
                {visualDetails.features.map((feature, index) => (
                  <li key={index}>
                    {feature.included ? <HiCheck /> : <HiX />} 
                    {feature.text}
                  </li>
                ))}
              </ul>

              <button 
                className={`btn-pricing ${isPopular ? 'btn-primary-pricing' : ''}`} 
                onClick={() => setIsRegisterOpen(true)}
              >
                Elegir Plan
              </button>

            </div>
          );
        })}

      </div>

      {/* Renderizado condicional del modal de Registro */}
      {isRegisterOpen && (
        <Register onClose={() => setIsRegisterOpen(false)} />
      )}
    </div>
  );
}