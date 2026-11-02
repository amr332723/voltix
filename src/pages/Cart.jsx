import { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, ArrowRight, ArrowUpRight, Cpu, CreditCard, Lock, Minus, Plus } from 'lucide-react';
import { products, categories } from '../data.js';
import { money, img, Stars, Section, ProductCard } from '../shared.jsx';

export default function Cart({ cart, setCart, go }) {
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const disc = 150;
  const upd = (id, d) => setCart(cart.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i)));
  if (!cart.length) return (
    <div className="wrap section"><div className="card empty"><span className="round big"><ShoppingCart size={20} /></span><h3>Your cart is waiting</h3>
      <p className="muted">You haven't added anything yet. Explore our latest phones, laptops, monitors and accessories.</p><button className="btn" onClick={() => go('shop')}>Start shopping</button></div></div>);
  return (
    <div className="wrap section">
      <h1 className="h1">Your cart</h1><p className="muted">{cart.length} items reserved for 20 minutes</p>
      <div className="cartgrid">
        <div>
          <div className="crow head"><span>Product</span><span>Price</span><span>Quantity</span><span>Subtotal</span></div>
          {cart.map((i) => (
            <div className="crow" key={i.id}>
              <div className="citem"><img src={img(i.img)} alt="" /><div><small className="brand">{i.brand}</small><h4>{i.name}</h4><a className="remove" onClick={() => setCart(cart.filter((x) => x.id !== i.id))}>Remove</a></div></div>
              <b>{money(i.price)}</b>
              <div className="qty"><button onClick={() => upd(i.id, -1)}><Minus size={14} /></button>{i.qty}<button onClick={() => upd(i.id, 1)}><Plus size={14} /></button></div>
              <b>{money(i.price * i.qty)}</b>
            </div>))}
          <button className="btn ghost" onClick={() => go('shop')}><ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} />Continue Shopping</button>
        </div>
        <div className="summary"><h4>Order summary</h4>
          <div className="row"><input placeholder="Coupon code" /><button className="btn ghost">Apply</button></div>
          <div className="between"><span>Subtotal</span><span>{money(sub)}</span></div>
          <div className="between"><span>Discount</span><span className="ok">−{money(disc)}</span></div>
          <div className="between"><span>Shipping</span><span>Free</span></div>
          <div className="between total"><b>Total</b><b>{money(sub - disc)}.00</b></div>
          <button className="btn full" onClick={() => go('checkout')}><ArrowRight size={16} />Proceed to Checkout</button>
          <small className="muted center"><CreditCard size={12} /> Secure checkout · Taxes calculated at checkout</small>
        </div>
      </div>
    </div>
  );
}

