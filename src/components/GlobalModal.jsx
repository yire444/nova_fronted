import React from 'react';
import { Register } from './RegisterModal';
import { Login } from './LoginModal';
import { ActivateModal } from './ActivateModal';

export function GlobalModal({ modalType, modalData, onClose, onSwitchModal }) {
  if (!modalType) return null; 

  return (
    <>
      {modalType === 'register' && (
        <Register
          isOpen={true}
          onClose={onClose}
          onSwitchToLogin={() => onSwitchModal('login')}
          onRegisterSuccess={(email) => {
            onSwitchModal('activate', email); // Salta al ActivateModal pasando el correo
          }}
        />
      )}

      {modalType === 'login' && (
        <Login
          isOpen={true}
          onClose={onClose}
          onSwitchToRegister={() => onSwitchModal('register')}
          onSwitchToActivate={(email) => {
            onSwitchModal('activate', email); 
          }}
        />
      )}

      {modalType === 'activate' && (
        <ActivateModal
          isOpen={true}
          emailInitial={modalData} 
          onClose={onClose}
          onSwitchToLogin={() => onSwitchModal('login')}
        />
      )}
    </>
  );
}