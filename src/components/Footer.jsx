import React, { useState } from 'react';
import { PublicNavOptions } from './Navbar'; 
import '../styles/Footer.css';
import { HiOutlineMail, HiOutlineBookOpen } from 'react-icons/hi';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { ClaimModal } from './ClaimModal'; 

export function Footer() {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/*Logo*/}
        <div className="footer-col-brand">
          <h2 className="footer-logo">NOVA</h2>
          <p className="footer-slogan">Sistema Integral de Gestión de Talento Humano.</p>
        </div>

        {/*Explorar*/}
        <div className="footer-col">
          <h3 className="footer-title">EXPLORAR</h3>
          <ul className="footer-list">
            {PublicNavOptions.map((link) => (
              <li key={link.id}>
                <a href={link.url}>{link.option}</a>
              </li>
            ))}
          </ul>
        </div>

        {/*Contacto */}
        <div className="footer-col">
          <h3 className="footer-title">CONTACTO</h3>
          <ul className="footer-list">
            <li>
              <a href="mailto:soporte@nova.com"><HiOutlineMail /> soporte@nova.com</a>
            </li>
            <li>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer"><FaWhatsapp /> Whatsapp</a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /> Instagram</a>
            </li>
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><FaFacebook /> Facebook</a>
            </li>
          </ul>
        </div>

        {/*Soporte */}
        <div className="footer-col">
          <h3 className="footer-title">SOPORTE</h3>
          <ul className="footer-list">
            <li>
              <button 
                className="footer-link-btn" 
                onClick={() => setIsClaimModalOpen(true)}
              >
                <HiOutlineBookOpen /> Libro de Reclamaciones
              </button>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 NOVA. Todos los derechos reservados.</p>
      </div>

      {/*MOSTRAR MODAL DE RECLAMACIONES*/}
      <ClaimModal 
        isOpen={isClaimModalOpen} 
        onClose={() => setIsClaimModalOpen(false)} 
      />
    </footer>
  );
}