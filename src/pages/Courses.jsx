import { Link } from 'react-router-dom';
import { courseProgress, topCategories, courseRows } from '../data/content.js';
import { CardRow, ProgressCard, CategoryCard, CourseTile, RowHeader } from '../components/CourseBlocks.jsx';

/**
 * Figma "Course" (47:247, 1920 kadr). fhd: da bo'limlar balandligi va chekinishlari 1:1:
 * navbar ostidan — Welcome (785) · Top category · Recommended (1022) · Choice + banner +
 * Personal development · Student are viewing (946) · Footer.
 */
const frame = 'shell fhd:max-w-[1920px] fhd:px-0';
const titleCls = 'text-2xl font-semibold leading-[1.5] text-navy sm:text-3xl fhd:text-4xl fhd:leading-[54px]';

function CourseRow({ row, arrows }) {
  return (
    <>
      <RowHeader title={row.title} />
      <div className="mt-8 fhd:mt-[50px]">
        <CardRow arrows={arrows}>
          {row.courses.map((c, i) => (
            <CourseTile key={i} course={c} />
          ))}
        </CardRow>
      </div>
    </>
  );
}

export default function Courses() {
  return (
    <>
      {/* ---------- Welcome back ---------- */}
      <section className="bg-sky/20 py-12 lg:py-16 fhd:h-[785px] fhd:pb-0 fhd:pt-[50px]">
        <div className={`${frame} fhd:pl-[120px] fhd:pr-[113px]`}>
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
            <h1 className={titleCls}>Welcome back, ready for your next lesson?</h1>
            <Link
              to="/search"
              className="text-base font-bold leading-[30px] text-teal transition hover:text-teal-dark sm:mt-2 fhd:mr-[7px] fhd:mt-[18px] fhd:text-xl"
            >
              View hisotry
            </Link>
          </div>
          <div className="mt-8 fhd:mt-[50px]">
            <CardRow arrows>
              {courseProgress.map((c) => (
                <ProgressCard key={c.slug} course={c} />
              ))}
            </CardRow>
          </div>
        </div>
      </section>

      {/* ---------- Top category ---------- */}
      <section className="py-14 lg:py-20 fhd:pb-[100px] fhd:pt-[80px]">
        <div className={`${frame} fhd:pl-[120px]`}>
          <h2 className={titleCls}>Choice favourite course from top category</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 fhd:-ml-px fhd:mt-[53px] fhd:grid-cols-[repeat(4,349px)] fhd:gap-[80px]">
            {topCategories.map((c, i) => (
              <CategoryCard key={i} cat={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Recommended for you ---------- */}
      <section className="bg-sky/20 py-14 lg:py-20 fhd:h-[1022px] fhd:pb-0 fhd:pt-[97px]">
        <div className={`${frame} fhd:pl-[139px] fhd:pr-[135px]`}>
          <CourseRow row={courseRows.recommended} arrows />
        </div>
      </section>

      {/* ---------- Get choice + banner + personal development ---------- */}
      <section className="py-14 lg:py-20 fhd:py-[90px]">
        <div className={`${frame} fhd:pl-[139px] fhd:pr-[135px]`}>
          <CourseRow row={courseRows.choice} />
        </div>

        <div className={`${frame} mt-6 lg:mt-12 fhd:mt-[90px] fhd:pl-[119px]`}>
          <div className="flex flex-col items-center rounded-[37px] bg-navy px-6 py-12 text-center text-white sm:px-12 fhd:h-[459px] fhd:w-[1682px] fhd:px-0 fhd:pb-0 fhd:pt-[70px]">
            <h2 className="text-2xl font-semibold leading-[1.5] text-white sm:text-3xl fhd:text-4xl fhd:leading-[54px]">
              Online coaching lessons for remote learning.
            </h2>
            <p className="mt-5 max-w-[1259px] text-base leading-[1.8] tracking-[0.02em] sm:text-xl fhd:mt-[30px] fhd:text-2xl fhd:leading-[43.2px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor
              sitamet, consectetur adipiscing elit, sed do eiusmod tempor
            </p>
            <Link
              to="/membership"
              className="mt-10 flex h-[63px] w-[236px] items-center justify-center rounded-xl bg-teal text-base font-bold text-white transition hover:bg-teal-dark fhd:mt-[73px]"
            >
              Start learning now
            </Link>
          </div>
        </div>

        <div className={`${frame} mt-14 lg:mt-20 fhd:mt-[90px] fhd:pl-[139px] fhd:pr-[135px]`}>
          <CourseRow row={courseRows.personal} />
        </div>
      </section>

      {/* ---------- Student are viewing ---------- */}
      <section className="bg-sky/20 py-14 lg:py-20 fhd:h-[946px] fhd:pb-0 fhd:pt-[96px]">
        <div className={`${frame} fhd:pl-[139px] fhd:pr-[135px]`}>
          <CourseRow row={courseRows.viewing} />
        </div>
      </section>
    </>
  );
}
