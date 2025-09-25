import React from 'react';
import SortHeader from '../ui/SortHeader';
import Badge from '../ui/Badge';

/**
 * BacklogTable renders a sortable table of backlog items.
 */
const priorityClass = (p) => {
  if (p === 'High') return 'pill high';
  if (p === 'Low') return 'pill low';
  return 'pill medium';
};

const BacklogTable = ({ items, sort, onSort, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="p-16" style={{ borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="h2">Backlog Items</div>
        <div className="subtitle">{items.length} items</div>
      </div>
      <div className="p-16">
        <table className="table row-hover">
          <thead>
            <tr>
              <th><SortHeader label="Title" sortKey="title" sortState={sort} onSort={onSort} /></th>
              <th><SortHeader label="Epic" sortKey="epic" sortState={sort} onSort={onSort} /></th>
              <th><SortHeader label="Priority" sortKey="priority" sortState={sort} onSort={onSort} /></th>
              <th><SortHeader label="Status" sortKey="status" sortState={sort} onSort={onSort} /></th>
              <th><SortHeader label="Estimate" sortKey="estimate" sortState={sort} onSort={onSort} /></th>
              <th><SortHeader label="Tags" sortKey="tags" sortState={sort} onSort={onSort} /></th>
              <th style={{ width: 140 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td style={{ fontWeight: 700 }}>
                  {it.title}
                  <div className="subtitle" style={{ marginTop: 4, fontSize: 12 }}>{it.description?.slice(0, 100)}</div>
                </td>
                <td>{it.epic || '-'}</td>
                <td><span className={priorityClass(it.priority)}>{it.priority}</span></td>
                <td><Badge>{it.status}</Badge></td>
                <td>{it.estimate || 0}</td>
                <td>
                  <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
                    {(it.tags || []).map((t) => <span key={t} className="pill" style={{ padding: '4px 8px' }}>#{t}</span>)}
                  </div>
                </td>
                <td>
                  <div className="flex gap-8">
                    <button className="btn btn-secondary" onClick={() => onEdit(it)}>Edit</button>
                    <button className="btn btn-ghost" onClick={() => onDelete(it.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="subtitle">No items match the current filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BacklogTable;
