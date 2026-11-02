import { Package, Clock, Heart } from 'lucide-react';
import { orders } from '../data.js';
import { Shell, Table } from '../ui.jsx';
import { useStore } from '../shared.jsx';

export default function Overview({ go }) {
  const { wish } = useStore();
  const stats = [['Total Orders', '18', '3 this year', Package, 'ok'], ['Pending Orders', '2', '1 ships today', Clock, 'warn'], ['Wishlist Items', String(wish.length), wish.length ? 'Saved for later' : 'Nothing saved yet', Heart, 'ok']];
  return (
    <Shell go={go} active="overview" title="Overview">
      <h2>Good afternoon, Avery</h2><p className="muted">Here's what is happening with your account.</p>
      <div className="stats s3">{stats.map(([l, v, n, I, c]) => <div className="card stat" key={l}><div className="between"><span className="muted">{l}</span><span className="round"><I size={14} /></span></div><b>{v}</b><small className={c}>{n}</small></div>)}</div>
      <div className="between mb"><h4>Recent orders</h4><a className="link" onClick={() => go('dash', 'orders')}>View all orders</a></div>
      <Table head={['Order', 'Date', 'Products', 'Total', 'Status', 'Action']}>
        {orders.slice(0, 3).map((o) => <tr key={o.id}><td><b>{o.id}</b></td><td>{o.date}</td><td>{o.items}</td><td>{o.total}</td><td>{o.status}</td><td><a className="link" onClick={() => go('dash', 'order')}>View Details</a></td></tr>)}
      </Table>
    </Shell>
  );
}
