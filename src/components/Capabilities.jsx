import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CAPS = [
  {
    key: 'ai',
    title: 'Artificial intelligence',
    body: 'Intelligent systems from classical ML to deep learning: problem framing, training discipline, evaluation, and deployment with monitoring you can run in production.',
    bullets: [
      'Problem framing and training discipline',
      'Evaluation you can trust',
      'Deployment with monitoring in production'
    ]
  },
  {
    key: 'analysis',
    title: 'Data analysis',
    body: 'From exploratory work to executive-ready reporting: clean metrics, reproducible notebooks, and decision-grade insight, not vanity charts.',
    bullets: [
      'Reproducible notebooks',
      'Clean metrics and reporting',
      'Decision-grade insights'
    ]
  },
  {
    key: 'ds',
    title: 'Data science',
    body: 'Hypothesis-driven modeling, experimentation, forecasting, and statistical rigor so leaders can trust what the data claims.',
    bullets: [
      'Forecasting and experimentation',
      'Statistical rigor',
      'Trustworthy claims from data'
    ]
  },
  {
    key: 'websaascrm',
    title: 'Website, SaaS & CRM development',
    body: 'Marketing and product sites, multi-tenant SaaS, and CRM delivery (Salesforce, HubSpot, and custom stacks) so sales, marketing, and ops stay aligned.',
    bullets: [
      'Websites and SaaS platforms',
      'Salesforce, HubSpot, and custom stacks',
      'Keep sales, marketing, and ops aligned'
    ]
  },
  {
    key: 'cv',
    title: 'Computer vision',
    body: 'Image and video understanding: detection, classification, segmentation, and OCR-style workflows integrated into your products and ops.',
    bullets: [
      'Detection and segmentation',
      'OCR-style workflows',
      'Video and perception'
    ]
  },
  {
    key: 'automation',
    title: 'AI & workflow automation',
    body: 'Agents, orchestration, and intelligent pipelines that remove repetitive work and keep humans in the loop where judgment matters.',
    bullets: [
      'Agents and orchestration',
      'Remove repetitive work',
      'Humans in the loop where judgment matters'
    ]
  }
];

export default function Capabilities() {
  const [active, setActive] = useState('ai');
  const activeIdx = useMemo(() => CAPS.findIndex(c => c.key === active), [active]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="solutions" className="section capabilities">
      <div className="container grid">
        <motion.aside
          className="left-rail"
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <ul className="cap-list" role="tablist" aria-label="Capabilities">
            {CAPS.map((c, i) => (
              <li key={c.key}>
                <button
                  className={`capability-link ${active === c.key ? 'active' : ''}`}
                  role="tab"
                  aria-selected={active === c.key}
                  aria-controls={`panel-${c.key}`}
                  onClick={() => setActive(c.key)}
                >
                  <i className={`bi ${i % 2 === 0 ? 'bi-cpu' : 'bi-kanban'}`} aria-hidden="true"></i>
                  {c.title}
                </button>
              </li>
            ))}
            <motion.span
              className="active-rail"
              style={{ top: `${activeIdx * 48}px` }}
              layout
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            />
          </ul>
        </motion.aside>

        <div className="cap-content">
          {CAPS.map((c) => (
            <motion.article
              key={c.key}
              id={`panel-${c.key}`}
              role="tabpanel"
              aria-hidden={active !== c.key}
              className={`cap-card ${active === c.key ? 'shown' : 'hidden'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={active === c.key ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3>{c.title}</h3>
              <p className="muted">{c.body}</p>
              <ul className="bullets">
                {c.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <i className="bi bi-check2" aria-hidden="true"></i>
                    {b}
                  </motion.li>
                ))}
              </ul>
              <a className="inline-link" href="https://www.matrix-ae.com/contact" target="_blank" rel="noreferrer">
                Talk to us <i className="bi bi-arrow-right-short" aria-hidden="true"></i>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
