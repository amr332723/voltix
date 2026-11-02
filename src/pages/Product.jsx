import { useState } from 'react';
import { Truck, ShieldCheck, RotateCcw, Lock, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { cats, inCat, options, blurb, reviews } from '../data.js';
import { money, img, Stars, ProductCard, useStore } from '../shared.jsx';
import { Table } from '../ui.jsx';

export default function Product({ p, go, add }) {
  const { wish, toggleWish, notify } = useStore();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState(0);
  const opts = options[p.cat];
  const [opt, setOpt] = useState(() => Object.fromEntries(Object.entries(opts).map(([k, v]) => [k, v[0]])));
  const out = p.stock === 0, on = wish.includes(p.id), n = reviews(p);
  const related = inCat(p.cat).filter((x) => x.id !== p.id);
  const cmp = [p, ...related.slice(0, 2)];
  const val = (x, k) => (x.specs.find(([a]) => a === k) || [])[1];
  const tabs = ['Description', 'Specifications', `Reviews (${n.toLocaleString()})`];
  return (
    <div className="wrap section">
      <div className="crumb"><a onClick={() => go('home')}>Home</a> / <a onClick={() => go('shop', p.cat)}>{cats[p.cat].label}</a> / <a onClick={() => go('shop', 'all', p.brand)}>{p.brand}</a> / {p.name}</div>
      <div className="detail">
        <div className="gallery"><button className={'fav' + (on ? ' on' : '')} aria-label="Toggle wishlist" aria-pressed={on} onClick={() => toggleWish(p.id)}><Heart size={18} /></button><img src={img(p.img)} alt={p.name} /></div>
        <div>
          <small className="eyebrow">{p.brand.toUpperCase()}</small>
          <h1 className="h2">{p.name}</h1>
          <Stars n={n} />
          <div className="price big">{money(p.price)} {p.old && <s>{money(p.old)}</s>}</div>
          {out ? <p className="oos">● Out of stock</p> : <p className="ok">● In stock · ships tomorrow</p>}
          {Object.entries(opts).map(([k, items]) => (
            <div key={k}><b className="lbl">{k}: {opt[k]}</b>
              <div className="chips">{items.map((i) => <button key={i} className={opt[k] === i ? 'chip on' : 'chip'} onClick={() => setOpt({ ...opt, [k]: i })}>{i}</button>)}</div></div>))}
          {out
            ? <button className="btn ghost full mt" onClick={() => notify("We'll let you know when it's back")}>Notify me when available</button>
            : <div className="row buy">
                <div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button>{qty}<button onClick={() => setQty(qty + 1)}><Plus size={14} /></button></div>
                <button className="btn grow" onClick={() => add(p, qty)}><ShoppingCart size={16} />Add to Cart</button>
                <button className="btn ghost grow" onClick={() => { add(p, qty); go('cart'); }}>Buy Now</button>
              </div>}
          <div className="perks col"><span><Truck size={14} />Free express delivery</span><span><Lock size={14} />Secure payment</span><span><ShieldCheck size={14} />2-year warranty</span><span><RotateCcw size={14} />30-day returns</span></div>
        </div>
      </div>
      <div className="tabs2">{tabs.map((t, i) => <a key={t} className={tab === i ? 'on' : ''} onClick={() => setTab(i)}>{t}</a>)}</div>
      {tab === 0 && <div className="desc"><div><h3>{p.tag}</h3><p className="muted">{blurb[p.cat]}</p></div><ul>{p.specs.map(([, v]) => <li key={v}>✓ {v}</li>)}</ul></div>}
      {tab === 1 && <Table head={['Specification', 'Details']}>{p.specs.map(([k, v]) => <tr key={k}><td><b>{k}</b></td><td>{v}</td></tr>)}<tr><td><b>Warranty</b></td><td>2 years</td></tr></Table>}
      {tab === 2 && <div className="desc"><div><h3>Rated 4.{(p.id % 3) + 6} out of 5</h3><p className="muted">Based on {n.toLocaleString()} verified customer reviews.</p></div></div>}
      <h2 className="rel">Related products</h2>
      <div className="grid4">{related.slice(0, 4).map((r) => <ProductCard key={r.id} p={r} go={go} add={add} />)}</div>
      <div className="between"><h2 className="rel">Product comparison</h2><small className="muted">Differences highlighted in indigo</small></div>
      <div className="tbl"><table className="cmp"><thead><tr><th>Compare products</th>{cmp.map((x) => <th key={x.id}><small>{x.brand.toUpperCase()}</small><br />{x.name}<br />{money(x.price)}</th>)}</tr></thead>
        <tbody>{p.specs.map(([k]) => <tr key={k}><td>{k}</td>{cmp.map((x) => <td key={x.id} className={x !== p && val(x, k) !== val(p, k) ? 'diff' : ''}>{val(x, k)}</td>)}</tr>)}
          <tr><td>Warranty</td>{cmp.map((x) => <td key={x.id}>2 years</td>)}</tr></tbody></table></div>
    </div>
  );
}
