import { useEffect, useState } from 'react';
import './Book.css';

function PageContent({ page, number }) {
  if (page.image) {
    return <img src={page.image} alt={page.title || `Página ${number}`} className="book-page-img" draggable={false} />;
  }
  return (
    <div className="book-page-placeholder">
      <span className="book-page-placeholder__number">{number}</span>
      {page.title && <h3 className="book-page-placeholder__title">{page.title}</h3>}
      {page.subtitle && <p className="book-page-placeholder__subtitle">{page.subtitle}</p>}
    </div>
  );
}

export default function Book({ pages }) {
  const [current, setCurrent] = useState(0);
  const total = pages.length;

  const next = () => setCurrent((c) => Math.min(c + 1, total - 1));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Pré-carrega todas as páginas para que a navegação não precise esperar o download
  useEffect(() => {
    pages.forEach((p) => {
      if (p.image) {
        const img = new Image();
        img.src = p.image;
      }
    });
  }, [pages]);

  const page = pages[current];

  return (
    <div className="book">
      <button className="book-nav book-nav--left" onClick={prev} disabled={current === 0} aria-label="Página anterior">
        ‹
      </button>

      <div className="book-stage">
        <div key={page.id ?? current} className="book-page">
          <PageContent page={page} number={current + 1} />
        </div>
      </div>

      <button className="book-nav book-nav--right" onClick={next} disabled={current === total - 1} aria-label="Próxima página">
        ›
      </button>

      <div className="book-footer">
        <span className="book-counter">
          {current + 1} / {total}
        </span>
      </div>
    </div>
  );
}
