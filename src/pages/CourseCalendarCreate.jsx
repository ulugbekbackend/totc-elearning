import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courses, weekDays } from '../data/content.js';
import { IconCheck, IconChevronLeft, IconUsers, IconCalendar } from '../components/Icons.jsx';

/**
 * Figmadagi "Course Calendar Create1" va "Create2" ekranlari —
 * ikki qadamli sehrgar sifatida birlashtirilgan.
 */
export default function CourseCalendarCreate() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    course: courses[0].slug,
    title: '',
    room: 'Online',
    date: '2026-09-21',
    start: '09:00',
    end: '10:30',
    repeat: 'weekly',
    days: ['Mon', 'Wed'],
    capacity: 30,
    recording: true,
    notify: true,
    notes: '',
  });
  const navigate = useNavigate();

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleDay = (d) =>
    setForm((f) => ({
      ...f,
      days: f.days.includes(d) ? f.days.filter((x) => x !== d) : [...f.days, d],
    }));

  const steps = [
    { n: 1, label: 'Class details' },
    { n: 2, label: 'Schedule & access' },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Link to="/calendar" className="mb-6 inline-flex items-center gap-2 text-sm text-body transition hover:text-teal">
        <IconChevronLeft className="h-4 w-4" /> Back to calendar
      </Link>

      <h1 className="text-2xl font-bold text-navy-title sm:text-3xl">Create a class</h1>
      <p className="mt-1 text-body">Set it up once and it repeats on your calendar.</p>

      {/* Qadamlar */}
      <div className="mt-8 flex items-center gap-4">
        {steps.map((s, i) => (
          <div key={s.n} className="flex flex-1 items-center gap-4">
            <button
              onClick={() => setStep(s.n)}
              className="flex min-w-0 items-center gap-3 text-left"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold transition ${
                  step > s.n
                    ? 'bg-teal text-white'
                    : step === s.n
                      ? 'bg-teal/15 text-teal ring-2 ring-teal'
                      : 'bg-cloud text-lilac'
                }`}
              >
                {step > s.n ? <IconCheck className="h-5 w-5" /> : s.n}
              </span>
              <span className={`truncate text-sm font-medium ${step >= s.n ? 'text-navy' : 'text-lilac'}`}>
                {s.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <span className={`hidden h-px flex-1 sm:block ${step > s.n ? 'bg-teal' : 'bg-line'}`} />
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step === 1) return setStep(2);
          navigate('/calendar');
        }}
        className="mt-8 rounded-card bg-white p-7 shadow-card lg:p-9"
      >
        {step === 1 ? (
          <div className="flex flex-col gap-6">
            <label className="block">
              <span className="mb-2 block font-medium text-navy">Course</span>
              <select
                value={form.course}
                onChange={(e) => set('course', e.target.value)}
                className="field"
              >
                {courses.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.title}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block font-medium text-navy">Class title</span>
              <input
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="e.g. Sketching before you commit"
                className="field"
                required
              />
            </label>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-medium text-navy">Room</span>
                <select value={form.room} onChange={(e) => set('room', e.target.value)} className="field">
                  {['Online', 'Room A1', 'Room B2', 'Lab 3', 'Hall'].map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block font-medium text-navy">Capacity</span>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={form.capacity}
                  onChange={(e) => set('capacity', +e.target.value)}
                  className="field"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block font-medium text-navy">Notes for students</span>
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
                placeholder="What should they bring or read beforehand?"
                className="field resize-y"
              />
            </label>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <label className="block">
                <span className="mb-2 block font-medium text-navy">First date</span>
                <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} className="field" />
              </label>
              <label className="block">
                <span className="mb-2 block font-medium text-navy">Starts</span>
                <input type="time" value={form.start} onChange={(e) => set('start', e.target.value)} className="field" />
              </label>
              <label className="block">
                <span className="mb-2 block font-medium text-navy">Ends</span>
                <input type="time" value={form.end} onChange={(e) => set('end', e.target.value)} className="field" />
              </label>
            </div>

            <div>
              <span className="mb-2 block font-medium text-navy">Repeat</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'none', label: 'Does not repeat' },
                  { id: 'weekly', label: 'Weekly' },
                  { id: 'biweekly', label: 'Every 2 weeks' },
                  { id: 'monthly', label: 'Monthly' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => set('repeat', r.id)}
                    className={`rounded-pill px-5 py-2.5 text-sm font-medium transition ${
                      form.repeat === r.id ? 'bg-teal text-white' : 'bg-cloud text-body hover:text-navy'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {form.repeat !== 'none' && (
              <div>
                <span className="mb-2 block font-medium text-navy">On these days</span>
                <div className="flex flex-wrap gap-2">
                  {weekDays.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDay(d)}
                      className={`h-12 w-12 rounded-full text-sm font-medium transition ${
                        form.days.includes(d) ? 'bg-teal text-white' : 'bg-cloud text-body hover:text-navy'
                      }`}
                    >
                      {d.slice(0, 2)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4 rounded-card bg-cloud p-6">
              {[
                { key: 'recording', label: 'Record the session', hint: 'Students who miss it get the recording automatically.' },
                { key: 'notify', label: 'Notify enrolled students', hint: 'Sends an email and a calendar invite now.' },
              ].map((o) => (
                <label key={o.key} className="flex cursor-pointer items-start gap-4">
                  <input
                    type="checkbox"
                    checked={form[o.key]}
                    onChange={(e) => set(o.key, e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-line text-teal focus:ring-teal/30"
                  />
                  <span>
                    <span className="block font-medium text-navy">{o.label}</span>
                    <span className="block text-sm text-body">{o.hint}</span>
                  </span>
                </label>
              ))}
            </div>

            {/* Xulosa */}
            <div className="rounded-card border border-teal/30 bg-teal/5 p-6">
              <p className="mb-4 font-semibold text-navy">Summary</p>
              <ul className="flex flex-col gap-2.5 text-sm text-body">
                <li className="flex items-center gap-3">
                  <IconCalendar className="h-4 w-4 text-teal" />
                  {form.date} · {form.start}–{form.end}
                  {form.repeat !== 'none' && ` · ${form.repeat}, ${form.days.join(', ')}`}
                </li>
                <li className="flex items-center gap-3">
                  <IconUsers className="h-4 w-4 text-teal" />
                  Up to {form.capacity} students · {form.room}
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
          {step === 2 ? (
            <button type="button" onClick={() => setStep(1)} className="btn-outline btn-md px-8">
              Back
            </button>
          ) : (
            <Link to="/calendar" className="text-body transition hover:text-navy">
              Cancel
            </Link>
          )}
          <button type="submit" className="btn-primary btn-md px-10">
            {step === 1 ? 'Continue' : 'Create class'}
          </button>
        </div>
      </form>
    </div>
  );
}
