import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Hero from './components/Hero.jsx';
import Ribbon from './components/Ribbon.jsx';
import Capabilities from './components/Capabilities.jsx';
import Stats from './components/Stats.jsx';
import Work from './components/Work.jsx';
import Playbook from './components/Playbook.jsx';
import ProofWall from './components/ProofWall.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const topRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (!el) return;
        el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [prefersReducedMotion]);

  return (
    <div ref={topRef} className="site-root">
      <header className="site-header">
        <div className="container mx-auto header-inner">
          <a href="#home" className="brand" aria-label="Matrix AE home">
            <i className="bi bi-grid-1x2 brand-mark" aria-hidden="true"></i>
            <span className="brand-name">Matrix AE</span>
          </a>
          <nav className="primary-nav" aria-label="Primary">
            <a href="#home">Home</a>
            <a href="#solutions">Solutions</a>
            <a href="#work">Work</a>
            <a href="#reviews">Reviews</a>
            <a href="https://www.matrix-ae.com/products" target="_blank" rel="noreferrer">Products</a>
            <a href="https://www.matrix-ae.com/team" target="_blank" rel="noreferrer">Team</a>
            <a href="https://www.matrix-ae.com/blog" target="_blank" rel="noreferrer">Insights</a>
            <a href="https://www.matrix-ae.com/careers" target="_blank" rel="noreferrer">Careers</a>
            <a className="btn btn-accent" href="https://calendly.com/team-matrix-ae/30min" target="_blank" rel="noreferrer">Book a call</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <Ribbon />
        <Capabilities />
        <Stats />
        <Work />
        <Playbook />
        <ProofWall />
        <CTA />
      </main>

      <Footer />
      <Cursor />

      <motion.button
        className="back-to-top"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }}
        aria-label="Back to top"
      >
        <i className="bi bi-arrow-up" aria-hidden="true"></i>
      </motion.button>
    </div>
  );
}
