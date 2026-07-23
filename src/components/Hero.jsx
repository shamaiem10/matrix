import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Scene3D from '../Scene3D.jsx';

const theme = {
  accent: '#7C5CFF',
  accent2: '#00E7E7',
  gridLine: 'rgba(124,92,255,0.07)'
};

const runlogSequence = ['ingest', 'train', 'eval', 'ship', 'monitor'];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="section hero-section">
      {/* Subtle grid backdrop */}
      <motion.div
        className="hero-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45, y: prefersReducedMotion ? 0 : [-8, 0, -8] }}
        transition={{ duration: prefersReducedMotion ? 0 : 18, repeat: prefersReducedMotion ? 0 : Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            `repeating-linear-gradient(0deg, transparent, transparent 28px, ${theme.gridLine} 29px),`+
            `repeating-linear-gradient(90deg, transparent, transparent 28px, ${theme.gridLine} 29px)`
        }}
        aria-hidden="true"
      />

      <div className="container hero-inner">
        <div className="col left">
          <motion.h1
            className="display"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            Innovate with confidence. Automate with excellence.
          </motion.h1>
          <motion.p
            className="subcopy"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Data, AI, and software, engineered end to end, from strategy to scale.
          </motion.p>

          <motion.div
            className="cta-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            <motion.a
              href="https://www.matrix-ae.com/portfolio"
              target="_blank"
              rel="noreferrer"
              className={`btn btn-primary ${pulse ? 'pulse-once' : ''}`}
              whileHover={!prefersReducedMotion ? { scale: 1.03, y: -1 } : undefined}
              whileTap={{ scale: 0.98 }}
            >
              <i className="bi bi-eye" aria-hidden="true"></i>
              View portfolio
            </motion.a>
            <motion.a
              href="https://calendly.com/team-matrix-ae/30min"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              whileHover={!prefersReducedMotion ? { scale: 1.02 } : undefined}
              whileTap={{ scale: 0.985 }}
            >
              <i className="bi bi-lightning-charge" aria-hidden="true"></i>
              Book a call
            </motion.a>
          </motion.div>

          <ul className="utility-row">
            <li><i className="bi bi-lightning-charge" aria-hidden="true"></i>MLOps · Pipelines · Model monitoring</li>
            <li><i className="bi bi-diagram-3" aria-hidden="true"></i>Artificial intelligence · LLMs · Agents</li>
          </ul>
        </div>

        <div className="col right">
          <div className="r3f-bg">
            <Scene3D />
          </div>

          <motion.div
            className="runlog-wrap"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            {/* Diagonal gradient slice */}
            <motion.div
              className="diag-slice"
              animate={!prefersReducedMotion ? { y: [-2, 0, -2] } : { y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 10, repeat: prefersReducedMotion ? 0 : Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
            <Runlog />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Runlog() {
  const prefersReducedMotion = useReducedMotion();
  const [tick, setTick] = useState(0);
  const [cyclePause, setCyclePause] = useState(false);
  const lineInterval = 550;
  const pauseAfter = 2000;
  const caretRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let mounted = true;
    const total = runlogSequence.length;
    const loop = () => {
      if (!mounted) return;
      setTick(0);
      setCyclePause(false);
      let i = 0;
      const int = setInterval(() => {
        i += 1;
        setTick((t) => Math.min(total, t + 1));
        if (i >= total) {
          clearInterval(int);
          setCyclePause(true);
          setTimeout(() => {
            if (mounted) loop();
          }, pauseAfter);
        }
      }, lineInterval);
    };
    loop();
    return () => { mounted = false; };
  }, [prefersReducedMotion]);

  const shown = prefersReducedMotion ? runlogSequence.length : tick;
  const now = useMemo(() => Date.now(), []);

  return (
    <div className="runlog-card" role="region" aria-label="Run log console">
      <div className="runlog-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="title">Runlog</span>
      </div>
      <div className="runlog-body">
        {runlogSequence.map((name, idx) => (
          <div key={name + idx + now} className={`runlog-line ${shown > idx ? 'visible' : ''}`}>
            <span className="caret">$</span>
            <span className="op">{name}</span>
            <span className="sep">→</span>
            <span className="status">ok</span>
          </div>
        ))}
        <div className={`runlog-caret ${cyclePause ? 'idle' : ''}`} ref={caretRef} aria-hidden="true">▍</div>
      </div>
    </div>
  );
}
