import React, { useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import './styles.css';

const cards = [
  { title: 'Everyday', value: '$4,280', meta: 'Available balance', accent: '01' },
  { title: 'Growth', value: '$18,940', meta: 'Portfolio value', accent: '02', featured: true },
  { title: 'Travel', value: '$2,760', meta: 'Travel budget', accent: '03' },
];

function App() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const root = rootRef.current;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const heroItems = gsap.utils.toArray('[data-enter]');
      const cardItems = gsap.utils.toArray('.card');
      const featured = root.querySelector('.featured');
      const controller = new AbortController();

      if (reduceMotion) {
        gsap.set([...heroItems, ...cardItems], { opacity: 1, y: 0, x: 0, scale: 1, rotation: 0 });
        return;
      }

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(heroItems, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 })
        .fromTo(cardItems, { opacity: 0, y: 58, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.13 }, '-=0.32')
        .to(featured, { scale: 1.035, duration: 0.45, ease: 'power2.out' })
        .to(featured, { scale: 1, duration: 0.5, ease: 'power2.inOut' });

      cardItems.forEach((card) => {
        const enter = () => gsap.to(card, { y: -7, duration: 0.3, ease: 'power2.out', overwrite: true });
        const leave = () => gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out', overwrite: true });
        card.addEventListener('pointerenter', enter);
        card.addEventListener('pointerleave', leave);
        card.addEventListener('focusin', enter);
        card.addEventListener('focusout', leave);
      });

      return () => {
        controller.abort();
        gsap.killTweensOf(cardItems);
      };
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <main className="page" ref={rootRef}>
      <section className="hero" aria-labelledby="benchmark-title">
        <div className="hero-copy">
          <p className="eyebrow" data-enter>Motion benchmark</p>
          <h1 id="benchmark-title" data-enter>Move money with confidence.</h1>
          <p className="intro" data-enter>A neutral starter surface for evaluating two agents under identical conditions.</p>
        </div>
        <div className="hero-mark" aria-hidden="true" data-enter><span>03</span><i /><b>One clear view</b></div>
      </section>
      <section className="cards" aria-label="Accounts">
        {cards.map((card) => (
          <article className={`card ${card.featured ? 'featured' : ''}`} key={card.title} tabIndex={0}>
            <div className="card-top"><span>{card.accent}</span><span>Account</span></div>
            <div><p className="card-title">{card.title}</p><p className="value">{card.value}</p><p className="meta">{card.meta}</p></div>
            <div className="card-line" aria-hidden="true" />
          </article>
        ))}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
