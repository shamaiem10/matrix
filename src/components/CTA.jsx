import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function CTA() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="contact" className="section cta">
      <div className="container narrow">
        <motion.div
          className="card cta-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cta-left">
            <h3>Ready to automate with confidence?</h3>
            <p className="muted">Tell us about your workflows, data, and goals. We'll map a path forward.</p>
          </div>
          <div className="cta-right">
            <ul className="outcomes">
              <li><i className="bi bi-clipboard-data" aria-hidden="true"></i>Instrumented flow you can run</li>
              <li><i className="bi bi-file-earmark-text" aria-hidden="true"></i>Clear docs you inherit</li>
              <li><i className="bi bi-calculator" aria-hidden="true"></i>ROI you can explain</li>
            </ul>
            <div className="cta-buttons">
              <motion.a href="https://calendly.com/team-matrix-ae/30min" target="_blank" rel="noreferrer" className="btn btn-primary" whileHover={!prefersReducedMotion ? { scale: 1.04 } : undefined} whileTap={{ scale: 0.98 }}>
                <i className="bi bi-rocket-takeoff" aria-hidden="true"></i>
                Book a call
              </motion.a>
              <motion.a href="https://www.matrix-ae.com/contact" target="_blank" rel="noreferrer" className="btn btn-secondary" whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined} whileTap={{ scale: 0.985 }}>
                Start a project
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
