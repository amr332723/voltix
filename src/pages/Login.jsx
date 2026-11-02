import { useState } from 'react';
import { Chrome } from 'lucide-react';
import { Field, AuthLayout } from '../ui.jsx';

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);
export default function Login({ go }) {
  const [f, setF] = useState({ email: 'avery.morgan@email.com', password: 'password123' });
  const [bad, setBad] = useState(false);
  const submit = (e) => { e.preventDefault(); emailOk(f.email) && f.password ? go('dash', 'overview') : setBad(true); };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <AuthLayout title="Welcome back" sub="Sign in to access your orders, wishlist and rewards." err={bad ? "We couldn't sign you in. Check your email and password." : null}>
      <form onSubmit={submit}>
        <Field label="Email" value={f.email} onChange={set('email')} error={bad && !emailOk(f.email)} />
        <Field label="Password" type="password" value={f.password} onChange={set('password')} error={bad && !f.password} />
        <div className="between opts"><label className="chk"><input type="checkbox" defaultChecked />Remember me</label><a className="link">Forgot Password?</a></div>
        <button className="btn full">Login</button>
        <div className="or">OR</div>
        <button type="button" className="btn ghost full"><Chrome size={14} />Continue with Google</button>
        <p className="muted center sw">New to Voltix? <a className="link" onClick={() => go('signup')}>Sign up</a></p>
      </form>
    </AuthLayout>
  );
}
