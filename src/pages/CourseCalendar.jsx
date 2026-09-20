import { useState } from 'react';
import { Link } from 'react-router-dom';
import { weekDays, calendarEvents, calendarHours } from '../data/content.js';
import { IconChevronLeft, IconChevronRight, IconCalendar, IconGrid } from '../components/Icons.jsx';

export default function CourseCalendar() {
  const [view, setView] = useState('week');
  const [weekOffset, setWeekOffset] = useState(0);

  const label =
    weekOffset === 0 ? 'This week' : weekOffset > 0 ? `In ${weekOffset} week(s)` : `${-weekOffset} week(s) ago`;

  return (
    <div className="flex flex-col gap-6">
      {/* Sarlavha qatori */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-title sm:text-3xl">Course Calendar</h1>
          <p className="mt-1 text-body">September 2026 · {label}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 rounded-pill border border-line bg-white p-1">
            <button
              onClick={() => setWeekOffset((v) => v - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-body transition hover:bg-cloud"
              aria-label="Previous week"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setWeekOffset(0)}
              className="px-4 text-sm font-medium text-navy"
            >
              Today
            </button>
            <button
              onClick={() => setWeekOffset((v) => v + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-body transition hover:bg-cloud"
              aria-label="Next week"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex rounded-pill bg-white p-1 shadow-sm">
            {[
              { id: 'week', label: 'Week', Icon: IconGrid },
              { id: 'list', label: 'List', Icon: IconCalendar },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`flex items-center gap-2 rounded-pill px-5 py-2 text-sm font-medium transition ${
                  view === v.id ? 'bg-teal text-white' : 'text-body hover:text-navy'
                }`}
              >
                <v.Icon className="h-4 w-4" />
                {v.label}
              </button>
            ))}
          </div>

          <Link to="/calendar/create" className="btn-primary btn-sm px-7">
            + New class
          </Link>
        </div>
      </div>

      {/* Hafta ko'rinishi */}
      {view === 'week' ? (
        <div className="overflow-x-auto rounded-card bg-white shadow-card">
          <div className="min-w-[860px]">
            {/* Kun sarlavhalari */}
            <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-line">
              <div />
              {weekDays.map((d, i) => (
                <div key={d} className="border-l border-line px-4 py-4 text-center">
                  <p className="text-sm text-body">{d}</p>
                  <p className={`mt-1 text-xl font-semibold ${i === 2 ? 'text-teal' : 'text-navy'}`}>
                    {14 + i}
                  </p>
                </div>
              ))}
            </div>

            {/* Panjara */}
            <div className="relative grid grid-cols-[80px_repeat(6,1fr)]">
              {/* Soat ustuni */}
              <div>
                {calendarHours.map((h) => (
                  <div key={h} className="h-20 border-b border-line pr-3 pt-2 text-right text-xs text-lilac">
                    {String(h).padStart(2, '0')}:00
                  </div>
                ))}
              </div>

              {/* Kun ustunlari */}
              {weekDays.map((d, di) => (
                <div key={d} className="relative border-l border-line">
                  {calendarHours.map((h) => (
                    <div key={h} className="h-20 border-b border-line" />
                  ))}

                  {calendarEvents
                    .filter((e) => e.day === di)
                    .map((e) => {
                      const top = (e.start - calendarHours[0]) * 80;
                      const height = e.span * 80 - 8;
                      return (
                        <Link
                          key={e.title}
                          to="/meeting"
                          className={`absolute inset-x-1.5 rounded-soft p-3 text-white shadow-sm transition hover:brightness-110 ${e.tone}`}
                          style={{ top: `${top + 4}px`, height: `${height}px` }}
                        >
                          <p className="text-[13px] font-semibold leading-tight">{e.title}</p>
                          <p className="mt-1 text-[11px] text-white/80">
                            {String(e.start).padStart(2, '0')}:00 · {e.room}
                          </p>
                        </Link>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Ro'yxat ko'rinishi */
        <div className="flex flex-col gap-4">
          {weekDays.map((d, di) => {
            const evts = calendarEvents.filter((e) => e.day === di);
            if (!evts.length) return null;
            return (
              <div key={d} className="rounded-card bg-white p-6 shadow-card">
                <p className="mb-4 font-semibold text-navy">
                  {d}, September {14 + di}
                </p>
                <ul className="flex flex-col gap-3">
                  {evts.map((e) => (
                    <li key={e.title} className="flex items-center gap-4 rounded-soft border border-line p-4">
                      <span className={`h-12 w-1.5 shrink-0 rounded-full ${e.tone}`} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-navy">{e.title}</p>
                        <p className="text-sm text-body">
                          {String(e.start).padStart(2, '0')}:00 – {String(e.start + e.span).padStart(2, '0')}:00 · {e.room}
                        </p>
                      </div>
                      <Link to="/meeting" className="btn-outline btn-sm shrink-0">
                        Join
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
