import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="section footer">
      <div className="container grid-4 cols">
        <div className="col">
          <div className="brand-foot">
            <i className="bi bi-grid-1x2" aria-hidden="true"></i>
            <span>Matrix AE</span>
          </div>
          <p className="muted small">Matrix AE partners with enterprises and high-growth companies on data, intelligent systems, and product delivery.</p>
        </div>
        <div className="col">
          <h4>Solutions</h4>
          <nav className="foot-nav">
            <a href="#solutions">Capabilities</a>
            <a href="#work">Work</a>
            <a href="https://www.matrix-ae.com/products" target="_blank" rel="noreferrer">Products</a>
          </nav>
        </div>
        <div className="col">
          <h4>Company</h4>
          <nav className="foot-nav">
            <a href="https://www.matrix-ae.com/reviews" target="_blank" rel="noreferrer">Reviews</a>
            <a href="https://www.matrix-ae.com/blog" target="_blank" rel="noreferrer">Insights</a>
            <a href="https://www.matrix-ae.com/careers" target="_blank" rel="noreferrer">Careers</a>
          </nav>
        </div>
        <div className="col">
          <h4>Contact</h4>
          <nav className="foot-nav">
            <a href="https://calendly.com/team-matrix-ae/30min" target="_blank" rel="noreferrer">Book a call</a>
            <a href="https://www.matrix-ae.com/contact" target="_blank" rel="noreferrer">Contact form</a>
          </nav>
        </div>
      </div>
      <motion.div
        className="fineprint"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container small muted">© {new Date().getFullYear()} Matrix AE. Built with care.</div>
      </motion.div>
    </footer>
  );
}
