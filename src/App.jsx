import { useState, useEffect, useRef } from 'react';
import { products, cats } from './data.js';
import { Store, Header, Footer, Toast } from './shared.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import Overview from './pages/Overview.jsx';
import Orders from './pages/Orders.jsx';
import OrderDetails from './pages/OrderDetails.jsx';
import Wishlist from './pages/Wishlist.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminOrders from './pages/AdminOrders.jsx';
import AdminProducts from './pages/AdminProducts.jsx';
import AddProduct from './pages/AddProduct.jsx';
import AdminCategories from './pages/AdminCategories.jsx';
import AdminStock from './pages/AdminStock.jsx';
import NotFound from './pages/NotFound.jsx';

const dash = { overview: Overview, orders: Orders, order: OrderDetails, wishlist: Wishlist };
const admin = { dashboard: AdminDashboard, orders: AdminOrders, products: AdminProducts, add: AddProduct, categories: AdminCategories, stock: AdminStock };

const parse = () => {
  const [path, qs = ''] = (location.hash.slice(2) || 'home').split('?');
  const [page, id] = path.split('/');
  return { page, id, q: new URLSearchParams(qs).get('q') || '' };
};
const loadWish = () => { try { return JSON.parse(localStorage.getItem('voltix-wish')) || []; } catch { return []; } };

export default function App() {
  const [view, setView] = useState(parse);
  const [cart, setCart] = useState([{ ...products[0], qty: 1 }, { ...products[1], qty: 1 }]);
  const [wish, setWish] = useState(loadWish);
  const [toast, setToast] = useState('');
  const timer = useRef();
  useEffect(() => {
    const on = () => { setView(parse()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  useEffect(() => { try { localStorage.setItem('voltix-wish', JSON.stringify(wish)); } catch { /* ignore */ } }, [wish]);
  const notify = (m) => { setToast(m); clearTimeout(timer.current); timer.current = setTimeout(() => setToast(''), 2200); };
  const go = (page, id, q) => { location.hash = '/' + page + (id ? '/' + id : '') + (q ? '?q=' + encodeURIComponent(q) : ''); };
  const add = (p, qty = 1) => { setCart((c) => (c.some((i) => i.id === p.id) ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + qty } : i)) : [...c, { ...p, qty }])); notify('Product added to your cart'); };
  const toggleWish = (id) => { const has = wish.includes(id); setWish(has ? wish.filter((x) => x !== id) : [...wish, id]); notify(has ? 'Removed from your wishlist' : 'Added to your wishlist'); };
  const { page, id, q } = view;
  const prod = products.find((x) => x.id === Number(id));
  const active = page === 'home' ? 'home' : page === 'shop' ? (cats[id] ? id : '') : page === 'product' && prod ? prod.cat : '';
  const front = {
    home: <Home go={go} add={add} />,
    shop: <Shop cat={id} q={q} go={go} add={add} />,
    product: prod ? <Product p={prod} go={go} add={add} /> : <NotFound go={go} />,
    cart: <Cart cart={cart} setCart={setCart} go={go} />,
  };
  let body;
  if (front[page]) body = <><Header active={active} q={page === 'shop' ? q : ''} /><div key={page + '/' + (id || '') + '/' + q} className="fade">{front[page]}</div><Footer /></>;
  else if (page === 'dash') { const D = dash[id] || Overview; body = <D go={go} />; }
  else if (page === 'admin') { const A = admin[id] || AdminDashboard; body = <A go={go} />; }
  else if (page === 'login') body = <Login go={go} />;
  else if (page === 'signup') body = <Signup go={go} />;
  else if (page === 'checkout') body = <Checkout cart={cart} setCart={setCart} go={go} />;
  else if (page === 'success') body = <OrderSuccess go={go} />;
  else body = <NotFound go={go} />;
  return <Store.Provider value={{ go, add, cart, wish, toggleWish, notify }}>{body}<Toast msg={toast} onClose={() => setToast('')} /></Store.Provider>;
}
