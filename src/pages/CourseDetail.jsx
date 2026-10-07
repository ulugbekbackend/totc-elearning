import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import img from '../assets/images.js';
import {
  courses, courseReviewSummary, courseReviews, courseIncludes, marketingArticles, educationOffers,
} from '../data/content.js';
import { CardRow, CourseTile, RowHeader, FaIcon } from '../components/CourseBlocks.jsx';
import ClassroomPromo from '../components/ClassroomPromo.jsx';
import {
  IconPlay, IconStar, IconTwitter, IconFacebook, IconYoutube, IconInstagram, IconTelegram, IconWhatsapp,
} from '../components/Icons.jsx';

/**
 * Figma "Course Detail" (46:217, 1920 kadr). fhd: da o'lchamlar 1:1:
 * hero 652px · yon panel x=1299 (501×1275, hero ustiga 323px chiqadi) · tablar + sharhlar (950px) ·
 * Marketing Articles (896) · ClassroomPromo · Top Education offers.
 */
const frame = 'shell fhd:max-w-[1920px] fhd:px-0';

const tabs = ['Overview', 'Curriculum', 'Instructor', 'Reviews'];

const curriculum = [
  { section: 'Getting started', lessons: ['Welcome and how this course works', 'Setting up your workspace'] },
  { section: 'Core concepts', lessons: ['Cloud fundamentals', 'Designing resilient architectures', 'Security basics'] },
  { section: 'Final project', lessons: ['Project brief', 'Review and certification'] },
];

const socials = [
  { Icon: IconTwitter, label: 'Twitter', bg: 'bg-body' },
  { Icon: IconFacebook, label: 'Facebook', bg: 'bg-body' },
  { Icon: IconYoutube, label: 'YouTube', bg: 'bg-[#ff0000]' },
  { Icon: IconInstagram, label: 'Instagram', bg: 'bg-body' },
  { Icon: IconTelegram, label: 'Telegram', bg: 'bg-body' },
  { Icon: IconWhatsapp, label: 'WhatsApp', bg: 'bg-body' },
];

function Stars({ count = 5, className = '' }) {
  return (
    <span className={`flex gap-[5px] text-[#fdb022] ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <IconStar key={i} className="h-[22px] w-[22px]" />
      ))}
    </span>
  );
}

// Figma'da ro'yxat qatorlari orasidagi masofa har xil: 32 / 33 / 37px
const includeGap = ['', 'fhd:mt-[9px]', 'fhd:mt-[10px]', 'fhd:mt-[14px]'];
// Ikonka x=1332, matn x=1361
const sideTitle = 'text-2xl font-semibold leading-[1.5] text-black fhd:text-[30px] fhd:leading-[45px]';

/* ---------- Yon panel: narx, "This Course included", ulashish ---------- */
function PriceCard() {
  return (
    <aside className="rounded-[20px] bg-white p-6 shadow-[0_18.83px_47.08px_rgba(47,50,125,0.10)] lg:shadow-[0_18.83px_47.08px_rgba(47,50,125,0.10)] fhd:h-[1275px] fhd:w-[501px] fhd:px-[29px] fhd:pb-0 fhd:pt-[30px] fhd:shadow-none">
      <div className="relative">
        <img src={img.blogHero} alt="" className="aspect-[443/268] w-full object-cover" />
        <span className="absolute inset-0 bg-black/20" />
        <button
          type="button"
          aria-label="Preview"
          className="absolute left-1/2 top-1/2 flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[2px_20px_60px_rgba(61,155,185,0.10)] transition hover:scale-105"
        >
          <IconPlay className="ml-1 h-7 w-7 text-cyan" />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-3 fhd:mt-[18px] fhd:items-start">
        <span className="flex items-baseline gap-4 fhd:items-start fhd:gap-[22px]">
          <span className="text-[36px] font-semibold leading-[1.5] text-black fhd:w-[165px] fhd:text-[45px] fhd:leading-[67.5px]">$49.65</span>
          <span className="text-xl font-semibold text-black/50 line-through fhd:mt-[13px] fhd:text-[28px] fhd:leading-[42px]">$99.99</span>
        </span>
        <span className="text-xl font-semibold text-black/50 fhd:mt-3 fhd:text-[28px] fhd:leading-[42px]">50% Off</span>
      </div>

      <p className="mt-4 flex items-center justify-center gap-2.5 text-base font-semibold leading-[30px] text-teal fhd:mt-[29px] fhd:text-xl">
        <FaIcon name="faClock" className="h-6 w-6" />
        11 hour left at this price
      </p>

      <Link
        to="/checkout"
        className="mt-6 flex h-[63px] items-center justify-center rounded-xl bg-teal text-xl font-bold text-white transition hover:bg-teal-dark fhd:mt-[39px]"
      >
        Buy Now
      </Link>

      <hr className="mt-8 border-body fhd:mt-[30px]" />

      <h3 className={`mt-6 fhd:mt-[29px] ${sideTitle}`}>This Course included</h3>
      <ul className="mt-5 flex flex-col gap-2.5 fhd:mt-[24.5px] fhd:gap-0">
        {courseIncludes.map((it, i) => (
          <li key={it.text} className={`flex h-[23px] items-center gap-2.5 text-sm font-semibold leading-[21px] text-black/50 fhd:gap-[9px] ${includeGap[i]}`}>
            <span className="flex w-5 justify-center text-teal fhd:ml-1">
              <FaIcon name={it.icon} className="h-5 w-5" />
            </span>
            {it.text}
          </li>
        ))}
      </ul>

      <hr className="mt-8 border-body fhd:mt-[37px]" />

      <h3 className={`mt-6 fhd:mt-[33px] ${sideTitle}`}>Training 5 or more people</h3>
      <p className="mt-3 text-sm leading-[25.2px] text-body fhd:mt-[19px] fhd:w-[425px]">
        Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
      </p>

      <hr className="mt-8 border-body fhd:mt-[42px]" />

      <h3 className={`mt-6 fhd:mt-[38px] ${sideTitle}`}>Share this course</h3>
      <div className="mt-6 flex flex-wrap gap-4 pb-2 sm:gap-[25px] fhd:mt-[42px] fhd:pb-0">
        {socials.map(({ Icon, label, bg }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:opacity-80 ${bg}`}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </aside>
  );
}

