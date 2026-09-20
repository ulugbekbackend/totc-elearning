import { useParams, Link, Navigate } from 'react-router-dom';
import { courses } from '../data/content.js';
import { CourseCard, Breadcrumb } from '../components/ui.jsx';
import {
  IconStar, IconClock, IconBook, IconUsers, IconPlay, IconCheck, IconChevronRight,
} from '../components/Icons.jsx';

const curriculum = [
  {
    section: 'Getting started',
    lessons: [
      { title: 'Welcome and how this course works', len: '4:20', free: true },
      { title: 'Setting up your workspace', len: '11:05', free: true },
      { title: 'The vocabulary you will need', len: '8:44' },
    ],
  },
  {
    section: 'Core concepts',
    lessons: [
      { title: 'Research that actually informs decisions', len: '17:32' },
      { title: 'Sketching before you commit', len: '14:10' },
      { title: 'Turning sketches into wireframes', len: '21:48' },
      { title: 'Workshop: your first flow', len: '26:02' },
    ],
  },
  {
    section: 'Testing and iteration',
    lessons: [
      { title: 'Writing a usability test script', len: '12:55' },
      { title: 'Running the session', len: '19:13' },
      { title: 'Reading the results without fooling yourself', len: '15:39' },
    ],
  },
  {
    section: 'Shipping',
    lessons: [
      { title: 'Handing off to engineering', len: '13:27' },
      { title: 'Measuring after launch', len: '16:44' },
      { title: 'Final project brief', len: '9:18' },
    ],
  },
];

const outcomes = [
  'Run a research interview that produces usable insight',
  'Build wireframes fast enough to throw away',
  'Write and run a usability test on your own',
  'Hand off a design engineers can actually build',
  'Measure whether the change worked after launch',
  'Present your reasoning to people who disagree',
];

