import { useState } from 'react';
import { Shell, Table, Status } from '../ui.jsx';

const seed = [['iPhone 16 Pro', 'APL-IP16P', 42, 8], ['Zenbook S 14', 'ASU-Z14', 7, 3], ['AirPods Pro 3', 'APL-APP3', 5, 2], ['WH-1000XM6', 'SNY-XM6', 0, 0]];
const label = (n) => (n === 0 ? 'Out of Stock' : n < 10 ? 'Low Stock' : 'In Stock');
export default function AdminStock({ go }) {
  const [rows, setRows] = useState(seed);
  const [f, setF] = useState({ sku: 'ASU-Z14', adj: '+25', reason: 'Shipment received' });
  const apply = () => setRows(rows.map((r) => (r[1].toLowerCase() === f.sku.trim().toLowerCase() ? [r[0], r[1], Math.max(0, r[2] + (parseInt(f.adj, 10) || 0)), r[3]] : r)));
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <Shell admin go={go} active="stock" title="Inventory" sub="Sellable, reserved and available units">
      <Table head={['Product', 'SKU', 'Current', 'Reserved', 'Available', 'Status']}>
        {rows.map(([n, s, c, r]) => <tr key={s}><td><b>{n}</b></td><td>{s}</td><td>{c}</td><td>{r}</td><td>{Math.max(0, c - r)}</td><td><Status s={label(c)} /></td></tr>)}
      </Table>
      <div className="card pad mt"><h4>Quick stock adjustment</h4>
        <div className="adj"><label className="field"><span>Product / SKU</span><input value={f.sku} onChange={set('sku')} /></label>
          <label className="field"><span>Adjustment</span><input value={f.adj} onChange={set('adj')} /></label>
          <label className="field"><span>Reason</span><input value={f.reason} onChange={set('reason')} /></label>
          <button className="btn" onClick={apply}>Apply</button></div></div>
    </Shell>
  );
}
