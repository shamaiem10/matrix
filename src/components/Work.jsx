import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const WORK = [
  {
    title: 'Smart Ice Block Counter (NVR + CV + CRM surface)',
    tags: ['React', 'Flask', 'YOLO', 'SQLite', 'Electron', 'NVR'],
    ctas: [
      { label: 'Watch demo', href: 'https://www.matrix-ae.com/portfolio' }
    ]
  },
  {
    title: 'Full-Stack Agent Chat (RAG, Qdrant, LangGraph)',
    tags: ['FastAPI', 'LangGraph', 'RAG', 'Qdrant', 'Embeds'],
    ctas: [
      { label: 'Watch demo', href: 'https://www.matrix-ae.com/portfolio' }
    ]
  },
  {
    title: 'One-Click Invoice Automation (Sheets → PDF → Gmail)',
    tags: ['Apps Script', 'Sheets', 'Docs', 'Gmail', 'PDF'],
    ctas: [
      { label: 'Watch demo', href: 'https://www.matrix-ae.com/portfolio' }
    ]
  }
];

export default function Work() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="work" className="section work">
      <div className="container">
        <div className="section-head">
          <h2>Selected Work</h2>
          <p className="muted">Shipped projects across computer vision, agents, automation, and CRM & enterprise.</p>
        </div>
        <div className="grid-3">
          {WORK.map((w, idx) => (
            <motion.article
              key={w.title}
              className={`card work-card ${idx === 0 ? 'tall' : 'wide'}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              whileHover={!prefersReducedMotion ? { scale: 1.02, y: -4, boxShadow: '0 16px 44px rgba(0,0,0,0.35)' } : undefined}
            >
              <div className="thumb" aria-hidden="true">
                <div className="thumb-overlay">
                  <i className="bi bi-collection-play" aria-hidden="true"></i>
                </div>
              </div>
              <div className="work-body">
                <h3 className="work-title">{w.title}</h3>
                <div className="tags">
                  {w.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="cta-row">
                  {w.ctas.map((c) => (
                    <motion.a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="btn btn-ghost" initial={{ x: 8, opacity: 0 }} whileHover={{ x: 0, opacity: 1 }}>
                      {c.label}
                      <i className="bi bi-arrow-right-short" aria-hidden="true"></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
