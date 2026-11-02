import { Download, Check } from 'lucide-react';
import { img } from '../shared.jsx';
import { Shell, Status } from '../ui.jsx';

export default function OrderDetails({ go }) {
  const steps = [['Ordered', 'Sep 27', true], ['Processing', 'In progress', true], ['Shipped', '—'], ['Delivered', '—']];
  return (
    <Shell go={go} active="orders" title="Order #TS-18492">
      <div className="between mb"><div><p className="muted">Placed September 27, 2026 · 2 items</p><Status s="Processing" /></div><button className="btn ghost"><Download size={14} />Download invoice</button></div>
      <div className="stepper">{steps.map(([l, d, done], i) => <div key={l}><i className={done ? 'on' : ''}>{done ? <Check size={12} /> : i + 1}</i><b>{l}</b><small className="muted">{d}</small></div>)}</div>
      <div className="dgrid">
        <div className="card pad">{[['iphone', 'iPhone 16 Pro 256GB', '$1,099'], ['galaxy', 'Galaxy S25 Ultra 512GB', '$1,249']].map(([i, n, p]) => <div className="between mini" key={n}><div className="row"><img src={img(i)} alt="" /><div><b>{n}</b><small className="muted">Qty 1 · Premium configuration</small></div></div><b>{p}</b></div>)}</div>
        <div className="card pad summ"><h4>Summary</h4>
          {[['Subtotal', '$2,348.00'], ['Shipping', 'Free'], ['Discount', '−$150.00']].map(([a, b]) => <div className="between" key={a}><span>{a}</span><span>{b}</span></div>)}
          <div className="between"><b>Total</b><b>$2,198.00</b></div></div>
      </div>
      <div className="dgrid two-eq">
        <div className="card pad"><h4>Shipping address</h4><p className="muted">Avery Morgan<br />1428 Valencia Street, Apt 4B<br />San Francisco, CA 94110</p></div>
        <div className="card pad"><h4>Payment</h4><p className="muted">Visa ending in 4242<br />Paid · $2,198.00</p></div>
      </div>
    </Shell>
  );
}
