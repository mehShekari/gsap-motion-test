import React, { useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import './styles.css';

function App() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const root = rootRef.current;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (reduceMotion) {
        gsap.set(root.querySelectorAll('[data-motion]'), { opacity: 1, y: 0, x: 0, scale: 1, rotation: 0 });
        return;
      }

      intro
        .fromTo('[data-nav]', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.45 })
        .fromTo('[data-copy]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 }, '-=0.18')
        .fromTo('[data-panel]', { opacity: 0, x: 36, scale: 0.96, rotation: 2 }, { opacity: 1, x: 0, scale: 1, rotation: 0, duration: 0.9 }, '-=0.55')
        .fromTo('[data-metric]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, '-=0.35');

      const action = root.querySelector('.hero-action');
      const xTo = gsap.quickTo(action, 'x', { duration: 0.4, ease: 'power3.out' });
      const yTo = gsap.quickTo(action, 'y', { duration: 0.4, ease: 'power3.out' });
      const onMove = (event) => {
        const bounds = action.getBoundingClientRect();
        xTo((event.clientX - (bounds.left + bounds.width / 2)) * 0.12);
        yTo((event.clientY - (bounds.top + bounds.height / 2)) * 0.12);
      };
      const onLeave = () => { xTo(0); yTo(0); };
      action.addEventListener('pointermove', onMove);
      action.addEventListener('pointerleave', onLeave);
      return () => {
        action.removeEventListener('pointermove', onMove);
        action.removeEventListener('pointerleave', onLeave);
        gsap.killTweensOf(action);
      };
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <main className="page" ref={rootRef}>
      <nav className="nav" data-nav data-motion aria-label="Primary navigation">
        <span className="brand"><i />northstar</span>
        <span className="nav-note">Private banking, made immediate</span>
        <button className="nav-link" type="button">Sign in</button>
      </nav>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow" data-copy data-motion>Digital banking / 01</p>
          <h1 id="hero-title" data-copy data-motion>Move with <em>clarity.</em></h1>
          <p className="intro" data-copy data-motion>Fast, intelligent banking for the life you are already building.</p>
          <div className="actions" data-copy data-motion>
            <button className="hero-action" type="button">Open an account <span>{'->'}</span></button>
            <button className="text-action" type="button">See how it works <span>{'->'}</span></button>
          </div>
          <div className="trust" data-copy data-motion><span>*</span> Built for the next move <b>FDIC insured</b></div>
        </div>
        <div className="hero-visual" aria-label="Northstar smart account overview" data-panel data-motion>
          <div className="visual-top"><span>Northstar / Smart account</span><span className="live"><i />Live</span></div>
          <div className="visual-balance"><small>Available balance</small><strong>$18,940<span>.00</span></strong></div>
          <div className="visual-chart"><span className="chart-label">30 day activity</span><svg viewBox="0 0 420 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0,78 C42,74 52,44 90,56 S132,78 168,45 S220,24 248,48 S292,65 324,28 S372,12 420,18" /></svg></div>
          <div className="visual-footer"><span data-metric data-motion><b>+12.8%</b><small>this month</small></span><span data-metric data-motion><b>Instant</b><small>transfers</small></span><span className="signal" data-metric data-motion><i /><i /><i /><i /><i /></span></div>
        </div>
      </section>
      <div className="scroll-cue" data-copy data-motion><span>Scroll to explore</span><i /></div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
