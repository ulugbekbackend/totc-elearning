import { Link } from 'react-router-dom';
import img from '../assets/images.js';
import { courses, bookShelves } from '../data/content.js';
import { Breadcrumb, BookCard, CourseCard } from '../components/ui.jsx';
import { IconStar, IconClock, IconBook, IconUsers, IconCheck } from '../components/Icons.jsx';

const reading = [
  { week: 'Week 1–2', text: 'Greek tragedy: Sophocles, Antigone' },
  { week: 'Week 3–4', text: 'Shakespeare: Twelfth Night and the comic form' },
  { week: 'Week 5–6', text: 'The rise of the novel: Austen, Persuasion' },
  { week: 'Week 7–8', text: 'Modernism: Woolf, Mrs Dalloway' },
  { week: 'Week 9–10', text: 'Post-war drama: Beckett, Waiting for Godot' },
  { week: 'Week 11–12', text: 'Contemporary voices and the final essay' },
];

export default function LiteratureCourse() {
  const course = courses.find((c) => c.slug === 'literature-and-drama') || courses[1];
  const shelf = bookShelves[0];
  const related = courses.filter((c) => c.category === 'Literature' && c.slug !== course.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy py-14 text-white lg:py-20">
        <span className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-teal/20" />
        <span className="pointer-events-none absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-orange/10" />

        <div className="shell relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="[&_a]:text-white/60 [&_a:hover]:text-white [&_span]:text-white/90">
              <Breadcrumb
                items={[{ label: 'Home', to: '/' }, { label: 'Courses', to: '/courses' }, { label: 'Literature' }]}
              />
            </div>

            <span className="mt-6 inline-block rounded-pill bg-orange px-5 py-1.5 text-xs font-bold uppercase tracking-wider">
              Literature
            </span>

            <h1 className="mt-5 text-[34px] font-bold leading-tight text-white sm:text-[46px]">
              Literature and Drama: Reading Between the Lines
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              A twelve-week close-reading course covering tragedy, comedy and the modern novel.
              Live seminars twice a week, with written feedback on every essay.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="flex text-amber">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className={`h-4 w-4 ${i < 5 ? '' : 'opacity-30'}`} />
                  ))}
                </span>
                <span className="font-semibold">4.6</span>
                <span className="text-white/60">(188)</span>
              </span>
              <span className="flex items-center gap-2 text-white/75"><IconBook className="h-4 w-4" /> 18 lessons</span>
              <span className="flex items-center gap-2 text-white/75"><IconClock className="h-4 w-4" /> 9 hours</span>
              <span className="flex items-center gap-2 text-white/75"><IconUsers className="h-4 w-4" /> All levels</span>
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/checkout" className="btn btn-md bg-teal px-10 text-white hover:bg-teal-dark">
                Enroll — Free
              </Link>
              <Link to={`/courses/${course.slug}/full`} className="btn btn-md border-2 border-white/40 px-10 text-white hover:bg-white hover:text-navy">
                Preview
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-card shadow-pop">
              <img src={img.course2} alt="" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-float sm:-left-8">
              <img src={course.authorAvatar} alt="" className="h-12 w-12 rounded-full object-cover" />
              <span>
                <span className="block text-xs uppercase tracking-wider text-lilac">Taught by</span>
                <span className="block font-semibold text-navy">{course.author}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Reading list */}
      <section className="shell py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="text-2xl font-bold text-navy-title sm:text-3xl">Reading schedule</h2>
            <p className="mt-2 text-body">
              Set texts are available in the library shelf below, or in any edition you prefer.
            </p>

            <ol className="mt-8 flex flex-col gap-4">
              {reading.map((r, i) => (
                <li key={r.week} className="flex gap-5 rounded-card border border-line bg-white p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/10 font-bold text-teal">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-teal">{r.week}</p>
                    <p className="mt-1 text-lg text-navy">{r.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="mt-14 text-2xl font-bold text-navy-title sm:text-3xl">How the seminars run</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                'Two live seminars a week, recorded',
                'One 1200-word essay per fortnight',
                'Written feedback within five days',
                'Optional one-on-one office hours',
                'Discussion board between sessions',
                'Final essay with a choice of six titles',
              ].map((f) => (
                <li key={f} className="flex gap-3 text-body">
                  <IconCheck className="mt-1 h-5 w-5 shrink-0 text-teal" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-card bg-cloud p-6">
              <h3 className="font-semibold text-navy">Next cohort</h3>
              <p className="mt-2 text-3xl font-bold text-teal">Oct 4</p>
              <p className="text-sm text-body">Applications close Sep 27</p>
              <Link to="/checkout" className="btn-primary btn-sm mt-5 w-full">Reserve a place</Link>
            </div>

            <div className="rounded-card border border-line p-6">
              <h3 className="font-semibold text-navy">Seminar times</h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-body">
                <li className="flex justify-between"><span>Tuesday</span><span className="text-navy">18:00 – 19:30</span></li>
                <li className="flex justify-between"><span>Thursday</span><span className="text-navy">18:00 – 19:30</span></li>
                <li className="flex justify-between"><span>Office hours</span><span className="text-navy">Fri 15:00</span></li>
              </ul>
              <Link to="/calendar" className="mt-5 inline-block text-sm font-semibold text-teal hover:underline">
                See full calendar →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Kitob javoni */}
      <section className="bg-cloud/60 py-14 lg:py-20">
        <div className="shell">
          <h2 className="text-2xl font-bold text-navy-title sm:text-3xl">Set texts</h2>
          <div className="no-scrollbar -mx-5 mt-8 flex gap-5 overflow-x-auto px-5 pb-2">
            {shelf.books.map((b, i) => (
              <BookCard key={i} book={b} />
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="shell py-14 lg:py-20">
          <h2 className="text-2xl font-bold text-navy-title sm:text-3xl">More in Literature</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
