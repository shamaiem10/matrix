import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const ITEMS = [
  {
    key: 'discover',
    title: 'Discover & frame',
    body: [
      'Honest scope and success metrics.',
      'We treat rigor and clarity as part of the product.'
    ]
  },
  {
    key: 'build',
    title: 'Model & build',
    body: [
      'Artificial intelligence, data analysis, data science, and computer vision where pixels matter.',
      'Websites, SaaS, and CRM-backed experiences.'
    ]
  },
  {
    key: 'ship',
    title: 'Ship & integrate',
    body: [
      'APIs and systems delivery with integrations you can operate.',
      'Operators, not demos.'
    ]
  },
  {
    key: 'monitor',
    title: 'Monitor & iterate',
    body: [
      'Evals, guardrails, and documentation you inherit.',
      'Operational paths so insights and models survive contact with production.'
    ]
  }
];

export default function Playbook() {
  const [open, setOpen] = useState('discover');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section playbook">
      <div className="container narrow">
        <div className="section-head">
          <h2>The Delivery Playbook — From Frame to Production</h2>
        </div>
        <div className="accordion" role="tablist">
          {ITEMS.map((it, idx) => {
            const isOpen = open === it.key;
            return (
              <motion.div key={it.key} className={`accordion-item ${isOpen ? 'open' : ''}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.06 }}
              >
                <button className="accordion-header" role="tab" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? '' : it.key)}>
                  <span className="accent-bar" aria-hidden="true" />
                  <i className={`bi ${isOpen ? 'bi-chevron-down' : 'bi-chevron-right'}`} aria-hidden="true"></i>
                  {it.title}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="accordion-panel"
                      role="region"
                      initial={{ height: 0, opacity: 0.7 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0.7 }}
                      transition={{ duration: 0.28, ease: [0.65, 0, 0.35, 1] }}
                    >
                      <ul>
                        {it.body.map((b, i) => (
                          <motion.li key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, delay: prefersReducedMotion ? 0 : i * 0.04 }}>
                            <i className="bi bi-check2-square" aria-hidden="true"></i>
                            {b}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
