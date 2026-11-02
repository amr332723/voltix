import { Check, Truck } from 'lucide-react';
export default function OrderSuccess({ go }) {
  return (
    <div className="wrap section"><div className="card empty done">
      <span className="round big ok-bg"><Check size={20} /></span>
      <h3>Your order is confirmed</h3>
      <p className="muted">Thanks, Avery. Order #TS-18492 is being prepared. A confirmation was sent to avery.morgan@email.com.</p>
      <span className="pill"><Truck size={12} /> Estimated delivery · Tuesday, September 29</span>
      <div><button className="btn" onClick={() => go('dash', 'orders')}>Track your order</button></div>
    </div></div>
  );
}
