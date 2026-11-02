import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cats, inCat } from '../data.js';
import { ProductCard } from '../shared.jsx';
import { Empty } from '../ui.jsx';

const PAGE = 6, STEP = 50;
export default function Shop({ cat, q, go, add }) {
  const key = cats[cat] ? cat : 'all';
  const base = inCat(key);
  const prices = base.map((p) => p.price);
  const low = Math.floor(Math.min(...prices) / STEP) * STEP;
  const top = Math.ceil(Math.max(...prices) / STEP) * STEP;
  const [brands, setBrands] = useState([]);
  const [stockOnly, setStockOnly] = useState(false);
  const [max, setMax] = useState(top);
  const [sort, setSort] = useState('Featured');
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);
  const has = (p, s) => `${p.name} ${p.brand}`.toLowerCase().includes(s.toLowerCase());
  let list = base.filter((p) => has(p, q || '') && has(p, term) && p.price <= max && (!brands.length || brands.includes(p.brand)) && (!stockOnly || p.stock > 0));
  if (sort === 'Price: Low to High') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'Price: High to Low') list = [...list].sort((a, b) => b.price - a.price);
  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  const cur = Math.min(page, pages);
  const shown = list.slice((cur - 1) * PAGE, cur * PAGE);
  const upd = (fn) => (v) => { fn(v); setPage(1); };
  const toggle = (b) => upd(setBrands)(brands.includes(b) ? brands.filter((x) => x !== b) : [...brands, b]);
  const clear = () => { setBrands([]); setStockOnly(false); setMax(top); setTerm(''); setPage(1); if (q) go('shop', key); };
  const title = q ? `Results for “${q}”` : cats[key].title;
  const chips = [...brands.map((b) => [b, () => toggle(b)]), ...(stockOnly ? [['In stock', () => upd(setStockOnly)(false)]] : []), ...(max < top ? [['Up to $' + max, () => upd(setMax)(top)]] : [])];
  const brandList = [...new Set(base.map((p) => p.brand))].sort();
  return (
    <div className="wrap section">
      <div className="crumb"><a onClick={() => go('home')}>Home</a> / {title}</div>
      <div className="between">
        <div><h1 className="h1">{title}</h1><p className="muted">{list.length} products</p></div>
        <div className="chips2">{chips.map(([l, rm]) => <span className="fchip" key={l} onClick={rm}>{l} <X size={10} /></span>)}</div>
      </div>
      <div className="shop">
        <aside>
          <div className="fgroup"><b>Price range</b>
            <input type="range" min={low} max={top} step={STEP} value={max} onChange={(e) => upd(setMax)(Number(e.target.value))} />
            <div className="between"><small>${low}</small><small>${max}</small></div></div>
          {brandList.length > 1 && <div className="fgroup"><b>Brand</b>{brandList.map((b) => <label key={b}><input type="checkbox" checked={brands.includes(b)} onChange={() => toggle(b)} />{b} ({base.filter((p) => p.brand === b).length})</label>)}</div>}
          <div className="fgroup"><b>Availability</b><label><input type="checkbox" checked={stockOnly} onChange={(e) => upd(setStockOnly)(e.target.checked)} />In stock</label></div>
        </aside>
        <div>
          <div className="toolbar">
            <label className="search"><Search size={16} /><input placeholder={`Search within ${cats[key].title.toLowerCase()}`} value={term} onChange={(e) => upd(setTerm)(e.target.value)} /></label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}><option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option></select>
          </div>
          {shown.length
            ? <div className="grid4 g3">{shown.map((p) => <ProductCard key={p.id} p={p} go={go} add={add} />)}</div>
            : <Empty icon={Search} title="No products found" text="We couldn't find any products matching your search. Try removing a filter or searching for something else." cta="Clear all filters" onClick={clear} />}
          {shown.length > 0 && <div className="between pager"><small className="muted">Showing {(cur - 1) * PAGE + 1}–{(cur - 1) * PAGE + shown.length} of {list.length}</small>
            {pages > 1 && <div className="pages"><span onClick={() => setPage(Math.max(1, cur - 1))}>‹</span>{Array.from({ length: pages }, (_, i) => <span key={i} className={cur === i + 1 ? 'on' : ''} onClick={() => setPage(i + 1)}>{i + 1}</span>)}<span onClick={() => setPage(Math.min(pages, cur + 1))}>›</span></div>}</div>}
        </div>
      </div>
    </div>
  );
}
