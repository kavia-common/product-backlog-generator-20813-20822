import React from 'react';

/**
 * SortHeader renders a clickable column header with sort indicator.
 */
const SortHeader = ({ label, sortKey, sortState, onSort }) => {
  const active = sortState.key === sortKey;
  const dir = sortState.dir;
  return (
    <button
      className="btn btn-ghost"
      onClick={() => onSort(sortKey)}
      aria-label={`Sort by ${label}`}
      style={{ padding: 8, fontWeight: 800 }}
    >
      {label}
      <span aria-hidden="true" style={{ marginLeft: 6, color: active ? 'var(--primary)' : 'var(--muted)' }}>
        {active ? (dir === 'asc' ? '▲' : '▼') : '↕'}
      </span>
    </button>
  );
};

export default SortHeader;
