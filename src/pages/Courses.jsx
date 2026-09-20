import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { courses, courseCategories, bookShelves } from '../data/content.js';
import { CourseCard, BookCard, PageHero, SectionHeading } from '../components/ui.jsx';
import { IconSearch, IconPalette, IconGlobe, IconRibbon } from '../components/Icons.jsx';

const shelfIcons = { palette: IconPalette, globe: IconGlobe, ribbon: IconRibbon };

export default function Courses() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('popular');

  const list = useMemo(() => {
    let out = courses.filter((c) => (cat === 'All' || c.category === cat));
    if (q.trim()) {
      const needle = q.toLowerCase();
      out = out.filter(
        (c) => c.title.toLowerCase().includes(needle) || c.excerpt.toLowerCase().includes(needle)
      );
    }
    if (sort === 'price') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating);
    if (sort === 'popular') out = [...out].sort((a, b) => b.reviews - a.reviews);
    return out;
  }, [cat, q, sort]);

  return (
    <>
      <PageHero
        title="Find the course that fits your term"
        subtitle="Everything from first-year foundations to specialist electives — taught live, recorded for later."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Courses' }]}
      >
        <div className="flex w-full max-w-2xl items-center gap-3 rounded-pill bg-white p-2 shadow-float">
          <span className="pl-4 text-lilac">
            <IconSearch className="h-5 w-5" />
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses, topics or instructors"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-navy outline-none placeholder:text-lilac"
          />
          <Link to="/search" className="btn-primary btn-sm shrink-0 px-7">
            Search
          </Link>
        </div>
      </PageHero>

      <section className="shell py-14 lg:py-20">
        {/* Filtrlar */}
        <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:px-0">
            {courseCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-pill px-6 py-2.5 text-sm font-medium transition ${
                  cat === c ? 'bg-teal text-white' : 'bg-cloud text-body hover:bg-teal/10 hover:text-teal'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="shrink-0 text-sm text-body">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-soft border border-line bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-teal"
            >
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="price">Lowest price</option>
            </select>
          </div>
        </div>

        <p className="mt-6 text-body">
          <span className="font-semibold text-navy">{list.length}</span> ta kurs topildi
        </p>

        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>

        {list.length === 0 && (
          <div className="rounded-card bg-cloud py-20 text-center">
            <p className="text-lg font-medium text-navy">Hech narsa topilmadi</p>
            <p className="mt-2 text-body">Boshqa kalit so'z yoki kategoriya bilan urinib ko'ring.</p>
          </div>
        )}
      </section>

      {/* Kitob javonlari */}
      <section className="bg-cloud/60 py-16 lg:py-24">
        <div className="shell">
          <SectionHeading
            align="left"
            eyebrow="Reading lists"
            title="Browse our shelves"
          />
          <div className="mt-12 flex flex-col gap-14">
            {bookShelves.map((shelf) => {
              const Icon = shelfIcons[shelf.icon];
              return (
                <div key={shelf.title}>
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="flex items-center gap-3 text-xl font-semibold text-navy-title sm:text-2xl">
                      <Icon className="h-7 w-7 text-body" />
                      {shelf.title}
                    </h3>
                    <Link
                      to="/search"
                      className="rounded-pill border border-teal px-6 py-2 text-sm font-medium text-teal transition hover:bg-teal hover:text-white"
                    >
                      See all
                    </Link>
                  </div>
                  <div className="no-scrollbar -mx-5 flex gap-5 overflow-x-auto px-5 pb-2">
                    {shelf.books.map((b, i) => (
                      <BookCard key={i} book={b} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
