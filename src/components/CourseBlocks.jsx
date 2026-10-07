import { useRef } from 'react';
import { Link } from 'react-router-dom';

/**
 * Figma "Course" ekrani (47:247) bloklari. fhd: (1920 kadr) da o'lchamlar 1:1,
 * kichik ekranlarda kartalar gorizontal aylantiriladigan qatorda turadi.
 */

// Figma'dagi Font Awesome glif — public/figma/icons/<name>.svg, rangi `currentColor`
export function FaIcon({ name, className = '' }) {
  const url = `url(/figma/icons/${name}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{ maskImage: url, WebkitMaskImage: url, maskSize: 'contain', WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }}
    />
  );
}

const cardShadow = 'shadow-[0_18.83px_47.08px_rgba(47,50,125,0.10)]';

/* ---------- Gorizontal qator + strelkalar ----------
 * head      — berilsa, strelkalar qator ostida emas, shu sarlavha bilan bir qatorda (o'ngda) turadi
 * scrollFhd — 1920 da ham aylantiriladi (Figma'da qator kadr chetidan chiqib ketgan joylar uchun)
 */
export function CardRow({
  children, arrows = false, className = '', gap = 'gap-6 fhd:gap-[50px]',
  head = null, headClassName = '', bodyClassName = '', scrollFhd = false, arrowsClassName = '-mt-4 fhd:mt-[50px]',
}) {
  const ref = useRef(null);
  const scroll = (dir) => {
    const el = ref.current;
    const card = el?.firstElementChild;
    if (!card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0)), behavior: 'smooth' });
  };
  const buttons = arrows && (
    <div className={`flex shrink-0 justify-end gap-5 ${head ? '' : arrowsClassName}`}>
      {[-1, 1].map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => scroll(d)}
          aria-label={d < 0 ? 'Previous' : 'Next'}
          className={`flex h-[50px] w-[50px] items-center justify-center rounded text-white transition hover:bg-teal-dark ${
            d < 0 ? 'bg-teal/50' : 'bg-teal'
          }`}
        >
          <FaIcon name={d < 0 ? 'faAngleLeft' : 'faAngleRight'} className="h-4 w-2.5" />
        </button>
      ))}
    </div>
  );
  const row = (
    <div
      ref={ref}
      className={`no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-10 pt-1 sm:-mx-8 sm:scroll-px-8 sm:px-8 fhd:mx-0 fhd:scroll-px-0 ${
        scrollFhd ? 'fhd:pl-0 fhd:pr-[50px]' : 'fhd:overflow-visible fhd:p-0'
      } ${gap} ${className}`}
    >
      {children}
    </div>
  );
  if (head)
    return (
      <>
        <div className={`flex items-center justify-between gap-4 ${headClassName}`}>
          {head}
          {buttons}
        </div>
        <div className={bodyClassName}>{row}</div>
      </>
    );
  return (
    <>
      {row}
      {buttons}
    </>
  );
}

/* ---------- "Welcome back" — davom ettirilayotgan kurs (529×474) ---------- */
export function ProgressCard({ course }) {
  const pct = (course.done / course.total) * 100;
  return (
    <Link
      to={`/courses/${course.slug}`}
      className={`group flex w-[300px] shrink-0 snap-start flex-col rounded-[20px] bg-white px-5 pb-5 pt-5 sm:w-[400px] lg:w-[calc((100%-48px)/3)] fhd:h-[474px] fhd:w-[529px] fhd:pl-[25px] fhd:pr-[21px] fhd:pt-5 ${cardShadow}`}
    >
      <span className="relative block aspect-[486/258] shrink-0 overflow-hidden rounded-[20px] fhd:-ml-1 fhd:h-[258px] fhd:w-[487px]">
        <img src={course.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute inset-0 bg-navy-deep/10" />
      </span>
      <h3 className="mt-3 text-lg font-medium leading-[1.8] text-navy group-hover:text-teal fhd:mt-3 fhd:text-2xl fhd:leading-[43.2px]">
        {course.title}
      </h3>
      <span className="mt-2 flex items-center gap-3 fhd:mt-[15px] fhd:gap-[15px]">
        <img src={course.avatar} alt="" className="h-9 w-9 rounded-full object-cover fhd:h-[42px] fhd:w-[42px]" />
        <span className="text-base font-medium tracking-[0.02em] text-black fhd:text-lg">{course.author}</span>
      </span>
      <span className="mt-5 block h-2 shrink-0 overflow-hidden rounded-sm bg-[#d9d9d9] fhd:mt-[25px] fhd:w-[483px]">
        <span className="block h-full rounded-sm bg-teal" style={{ width: `${pct}%` }} />
      </span>
      <span className="mt-3 self-end text-sm font-semibold leading-[21px] tracking-[0.02em] text-black/50 fhd:mt-3 fhd:pr-px">
        Lesson {course.done} of {course.total}
      </span>
    </Link>
  );
}

/* ---------- Kategoriya kartasi (349×377) ---------- */
export function CategoryCard({ cat }) {
  return (
    <Link
      to="/search"
      className={`group flex flex-col items-center rounded-[20px] bg-white px-6 pb-10 pt-[30px] text-center transition hover:-translate-y-1 fhd:h-[377px] fhd:w-[349px] fhd:px-[32px] fhd:pb-0 ${cardShadow}`}
    >
      <span
        className="relative flex h-[72px] w-[72px] items-center justify-center rounded fhd:h-[90px] fhd:w-[90px]"
        style={{ color: cat.color }}
      >
        <span className="absolute inset-0 rounded bg-current opacity-30" />
        <FaIcon name={cat.icon} className="relative h-6 w-6 fhd:h-[30px] fhd:w-[34px]" />
      </span>
      <h3 className="mt-6 text-2xl font-semibold leading-[1.5] tracking-[0.02em] text-black fhd:mt-5 fhd:text-[30px] fhd:leading-[45px]">
        {cat.title}
      </h3>
      <p className="mt-4 text-base leading-[1.5] tracking-[0.02em] text-body fhd:mt-[25px] fhd:text-lg fhd:leading-[27px]">
        {cat.text}
      </p>
    </Link>
  );
}

/* ---------- Kurs kartasi (374×617) ---------- */
export function CourseTile({ course }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className={`group flex w-[280px] shrink-0 snap-start flex-col rounded-[20px] bg-white p-5 lg:w-[calc((100%-48px)/3)] xl:w-[calc((100%-72px)/4)] fhd:h-[617px] fhd:w-[374px] fhd:pb-0 fhd:pl-[27px] fhd:pr-[19px] fhd:pt-5 ${cardShadow}`}
    >
      <span className="relative block aspect-[334/239] shrink-0 overflow-hidden rounded-[20px] fhd:-ml-1.5 fhd:h-[239px] fhd:w-[335px]">
        <img src={course.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute inset-0 bg-navy-deep/10" />
      </span>

      <span className="mt-4 flex items-center justify-between text-sm font-medium leading-[25.2px] tracking-[0.02em] text-body fhd:mt-5">
        <span className="flex items-center gap-2.5">
          <span className="grid grid-cols-2 gap-px" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-sm border border-[#d9d9d9]" />
            ))}
          </span>
          {course.category}
        </span>
        <span className="flex items-center gap-2.5">
          <FaIcon name="faClock" className="h-6 w-6 text-[#d9d9d9]" />
          {course.duration}
        </span>
      </span>

      <h3 className="mt-3 text-xl font-medium leading-[1.5] text-navy group-hover:text-teal fhd:mt-[17px] fhd:pr-1 fhd:text-2xl fhd:leading-9">
        {course.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-base leading-[1.8] tracking-[0.02em] text-body fhd:mt-[26px] fhd:text-lg fhd:leading-[32.4px]">
        {course.text}
      </p>

      <span className="mt-auto flex items-center pt-5 fhd:mb-[35px] fhd:pt-0">
        <img src={course.avatar} alt="" className="h-10 w-10 rounded-full object-cover fhd:h-11 fhd:w-11" />
        <span className="ml-3 text-base font-medium tracking-[0.02em] text-black fhd:ml-[18px] fhd:text-lg">{course.author}</span>
        <span className="ml-auto text-base font-light tracking-[0.02em] text-black/50 line-through fhd:text-lg">
          ${course.oldPrice}
        </span>
        <span className="ml-3 text-xl font-bold tracking-[0.02em] text-teal fhd:ml-[14px] fhd:text-2xl">${course.price}</span>
      </span>
    </Link>
  );
}

/* ---------- Qator sarlavhasi + "See all" ---------- */
export function RowHeader({ title, to = '/search', link = 'See all', className = '', linkClassName = '' }) {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <h2 className="text-2xl font-medium leading-[1.5] tracking-[0.02em] text-black fhd:text-[30px] fhd:leading-[45px]">
        {title}
      </h2>
      <Link to={to} className={`shrink-0 text-base font-bold leading-[30px] text-teal transition hover:text-teal-dark fhd:mr-[3px] fhd:text-xl ${linkClassName}`}>
        {link}
      </Link>
    </div>
  );
}