export default function CourseDetail() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  if (!course) return <Navigate to="/courses" replace />;

  const related = courses.filter((c) => c.slug !== course.slug).slice(0, 3);
  const totalLessons = curriculum.reduce((n, s) => n + s.lessons.length, 0);

  return (
    <>
      {/* Sarlavha bloki */}
      <section className="bg-navy py-12 text-white lg:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          <div>
            <div className="[&_a]:text-white/60 [&_a:hover]:text-white [&_span]:text-white/90">
              <Breadcrumb
                items={[{ label: 'Home', to: '/' }, { label: 'Courses', to: '/courses' }, { label: course.title }]}
              />
            </div>

            <span className="mt-6 inline-block rounded-pill bg-teal px-5 py-1.5 text-xs font-bold uppercase tracking-wider">
              {course.category}
            </span>

            <h1 className="mt-5 text-[32px] font-bold leading-tight text-white sm:text-[42px]">
              {course.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">{course.excerpt}</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="flex text-amber">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className={`h-4 w-4 ${i < Math.round(course.rating) ? '' : 'opacity-30'}`} />
                  ))}
                </span>
                <span className="font-semibold">{course.rating.toFixed(1)}</span>
                <span className="text-white/60">({course.reviews} reviews)</span>
              </span>
              <span className="flex items-center gap-2 text-white/75">
                <IconBook className="h-4 w-4" /> {totalLessons} lessons
              </span>
              <span className="flex items-center gap-2 text-white/75">
                <IconClock className="h-4 w-4" /> {course.hours} hours
              </span>
              <span className="flex items-center gap-2 text-white/75">
                <IconUsers className="h-4 w-4" /> {course.level}
              </span>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <img src={course.authorAvatar} alt={course.author} className="h-12 w-12 rounded-full object-cover" />
              <span>
                <span className="block text-xs uppercase tracking-wider text-white/50">Instructor</span>
                <span className="block font-medium">{course.author}</span>
              </span>
            </div>
          </div>

          {/* Yon panel — narx kartasi */}
          <aside className="lg:-mb-32">
            <div className="overflow-hidden rounded-card bg-white text-navy shadow-pop">
              <div className="relative">
                <img src={course.image} alt="" className="aspect-[16/10] w-full object-cover" />
                <button className="absolute inset-0 flex items-center justify-center bg-navy/25" aria-label="Preview">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-float transition hover:scale-105">
                    <IconPlay className="ml-1 h-6 w-6 text-cyan" />
                  </span>
                </button>
              </div>

              <div className="p-7">
                <p className="text-[34px] font-bold text-teal">
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                  {course.price !== 0 && (
                    <span className="ml-2 align-middle text-lg font-normal text-lilac line-through">
                      ${course.price + 40}
                    </span>
                  )}
                </p>

                <Link to="/checkout" className="btn-primary btn-md mt-6 w-full">
                  Enroll now
                </Link>
                <Link to={`/courses/${course.slug}/full`} className="btn-outline btn-md mt-3 w-full">
                  Preview curriculum
                </Link>

                <ul className="mt-7 flex flex-col gap-3 text-sm">
                  {['Lifetime access', 'Certificate of completion', 'Live Q&A every week', '30-day refund'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-body">
                      <IconCheck className="h-4 w-4 shrink-0 text-teal" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Asosiy kontent */}
      <section className="shell grid gap-12 py-14 lg:grid-cols-[1fr_380px] lg:gap-14 lg:py-20 lg:pt-44">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-navy-title sm:text-3xl">What you’ll learn</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {outcomes.map((o) => (
              <li key={o} className="flex gap-3 leading-relaxed text-body">
                <IconCheck className="mt-1 h-5 w-5 shrink-0 text-teal" />
                {o}
              </li>
            ))}
          </ul>

          <h2 className="mt-14 text-2xl font-bold text-navy-title sm:text-3xl">Curriculum</h2>
          <p className="mt-2 text-body">
            {curriculum.length} sections · {totalLessons} lessons · {course.hours} hours total
          </p>

          <div className="mt-6 flex flex-col gap-4">
            {curriculum.map((sec, si) => (
              <details key={sec.section} open={si === 0} className="group rounded-card border border-line bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
                  <span className="font-semibold text-navy">{sec.section}</span>
                  <span className="flex items-center gap-4">
                    <span className="text-sm text-body">{sec.lessons.length} lessons</span>
                    <IconChevronRight className="h-5 w-5 text-lilac transition group-open:rotate-90" />
                  </span>
                </summary>
                <ul className="border-t border-line">
                  {sec.lessons.map((l) => (
                    <li key={l.title} className="flex items-center gap-4 border-b border-line px-6 py-4 last:border-0">
                      <IconPlay className="h-4 w-4 shrink-0 text-teal" />
                      <span className="min-w-0 flex-1 truncate text-body">{l.title}</span>
                      {l.free && (
                        <span className="rounded-pill bg-mint/25 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-dark">
                          Free
                        </span>
                      )}
                      <span className="shrink-0 text-sm text-lilac">{l.len}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold text-navy-title sm:text-3xl">Your instructor</h2>
          <div className="mt-6 flex flex-col gap-6 rounded-card bg-cloud p-7 sm:flex-row sm:items-start">
            <img src={course.authorAvatar} alt={course.author} className="h-24 w-24 shrink-0 rounded-full object-cover" />
            <div>
              <p className="text-xl font-semibold text-navy-title">{course.author}</p>
              <p className="text-sm text-teal">Senior instructor · {course.category}</p>
              <p className="mt-4 leading-relaxed text-body">
                Teaching since 2011, with a practice split between classroom work and consulting.
                Believes the fastest way to learn a craft is to ship something small and get it
                critiqued honestly.
              </p>
            </div>
          </div>
        </div>

        {/* Yon ustun */}
        <aside className="flex flex-col gap-6">
          <div className="rounded-card border border-line p-6">
            <h3 className="font-semibold text-navy">This course includes</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-body">
              <li className="flex items-center gap-3"><IconPlay className="h-4 w-4 text-teal" /> {course.hours} hours on-demand video</li>
              <li className="flex items-center gap-3"><IconBook className="h-4 w-4 text-teal" /> {totalLessons} downloadable lessons</li>
              <li className="flex items-center gap-3"><IconUsers className="h-4 w-4 text-teal" /> Access to the student cohort</li>
              <li className="flex items-center gap-3"><IconClock className="h-4 w-4 text-teal" /> Self-paced, lifetime access</li>
            </ul>
          </div>

          <div className="rounded-card bg-teal p-6 text-white">
            <p className="text-lg font-semibold">Teaching a class?</p>
            <p className="mt-2 text-sm text-white/85">
              Run this course with your own cohort, with attendance and a gradebook built in.
            </p>
            <Link to="/membership" className="btn btn-sm mt-5 w-full bg-white text-teal hover:bg-white/90">
              See plans
            </Link>
          </div>
        </aside>
      </section>

      {/* O'xshash kurslar */}
      <section className="bg-cloud/60 py-16 lg:py-20">
        <div className="shell">
          <h2 className="text-2xl font-bold text-navy-title sm:text-3xl">Students also took</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
