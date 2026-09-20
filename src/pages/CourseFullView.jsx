import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { courses } from '../data/content.js';
import { Breadcrumb } from '../components/ui.jsx';
import {
  IconPlay, IconCheck, IconChevronLeft, IconChevronRight, IconBook, IconChat,
} from '../components/Icons.jsx';

const modules = [
  {
    title: 'Getting started',
    lessons: [
      { title: 'Welcome and how this course works', len: '4:20', done: true },
      { title: 'Setting up your workspace', len: '11:05', done: true },
      { title: 'The vocabulary you will need', len: '8:44', done: true },
    ],
  },
  {
    title: 'Core concepts',
    lessons: [
      { title: 'Research that actually informs decisions', len: '17:32', done: true },
      { title: 'Sketching before you commit', len: '14:10', current: true },
      { title: 'Turning sketches into wireframes', len: '21:48' },
      { title: 'Workshop: your first flow', len: '26:02' },
    ],
  },
  {
    title: 'Testing and iteration',
    lessons: [
      { title: 'Writing a usability test script', len: '12:55' },
      { title: 'Running the session', len: '19:13' },
      { title: 'Reading the results', len: '15:39' },
    ],
  },
];

export default function CourseFullView() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const [tab, setTab] = useState('overview');
  if (!course) return <Navigate to="/courses" replace />;

  const all = modules.flatMap((m) => m.lessons);
  const done = all.filter((l) => l.done).length;
  const pct = Math.round((done / all.length) * 100);
  const current = all.find((l) => l.current) || all[0];

  return (
    <div className="bg-cloud/50">
      <div className="shell py-8 lg:py-12">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Courses', to: '/courses' },
            { label: course.title, to: `/courses/${course.slug}` },
            { label: 'Player' },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Pleyer */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-card bg-navy shadow-pop">
              <img src={course.image} alt="" className="aspect-video w-full object-cover opacity-70" />
              <button className="absolute inset-0 flex items-center justify-center" aria-label="Play">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-float transition hover:scale-105">
                  <IconPlay className="ml-1 h-8 w-8 text-cyan" />
                </span>
              </button>

              {/* Boshqaruv paneli */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/25">
                  <div className="h-full w-1/3 rounded-full bg-teal" />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-white/85">
                  <span>4:52 / {current.len}</span>
                  <span className="flex items-center gap-4">
                    <button className="transition hover:text-white"><IconChevronLeft className="h-5 w-5" /></button>
                    <button className="transition hover:text-white"><IconChevronRight className="h-5 w-5" /></button>
                  </span>
                </div>
              </div>
            </div>

            <h1 className="mt-7 text-2xl font-bold text-navy-title sm:text-3xl">{current.title}</h1>
            <p className="mt-2 text-body">
              {course.title} · {course.author}
            </p>

            {/* Tablar */}
            <div className="mt-8 flex gap-2 border-b border-line">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'notes', label: 'Notes' },
                { id: 'qa', label: 'Q&A' },
                { id: 'files', label: 'Resources' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`-mb-px border-b-2 px-5 py-3 text-sm font-medium transition ${
                    tab === t.id ? 'border-teal text-teal' : 'border-transparent text-body hover:text-navy'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-card bg-white p-7 shadow-card">
              {tab === 'overview' && (
                <div className="flex flex-col gap-4 leading-relaxed text-body">
                  <p>
                    In this lesson we sketch three versions of the same screen before committing to any
                    of them. The point is not to draw well — it is to make the throwing-away cheap.
                  </p>
                  <p>
                    Work along with the video. Pause after the second exercise and post your sketches
                    in the Q&A tab; you will get feedback from the cohort within a day.
                  </p>
                </div>
              )}
              {tab === 'notes' && (
                <textarea
                  rows={8}
                  placeholder="Type your notes for this lesson…"
                  className="field resize-y"
                />
              )}
              {tab === 'qa' && (
                <div className="flex flex-col gap-5">
                  {[
                    { who: 'Adam Levin', q: 'How many sketches is too many before it becomes procrastination?' },
                    { who: 'Tamara Clarke', q: 'Do you sketch on paper or straight into Figma?' },
                  ].map((item) => (
                    <div key={item.who} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                        <IconChat className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-medium text-navy">{item.who}</p>
                        <p className="mt-1 text-body">{item.q}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === 'files' && (
                <ul className="flex flex-col gap-3">
                  {['Lesson slides.pdf', 'Sketch template.fig', 'Exercise brief.docx'].map((f) => (
                    <li key={f} className="flex items-center justify-between rounded-soft border border-line px-5 py-3.5">
                      <span className="flex items-center gap-3 text-body">
                        <IconBook className="h-5 w-5 text-teal" /> {f}
                      </span>
                      <button className="text-sm font-semibold text-teal hover:underline">Download</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Kurs mazmuni */}
          <aside>
            <div className="sticky top-24 overflow-hidden rounded-card bg-white shadow-card">
              <div className="border-b border-line p-6">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-navy">Course content</span>
                  <span className="text-sm text-body">{pct}%</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-cloud">
                  <div className="h-full rounded-full bg-teal transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-2 text-sm text-body">
                  {done} of {all.length} lessons complete
                </p>
              </div>

              <div className="max-h-[520px] overflow-y-auto">
                {modules.map((m) => (
                  <div key={m.title}>
                    <p className="bg-cloud px-6 py-3 text-sm font-semibold text-navy">{m.title}</p>
                    <ul>
                      {m.lessons.map((l) => (
                        <li
                          key={l.title}
                          className={`flex items-center gap-3 border-b border-line px-6 py-3.5 text-sm last:border-0 ${
                            l.current ? 'bg-teal/5' : ''
                          }`}
                        >
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                              l.done ? 'bg-teal text-white' : l.current ? 'bg-teal/20 text-teal' : 'bg-cloud text-lilac'
                            }`}
                          >
                            {l.done ? <IconCheck className="h-3.5 w-3.5" /> : <IconPlay className="h-3 w-3" />}
                          </span>
                          <span className={`min-w-0 flex-1 truncate ${l.current ? 'font-medium text-teal' : 'text-body'}`}>
                            {l.title}
                          </span>
                          <span className="shrink-0 text-xs text-lilac">{l.len}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="border-t border-line p-5">
                <Link to="/meeting" className="btn-primary btn-sm w-full">
                  Join live session
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
