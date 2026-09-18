import React, { useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { title: 'Everyday', value: '$4,280', meta: 'Available balance', accent: '01' },
  { title: 'Growth', value: '$18,940', meta: 'Portfolio value', accent: '02', featured: true },
  { title: 'Travel', value: '$2,760', meta: 'Travel budget', accent: '03' },
];

function App() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const root = pageRef.current;
      const hero = gsap.utils.toArray('.hero-copy > *');
      const items = gsap.utils.toArray('.card');
      const stage = root.querySelector('.cards-stage');
      const grid = root.querySelector('.cards');
      const button = root.querySelector('.hero-action');
      const media = gsap.matchMedia();

      const buildMotion = (mobile) => {
        gsap.timeline({ defaults: { ease: 'power3.out' } }).fromTo(hero, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 });
        gsap.set(items, { opacity: 0, y: mobile ? 24 : 42 });
        gsap.to(items, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: stage, start: mobile ? 'top 88%' : 'top 76%', once: true } });
        if (!mobile) {
          gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: stage, start: 'top 72%', end: 'bottom 35%', scrub: 1 } })
            .to(grid, { y: -18, duration: 1 })
            .to(items[0], { x: -18, rotation: -2, duration: 1 }, '<')
            .to(items[1], { y: -32, scale: 1.035, duration: 1 }, '<0.2')
            .to(items[2], { x: 18, rotation: 2, duration: 1 }, '<0.2');
        }
        const xTo = gsap.quickTo(button, 'x', { duration: 0.45, ease: 'power3.out' });
        const yTo = gsap.quickTo(button, 'y', { duration: 0.45, ease: 'power3.out' });
        const onMove = (event) => {
          const bounds = button.getBoundingClientRect();
          xTo((event.clientX - (bounds.left + bounds.width / 2)) * 0.12);
          yTo((event.clientY - (bounds.top + bounds.height / 2)) * 0.12);
        };
        const onLeave = () => { xTo(0); yTo(0); };
        button.addEventListener('pointermove', onMove);
        button.addEventListener('pointerleave', onLeave);
        return () => {
          button.removeEventListener('pointermove', onMove);
          button.removeEventListener('pointerleave', onLeave);
        };
      };

      media.add('(prefers-reduced-motion: reduce)', () => gsap.set([...hero, ...items], { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 }));
      media.add('(prefers-reduced-motion: no-preference) and (min-width: 701px)', () => buildMotion(false));
      media.add('(prefers-reduced-motion: no-preference) and (max-width: 700px)', () => buildMotion(true));
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <main className="page" ref={pageRef}>
      <section className="hero" aria-labelledby="benchmark-title">
        <div className="hero-copy">
          <p className="eyebrow">Motion benchmark</p>
          <h1 id="benchmark-title"><span>Move money</span><span>with confidence.</span></h1>
          <p className="intro">A neutral starter surface for evaluating two agents under identical conditions.</p>
          <button className="hero-action" type="button">Explore accounts</button>
        </div>
        <div className="hero-stage" aria-hidden="true"><span>01 — 03</span><i /></div>
      </section>
      <section className="cards-stage" aria-label="Accounts">
        <div className="cards">
          {cards.map((card) => (
            <article className={`card ${card.featured ? 'featured' : ''}`} key={card.title} tabIndex={0}>
              <div className="card-top"><span>{card.accent}</span><span>Account</span></div>
              <div><p className="card-title">{card.title}</p><p className="value">{card.value}</p><p className="meta">{card.meta}</p></div>
              <div className="card-line" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
