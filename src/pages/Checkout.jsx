import { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses, plans } from '../data/content.js';
import { Breadcrumb } from '../components/ui.jsx';
import { IconCheck, IconChevronLeft } from '../components/Icons.jsx';

export default function Checkout() {
  const [pay, setPay] = useState('card');
  const [done, setDone] = useState(false);
  const item = courses[0];
  const plan = plans[1];

  const subtotal = plan.price;
  const discount = 0;
  const vat = Math.round(subtotal * 0.12 * 100) / 100;
  const total = subtotal - discount + vat;

  if (done) {
    return (
      <section className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-mint/25">
          <IconCheck className="h-12 w-12 text-teal" />
        </span>
        <h1 className="mt-8 text-3xl font-bold text-navy-title sm:text-4xl">You’re enrolled</h1>
        <p className="mt-4 max-w-md text-lg text-body">
          A receipt is on its way to your inbox, and the class is already on your calendar.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/calendar" className="btn-primary btn-md px-9">Go to calendar</Link>
          <Link to="/courses" className="btn-outline btn-md px-9">Browse more courses</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="shell py-10 lg:py-16">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Membership', to: '/membership' }, { label: 'Checkout' }]} />

      <Link to="/membership" className="mt-6 inline-flex items-center gap-2 text-sm text-body transition hover:text-teal">
        <IconChevronLeft className="h-4 w-4" /> Back to plans
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-navy-title sm:text-4xl">Checkout</h1>

      <form
        onSubmit={(e) => { e.preventDefault(); setDone(true); }}
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]"
      >
        {/* Chap — formalar */}
        <div className="flex flex-col gap-8">
          {/* Aloqa */}
          <div className="rounded-card bg-white p-7 shadow-card">
            <h2 className="text-lg font-semibold text-navy">Your details</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-navy">First name</span>
                <input required placeholder="Ulug'bek" className="field" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-navy">Last name</span>
                <input required placeholder="Yo'ldoshev" className="field" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-navy">Email</span>
                <input type="email" required placeholder="you@example.com" className="field" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-navy">Institution (optional)</span>
                <input placeholder="School or university name" className="field" />
              </label>
            </div>
          </div>

          {/* To'lov usuli */}
          <div className="rounded-card bg-white p-7 shadow-card">
            <h2 className="text-lg font-semibold text-navy">Payment method</h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { id: 'card', label: 'Card' },
                { id: 'paypal', label: 'PayPal' },
                { id: 'invoice', label: 'Invoice' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPay(m.id)}
                  className={`rounded-soft border-2 px-5 py-4 text-sm font-medium transition ${
                    pay === m.id ? 'border-teal bg-teal/5 text-teal' : 'border-line text-body hover:border-teal/40'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {pay === 'card' && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-navy">Card number</span>
                  <input required inputMode="numeric" placeholder="4242 4242 4242 4242" className="field" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-navy">Expiry</span>
                  <input required placeholder="MM / YY" className="field" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-navy">CVC</span>
                  <input required inputMode="numeric" placeholder="123" className="field" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-navy">Name on card</span>
                  <input required placeholder="As printed on the card" className="field" />
                </label>
              </div>
            )}

            {pay === 'paypal' && (
              <p className="mt-6 rounded-soft bg-cloud p-5 text-sm leading-relaxed text-body">
                You’ll be redirected to PayPal to approve the payment, then brought straight back here.
              </p>
            )}

            {pay === 'invoice' && (
              <div className="mt-6 flex flex-col gap-5">
                <p className="rounded-soft bg-cloud p-5 text-sm leading-relaxed text-body">
                  We’ll email a 30-day invoice. Access starts as soon as the purchase order is confirmed.
                </p>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-navy">Purchase order number</span>
                  <input placeholder="PO-00000" className="field" />
                </label>
              </div>
            )}
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-sm text-body">
            <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-line text-teal focus:ring-teal/30" />
            <span>
              I agree to the{' '}
              <Link to="/blog" className="font-medium text-teal hover:underline">Terms &amp; Conditions</Link> and the{' '}
              <Link to="/blog" className="font-medium text-teal hover:underline">Privacy Policy</Link>.
            </span>
          </label>
        </div>

        {/* O'ng — buyurtma xulosasi */}
        <aside>
          <div className="sticky top-24 rounded-card bg-white p-7 shadow-card">
            <h2 className="text-lg font-semibold text-navy">Order summary</h2>

            <div className="mt-6 flex gap-4 border-b border-line pb-6">
              <img src={item.image} alt="" className="h-20 w-24 shrink-0 rounded-soft object-cover" />
              <div className="min-w-0">
                <p className="font-medium leading-snug text-navy">{plan.name} plan</p>
                <p className="mt-1 text-sm text-body">{plan.tagline}</p>
                <p className="mt-1 text-sm text-teal">Billed monthly</p>
              </div>
            </div>

            <dl className="mt-6 flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-body">Subtotal</dt>
                <dd className="text-navy">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-body">Discount</dt>
                <dd className="text-navy">−${discount.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-body">VAT (12%)</dt>
                <dd className="text-navy">${vat.toFixed(2)}</dd>
              </div>
              <div className="mt-3 flex justify-between border-t border-line pt-4 text-lg font-bold">
                <dt className="text-navy">Total</dt>
                <dd className="text-teal">${total.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-6 flex gap-2">
              <input placeholder="Promo code" className="field flex-1 py-2.5 text-sm" />
              <button type="button" className="btn-outline btn-sm shrink-0 px-5">Apply</button>
            </div>

            <button type="submit" className="btn-primary btn-md mt-6 w-full">
              Pay ${total.toFixed(2)}
            </button>

            <ul className="mt-6 flex flex-col gap-2.5 text-xs text-body">
              {['Cancel any time', '30-day money-back guarantee', 'Secure payment'].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <IconCheck className="h-3.5 w-3.5 shrink-0 text-teal" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </form>
    </section>
  );
}
