import { Search, Bell, Heart, ShoppingCart, AlertCircle } from 'lucide-react';
import Logo from './Logo.jsx';

export const Status = ({ s }) => <span className={'badge ' + s.toLowerCase().replace(/\s/g, '-')}>{s}</span>;

export function Field({ label, error, ...p }) {
  return <label className="field"><span>{label}</span><input className={error ? 'bad' : ''} {...p} />{error && <em>Please enter a valid value.</em>}</label>;
}
export function Empty({ icon: I, title, text, cta, onClick }) {
  return <div className="card empty"><span className="round big"><I size={20} /></span><h3>{title}</h3><p className="muted">{text}</p><button className="btn" onClick={onClick}>{cta}</button></div>;
}
export function Table({ head, children }) {
  return <div className="tbl"><table><thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{children}</tbody></table></div>;
}
export function AuthLayout({ title, sub, err, children }) {
  return (
    <div className="auth"><div className="auth-card">
      <div className="auth-img"><Logo height={28} onDark /><small>Better technology.<br />Thoughtfully chosen.</small></div>
      <div className="auth-form"><h2>{title}</h2><p className="muted">{sub}</p>
        {err && <div className="banner"><AlertCircle size={14} />{err}</div>}{children}</div>
    </div></div>
  );
}
export function Shell({ admin, go, active, title, sub, action, children }) {
  const nav = admin
    ? [['dashboard', 'Dashboard'], ['orders', 'Orders'], ['products', 'Products'], ['categories', 'Categories'], ['stock', 'Stock'], ['x1', 'Customers'], ['x2', 'Settings']]
    : [['overview', 'Overview'], ['orders', 'Orders'], ['wishlist', 'Wishlist'], ['x1', 'Addresses'], ['x2', 'Account Settings'], ['x3', 'Security'], ['logout', 'Logout']];
  const click = (k) => (k === 'logout' ? go('login') : k[0] !== 'x' && go(admin ? 'admin' : 'dash', k));
  return (
    <div className="shell">
      <aside className="side">
        <b className="side-logo" onClick={() => go('home')}><Logo height={28} onDark /></b>
        {admin ? <small>ADMIN CONSOLE</small> : <div className="who"><span>Avery Morgan</span><small>avery.morgan@email.com</small></div>}
        {nav.map(([k, l]) => <a key={k} className={active === k ? 'on' : ''} onClick={() => click(k)}>{l}</a>)}
      </aside>
      <main>
        <div className="topbar">
          {admin
            ? <><label className="search"><Search size={16} /><input placeholder="Search orders, products, customers..." /></label>
                <div className="row"><Bell size={18} /><span className="avatar">EC</span><div className="who2"><b>Ethan Cole</b><small>Administrator</small></div></div></>
            : <><h3>{title}</h3><div className="row"><Search size={16} /><Heart size={16} /><ShoppingCart size={16} /></div></>}
        </div>
        <div className="content">
          {admin && <div className="between head"><div><h1 className="h3x">{title}</h1><p className="muted">{sub}</p></div>{action}</div>}
          {children}
        </div>
      </main>
    </div>
  );
}
