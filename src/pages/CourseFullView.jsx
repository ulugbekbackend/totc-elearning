import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import img from '../assets/images.js';
import { courses, fullViewLessons, fullViewSections, fullViewReview, alsoBought } from '../data/content.js';
import { CardRow, CourseTile, FaIcon } from '../components/CourseBlocks.jsx';
import { IconBookOpen, IconPlay } from '../components/Icons.jsx';

/**
 * Figma "Course Full View" (77:247, 1920×2978) — navbar/footer'siz to'liq ekran.
 * Chapda 497px darslar paneli, o'ngda 163px teal sarlavha, video (1323×884), matn bloklari,
 * sharh va "Student also bought" qatori. fhd: da o'lchamlar 1:1.
 */
const toneCls = {
  active: 'bg-teal text-white',
  orange: 'bg-orange/30 text-navy',
  blue: 'bg-sky/30 text-navy',
  red: 'bg-coral/30 text-navy',
};

function LessonPanel({ current, onSelect }) {
  let n = 0;
  return (
    <nav className="bg-white px-5 pb-12 pt-6 lg:min-h-full fhd:pb-[110px] fhd:pl-[21px] fhd:pr-5 fhd:pt-[26px]">
      {fullViewLessons.map((sec, si) => (
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

function VideoPlayer() {
  const [progress] = useState(332.72 / 1261);
  return (
    <div className="relative overflow-hidden rounded-[20px]">
      <img src={img.classroomVideo} alt="" className="aspect-[1323/884] w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 h-[103px] bg-black/30 px-[30px] pt-[35px] fhd:pr-8">
        <div className="relative h-2 rounded-sm bg-white">
          <span className="absolute inset-y-0 left-0 rounded-sm bg-teal" style={{ width: `${progress * 100}%` }} />
          <span
            className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-teal"
            style={{ left: `calc(${progress * 100}% - 17.7px)` }}
          />
        </div>
        <div className="mt-[18px] flex items-center text-white">
          <button type="button" aria-label="Play" className="w-[66px]">
            <IconPlay className="h-[18px] w-[18px]" />
          </button>
          <span className="text-base font-semibold">0:05 / 03:26</span>
          <button type="button" aria-label="Fullscreen" className="ml-auto">
            <img src="/figma/icons/fullscreen.svg" alt="" width="14" height="13" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CourseFullView() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const [current, setCurrent] = useState(0);
  if (!course) return <Navigate to="/courses" replace />;

  return (
    <div className="flex min-h-screen flex-col bg-white lg:grid lg:grid-cols-[380px_1fr] fhd:grid-cols-[497px_1fr]">
      {/* ---------- Darslar paneli ---------- */}
      <aside className="order-2 lg:order-1">
        <div className="relative z-10 px-5 pt-6 fhd:px-[30px] fhd:pt-[26px]">
          <Link
            to={`/courses/${course.slug}`}
            aria-label="Back to course"
            className="flex h-[50px] w-[50px] items-center justify-center bg-teal transition hover:bg-teal-dark"
          >
            <img src="/figma/icons/arrowBack.svg" alt="" width="26" height="15" />
          </Link>
        </div>
        <div className="-mt-6 fhd:-mt-[26px]">
          <LessonPanel current={current} onSelect={setCurrent} />
        </div>
      </aside>

      {/* ---------- Asosiy qism ---------- */}
      <main className="order-1 min-w-0 bg-sky/20 lg:order-2">
        <header className="flex flex-col justify-between gap-2 bg-teal px-5 py-6 text-white sm:flex-row sm:items-start fhd:h-[163px] fhd:pb-0 fhd:pl-[60px] fhd:pr-[50px] fhd:pt-[26px]">
          <div>
            <Link to={`/courses/${course.slug}`} className="mb-3 inline-flex items-center gap-2 text-sm text-white/90 lg:hidden">
              <img src="/figma/icons/arrowBack.svg" alt="" width="20" height="11" /> Back to course
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

        <div className="px-5 pb-6 pt-8 sm:px-8 fhd:pb-6 fhd:pl-[50px] fhd:pr-[50px] fhd:pt-[50px]">
          <VideoPlayer />

          <div className="mt-12 fhd:mt-[90px] fhd:pl-[14px] fhd:pr-[32px]">
            {fullViewSections.map((s, i) => (
              <section key={s.title} className={i ? 'mt-8 fhd:mt-[23px]' : ''}>
                <h2 className="text-2xl font-semibold leading-[1.5] text-navy fhd:text-[30px] fhd:leading-[45px]">{s.title}</h2>
                {s.paragraphs.map((p, j) => (
                  <p key={j} className={`break-words text-base leading-[1.5] tracking-[0.02em] text-body fhd:min-h-[108px] fhd:w-[1227px] fhd:text-lg fhd:leading-[27px] ${j ? '' : 'mt-4 fhd:mt-[30px]'}`}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <article className="mt-10 rounded-[15px] bg-orange/30 p-6 fhd:ml-[10px] fhd:mt-[22px] fhd:h-[225px] fhd:w-[1309px] fhd:px-[30px] fhd:pb-0 fhd:pt-[30px]">
            <div className="flex items-start gap-5 fhd:gap-5">
              <img src={fullViewReview.avatar} alt="" className="h-[71px] w-[71px] rounded-lg object-cover" />
              <div className="-mt-0.5">
                <p className="text-xl font-semibold leading-9 text-[#2d3436] fhd:text-2xl">{fullViewReview.author}</p>
                <img src="/figma/icons/stars5.svg" alt="5 stars" width="130" height="22" className="mt-3" />
              </div>
            </div>
            <p className="mt-6 break-words text-base leading-[1.5] tracking-[0.02em] text-body fhd:mt-[29px] fhd:w-[1227px] fhd:text-lg fhd:leading-[27px]">
              {fullViewReview.text}
            </p>
          </article>

          <CardRow
            arrows
            scrollFhd
            headClassName="mt-12 fhd:ml-[25px] fhd:mr-[7px] fhd:mt-[58px]"
            bodyClassName="mt-8 fhd:-mr-[50px] fhd:ml-[17px] fhd:mt-[45px]"
            head={
              <h2 className="text-2xl font-medium leading-[1.5] tracking-[0.02em] text-black fhd:mt-[7px] fhd:text-[30px] fhd:leading-[45px]">
                Student also bought
              </h2>
            }
          >
            {alsoBought.map((c, i) => (
              <CourseTile key={i} course={c} />
            ))}
          </CardRow>
        </div>
      </main>
    </div>
  );
}
