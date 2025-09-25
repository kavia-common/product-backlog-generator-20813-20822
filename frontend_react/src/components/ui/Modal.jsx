import React, { useEffect } from 'react';

/**
 * Modal base with ESC-close and backdrop click to close.
 */
const Modal = ({ open, onClose, title, children, footer }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="p-20" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="h2">{title}</div>
          <div className="subtitle">Provide details and save your changes.</div>
        </div>
        <div className="p-20">
          {children}
        </div>
        <div className="p-20" style={{ borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          {footer}
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
