import React from "react";
import { HiUserGroup, HiClipboardCheck, HiCurrencyDollar, HiShieldCheck } from "react-icons/hi";
import '../styles/Characteristics.css';

export const Characteristics = () => {
    return(
        <div className="characteristics-container">
            {/* Encabezado de la sección */}
            <div className="characteristics-header">
                <h2 className="characteristics-title">Todo lo que tu empresa necesita en un solo lugar</h2>
                <p className="characteristics-subtitle">
                    Optimiza la administración de tu personal con módulos diseñados para escalar junto a tu negocio.
                </p>
            </div>

            {/* Cuadrícula de características / módulos */}
            <div className="characteristics-grid">
                
                {/* Tarjeta 1 */}
                <div className="characteristic-card">
                    <div className="card-icon-wrapper">
                        <HiUserGroup className="card-icon" />
                    </div>
                    <h3>Módulo de Empleados</h3>
                    <p>Gestiona perfiles, información de contacto, departamentos y puestos de trabajo de forma centralizada.</p>
                </div>

                {/* Tarjeta 2 */}
                <div className="characteristic-card">
                    <div className="card-icon-wrapper">
                        <HiClipboardCheck className="card-icon" />
                    </div>
                    <h3>Control de Tareas y Permisos</h3>
                    <p>Asigna actividades, supervisa el rendimiento y gestiona solicitudes de vacaciones o licencias fácilmente.</p>
                </div>

                {/* Tarjeta 3 */}
                <div className="characteristic-card">
                    <div className="card-icon-wrapper">
                        <HiCurrencyDollar className="card-icon" />
                    </div>
                    <h3>Planilla y Pagos</h3>
                    <p>Automatiza el cálculo de sueldos, bonificaciones y deducciones con total precisión y seguridad.</p>
                </div>

                {/* Tarjeta 4 */}
                <div className="characteristic-card">
                    <div className="card-icon-wrapper">
                        <HiShieldCheck className="card-icon" />
                    </div>
                    <h3>Roles y Seguridad</h3>
                    <p>Controla el acceso de los colaboradores mediante permisos granulares avanzados según su jerarquía.</p>
                </div>

            </div>
        </div>
    );
}