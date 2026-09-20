import { useState } from 'react';
import { Link } from 'react-router-dom';
import { plans, testimonial } from '../data/content.js';
import { PageHero, PriceCard, SectionHeading } from '../components/ui.jsx';
import { IconCheck, IconStar } from '../components/Icons.jsx';

const compare = [
  { feature: 'Students per class', values: ['30', '300', 'Unlimited'] },
  { feature: 'Session length', values: ['40 min', 'Unlimited', 'Unlimited'] },
  { feature: 'Attendance tracking', values: [true, true, true] },
  { feature: 'Gradebook & live quizzes', values: [false, true, true] },
  { feature: 'Breakout rooms & podium', values: [false, true, true] },
  { feature: 'One-on-one discussions', values: [false, true, true] },
  { feature: 'Online billing & contracts', values: [false, false, true] },
  { feature: 'Multiple campuses', values: [false, false, true] },
  { feature: 'SSO and admin roles', values: [false, false, true] },
  { feature: 'Support', values: ['Community', 'Priority email', 'Success manager'] },
];

const faqs = [
  {
    q: 'Can I change plan later?',
    a: 'Yes. Upgrades apply immediately and are prorated; downgrades take effect at the end of the current billing period.',
  },
  {
    q: 'Do students need to pay?',
    a: 'No. Only the teacher or institution holds a seat. Students join with an access code at no cost.',
  },
  {
    q: 'Is there an education discount?',
    a: 'Registered schools and non-profits get 30% off Classroom and Campus. Contact sales with proof of registration.',
  },
  {
    q: 'What happens to my recordings if I cancel?',
    a: 'You keep read-only access for 90 days and can export everything as MP4 with the transcript attached.',
  },
];

export default function Membership() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <PageHero
        title="Pick the plan your term actually needs"
        subtitle="Start free, move up when your cohort grows. No contracts, cancel any time."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Membership' }]}
      >
        <div className="inline-flex items-center gap-3 rounded-pill bg-white/15 p-1.5 backdrop-blur">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-pill px-6 py-2.5 text-sm font-medium transition ${!annual ? 'bg-white text-teal' : 'text-white'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-pill px-6 py-2.5 text-sm font-medium transition ${annual ? 'bg-white text-teal' : 'text-white'}`}
          >
            Yearly <span className="ml-1 opacity-70">−20%</span>
          </button>
        </div>
      </PageHero>

      {/* Tariflar */}
      <section className="shell py-14 lg:py-20">
        <div className="grid items-start gap-7 lg:grid-cols-3">
          {plans.map((p) => (
            <PriceCard
              key={p.name}
              plan={{
                ...p,
                price: annual ? Math.round(p.price * 12 * 0.8) : p.price,
                period: annual ? 'yr' : 'mo',
              }}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-body">
          Prices exclude VAT. Need more than 5,000 students?{' '}
          <Link to="/checkout" className="font-semibold text-teal hover:underline">Talk to sales</Link>.
        </p>
      </section>

      {/* Taqqoslash jadvali */}
      <section className="bg-cloud/60 py-14 lg:py-20">
        <div className="shell">
          <SectionHeading title="Compare plans" subtitle="Every feature, side by side." />

          <div className="mt-12 overflow-x-auto rounded-card bg-white shadow-card">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-6 py-5 font-semibold text-navy">Feature</th>
                  {plans.map((p) => (
                    <th key={p.name} className="px-6 py-5 text-center font-semibold text-navy">
                      {p.name}
                      {p.highlight && (
                        <span className="ml-2 rounded-pill bg-teal/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal">
                          Popular
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row.feature} className="border-b border-line last:border-0">
                    <td className="px-6 py-4 text-body">{row.feature}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-6 py-4 text-center">
                        {typeof v === 'boolean' ? (
                          v ? (
                            <IconCheck className="mx-auto h-5 w-5 text-teal" />
                          ) : (
                            <span className="text-lilac">—</span>
                          )
                        ) : (
                          <span className="text-navy">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="shell py-14 lg:py-20">
        <div className="rounded-card bg-teal p-8 text-white sm:p-12 lg:p-16">
          <span className="flex text-white/90">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStar key={i} className="h-5 w-5" />
            ))}
          </span>
          <blockquote className="mt-6 text-xl font-light leading-relaxed sm:text-2xl lg:text-[28px]">
            {testimonial.quote}
          </blockquote>
          <footer className="mt-8 flex items-center gap-4">
            <img src={testimonial.photo} alt={testimonial.name} className="h-14 w-14 rounded-full object-cover" />
            <span>
              <cite className="block not-italic font-semibold">{testimonial.name}</cite>
              <span className="block text-sm text-white/70">{testimonial.meta}</span>
            </span>
          </footer>
        </div>
      </section>

      {/* FAQ */}
      <section className="shell pb-16 lg:pb-24">
        <SectionHeading title="Questions people ask before signing up" />
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0} className="group rounded-card border border-line bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-medium text-navy">
                {f.q}
                <span className="shrink-0 text-2xl leading-none text-teal transition group-open:rotate-45">+</span>
              </summary>
              <p className="border-t border-line px-6 py-5 leading-relaxed text-body">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
