import React from 'react';

/**
 * Sidebar renders quick filters for backlog items.
 */
const Sidebar = () => {
  return (
    <aside
      className="bg-surface-2"
      style={{
        borderRight: '1px solid var(--border)',
        minHeight: '100%',
        padding: 16,
      }}
    >
      <div className="h2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Filters
        <span className="pill" style={{ borderColor: 'var(--border)' }}>Quick</span>
      </div>

      <div className="mt-16 grid" style={{ gap: 16 }}>
        <div>
          <label className="label">Search</label>
          <input type="search" className="input" placeholder="Find item..." id="filter-q" />
        </div>

        <div>
          <label className="label">Priority</label>
          <select className="select" id="filter-priority" defaultValue="">
            <option value="">Any</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="grid grid-2" style={{ gap: 12 }}>
          <div>
            <label className="label">Epic</label>
            <select className="select" id="filter-epic" defaultValue="">
              <option value="">Any</option>
              <option>Video Ingestion</option>
              <option>Pre-processing</option>
              <option>AI Pipeline</option>
              <option>Delivery</option>
              <option>Security</option>
            </select>
          </div>
          <div>
            <label className="label">Status</label>
            <select className="select" id="filter-status" defaultValue="">
              <option value="">Any</option>
              <option>Backlog</option>
              <option>In Progress</option>
              <option>Review</option>
              <option>Done</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label">Tags</label>
          <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
            {['Edge', 'Cloud', 'AI', 'Rules', 'Analytics'].map((t) => (
              <button key={t} className="btn btn-ghost" style={{ padding: '6px 10px' }}>
                #{t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <button className="btn btn-primary" id="open-create">
            + New Backlog Item
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
