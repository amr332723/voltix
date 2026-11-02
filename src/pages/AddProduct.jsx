import { UploadCloud } from 'lucide-react';
import { Shell, Field } from '../ui.jsx';

export default function AddProduct({ go }) {
  return (
    <Shell admin go={go} active="products" title="Add product" sub="Create a complete sellable product record">
      <form className="pgrid" onSubmit={(e) => { e.preventDefault(); go('admin', 'products'); }}>
        <div>
          <div className="card pad"><h4>Product information</h4>
            <Field label="Product name" defaultValue="iPhone 16 Pro 256GB" />
            <div className="two"><Field label="Brand" defaultValue="Apple" /><Field label="Category" defaultValue="Smartphones" /></div>
            <Field label="Description" defaultValue="Grade 5 titanium flagship smartphone with A18 Pro..." /></div>
          <div className="card pad mt"><h4>Images</h4><div className="drop"><UploadCloud size={16} /><b>Drop images here or browse</b></div></div>
          <div className="card pad mt"><h4>Specifications</h4>
            <p className="muted">Display · 6.3-inch Super Retina XDR</p><p className="muted">Processor · A18 Pro</p><p className="muted">Battery · Up to 27 hours · <a className="link">+ Add specification</a></p></div>
        </div>
        <div>
          <div className="card pad"><h4>Pricing &amp; inventory</h4>
            <Field label="Price" defaultValue="$1,199" /><Field label="Discount" defaultValue="$100" /><Field label="SKU" defaultValue="APL-IP16P-256-NT" /><Field label="Stock" defaultValue="42" /></div>
          <div className="card pad mt"><h4>Variants</h4><p className="muted">Color · Natural, Desert, Black, White</p><p className="muted">Storage · 128GB, 256GB, 512GB, 1TB</p></div>
          <button className="btn full mt">Save Product</button>
        </div>
      </form>
    </Shell>
  );
}
