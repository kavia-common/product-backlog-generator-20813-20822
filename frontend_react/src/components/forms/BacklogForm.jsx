import React, { useEffect, useState } from 'react';

/**
 * BacklogForm handles create/edit of a backlog item.
 */
const initial = {
  title: '',
  epic: '',
  priority: 'Medium',
  status: 'Backlog',
  estimate: 1,
  tags: '',
  description: '',
};

const BacklogForm = ({ value, onSubmit }) => {
  const [form, setForm] = useState(initial);

  useEffect(() => {
    setForm({ ...initial, ...(value || {}) });
  }, [value]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      id: form.id || crypto.randomUUID(),
      createdAt: form.createdAt || new Date().toISOString(),
      tags: (form.tags || '').split(',').map(s => s.trim()).filter(Boolean),
      estimate: Number(form.estimate || 0),
    };
    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="grid" style={{ gap: 16 }}>
      <div>
        <label className="label" htmlFor="title">Title</label>
        <input id="title" required className="input" value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="e.g., Camera registry and health" />
      </div>

      <div className="grid grid-3">
        <div>
          <label className="label" htmlFor="epic">Epic</label>
          <select id="epic" className="select" value={form.epic} onChange={(e) => update('epic', e.target.value)}>
            <option value="">Select epic</option>
            <option>Video Ingestion</option>
            <option>Pre-processing</option>
            <option>AI Pipeline</option>
            <option>Delivery</option>
            <option>Security</option>
          </select>
        </div>

        <div>
          <label className="label" htmlFor="priority">Priority</label>
          <select id="priority" className="select" value={form.priority} onChange={(e) => update('priority', e.target.value)}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div>
          <label className="label" htmlFor="status">Status</label>
          <select id="status" className="select" value={form.status} onChange={(e) => update('status', e.target.value)}>
            <option>Backlog</option>
            <option>In Progress</option>
            <option>Review</option>
            <option>Done</option>
          </select>
        </div>
      </div>

      <div className="grid grid-3">
        <div>
          <label className="label" htmlFor="estimate">Estimate (pts)</label>
          <input id="estimate" type="number" min="0" className="input" value={form.estimate} onChange={(e) => update('estimate', e.target.value)} />
        </div>
        <div className="grid" style={{ alignContent: 'end' }}>
          <div className="subtitle">Use Fibonacci or integer scale.</div>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="tags">Tags (comma separated)</label>
        <input id="tags" className="input" value={form.tags} onChange={(e) => update('tags', e.target.value)} placeholder="Edge, AI, Rules" />
      </div>

      <div>
        <label className="label" htmlFor="description">Description</label>
        <textarea id="description" rows={5} className="textarea" value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe the user story, acceptance criteria, and context." />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button type="submit" className="btn btn-primary">{form.id ? 'Save' : 'Create'}</button>
      </div>
    </form>
  );
};

export default BacklogForm;
