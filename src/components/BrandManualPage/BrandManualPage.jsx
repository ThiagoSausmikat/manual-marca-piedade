import Book from '../Book/Book';
import './BrandManualPage.css';

const TOTAL_PAGES = 9;
const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
  id: i + 1,
  number: i + 1,
  image: `/manual/page-${i + 1}.jpg`,
}));

export default function BrandManualPage() {
  return (
    <main className="manual-page">
      <header className="manual-header">
        <h1 className="manual-title">Manual da Marca</h1>
      </header>

      <Book pages={PAGES} />

      <a href="/manual-marca.pdf" download className="manual-download">
        Baixar PDF
      </a>
    </main>
  );
}
