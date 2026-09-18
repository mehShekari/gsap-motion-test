import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const cards = [
  { title: 'Everyday', value: '$4,280', meta: 'Available balance', accent: '01' },
  { title: 'Growth', value: '$18,940', meta: 'Portfolio value', accent: '02', featured: true },
  { title: 'Travel', value: '$2,760', meta: 'Travel budget', accent: '03' },
];

function App() {
  return (
    <main className="page">
      <section className="hero" aria-labelledby="benchmark-title">
        <p className="eyebrow">Motion benchmark</p>
        <h1 id="benchmark-title">Move money with confidence.</h1>
        <p className="intro">A neutral starter surface for evaluating two agents under identical conditions.</p>
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
