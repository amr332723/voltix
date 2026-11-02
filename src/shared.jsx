import { createContext, useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Search, User, Heart, ShoppingCart, Check, X } from 'lucide-react';
import Logo from './Logo.jsx';
import { cats, navCats, reviews } from './data.js';

export const Store = createContext({});
export const useStore = () => useContext(Store);
export const money = (n) => '$' + n.toLocaleString();
export const img = (n) => `/img/${n}.jpg`;

export function Stars({ n = 128 }) {
  return <div className="stars">★★★★★<span>({n.toLocaleString()})</span></div>;
}

export function Toast({ msg, onClose }) {
  if (!msg) return null;
  return <div className="toast"><Check size={14} />{msg}<X size={14} onClick={onClose} /></div>;
}

export function Header({ active, q }) {
  const { go, cart, wish } = useStore();
  const [text, setText] = useState(q || '');
  const [bar, setBar] = useState({ x: 0, w: 0 });
  const ref = useRef(null);
  useEffect(() => setText(q || ''), [q]);
  useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current && ref.current.querySelector('a.on');
      setBar(el ? { x: el.offsetLeft, w: el.offsetWidth } : { x: 0, w: 0 });
    };
    measure();
    if (document.fonts) document.fonts.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);
  const tabs = [['home', 'Home'], ...navCats.map((k) => [k, cats[k].label])];
  const submit = (e) => { e.preventDefault(); if (text.trim()) go('shop', 'all', text.trim()); };
  return (
    <header className="header">
      <div className="wrap top">
        <a className="logo" onClick={() => go('home')} aria-label="Voltix home"><Logo height={30} /></a>
        <form className="search" onSubmit={submit}><Search size={18} /><input value={text} onChange={(e) => setText(e.target.value)} placeholder="Search for phones, laptops, monitors..." /></form>
        <nav className="actions">
          <a onClick={() => go('login')}><User size={18} />Account</a>
          <a onClick={() => go('dash', 'wishlist')}><Heart size={18} />Wishlist{wish.length > 0 && <b className="count">{wish.length}</b>}</a>
          <a onClick={() => go('cart')}><ShoppingCart size={18} />Cart <b className="count">{cart.reduce((s, i) => s + i.qty, 0)}</b></a>
        </nav>
      </div>
      <div className="wrap tabs" ref={ref}>
        {tabs.map(([k, l]) => <a key={k} className={active === k ? 'on' : ''} onClick={() => (k === 'home' ? go('home') : go('shop', k))}>{l}</a>)}
        <i className="ink" style={{ transform: `translateX(${bar.x}px)`, width: bar.w, opacity: bar.w ? 1 : 0 }} />
      </div>
    </header>
  );
}

export function ProductCard({ p, go, add }) {
  const { wish, toggleWish } = useStore();
  const on = wish.includes(p.id);
  const out = p.stock === 0;
  const open = () => go('product', p.id);
  return (
    <div className="card product">
      <div className="pimg" onClick={open}>
        {p.badge && <span className="tag">{p.badge}</span>}
        <button className={'fav' + (on ? ' on' : '')} aria-label={on ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={on} onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }}><Heart size={16} /></button>
        <img src={img(p.img)} alt={p.name} />
      </div>
      <div className="pbody">
        <small className="brand">{p.brand}</small>
        <h4 onClick={open}>{p.name}</h4>
        <Stars n={reviews(p)} />
        <div className="price">{money(p.price)} {p.old && <s>{money(p.old)}</s>}</div>
        {out ? <span className="oos">Out of stock</span> : <a className="link" onClick={() => add(p)}>+ Add to Cart</a>}
      </div>
    </div>
  );
}

export function Section({ eyebrow, title, link, onLink, children }) {
  return (
    <section className="wrap section">
      <div className="sec-head">
        <div>{eyebrow && <small className="eyebrow">{eyebrow}</small>}<h2>{title}</h2></div>
        {link && <a className="link" onClick={onLink}>{link} →</a>}
      </div>
      {children}
    </section>
  );
}

const routes = { Phones: ['shop', 'phones'], Laptops: ['shop', 'laptops'], Monitors: ['shop', 'monitors'], 'My orders': ['dash', 'orders'], Wishlist: ['dash', 'wishlist'] };
export function Footer() {
  const { go } = useStore();
  const cols = [['About Voltix', 'Our story', 'Careers', 'Newsroom'], ['Customer Service', 'Help center', 'Shipping', 'Returns'], ['Categories', 'Phones', 'Laptops', 'Monitors'], ['Account', 'My orders', 'Wishlist', 'Addresses'], ['Contact', '1-800-VOLTIX', 'hello@voltix.com', 'Mon–Sat, 9am–8pm']];
  return (
    <footer className="footer"><div className="wrap">
      <div className="fgrid"><div><Logo height={30} onDark /><p>Premium technology, expert guidance and reliable support—online and in your door.</p></div>
        {cols.map(([h, ...l]) => <div key={h}><b>{h}</b>{l.map((x) => <a key={x} onClick={() => routes[x] && go(...routes[x])}>{x}</a>)}</div>)}</div>
      <div className="between fbot"><span>© 2026 Voltix. All rights reserved.</span><b>VISA Mastercard PayPal Apple Pay</b></div>
    </div></footer>
  );
}
