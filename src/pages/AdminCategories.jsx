import { Plus } from 'lucide-react';
import { img } from '../shared.jsx';
import { Shell, Table } from '../ui.jsx';

const rows = [['Smartphones', 128, 'Active', 'phones'], ['Laptops', 94, 'Active', 'laptops'], ['Monitors', 67, 'Active', 'monitors'], ['Accessories', 402, 'Active', 'accessories'], ['Refurbished', 24, 'Draft', 'iphone']];
export default function AdminCategories({ go }) {
  return (
    <Shell admin go={go} active="categories" title="Categories" sub="Image, name, product count, status and actions" action={<button className="btn"><Plus size={14} />Add Category</button>}>
      <Table head={['Image', 'Category', 'Products', 'Status', 'Actions']}>
        {rows.map(([n, c, s, i]) => <tr key={n}><td><img className="thumb" src={img(i)} alt="" /></td><td>{n}</td><td>{c}</td><td>{s}</td><td className="link">Edit · Delete</td></tr>)}
      </Table>
    </Shell>
  );
}
