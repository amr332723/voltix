import { DollarSign, ShoppingBag, Package, Users } from 'lucide-react';
import { adminOrders } from '../data.js';
import { Shell, Table } from '../ui.jsx';

export default function AdminDashboard({ go }) {
  const stats = [['Total Revenue', '$428.6K', '↑ 12.4% this month', DollarSign, 'ok'], ['Total Orders', '3,842', '↑ 8.7% this month', ShoppingBag, 'ok'], ['Total Products', '1,286', '16 low-stock items', Package, 'warn'], ['Customers', '24,918', '↑ 6.1% this month', Users, 'ok']];
  const bars = [['M', 45], ['T', 62], ['W', 40], ['T', 78], ['F', 92], ['S', 72], ['S', 100]];
  return (
    <Shell admin go={go} active="dashboard" title="Dashboard" sub="September 27, 2026 · Updated 4 minutes ago">
      <div className="stats s4">{stats.map(([l, v, n, I, c]) => <div className="card stat" key={l}><div className="between"><span className="muted">{l}</span><span className="round"><I size={14} /></span></div><b>{v}</b><small className={c}>{n}</small></div>)}</div>
      <div className="agrid">
        <div className="card pad"><h4>Sales overview</h4><div className="bars">{bars.map(([d, h], i) => <div key={i}><span className={i === 6 ? 'on' : ''} style={{ height: h + '%' }} /><small>{d}</small></div>)}</div></div>
        <div>
          <div className="card pad mb"><h4>Top selling products</h4>{['01 iPhone 16 Pro · 284', '02 Galaxy S25 Ultra · 239', '03 Zenbook S 14 · 193'].map((t) => <p key={t} className="li">{t}</p>)}</div>
          <div className="card pad"><h4>Low stock</h4>{['Zenbook S 14 · 7 left', 'AirPods Pro 3 · 5 left', 'Pixel Watch 4 · 3 left'].map((t) => <p key={t} className="li warn">{t}</p>)}</div>
        </div>
      </div>
      <Table head={['Order', 'Customer', 'Date', 'Items', 'Total', 'Payment', 'Status']}>
        {adminOrders.map((o) => <tr key={o.id}><td><b>{o.id}</b></td><td>{o.customer}</td><td>{o.date}</td><td>{o.items}</td><td>{o.total}</td><td>{o.pay}</td><td className="link">{o.status}</td></tr>)}
      </Table>
    </Shell>
  );
}
