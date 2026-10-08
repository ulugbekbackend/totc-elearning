import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images.js';
import { plans, studentReviews } from '../data/content.js';
import { PriceCard } from '../components/ui.jsx';
import { CoachingBanner, FaIcon } from '../components/CourseBlocks.jsx';

/**
 * Figma "MemberShip page" (42:319, 1920 kadr). fhd: da 1:1 —
 * "Affordable pricing" + 3 tarif (370×536) · coaching banneri · FAQ akkordeoni (1681px) ·
 * o'quvchilar fikri (sky/20, 896px, 4 × 384×395) · APP banneri (bo'lim chetiga chiqib turadi) ·
 * Teacher / Coursector kartalari (2 × 786×762).
 */
const frame = 'shell fhd:max-w-[1920px] fhd:px-0';
const titleCls = 'text-2xl font-semibold leading-[1.5] text-[#2D3436] sm:text-3xl fhd:text-4xl fhd:leading-[54px]';

const faqs = [
  {
    q: 'Can I change my plan later?',
    a: 'Yes. Upgrades apply immediately and the price difference is prorated for the rest of the billing period.',
  },
  {
    q: 'Do my students need to pay?',
    a: 'No. Only the teacher or the school holds a seat. Students join a class with an access code at no cost.',
  },
  {
    q: 'Is there a discount for schools?',
    a: 'Registered schools and non-profits get 30% off every paid plan. Send us proof of registration from your account settings.',
  },
  {
    q: 'What happens to my recordings if I cancel?',
    a: 'Nothing is deleted on the day you cancel. You keep read-only access to every class, recording, gradebook and attendance report for 90 days, and you can export all of it at any time — recordings come as MP4 files with the transcript attached, grades and attendance as spreadsheets that open in Excel or Google Sheets. If you come back within those 90 days, your classes, students and schedules are restored exactly as you left them, including breakout room setups and quiz banks. After 90 days the data is removed from our servers for good, and we send a reminder by email a week before that happens so nothing is lost by accident.',
  },
  {
    q: 'How does the Corporate plan count editors?',
    a: 'An editor is anyone who can create classes or grade work. Viewers, students and parents are always free.',
  },
];

