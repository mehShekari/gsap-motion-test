import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const cards = [
  { title: 'Everyday', value: '$4,280', meta: 'Available balance', accent: '01' },
  { title: 'Growth', value: '$18,940', meta: 'Portfolio value', accent: '02', featured: true },
  { title: 'Travel', value: '$2,760', meta: 'Travel budget', accent: '03' },
];

function App() {
  const pageRef = useRef(null);

  useGSAP(() => {
    const root = pageRef.current;
    const heroItems = gsap.utils.toArray('.hero > *');
    const cards = gsap.utils.toArray('.card');
    const button = root.querySelector('.hero-action');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set([...heroItems, ...cards], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(heroItems, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 });
    gsap.fromTo(cards, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.cards', start: 'top 82%', once: true } });

    const hover = gsap.matchMedia();
    hover.add('(hover: hover) and (pointer: fine)', () => {
      const buttonX = gsap.quickTo(button, 'x', { duration: 0.35, ease: 'power3.out' });
      const buttonY = gsap.quickTo(button, 'y', { duration: 0.35, ease: 'power3.out' });
      const controller = new AbortController();
      button.addEventListener('pointermove', (event) => {
        const bounds = button.getBoundingClientRect();
        buttonX((event.clientX - (bounds.left + bounds.width / 2)) * 0.1);
        buttonY((event.clientY - (bounds.top + bounds.height / 2)) * 0.1);
      }, { signal: controller.signal });
      button.addEventListener('pointerleave', () => { buttonX(0); buttonY(0); }, { signal: controller.signal });
      cards.forEach((card) => {
        const enter = () => gsap.to(card, { y: -6, duration: 0.25, ease: 'power2.out', overwrite: true });
        const leave = () => gsap.to(card, { y: 0, duration: 0.35, ease: 'power2.out', overwrite: true });
        card.addEventListener('pointerenter', enter, { signal: controller.signal });
        card.addEventListener('pointerleave', leave, { signal: controller.signal });
        card.addEventListener('focusin', enter, { signal: controller.signal });
        card.addEventListener('focusout', leave, { signal: controller.signal });
      });
      return () => controller.abort();
    });
  }, { scope: pageRef });

  return (
    <main className="page" ref={pageRef}>
      <section className="hero" aria-labelledby="benchmark-title">
        <p className="eyebrow">Motion benchmark</p>
        <h1 id="benchmark-title">Move money with confidence.</h1>
        <p className="intro">A neutral starter surface for evaluating two agents under identical conditions.</p>
        <button className="hero-action" type="button">Explore accounts</button>
      </section>
      <section className="cards" aria-label="Accounts">
        {cards.map((card) => (
          <article className={`card ${card.featured ? 'featured' : ''}`} key={card.title}>
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
