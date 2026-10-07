import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fullViewLessons } from '../data/content.js';
import { FaIcon } from './CourseBlocks.jsx';
import { IconBookOpen } from './Icons.jsx';

/**
 * Figma "Course Full View" va "Course Calendar" (Create1/Create2) ekranlarining umumiy qobig'i:
 * chapda 497px darslar paneli, o'ngda 163px teal sarlavha va sky/20 fon. navbar/footer yo'q.
 *   sections — paneldagi bo'limlar soni (Full View — 3, Calendar — 2)
 *   panelPb  — panel ostidagi chekinish (Figma: Full View 110px, Calendar 30px)
 */
const toneCls = {
  active: 'bg-teal text-white',
  orange: 'bg-orange/30 text-navy',
  blue: 'bg-sky/30 text-navy',
  red: 'bg-coral/30 text-navy',
};

function LessonPanel({ current, onSelect, sections, panelPb }) {
  let n = 0;
  return (
    <nav className={`bg-white px-5 pb-12 pt-6 lg:min-h-full fhd:pl-[21px] fhd:pr-5 fhd:pt-[26px] ${panelPb}`}>
      {fullViewLessons.slice(0, sections).map((sec, si) => (
        <section key={si} className={si ? 'mt-10 fhd:mt-[50px]' : ''}>
          <h2 className={`text-2xl font-semibold leading-[1.5] text-navy fhd:pl-[9px] fhd:text-[30px] fhd:leading-[45px] ${si ? '' : 'mt-6 fhd:mt-[47px]'}`}>
            {sec.title}
          </h2>
          <ul className={`flex flex-col gap-[15px] ${si ? 'mt-5' : 'mt-4'}`}>
            {sec.lessons.map((l) => {
              const id = n++;
              const tone = id === current ? 'active' : l.tone === 'active' ? 'orange' : l.tone;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onSelect(id)}
                    className={`flex h-[63px] w-full items-center rounded-xl pl-[25px] pr-[18px] text-left text-base transition hover:brightness-95 ${toneCls[tone]}`}
                  >
                    <span className="flex w-[38px] shrink-0">{l.icon && <IconBookOpen className="h-[18px] w-[22px]" />}</span>
                    <span className="flex-1 truncate">{l.title}</span>
                    {l.len && <span className={`ml-3 shrink-0 ${tone === 'active' ? 'text-navy' : ''}`}>{l.len}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </nav>
  );
}

export default function CoursePlayerShell({
  backTo, backLabel = 'Back to course', sections = 3, panelPb = 'fhd:pb-[110px]', children,
}) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="flex min-h-screen flex-col bg-white lg:grid lg:grid-cols-[380px_1fr] fhd:grid-cols-[497px_1fr]">
      {/* ---------- Darslar paneli ---------- */}
      <aside className="order-2 lg:order-1">
        <div className="relative z-10 px-5 pt-6 fhd:px-[30px] fhd:pt-[26px]">
          <Link
            to={backTo}
            aria-label={backLabel}
            className="flex h-[50px] w-[50px] items-center justify-center bg-teal transition hover:bg-teal-dark"
          >
            <img src="/figma/icons/arrowBack.svg" alt="" width="26" height="15" />
          </Link>
        </div>
        <div className="-mt-6 fhd:-mt-[26px]">
          <LessonPanel current={current} onSelect={setCurrent} sections={sections} panelPb={panelPb} />
        </div>
      </aside>

      {/* ---------- Asosiy qism ---------- */}
      <main className="order-1 min-w-0 bg-sky/20 lg:order-2">
        <header className="flex flex-col justify-between gap-2 bg-teal px-5 py-6 text-white sm:flex-row sm:items-start fhd:h-[163px] fhd:pb-0 fhd:pl-[60px] fhd:pr-[50px] fhd:pt-[26px]">
          <div>
            <Link to={backTo} className="mb-3 inline-flex items-center gap-2 text-sm text-white/90 lg:hidden">
              <img src="/figma/icons/arrowBack.svg" alt="" width="20" height="11" /> {backLabel}
            </Link>
            <h1 className="text-2xl font-normal text-white sm:text-[32px] fhd:text-[44px] fhd:leading-[66px]">
              Learn about Adobe XD &amp; Prototyping
            </h1>
            <p className="mt-1 text-lg sm:text-2xl fhd:mt-[5px] fhd:leading-9">Introduction about XD</p>
          </div>
          <p className="flex items-center gap-2.5 text-lg sm:self-end sm:text-2xl fhd:mb-[29px] fhd:leading-9">
            <FaIcon name="faClock" className="h-6 w-6" />
            1 hour
          </p>
        </header>
        {children}
      </main>
    </div>
  );
}
