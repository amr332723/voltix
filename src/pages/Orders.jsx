import { useState } from 'react';
import { Download } from 'lucide-react';
import { orders } from '../data.js';
import { Shell, Table } from '../ui.jsx';

const tabs = { 'All orders': null, 'In progress': ['Pending', 'Processing', 'Shipped'], Delivered: ['Delivered'], Cancelled: ['Cancelled'] };
export default function Orders({ go }) {
  const [tab, setTab] = useState('All orders');
  const list = orders.filter((o) => !tabs[tab] || tabs[tab].includes(o.status));
  return (
    <Shell go={go} active="orders" title="My orders">
      <div className="between mb"><div className="tabs2 nm">{Object.keys(tabs).map((t) => <a key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</a>)}</div>
        <button className="btn ghost"><Download size={14} />Download invoices</button></div>
      <Table head={['Order number', 'Date', 'Products', 'Total', 'Status', 'Action']}>
        {list.map((o) => <tr key={o.id}><td><b>{o.id}</b></td><td>{o.date}</td><td>{o.items}</td><td>{o.total}</td><td>{o.status}</td><td><a className="link" onClick={() => go('dash', 'order')}>View Details</a></td></tr>)}
      </Table>
    </Shell>
  );
}
