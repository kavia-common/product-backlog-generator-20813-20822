import React from 'react';

/**
 * Header renders the top navigation with VizAi brand and section tabs.
 */
const Header = () => {
  return (
    <header
      className="card"
      style={{
        borderRadius: 0,
        borderLeft: '0',
        borderRight: '0',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background:
          'linear-gradient(90deg, rgba(17,24,39,1) 0%, rgba(31,41,55,1) 60%, rgba(17,24,39,1) 100%)',
      }}
    >
      <div className="p-16 px-12" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            aria-hidden="true"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background:
                'conic-gradient(from 180deg at 50% 50%, #F97316 0deg, #10B981 120deg, #F97316 360deg)',
              boxShadow: '0 8px 20px rgba(249,115,22,0.35)',
            }}
          />
          <div style={{ fontWeight: 900, letterSpacing: '-0.02em', fontSize: 20 }}>
            VizAi
            <span className="theme-primary" style={{ marginLeft: 6 }}>Backlog</span>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: 8 }}>
          {['Cameras', 'Events', 'Analytics', 'Rules', 'Admin'].map((item) => (
            <button key={item} className="btn btn-ghost" aria-label={`${item} (not implemented)`}>
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
