import React from 'react';

/**
 * Badge shows a colored label for status.
 */
const colors = {
  'Backlog': 'rgba(255,255,255,0.08)',
  'In Progress': 'rgba(249, 115, 22, 0.2)',
  'Review': 'rgba(16, 185, 129, 0.2)',
  'Done': 'rgba(16, 185, 129, 0.25)',
};

const Badge = ({ children }) => {
  const bg = colors[children] || 'rgba(255,255,255,0.08)';
  return (
    <span className="pill" style={{ background: bg, borderColor: 'var(--border)' }}>{children}</span>
  );
};

export default Badge;
