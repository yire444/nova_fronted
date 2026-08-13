import { useState } from 'react';
import { 
  HiOutlineHome, 
  HiOutlineUsers, 
  HiOutlineClipboardCheck, 
  HiOutlineCreditCard, 
  HiOutlineFolder, 
  HiOutlineLogout, 
  HiOutlineSearch, 
  HiOutlineBell,
  HiOutlinePlus
} from 'react-icons/hi';
import '../styles/Dashboard.css';

export function Dashboard({ companyName = "Innovación Tecnológica S.A.C.", onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard-container">
      {/* BARRA LATERAL (SIDEBAR) */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <h1 className="logo-text">NOVA</h1>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <HiOutlineHome className="nav-icon" />
            <span>Inicio / Resumen</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            <HiOutlineUsers className="nav-icon" />
            <span>Empleados</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <HiOutlineClipboardCheck className="nav-icon" />
            <span>Tareas</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <HiOutlineFolder className="nav-icon" />
            <span>Proyectos</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <HiOutlineCreditCard className="nav-icon" />
            <span>Pagos y Facturación</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <HiOutlineLogout className="nav-icon" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="dashboard-main">
        {/* BARRA SUPERIOR (TOPBAR) */}
        <header className="topbar">
          <div className="topbar-search">
            <HiOutlineSearch className="search-icon" />
            <input type="text" placeholder="Buscar empleados, tareas, proyectos..." />
          </div>

          <div className="topbar-right">
            <button className="icon-btn" title="Notificaciones">
              <HiOutlineBell />
              <span className="badge-dot"></span>
            </button>

            {/* PERFIL DE USUARIO */}
            <div className="user-profile-badge">
              <div className="avatar-circle">
                {companyName.charAt(0)}
              </div>
              <div className="user-info">
                <span className="company-title">{companyName}</span>
                <span className="user-role">Administrador Principal</span>
              </div>
            </div>
          </div>
        </header>

        {/* ÁREA DE CONTENIDO DINÁMICO SEGÚN LA PESTAÑA */}
        <div className="content-viewport">
          <div className="content-header">
            <div>
              <h2>{activeTab === 'overview' && 'Panel General'}
                  {activeTab === 'employees' && 'Gestión de Empleados'}
                  {activeTab === 'tasks' && 'Asignación de Tareas'}
                  {activeTab === 'projects' && 'Control de Proyectos'}
                  {activeTab === 'payments' && 'Historial de Pagos y Planes'}</h2>
              <p>Bienvenido a tu espacio de control centralizado en NOVA.</p>
            </div>
            {activeTab !== 'overview' && (
              <button className="primary-action-btn">
                <HiOutlinePlus /> Nuevo Registro
              </button>
            )}
          </div>

          {activeTab === 'overview' && (
            <div className="metrics-grid">
              <div className="metric-card">
                <h3>Empleados Activos</h3>
                <p className="metric-number">12</p>
                <span className="trend positive">+2 este mes</span>
              </div>
              <div className="metric-card">
                <h3>Tareas Pendientes</h3>
                <p className="metric-number">28</p>
                <span className="trend warning">5 urgentes</span>
              </div>
              <div className="metric-card">
                <h3>Proyectos en Curso</h3>
                <p className="metric-number">4</p>
                <span className="trend neutral">En tiempo</span>
              </div>
              <div className="metric-card">
                <h3>Plan Actual</h3>
                <p className="metric-number plan-name">Business</p>
                <span className="trend positive">Activo</span>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="data-placeholder-card">
              <p>Módulo de <strong>{activeTab.toUpperCase()}</strong> listo para conectar con los endpoints de tu backend en Spring Boot.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}