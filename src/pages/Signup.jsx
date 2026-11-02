import { useState } from 'react';
import { Chrome } from 'lucide-react';
import { Field, AuthLayout } from '../ui.jsx';

const rules = {
  name: (v) => v.trim().length > 1,
  email: (v) => /^\S+@\S+\.\S+$/.test(v),
  phone: (v) => v.replace(/\D/g, '').length >= 7,
  password: (v) => v.length >= 8,
  confirm: (v, f) => v.length >= 8 && v === f.password,
};
const fields = [['name', 'Full Name', 'text'], ['email', 'Email', 'text'], ['phone', 'Phone', 'text'], ['password', 'Password', 'password'], ['confirm', 'Confirm Password', 'password']];
export default function Signup({ go }) {
  const [f, setF] = useState({ name: 'Avery Morgan', email: 'avery.morgan@email.com', phone: '+1 (415) 555-0178', password: 'password123', confirm: 'password123' });
  const [terms, setTerms] = useState(true);
  const [tried, setTried] = useState(false);
  const invalid = (k) => !rules[k](f[k], f);
  const submit = (e) => { e.preventDefault(); setTried(true); if (fields.every(([k]) => !invalid(k)) && terms) go('dash', 'overview'); };
  return (
    <AuthLayout title="Create your account" sub="Join Voltix for faster checkout and order tracking." err={tried && (fields.some(([k]) => invalid(k)) || !terms) ? 'Please review the highlighted fields before continuing.' : null}>
      <form onSubmit={submit}>
        {fields.map(([k, l, t]) => <Field key={k} label={l} type={t} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} error={tried && invalid(k)} />)}
        <label className={'chk terms' + (tried && !terms ? ' bad' : '')}><input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />I agree to the Terms of Service and Privacy Policy</label>
        <button className="btn full">Create Account</button>
        <div className="or">OR</div>
        <button type="button" className="btn ghost full"><Chrome size={14} />Sign up with Google</button>
        <p className="muted center sw">Already have an account? <a className="link" onClick={() => go('login')}>Login</a></p>
      </form>
    </AuthLayout>
  );
}
