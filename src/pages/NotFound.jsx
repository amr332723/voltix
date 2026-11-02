export default function NotFound({ go }) {
  return <div className="wrap section"><div className="card empty"><h1 className="nf">404</h1><h3>Page not found</h3>
    <p className="muted">The page may have moved, or the link may be out of date.</p><button className="btn" onClick={() => go('home')}>Back to home</button></div></div>;
}
