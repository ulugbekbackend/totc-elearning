import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import img from '../assets/images.js';
import { courses, fullViewSections, fullViewReview, alsoBought } from '../data/content.js';
import { CardRow, CourseTile } from '../components/CourseBlocks.jsx';
import CoursePlayerShell from '../components/CoursePlayerShell.jsx';
import { IconPlay } from '../components/Icons.jsx';

/**
 * Figma "Course Full View" (77:247, 1920×2978) — navbar/footer'siz to'liq ekran.
 * Chapda 497px darslar paneli, o'ngda 163px teal sarlavha, video (1323×884), matn bloklari,
 * sharh va "Student also bought" qatori. fhd: da o'lchamlar 1:1.
 */
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
  if (!course) return <Navigate to="/courses" replace />;

  return (
    <CoursePlayerShell backTo={`/courses/${course.slug}`}>
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
    </CoursePlayerShell>
  );
}
