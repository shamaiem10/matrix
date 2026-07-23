import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Cursor() {
  const prefersReducedMotion = useReducedMotion();
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ringRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!ringRef.current) return;
      const el = ringRef.current;
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div className="cursor-overlay" aria-hidden>
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ willChange: 'transform, opacity' }}
      />
    </div>
  );
}