/* ---------- Tab kontenti ---------- */
function Reviews() {
  return (
    <>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-[45px]">
        <div className="flex h-[199px] w-full shrink-0 flex-col items-center rounded-[20px] bg-white pt-[25px] sm:w-[257px]">
          <p className="text-[30px] font-semibold leading-[45px] text-black/50">
            {courseReviewSummary.score} out of 5
          </p>
          <Stars className="mt-[21px]" />
          <p className="mt-7 text-xl leading-[30px] text-black/50">{courseReviewSummary.label}</p>
        </div>
        <ul className="flex flex-1 flex-col gap-3 sm:gap-[12.25px]">
          {courseReviewSummary.bars.map((b) => (
            <li key={b.stars} className="flex h-[33px] items-center gap-6 sm:gap-[45px]">
              <span className="w-[71px] shrink-0 text-xl leading-[30px] text-black/50">{b.stars} Stars</span>
              <span className="h-2 flex-1 rounded-sm bg-[#d9d9d9]">
                <span className="block h-full rounded-sm bg-teal" style={{ width: `${b.pct}%` }} />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 fhd:mt-[66px]">
        {courseReviews.map((r, i) => (
          <article key={i} className={i ? 'mt-[23px] border-t-[0.5px] border-body pt-[26px] fhd:ml-[3px] fhd:mr-[3px]' : ''}>
            <div className={`flex items-start ${i ? 'fhd:-ml-[5px]' : 'fhd:-ml-0.5'}`}>
              <img src={r.avatar} alt="" className="h-[60px] w-[60px] shrink-0 rounded-full object-cover fhd:h-[71px] fhd:w-[71px]" />
              <div className="ml-3 pt-[3px] fhd:ml-3">
                <p className="text-lg font-medium leading-[27px] tracking-[0.02em] text-black">{r.author}</p>
                {i === 0 && <Stars className="mt-2" />}
              </div>
              <span className="ml-auto mt-[49px] flex items-center gap-2.5 text-sm font-medium leading-[25.2px] tracking-[0.02em] text-body">
                <FaIcon name="faClock" className="h-6 w-6 text-[#d9d9d9]" />
                {r.ago}
              </span>
            </div>
            <p className="mt-6 text-base leading-[1.8] text-body sm:text-xl sm:leading-9 fhd:mt-5">{r.text}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function TabContent({ tab, course }) {
  if (tab === 'Reviews') return <Reviews />;
  if (tab === 'Curriculum')
    return (
      <div className="flex flex-col gap-6">
        {curriculum.map((s) => (
          <div key={s.section} className="rounded-[20px] bg-white p-6">
            <h3 className="text-xl font-semibold text-black">{s.section}</h3>
            <ul className="mt-3 list-disc pl-5 text-lg leading-8 text-body">
              {s.lessons.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
        ))}
      </div>
    );
  if (tab === 'Instructor')
    return (
      <div className="flex items-center gap-5 rounded-[20px] bg-white p-6">
        <img src={img.avatarLina} alt="" className="h-[71px] w-[71px] rounded-full object-cover" />
        <div>
          <p className="text-xl font-semibold text-black">Lina</p>
          <p className="text-lg text-body">Cloud architect and certified AWS instructor</p>
        </div>
      </div>
    );
  return (
    <div className="rounded-[20px] bg-white p-6 text-lg leading-8 text-body">
      <h3 className="mb-3 text-xl font-semibold text-black">{course.title}</h3>
      {course.excerpt}
    </div>
  );
}

/* ---------- "Top Education offers" kartasi (506×481) ---------- */
function OfferCard({ offer }) {
  return (
    <div className="relative h-[400px] w-[300px] shrink-0 snap-start overflow-hidden rounded-[20px] sm:w-[400px] lg:w-[calc((100%-48px)/3)] fhd:h-[481px] fhd:w-[506px]">
      <img src={offer.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute inset-0 bg-navy-deep/30" />
      <div className="relative px-[50px] pt-10">
        <span className="flex h-[100px] w-[100px] items-center justify-center rounded-xl bg-[#ff0000]/60 text-2xl font-bold leading-9 text-white">
          {offer.discount}
        </span>
        <p className="mt-[29px] text-[28px] font-semibold leading-[48px] text-white fhd:mt-[29px] fhd:text-[32px]">{offer.title}</p>
        <p className="mt-9 max-w-[405px] text-xl leading-[1.8] text-white fhd:text-2xl fhd:leading-[43.2px]">{offer.text}</p>
      </div>
    </div>
  );
}

export default function CourseDetail() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const [tab, setTab] = useState('Reviews');
  if (!course) return <Navigate to="/courses" replace />;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative h-[280px] sm:h-[400px] fhd:h-[652px]">
        <img src={img.blogHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute inset-0 bg-black/20" />
      </section>

      {/* ---------- Tablar + sharhlar | yon panel ---------- */}
      <section className="pb-16 lg:pb-24 fhd:pb-[100px]">
        <div className={`${frame} grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start xl:grid-cols-[1fr_440px] fhd:grid-cols-[950px_501px] fhd:gap-x-[192px] fhd:pl-[157px]`}>
          <div className="order-2 min-w-0 lg:order-1">
            <div className="mt-0 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-12 fhd:mt-[59px] fhd:grid-cols-[repeat(4,200px)] fhd:gap-[50px]">
              {tabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`h-[63px] rounded-xl text-lg font-bold transition fhd:text-xl ${
                    tab === t ? 'bg-teal text-white' : 'bg-black/10 text-black/40 hover:bg-black/15'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-10 rounded-[20px] bg-sky/30 p-6 sm:p-[50px] sm:pr-[49px] fhd:mt-[83px] fhd:min-h-[764px] fhd:pb-[53px]">
              <TabContent tab={tab} course={course} />
            </div>
          </div>
          <div className="order-1 -mt-24 min-w-0 sm:-mt-40 lg:order-2 lg:-mt-[200px] fhd:-mt-[323px]">
            <div className="relative">
              <PriceCard />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Marketing Articles ---------- */}
      <section className="bg-sky/20 py-14 lg:py-20 fhd:h-[896px] fhd:pb-0 fhd:pt-[92px]">
        <div className={`${frame} fhd:pl-[103px] fhd:pr-[106px]`}>
          <RowHeader title="Marketing Articles" />
        </div>
        <div className={`${frame} mt-8 fhd:mt-[50px] fhd:pl-[120px]`}>
          <CardRow>
            {marketingArticles.map((c, i) => (
              <CourseTile key={i} course={c} />
            ))}
          </CardRow>
        </div>
      </section>

      <ClassroomPromo
        className="py-16 lg:py-24 fhd:pb-0 fhd:pt-[220px]"
        titleClassName="font-medium leading-[1.5] fhd:leading-[57.6px]"
      />

      {/* ---------- Top Education offers ---------- */}
      <section className="py-16 lg:py-24 fhd:pb-[205px] fhd:pt-[184px]">
        <div className={`${frame} fhd:pl-[173px] fhd:pr-[101px]`}>
          <RowHeader title="Top  Education offers and deals are listed here" className="fhd:items-start" linkClassName="fhd:mt-1" />
        </div>
        <div className={`${frame} mt-8 fhd:mt-[64px] fhd:pl-[174px]`}>
          <CardRow gap="gap-6 fhd:gap-[70px]">
            {educationOffers.map((o, i) => (
              <OfferCard key={i} offer={o} />
            ))}
          </CardRow>
        </div>
      </section>
    </>
  );
}
