import { useState } from 'react';
import { Search, ChevronDown, Plus } from 'lucide-react';
import { adminProducts, stockLabel } from '../data.js';
import { Shell, Table, Status } from '../ui.jsx';

export default function AdminProducts({ go }) {
  const [rows, setRows] = useState(adminProducts);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Category');
  const [st, setSt] = useState('Status');
  const list = rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()) && (cat === 'Category' || r.cat === cat) && (st === 'Status' || stockLabel(r.stock) === st));
  return (
    <Shell admin go={go} active="products" title="Products" sub="1,286 products across 24 categories" action={<button className="btn" onClick={() => go('admin', 'add')}><Plus size={14} />Add Product</button>}>
      <div className="filters p">
        <label className="search"><Search size={16} /><input placeholder="Search name, SKU or brand" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <select value={cat} onChange={(e) => setCat(e.target.value)}>{['Category', 'Smartphones', 'Laptops', 'Monitors', 'Accessories'].map((c) => <option key={c}>{c}</option>)}</select>
        <select value={st} onChange={(e) => setSt(e.target.value)}>{['Status', 'In Stock', 'Low Stock', 'Out of Stock'].map((c) => <option key={c}>{c}</option>)}</select>
      </div>
      <Table head={['Product', 'Category', 'Price', 'Stock', 'Status', 'Sales', 'Actions']}>
        {list.map((r) => <tr key={r.name}><td><b>{r.name}</b></td><td>{r.cat}</td><td>{r.price}</td><td>{r.stock}</td><td><Status s={stockLabel(r.stock)} /></td><td>{r.sales}</td>
          <td className="link">View · <a onClick={() => go('admin', 'add')}>Edit</a> · <a onClick={() => setRows(rows.filter((x) => x !== r))}>Delete</a></td></tr>)}
      </Table>
    </Shell>
  );
}
