import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

function useCountUp(target, duration, startOnView) {
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!startOnView || !inView) return;
    if (prefersReducedMotion) { setValue(target); return; }
    let start = 0;
    const startTime = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const p = Math.min(1, (now - startTime) / (duration * 1000));
      const ev = start + (target - start) * ease(p);
      setValue(Math.round(ev));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, startOnView, inView, prefersReducedMotion]);

  return { ref, value };
}

export default function Stats() {
  const p = 0.45;
  const s1 = useCountUp(11, 1.2, true);
  const s2 = useCountUp(4, 1.2, true);
  const s3 = useCountUp(100, 1.2, true);

  return (
    <section className="section stats" aria-label="Reliability Math">
      <div className="container grid-3">
        <StatCard icon="bi-graph-up-arrow" value={s1.value} label="Projects shipped" helper="Built for operators, not demos." refProp={s1.ref} />
        <StatCard icon="bi-kanban" value={s2.value} label="Practice areas" helper="Data & AI · Web & SaaS · Engineering" refProp={s2.ref} />
        <StatCard icon="bi-clipboard-check" value={s3.value} suffix="%" label="Production ready" helper="Clear paths to deploy, monitor, and iterate." refProp={s3.ref} />
      </div>
      <div className="radial-glow" aria-hidden="true"></div>
    </section>
  );
}

function StatCard({ icon, value, suffix = '', label, helper, refProp }) {
  return (
    <motion.div
      ref={refProp}
      className="card stat-card"
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(124,92,255,0.18)' }}
    >
      <div className="stat-icon"><i className={`bi ${icon}`} aria-hidden="true"></i></div>
      <div className="stat-value">
        <span className="num">{value}</span>
        <span className="suffix">{suffix}</span>
      </div>
      <div className="underline" aria-hidden="true"></div>
      <div className="stat-label">{label}</div>
      <div className="stat-helper muted">{helper}</div>
    </motion.div>
  );
}
