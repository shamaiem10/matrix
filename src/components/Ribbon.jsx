import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Ribbon() {
  const prefersReducedMotion = useReducedMotion();
  const items = useMemo(
    () => [
      'Python', 'FastAPI', 'React', 'PostgreSQL', 'AWS', 'LangChain', 'Qdrant', 'Airflow', 'Temporal', 'Zapier', 'n8n', 'Docker', 'Kubernetes', 'GraphQL'
    ],
    []
  );
  const [hover, setHover] = useState(false);
  const speed = prefersReducedMotion || hover ? 0 : 36; // px/s

  return (
    <section className="section ribbon" aria-label="Stacks We Ship">
      <div className="band-gradient" aria-hidden="true"></div>
      <div className="container-fluid">
        <div className="marquee" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <motion.div
            className="track"
            animate={{ x: prefersReducedMotion ? 0 : [0, -1000] }}
            transition={{ duration: prefersReducedMotion ? 0 : 1000 / (speed || 1), repeat: prefersReducedMotion ? 0 : Infinity, ease: 'linear' }}
          >
            {[...items, ...items, ...items].map((label, i) => (
              <motion.span key={label + i} className="chip" whileHover={!prefersReducedMotion ? { scale: 1.05, y: -1 } : undefined}>
                <i className="bi bi-boxes" aria-hidden="true"></i>
                {label}
              </motion.span>
            ))}
          </motion.div>
          <div className="edge-fade left" aria-hidden="true" />
          <div className="edge-fade right" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