/* ---------- FAQ — bitta ochiladigan qator ---------- */
function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-[#696984]/50">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 pb-[14px] pt-[15px] pl-1 pr-2 text-left font-inter text-base leading-8 text-[#2D3436] transition hover:text-teal sm:text-lg sm:leading-8 fhd:pr-[29px]"
      >
        <span className="h-5 w-5 shrink-0 rounded-full bg-mint" />
        <span className="min-h-10 flex-1 py-1 sm:py-1">{item.q}</span>
        <FaIcon name="faAngleDown" className={`h-[10px] w-[15px] text-body transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="-mt-px mb-px pb-[14px] pl-[38px] pr-2 text-sm leading-[25px] tracking-[0.02em] text-body fhd:pr-[19px]">{item.a}</p>
      )}
    </div>
  );
}

/* ---------- O'quvchilar fikri — strelkalar kartalar ustida, chetlarda ---------- */
function Reviews() {
  const ref = useRef(null);
  const scroll = (dir) => {
    const el = ref.current;
    const card = el?.firstElementChild;
    if (!card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0);
    const end = el.scrollWidth - el.clientWidth - el.scrollLeft < step / 2;
    // Oxiriga yetganda boshiga (va aksincha) qaytadi
    if (dir > 0 && end) el.scrollTo({ left: 0, behavior: 'smooth' });
    else if (dir < 0 && el.scrollLeft < step / 2) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    else el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className="relative fhd:w-[1674px]">
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[26px] fhd:mx-[26px] fhd:gap-[30px] fhd:px-0"
      >
        {studentReviews.map((r) => (
          <figure
            key={r.name}
            className="flex w-[280px] shrink-0 snap-start flex-col items-center rounded-[20px] bg-white px-6 pb-8 pt-[35px] text-center sm:w-[384px] fhd:h-[395px] fhd:px-[27px] fhd:pb-0"
          >
            <img src={r.photo} alt="" className="h-[118px] w-[118px] rounded-md bg-[#d9d9d9] object-cover" />
            <figcaption className="mt-5 text-xl font-semibold leading-9 text-[#2D3436] sm:text-2xl sm:leading-9">{r.name}</figcaption>
            <blockquote className="mt-[19px] text-base leading-[27px] tracking-[0.02em] text-body sm:text-lg sm:leading-[27px]">{r.text}</blockquote>
          </figure>
        ))}
      </div>
      {[-1, 1].map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => scroll(d)}
          aria-label={d < 0 ? 'Previous' : 'Next'}
          className={`absolute top-1/2 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-teal text-white transition hover:bg-teal-dark ${
            d < 0 ? 'left-0' : 'right-0'
          }`}
        >
          <FaIcon name={d < 0 ? 'faAngleLeft' : 'faAngleRight'} className="h-4 w-2.5" />
        </button>
      ))}
    </div>
  );
}

const roles = [
  {
    title: 'Become a Teacher',
    text: 'Run live classes, quizzes and grading from one place. Apply in five minutes and meet your first class this week.',
    cta: 'Apply a Teacher',
  },
  {
    title: 'Become a Coursector',
    text: 'Build a course once and offer it to schools on TOTC. We take care of hosting, billing and student certificates.',
    cta: 'Apply a Coursector',
  },
];

export default function Membership() {
  const [open, setOpen] = useState(3);

  return (
    <>
      {/* ---------- Tariflar ---------- */}
      <section className="py-14 lg:py-20 fhd:pb-0 fhd:pt-[95px]">
        <div className={frame}>
          <h1 className="text-center text-4xl font-extrabold leading-[1.5] tracking-[-1px] text-teal sm:text-5xl fhd:text-[64px] fhd:leading-[96px]">
            Affordable pricing
          </h1>
          <div className="mt-10 flex flex-col items-center gap-6 lg:flex-row lg:items-stretch lg:justify-center lg:gap-[30px] fhd:mt-[77px]">
            {plans.map((p) => (
              <PriceCard key={p.slug} plan={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Coaching banneri ---------- */}
      <div className={`${frame} mt-6 lg:mt-12 fhd:mt-[197px] fhd:pl-[120px]`}>
        <CoachingBanner to="/courses" />
      </div>

      {/* ---------- FAQ ---------- */}
      <section className="py-14 lg:py-20 fhd:pb-[80px] fhd:pt-[77px]">
        <div className={`${frame} fhd:pl-[138px]`}>
          <h2 className={`${titleCls} text-center fhd:w-[1681px]`}>Online coaching lessons for remote learning</h2>
          <div className="mt-8 fhd:mt-[68px] fhd:w-[1681px]">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- O'quvchilar fikri ---------- */}
      <section className="bg-sky/20 pb-36 pt-14 lg:pt-20 fhd:h-[896px] fhd:pb-0 fhd:pt-[80px]">
        <div className={`${frame} fhd:pl-[138px]`}>
          <h2 className={titleCls}>What our students have to say</h2>
        </div>
        <div className={`${frame} mt-8 fhd:mt-[50px] fhd:pl-[123px]`}>
          <Reviews />
        </div>
      </section>

      {/* ---------- APP banneri (Figma'da sky bo'lim chetiga 123px kirib turadi) ---------- */}
      <div className={`${frame} relative -mt-24 fhd:-mt-[123px] fhd:pl-[120px]`}>
        <div className="flex flex-col items-center gap-6 rounded-[37px] bg-navy px-6 py-10 text-center sm:px-12 lg:flex-row lg:justify-between lg:text-left fhd:h-[218px] fhd:w-[1682px] fhd:items-start fhd:py-0 fhd:pl-[100px] fhd:pr-[88px]">
          <h2 className="text-2xl font-semibold leading-[1.5] text-white sm:text-3xl fhd:mt-[80px] fhd:text-4xl fhd:leading-[54px]">
            APP is available for free
          </h2>
          <div className="flex flex-wrap justify-center gap-4 fhd:mt-[71px] fhd:gap-6">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
              className="flex h-[63px] w-[254px] items-center justify-center gap-[17px] rounded-xl bg-[#29B9E7] text-2xl font-semibold text-white transition hover:brightness-110"
            >
              <FaIcon name="faAndroid" className="h-[30px] w-[34px]" />
              Android APP
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noreferrer"
              className="flex h-[63px] w-[254px] items-center justify-center gap-[10px] rounded-xl bg-teal text-2xl font-semibold text-white transition hover:bg-teal-dark"
            >
              <FaIcon name="faApple" className="h-[30px] w-[27px]" />
              IOS APP
            </a>
          </div>
        </div>
      </div>

      {/* ---------- Teacher / Coursector ---------- */}
      <section className="py-14 lg:py-20 fhd:pb-[233px] fhd:pt-[80px]">
        <div className={`${frame} grid gap-8 lg:grid-cols-2 fhd:grid-cols-[repeat(2,786px)] fhd:gap-[108px] fhd:pl-[120px]`}>
          {roles.map((r) => (
            <article
              key={r.title}
              className="flex flex-col rounded-[20px] bg-white p-5 shadow-[0_18.83px_47.08px_rgba(47,50,125,0.10)] sm:p-8 fhd:h-[762px] fhd:pb-[51px] fhd:pl-[34px] fhd:pr-8 fhd:pt-[60px]"
            >
              <div className="relative overflow-hidden rounded-[20px]">
                <img src={img.news1} alt="" className="aspect-[720/382.5] w-full object-cover fhd:h-[382.5px] fhd:w-[720px]" />
                <span className="absolute inset-0 bg-navy-deep/10" />
              </div>
              <h3 className="mt-[13px] text-xl font-medium leading-[47px] text-navy sm:text-[26px]">{r.title}</h3>
              <p className="mt-[13px] text-base leading-[1.8] fhd:mt-[17px] tracking-[0.02em] text-body sm:text-xl sm:leading-[1.8] fhd:w-[685px]">{r.text}</p>
              <Link
                to="/register"
                className="mt-8 flex h-[63px] w-[254px] items-center justify-center self-end rounded-xl bg-teal text-xl font-medium text-white transition hover:bg-teal-dark fhd:mt-auto"
              >
                {r.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
