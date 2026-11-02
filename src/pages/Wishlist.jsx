import { Heart } from 'lucide-react';
import { products } from '../data.js';
import { useStore, ProductCard } from '../shared.jsx';
import { Shell, Empty } from '../ui.jsx';

export default function Wishlist({ go }) {
  const { wish, add } = useStore();
  const list = products.filter((p) => wish.includes(p.id));
  return (
    <Shell go={go} active="wishlist" title="Wishlist">
      {list.length
        ? <div className="grid4 g3">{list.map((p) => <ProductCard key={p.id} p={p} go={go} add={add} />)}</div>
        : <Empty icon={Heart} title="Save the tech you love" text="Your wishlist is empty. Tap the heart on any product to keep it here for later." cta="Explore products" onClick={() => go('shop')} />}
    </Shell>
  );
}
