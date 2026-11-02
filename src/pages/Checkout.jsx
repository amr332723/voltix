import { useState } from 'react';
import { Lock, CreditCard, Banknote } from 'lucide-react';
import { money, img } from '../shared.jsx';
import { Field } from '../ui.jsx';
import Logo from '../Logo.jsx';

export default function Checkout({ cart, setCart, go }) {
  const [pay, setPay] = useState('card');
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const place = (e) => { e.preventDefault(); setCart([]); go('success'); };
  return (
    <div className="co">
      <div className="wrap between co-head"><Logo height={28} /><small className="ok"><Lock size={12} /> Secure checkout</small></div>
      <form className="wrap cogrid" onSubmit={place}>
        <div>
          <div className="steps">{['Shipping', 'Payment', 'Review'].map((s, i) => <span key={s}><i className={i === 0 ? 'on' : ''}>{i + 1}</i>{s}</span>)}</div>
          <h2>Shipping information</h2>
          <div className="two"><Field label="Full name" defaultValue="Avery Morgan" /><Field label="Phone" defaultValue="+1 (415) 555-0178" /></div>
          <Field label="Address" defaultValue="1428 Valencia Street, Apt 4B" />
          <div className="two"><Field label="City" defaultValue="San Francisco" /><Field label="Postal code" defaultValue="94110" /></div>
          <h2 className="mt">Payment method</h2>
          <div className="two">
            <div className={'pay' + (pay === 'card' ? ' on' : '')} onClick={() => setPay('card')}><CreditCard size={14} />Credit / Debit Card<i /></div>
            <div className={'pay' + (pay === 'cod' ? ' on' : '')} onClick={() => setPay('cod')}><Banknote size={14} />Cash on Delivery<i /></div>
          </div>
          {pay === 'card' && <>
            <Field label="Card number" defaultValue="4242 4242 4242 4242" />
            <div className="two"><Field label="Expiry" defaultValue="08 / 29" /><Field label="CVV" defaultValue="•••" /></div></>}
          <button className="btn full"><Lock size={14} />Place Order</button>
        </div>
        <div className="summary"><h4>Order summary</h4>
          {cart.map((i) => <div className="between mini" key={i.id}><div className="row"><img src={img(i.img)} alt="" /><div><b>{i.name}</b><small className="muted">Qty {i.qty}</small></div></div><b>{money(i.price * i.qty)}</b></div>)}
          <div className="between"><span>Subtotal</span><span>{money(sub)}</span></div>
          <div className="between"><span>Discount</span><span className="ok">−$150.00</span></div>
          <div className="between"><span>Shipping</span><span>Free</span></div>
          <div className="between total"><b>Total</b><b>{money(sub - 150)}.00</b></div>
          <small className="muted center">Secure checkout · Taxes calculated at checkout</small>
        </div>
      </form>
    </div>
  );
}
