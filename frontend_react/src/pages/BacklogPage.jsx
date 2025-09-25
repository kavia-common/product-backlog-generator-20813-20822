import React, { useEffect, useMemo, useState } from 'react';
import BacklogTable from '../components/backlog/BacklogTable';
import Modal from '../components/ui/Modal';
import BacklogForm from '../components/forms/BacklogForm';

/**
 * Demo seed data aligned with VizAi domain backlog.
 */
const seed = [
  {
    id: '1',
    title: 'Camera registry and health page',
    epic: 'Video Ingestion',
    priority: 'High',
    status: 'Backlog',
    estimate: 5,
    tags: ['Edge', 'Cameras'],
    description: 'Register RTSP/HTTP cameras with location and monitor health/status.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Event clip generator with motion threshold',
    epic: 'Pre-processing',
    priority: 'High',
    status: 'In Progress',
    estimate: 8,
    tags: ['Edge', 'Events'],
    description: 'Generate event clips with pre/post seconds using motion/activity filters.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Model registry + inference service v1',
    epic: 'AI Pipeline',
    priority: 'Medium',
    status: 'Backlog',
    estimate: 13,
    tags: ['AI', 'Models'],
    description: 'Support detection->tracking->classification pipelines with versioning.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Dashboards for events and analytics',
    epic: 'Delivery',
    priority: 'Low',
    status: 'Review',
    estimate: 8,
    tags: ['Analytics'],
    description: 'Review events with filters, play clips, and visualize heatmaps.',
    createdAt: new Date().toISOString(),
  },
];

/**
 * Utility to persist to localStorage
 */
const LS_KEY = 'vizai.backlog';

const loadData = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return seed;
};

const saveData = (items) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  } catch (e) {
    // ignore
  }
};

/**
 * BacklogPage hosts filters (reads from DOM ids placed in Sidebar) and renders table with create/edit modals.
 */
const BacklogPage = () => {
  const [items, setItems] = useState(loadData);
  const [sort, setSort] = useState({ key: 'priority', dir: 'asc' });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Wire up "New Backlog Item" button in Sidebar (delegated for template simplicity)
  useEffect(() => {
    const btn = document.getElementById('open-create');
    const onClick = () => {
      setEditing(null);
      setModalOpen(true);
    };
    if (btn) btn.addEventListener('click', onClick);
    return () => btn && btn.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    saveData(items);
  }, [items]);

  const applySort = (arr) => {
    const s = [...arr];
    s.sort((a, b) => {
      const k = sort.key;
      const av = a[k];
      const bv = b[k];
      // Priority custom order
      if (k === 'priority') {
        const order = { High: 0, Medium: 1, Low: 2 };
        const res = (order[av] ?? 99) - (order[bv] ?? 99);
        return sort.dir === 'asc' ? res : -res;
      }
      // Estimate numeric
      if (k === 'estimate') {
        const res = (Number(av) || 0) - (Number(bv) || 0);
        return sort.dir === 'asc' ? res : -res;
      }
      // Fallback string compare
      const as = String(av ?? '').toLowerCase();
      const bs = String(bv ?? '').toLowerCase();
      const res = as.localeCompare(bs);
      return sort.dir === 'asc' ? res : -res;
    });
    return s;
  };

  const filters = () => {
    const q = (document.getElementById('filter-q')?.value || '').toLowerCase();
    const priority = document.getElementById('filter-priority')?.value || '';
    const epic = document.getElementById('filter-epic')?.value || '';
    const status = document.getElementById('filter-status')?.value || '';
    return { q, priority, epic, status };
  };

  const filtered = useMemo(() => {
    const f = filters();
    let arr = items.filter((it) => {
      const hay = `${it.title} ${it.description} ${(it.tags || []).join(' ')}`.toLowerCase();
      if (f.q && !hay.includes(f.q)) return false;
      if (f.priority && it.priority !== f.priority) return false;
      if (f.epic && it.epic !== f.epic) return false;
      if (f.status && it.status !== f.status) return false;
      return true;
    });
    return applySort(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, sort]);

  const onSort = (key) => {
    setSort((s) => {
      if (s.key === key) return { key, dir: s.dir === 'asc' ? 'desc' : 'asc' };
      return { key, dir: 'asc' };
    });
  };

  const onEdit = (it) => {
    setEditing(it);
    setModalOpen(true);
  };

  const onDelete = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const onSubmit = (payload) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === payload.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [payload, ...prev];
    });
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <section className="card p-20">
        <div className="h1">VizAi Product Backlog</div>
        <div className="subtitle">Manage the AI-powered wildlife monitoring roadmap: ingestion, edge processing, inference, delivery, and security.</div>
        <div className="mt-16 flex gap-12">
          <button className="btn btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
            + Create Item
          </button>
          <button className="btn btn-ghost" onClick={() => localStorage.removeItem(LS_KEY)}>
            Reset Seed
          </button>
        </div>
      </section>

      <BacklogTable
        items={filtered}
        sort={sort}
        onSort={onSort}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        title={editing ? 'Edit Backlog Item' : 'Create Backlog Item'}
        footer={null}
      >
        <BacklogForm value={editing} onSubmit={onSubmit} />
      </Modal>
    </div>
  );
};

export default BacklogPage;
