import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { courses, posts, bookShelves, courseCategories } from '../data/content.js';
import { CourseCard, BookCard, PageHero } from '../components/ui.jsx';
import { IconSearch, IconClose, IconStar } from '../components/Icons.jsx';

const levels = ['Beginner', 'Intermediate', 'All levels'];

export default function Search() {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('all');
  const [cats, setCats] = useState([]);
  const [lvls, setLvls] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);

  const toggle = (arr, set, v) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const needle = q.trim().toLowerCase();

  const foundCourses = useMemo(
    () =>
      courses.filter((c) => {
        if (needle && !`${c.title} ${c.excerpt} ${c.author}`.toLowerCase().includes(needle)) return false;
        if (cats.length && !cats.includes(c.category)) return false;
        if (lvls.length && !lvls.includes(c.level)) return false;
        if (c.price > maxPrice) return false;
        if (c.rating < minRating) return false;
        return true;
      }),
    [needle, cats, lvls, maxPrice, minRating]
  );

  const foundPosts = useMemo(
    () => (needle ? posts.filter((p) => `${p.title} ${p.excerpt}`.toLowerCase().includes(needle)) : posts),
    [needle]
  );

  const foundBooks = useMemo(() => {
    const all = bookShelves.flatMap((s) => s.books);
    return needle ? all.filter((b) => `${b.title} ${b.author}`.toLowerCase().includes(needle)) : all;
  }, [needle]);

  const total = foundCourses.length + foundPosts.length + foundBooks.length;

  const clear = () => {
    setCats([]); setLvls([]); setMaxPrice(100); setMinRating(0);
  };
  const activeFilters = cats.length + lvls.length + (maxPrice < 100 ? 1 : 0) + (minRating > 0 ? 1 : 0);

  return (
    <>
      <PageHero
        title="Search everything"
        subtitle="Courses, reading lists and articles in one place."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Search' }]}
      >
        <div className="flex w-full max-w-2xl items-center gap-3 rounded-pill bg-white p-2 shadow-float">
          <span className="pl-4 text-lilac"><IconSearch className="h-5 w-5" /></span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try “design”, “literature” or an instructor’s name"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-navy outline-none placeholder:text-lilac"
          />
          {q && (
            <button onClick={() => setQ('')} aria-label="Clear" className="pr-3 text-lilac hover:text-navy">
              <IconClose className="h-5 w-5" />
            </button>
          )}
        </div>
      </PageHero>

      <section className="shell py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Filtrlar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-navy">Filters</h2>
              {activeFilters > 0 && (
                <button onClick={clear} className="text-sm font-medium text-teal hover:underline">
                  Clear ({activeFilters})
                </button>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-8">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-lilac">Category</p>
                <div className="flex flex-col gap-2.5">
                  {courseCategories.filter((c) => c !== 'All').map((c) => (
                    <label key={c} className="flex cursor-pointer items-center gap-3 text-body">
                      <input
                        type="checkbox"
                        checked={cats.includes(c)}
                        onChange={() => toggle(cats, setCats, c)}
                        className="h-4 w-4 rounded border-line text-teal focus:ring-teal/30"
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-lilac">Level</p>
                <div className="flex flex-col gap-2.5">
                  {levels.map((l) => (
                    <label key={l} className="flex cursor-pointer items-center gap-3 text-body">
                      <input
                        type="checkbox"
                        checked={lvls.includes(l)}
                        onChange={() => toggle(lvls, setLvls, l)}
                        className="h-4 w-4 rounded border-line text-teal focus:ring-teal/30"
                      />
                      {l}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-lilac">
                  Max price — ${maxPrice}
                </p>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(+e.target.value)}
                  className="w-full accent-teal"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-lilac">Rating</p>
                <div className="flex flex-col gap-2">
                  {[0, 4, 4.5, 4.8].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`flex items-center gap-2 rounded-soft px-3 py-2 text-sm transition ${
                        minRating === r ? 'bg-teal/10 text-teal' : 'text-body hover:bg-cloud'
                      }`}
                    >
                      <span className="flex text-amber">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <IconStar key={i} className={`h-3.5 w-3.5 ${i < Math.round(r) ? '' : 'opacity-25'}`} />
                        ))}
                      </span>
                      {r === 0 ? 'Any' : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Natijalar */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
              <p className="text-body">
                <span className="font-semibold text-navy">{total}</span> ta natija
                {q && <> — “<span className="text-navy">{q}</span>” bo'yicha</>}
              </p>
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'courses', label: `Courses (${foundCourses.length})` },
                  { id: 'books', label: `Books (${foundBooks.length})` },
                  { id: 'articles', label: `Articles (${foundPosts.length})` },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`rounded-pill px-5 py-2 text-sm font-medium transition ${
                      tab === t.id ? 'bg-teal text-white' : 'bg-cloud text-body hover:text-navy'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Kurslar */}
            {(tab === 'all' || tab === 'courses') && foundCourses.length > 0 && (
              <div className="mt-10">
                <h3 className="mb-6 text-xl font-bold text-navy-title">Courses</h3>
                <div className="grid gap-7 sm:grid-cols-2">
                  {foundCourses.map((c) => (
                    <CourseCard key={c.slug} course={c} />
                  ))}
                </div>
              </div>
            )}

            {/* Kitoblar */}
            {(tab === 'all' || tab === 'books') && foundBooks.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 text-xl font-bold text-navy-title">Reading list</h3>
                <div className="no-scrollbar -mx-5 flex gap-5 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
                  {foundBooks.slice(0, 14).map((b, i) => (
                    <BookCard key={i} book={b} />
                  ))}
                </div>
              </div>
            )}

            {/* Maqolalar */}
            {(tab === 'all' || tab === 'articles') && foundPosts.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 text-xl font-bold text-navy-title">Articles</h3>
                <div className="flex flex-col gap-6">
                  {foundPosts.map((p) => (
                    <Link key={p.slug} to={`/blog/${p.slug}`} className="group flex gap-5 rounded-card p-3 transition hover:bg-cloud">
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className="h-[100px] w-[140px] shrink-0 rounded-soft object-cover"
                      />
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-teal">{p.tag}</span>
                        <h4 className="mt-1 line-clamp-2 font-semibold leading-snug text-navy-title group-hover:text-teal">
                          {p.title}
                        </h4>
                        <p className="mt-1 line-clamp-1 text-sm text-body">{p.excerpt}</p>
                        <p className="mt-1.5 text-xs text-lilac">{p.author} · {p.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {total === 0 && (
              <div className="mt-10 rounded-card bg-cloud py-20 text-center">
                <p className="text-lg font-medium text-navy">Hech narsa topilmadi</p>
                <p className="mt-2 text-body">Filtrlarni tozalang yoki boshqa so'z kiriting.</p>
                <button onClick={clear} className="btn-outline btn-sm mt-6 px-8">Filtrlarni tozalash</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
