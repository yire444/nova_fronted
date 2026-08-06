import React, { useState } from 'react';
import '../styles/Prices.css';
import { HiCheck, HiX } from 'react-icons/hi';

export function Prices() {

  //PARA EL CAMBIO DE PLANES MENSUAL / ANUAL
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="pricing-container">

      {/* Encabezado */}
      <div className="pricing-header">
        <h1 className="pricing-title">Planes adaptados a tu <span>Empresa</span></h1>
        <p className="pricing-subtitle">
          Elige el plan ideal para gestionar tu empresa humano de forma eficiente y escalable.
        </p>

        {/* Botón de cambio mensual / anual */}
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

      {/* Tarjetas de Precios */}
      <div className="pricing-grid">
        
        {/* Plan 1: Starter */}
        <div className="pricing-card">
          <h3>Starter</h3>
          <p className="plan-desc">Ideal para pequeños equipos que inician su organización.</p>
          <div className="price">
            <span className="currency">$</span>
            <span className="amount">{isAnnual ? '24' : '29'}</span>
            <span className="period">/ mes</span>
          </div>
          <ul className="features-list">
            <li><HiCheck /> Hasta 25 colaboradores</li>
            <li><HiCheck /> Módulo de Empleados</li>
            <li><HiCheck /> Departamentos y Puestos</li>
            <li><HiX /> Control de Tareas</li>
            <li><HiX /> Planilla y Pagos</li>
          </ul>
          <button className="btn-pricing">Elegir Plan</button>
        </div>

        {/* Plan 2: Business (Destacado) */}
        <div className="pricing-card popular">
          <div className="popular-tag">Más Popular</div>
          <h3>Business</h3>
          <p className="plan-desc">Para PyMES en crecimiento que buscan automatización.</p>
          <div className="price">
            <span className="currency">$</span>
            <span className="amount">{isAnnual ? '63' : '79'}</span>
            <span className="period">/ mes</span>
          </div>
          <ul className="features-list">
            <li><HiCheck /> Hasta 100 colaboradores</li>
            <li><HiCheck /> Módulo de Empleados</li>
            <li><HiCheck /> Departamentos y Puestos</li>
            <li><HiCheck /> Asignación de Tareas</li>
            <li><HiCheck /> Licencias y Permisos</li>
          </ul>
          <button className="btn-pricing btn-primary-pricing">Elegir Plan</button>
        </div>

        {/* Plan 3: Enterprise */}
        <div className="pricing-card">
          <h3>Enterprise</h3>
          <p className="plan-desc">Solución corporativa completa sin restricciones.</p>
          <div className="price">
            <span className="currency">$</span>
            <span className="amount">{isAnnual ? '159' : '199'}</span>
            <span className="period">/ mes</span>
          </div>
          <ul className="features-list">
            <li><HiCheck /> Colaboradores ilimitados</li>
            <li><HiCheck /> Todos los módulos anteriores</li>
            <li><HiCheck /> <strong>Planilla / Pagos completa</strong></li>
            <li><HiCheck /> Soporte prioritario 24/7</li>
            <li><HiCheck /> Roles granulares avanzados</li>
          </ul>
          <button className="btn-pricing">Elegir Plan</button>
        </div>

      </div>
    </div>
  );
}