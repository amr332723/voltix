import { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, ArrowRight, ArrowUpRight, Cpu, CreditCard, Lock, Minus, Plus } from 'lucide-react';
import { categories, pick } from '../data.js';
import { money, img, Stars, Section, ProductCard } from '../shared.jsx';

export default function Home({ go, add }) {
  return (
    <>
      <div className="hero-bg"><div className="wrap hero">
        <div>
          <span className="pill">New season · Smarter upgrades</span>
          <h1>Technology that fits your world.</h1>
          <p>Discover the latest smartphones, laptops, monitors and accessories.</p>
          <div className="row"><button className="btn" onClick={() => go('shop', 'all')}><ArrowRight size={16} />Shop Now</button><button className="btn ghost" onClick={() => go('shop', 'deals')}>Explore Deals</button></div>
          <div className="perks"><span><Truck size={14} />Free delivery over $100</span><span><ShieldCheck size={14} />2-year warranty</span><span><RotateCcw size={14} />30-day returns</span></div>
        </div>
        <div className="hero-img"><img src={img('hero')} alt="" /><div className="member"><small>MEMBER EXCLUSIVE</small><b>Save up to $300</b><span>on selected upgrades</span></div></div>
      </div></div>
      <Section eyebrow="SHOP BY CATEGORY" title="Find the tech made for you">
        <div className="grid4">{categories.map(([n, d, i]) => (
          <div className="card cat" key={n} onClick={() => go('shop', i)}><img src={img(i)} alt="" />
            <div className="cat-body"><div><h4>{n}</h4><p>{d}</p></div><span className="round"><ArrowUpRight size={14} /></span></div></div>))}</div>
      </Section>
      <Section eyebrow="CURATED FOR YOU" title="Featured products" link="View all products" onLink={() => go('shop', 'all')}>
        <div className="grid4">{pick(1, 2, 9, 15).map((p) => <ProductCard key={p.id} p={p} go={go} add={add} />)}</div>
      </Section>
      <section className="wrap section"><div className="promo">
        <div><span className="pill dark">LIMITED-TIME OFFER</span><h2>Up to 30% off selected laptops</h2>
          <p>Power through work, school and creativity with standout savings from Apple, ASUS, Dell and Lenovo.</p>
          <button className="btn" onClick={() => go('shop', 'deals')}><ArrowRight size={16} />Shop Offers</button></div>
        <img src={img('laptops')} alt="" />
      </div></section>
      <Section eyebrow="CUSTOMER FAVORITES" title="Best sellers" link="See all" onLink={() => go('shop', 'all')}>
        <div className="grid4">{pick(2, 9, 15, 21).map((p) => <ProductCard key={p.id} p={p} go={go} add={add} />)}</div>
      </Section>
      <section className="wrap section"><h4 className="center">Top brands, all in one place</h4>
        <div className="brands">{['Apple', 'Samsung', 'SONY', 'Dell', 'ASUS', 'LG', 'Google'].map((b) => <div key={b} onClick={() => go('shop', 'all', b)}>{b}</div>)}</div></section>
      <section className="wrap section"><div className="news"><div><h3>Better tech decisions, delivered.</h3><p>New launches, buying guides and member-only offers. No clutter.</p></div>
        <div className="row"><input placeholder="Email address" /><button className="btn">Subscribe</button></div></div></section>
    </>
  );
}

