import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { shareIntro, calendarDayHours, courseEvents } from '../data/content.js';
import CoursePlayerShell from '../components/CoursePlayerShell.jsx';
import { FaIcon } from '../components/CourseBlocks.jsx';

/**
 * Figma "Course Calendar" (68:428, 1920×1547). Kalendar kartasi 1337×532:
 * chapda oy (7 ustun × 80px, qatorlar 65px), x=612 da ajratuvchi chiziq, o'ngda kun ko'rinishi
 * (soatlar orasi 71px). Figma'da 1-sentyabr yakshanbaga qo'yilgan — bu yerda haqiqiy hafta kunlari.
 */
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const HOUR_PX = 71;
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const hourLabel = (h) => `${((h + 11) % 12) + 1} ${h < 12 ? 'AM' : 'PM'}`;

export function PageIntro({ title, paragraphs }) {
  return (
    <>
      <h2 className="text-2xl font-semibold leading-[1.5] text-navy fhd:text-[30px] fhd:leading-[45px]">{title}</h2>
      <div className="mt-4 text-base leading-[1.5] tracking-[0.02em] text-body fhd:mt-5 fhd:w-[1359px] fhd:text-lg fhd:leading-[27px]">
        {paragraphs.map((p, i) => (
          <p key={i} className="break-words">
            {p}
          </p>
        ))}
      </div>
    </>
  );
}

function MonthView({ month, setMonth, selected, setSelected }) {
  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [...Array(first.getDay()).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  }, [month]);
  const shift = (d) => setMonth(new Date(month.getFullYear(), month.getMonth() + d, 1));

  return (
    <div className="px-2 pb-6 sm:px-[27px] fhd:pb-0">
      <div className="flex items-center justify-between px-[26px] pt-[57px] text-xl font-semibold leading-[30px] text-navy fhd:pl-7 fhd:pr-[34px]">
        <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className="flex h-[30px] w-4 items-center text-black">
          <FaIcon name="faAngleLeft" className="h-4 w-2.5" />
        </button>
        <span>{month.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
        <button type="button" onClick={() => shift(1)} aria-label="Next month" className="flex h-[30px] w-4 items-center justify-end text-black">
          <FaIcon name="faAngleRight" className="h-4 w-2.5" />
        </button>
      </div>

      <div className="mt-[30px] grid grid-cols-7 text-center">
        {DAYS.map((d) => (
          <span key={d} className="text-sm font-semibold leading-[21px] tracking-[0.02em] text-body">
            {d}
          </span>
        ))}
      </div>
      <div className="mt-[45px] grid grid-cols-7 gap-y-[35px] text-center">
        {cells.map((n, i) => {
          if (!n) return <span key={i} />;
          const key = iso(new Date(month.getFullYear(), month.getMonth(), n));
          const isSel = key === selected;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(key)}
              className={`mx-auto flex h-[30px] min-w-[30px] items-center justify-center rounded-full px-1 text-xl font-semibold leading-[30px] transition ${
                isSel ? 'bg-teal text-white' : 'text-navy hover:text-teal'
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DayView({ selected }) {
  const date = new Date(`${selected}T00:00`);
  const events = courseEvents.filter((e) => e.date === selected);
  const first = calendarDayHours[0];
  return (
    <div className="px-5 pb-8 sm:pl-[51px] sm:pr-[50px] fhd:pb-0">
      <p className="pt-[57px] text-center text-xl font-semibold leading-[30px] text-navy">
        {date.toLocaleString('en-US', { month: 'short', day: 'numeric' })},{' '}
        {date.toLocaleString('en-US', { weekday: 'long' })}
      </p>
      <div className="relative mt-[30px]">
        {calendarDayHours.map((h) => (
          <Link
            key={h}
            to="/calendar/create"
            className="flex h-[71px] items-start gap-4 sm:gap-0"
            aria-label={`Create event at ${hourLabel(h)}`}
          >
            <span className="w-[54px] shrink-0 text-sm font-semibold leading-[21px] tracking-[0.02em] text-body">{hourLabel(h)}</span>
            <span className="mt-[11px] h-[0.3px] flex-1 bg-body" />
          </Link>
        ))}
        {events.map((e) => (
          <Link
            key={e.title}
            to="/calendar/share"
            className="absolute left-[50px] right-0 flex items-start whitespace-nowrap rounded-xl bg-coral/30 pl-[30px] pt-5 text-sm font-semibold leading-[21px] tracking-[0.02em] text-coral transition hover:bg-coral/40 sm:max-w-[409px]"
            style={{ top: 17 + (e.start - first) * HOUR_PX, height: 60 }}
          >
            {e.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function CourseCalendar() {
  const [month, setMonth] = useState(new Date(2021, 8, 1));
  const [selected, setSelected] = useState('2021-09-12');

  return (
    <CoursePlayerShell backTo="/courses" sections={2} panelPb="fhd:pb-[30px]">
      <div className="px-5 pb-12 pt-8 sm:px-8 fhd:pb-0 fhd:pl-[30px] fhd:pr-[50px] fhd:pt-[30px]">
        <PageIntro title="Share and refer" paragraphs={shareIntro} />

        <section className="mt-10 grid rounded-[20px] bg-white lg:grid-cols-2 fhd:ml-1.5 fhd:grid-cols-[612px_1fr] fhd:mt-[50px] fhd:h-[532px] fhd:w-[1337px]">
          <MonthView month={month} setMonth={setMonth} selected={selected} setSelected={setSelected} />
          <div className="border-t-[0.2px] border-body lg:my-9 lg:border-l-[0.2px] lg:border-t-0 lg:pb-0">
            <div className="lg:-my-9">
              <DayView selected={selected} />
            </div>
          </div>
        </section>
      </div>
    </CoursePlayerShell>
  );
}
