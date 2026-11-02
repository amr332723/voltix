import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { adminOrders } from '../data.js';
import { Shell, Table, Status } from '../ui.jsx';

export default function AdminOrders({ go }) {
  const [rows, setRows] = useState(adminOrders);
  const [sel, setSel] = useState(rows[0].id);
  const o = rows.find((r) => r.id === sel);
  return (
    <Shell admin go={go} active="orders" title="Orders" sub="Filter by status, date, payment or customer">
      <div className="filters">{['Status', 'Date', 'Payment', 'Customer'].map((f) => <button key={f} className="btn ghost"><ChevronDown size={14} />{f}</button>)}</div>
      <Table head={['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Payment', 'Status', 'Actions']}>
        {rows.map((r) => <tr key={r.id}><td><b>{r.id}</b></td><td>{r.customer}</td><td>{r.date}</td><td>{r.items}</td><td>{r.total}</td><td>{r.pay}</td><td>{r.status}</td><td><a className="link" onClick={() => setSel(r.id)}>View</a></td></tr>)}
      </Table>
      <div className="card pad between drawer">
        <div><h4>Order {o.id}</h4><p className="muted">{o.customer} · {o.date} · {o.pay === 'Paid' ? 'Visa **** 4242' : o.pay}</p>
          <p className="muted">{o.items} items · Total {o.total}</p></div>
        <p className="muted">1428 Valencia Street, Apt 4B<br />San Francisco, CA 94110<br />Express delivery</p>
        <div className="col"><Status s={o.status} /><button className="btn" onClick={() => setRows(rows.map((r) => (r.id === o.id ? { ...r, status: 'Shipped' } : r)))}>Mark Shipped</button></div>
      </div>
    </Shell>
  );
}
