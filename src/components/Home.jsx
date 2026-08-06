import React from 'react';
import '../styles/Home.css';
import { HiOutlineDatabase, HiOutlineShieldCheck, HiOutlineClock, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export function Home() {

  const navigate = useNavigate();

  return (
    <main className="home-container">

      {/* 1. Sección Principal / Introducción */}
      <div className="hero-section">
        <h1 className="hero-title">
          Gestiona tu empresa con <span>NOVA</span>
        </h1>
        <p className="hero-subtitle">
          Plataforma diseñada para la administración integral del talento humano. Logramos centralizar el 100% de la información de tus empleados, sueldos y contratos en una sola base de datos confiable y segura.
        </p>
        <div className="hero-buttons">
          <a href="/register" className="btn-primary" onClick={() => navigate('/pricing')}>Empezar Ahora</a>
          <a href="/features" className="btn-secondary">Ver Características</a>
        </div>
      </div>

      {/* 2. Sección de Ventajas / Beneficios */}
      <section className="advantages-section">
        <h2 className="section-title">¿Qué Beneficios Ofrece NOVA?</h2>
        
        <div className="advantages-grid">

          <div className="advantage-card">
            <div className="advantage-icon"><HiOutlineDatabase /></div>
            <h3>Centralización de la Información</h3>
            <p className="advantage-description">
              Acceso centralizado a toda la información laboral, contratos y expedientes digitales del personal en cualquier momento.
            </p>
          </div>

          <div className="advantage-card">
            <div className="advantage-icon"><HiOutlineShieldCheck /></div>
            <h3>Seguridad y Confidencialidad</h3>
            <p className="advantage-description">
              Información crítica protegida mediante accesos con contraseña, permisos controlados y cifrado avanzado.
            </p>
          </div>

          <div className="advantage-card">
            <div className="advantage-icon"><HiOutlineClock /></div>
            <h3>Optimización de Tiempos</h3>
            <p className="advantage-description">
              Reduce significativamente el tiempo que el equipo dedica a buscar expedientes y gestionar planillas, licencias, pagos.
            </p>
          </div>

        </div>
      </section>

      {/* 3. SECCIÓN DE PREGUNTAS FRECUENTES (FAQ) */}
      <section className="faq-section">
          <h2 className="section-title">Preguntas Frecuentes</h2>

          <div className="faq-grid">

              <div className="faq-card">
                  <h3 className="faq-question">
                    <span className="faq-icon"><HiOutlineQuestionMarkCircle /></span>
                    ¿Cuántas empresas puedo administrar por cuenta?
                  </h3>
                  <p className="faq-answer">
                      Por motivos de seguridad y organización, cada cuenta de usuario en NOVA está diseñada para administrar exclusivamente una empresa de manera independiente y centralizada.
                  </p>
              </div>

              <div className="faq-card">
                  <h3 className="faq-question">
                    <span className="faq-icon"><HiOutlineQuestionMarkCircle /></span>
                    ¿Cómo se gestionan las planillas y los pagos?
                  </h3>
                  <p className="faq-answer">
                      El sistema cuenta con un módulo de planillas integrado que permite llevar el control de los pagos, sueldos y deducciones de forma ordenada, evitando errores manuales y optimizando los tiempos del área contable.
                  </p>
              </div>

              <div className="faq-card">
                  <h3 className="faq-question">
                    <span className="faq-icon"><HiOutlineQuestionMarkCircle /></span>
                    ¿Los empleados pueden ver su propia información?
                  </h3>
                  <p className="faq-answer">
                      Sí, los colaboradores cuentan con un acceso propio para consultar sus datos personales, revisar sus pagos, tareas pendientes y mantenerse actualizados de forma directa y segura.
                  </p>
              </div>

              <div className="faq-card">
                  <h3 className="faq-question">
                    <span className="faq-icon"><HiOutlineQuestionMarkCircle /></span>
                    ¿Qué tan segura está la información de la empresa?
                  </h3>
                  <p className="faq-answer">
                      Utilizamos estándares de encriptación avanzados y control de accesos estrictos para garantizar que la información crítica y los datos sensibles estén totalmente protegidos.
                  </p>
              </div>

          </div>
      </section>    
    </main>
  );
}