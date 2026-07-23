import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const QUOTES = [
  {
    name: 'Sarah Chen',
    company: 'Northwind Labs',
    quote: 'The automation work cut our ops load in half. Clear comms and documentation the whole way.'
  },
  {
    name: 'Marcus Webb',
    company: 'Helio Freight',
    quote: 'We needed a partner who could own the full stack: APIs, dashboards, and the messy integrations. Matrix AE shipped on time and our sales team finally has one source of truth in the CRM.'
  },
  {
    name: 'Elena Voss',
    company: 'Meridian Health',
    quote: 'Security reviewers signed off without drama. That rarely happens.'
  },
  {
    name: 'Daniel Ruiz',
    company: 'FieldSync',
    quote: 'They speak both product and engineering. Workshops were tight, the roadmap was realistic, and we avoided a second rewrite. The mobile + offline requirements were handled properly.'
  },
  {
    name: 'Tom Brennan',
    company: 'LedgerOne',
    quote: 'AI automation for our reconciliation pipeline was the goal. They delivered evals, guardrails, and human review paths we could actually run in production. No black-box demos.'
  },
  {
    name: 'Amira Hassan',
    company: 'Cloudline',
    quote: 'Best agency experience we’ve had in ten years of building software.'
  }
];

export default function ProofWall() {
  const rand = useMemo(() => mulberry32(1337), []);
  const [delays, setDelays] = useState([]);

  useEffect(() => {
    setDelays(QUOTES.map(() => 0.05 + rand() * 0.12));
  }, [rand]);

  return (
    <section id="reviews" className="section proof">
      <div className="container">
        <div className="section-head">
          <h2>What our users are saying.</h2>
        </div>
        <div className="grid-masonry">
          {QUOTES.map((q, i) => (
            <motion.blockquote
              key={q.name}
              className="card quote-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: delays[i] || 0, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(0,0,0,0.3)' }}
            >
              <i className="bi bi-quote quote-glyph" aria-hidden="true"></i>
              <p>“{q.quote}”</p>
              <footer>
                <div className="avatar-badge" aria-hidden="true">{q.name.split(' ').map(p => p[0]).join('').slice(0,2)}</div>
                <cite>
                  <span className="author">{q.name}</span>
                  <span className="company">{q.company}</span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
