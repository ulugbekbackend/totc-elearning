import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { blogPosts, blogCategories } from '../data/blog.js';
import { BlogCard } from '../components/BlogBlocks.jsx';
import Pagination from '../components/Pagination.jsx';
import { IconSearch } from '../components/Icons.jsx';

/**
 * "Barcha maqolalar" — Figma'da alohida ekran yo'q; Blog sahifalarining ranglari, kartasi (BlogCard)
 * va Literature'dagi sahifalash bilan yig'ilgan. Filtrlar URL'da: ?category=React&q=hooks&page=2
 */
const PER_PAGE = 6;
const frame = 'shell fhd:max-w-[1920px] fhd:px-[120px]';

export default function BlogList() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') ?? '';
  const q = params.get('q') ?? '';

  // Brauzerdagi joriy URL'dan hisoblanadi: React Router 7 da `prev` ham oxirgi render qiymati,
  // shuning uchun tez ketma-ket o'zgarishlarda (filtr → qidiruv) eski filtr qaytib kelardi
  const update = (patch) => {
    const next = new URLSearchParams(window.location.search);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    if (!('page' in patch)) next.delete('page');
    setParams(next, { replace: 'q' in patch });
  };

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return blogPosts.filter(
      (p) =>
        (!category || p.category === category) &&
        (!needle ||
          [p.title, p.excerpt, p.author, p.category, ...p.tags].some((s) => s.toLowerCase().includes(needle)))
    );
  }, [category, q]);

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const page = Math.min(pages, Math.max(1, Number(params.get('page')) || 1));
  const shown = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const pill = (active) =>
    `h-[49px] shrink-0 rounded-[36px] px-6 text-base transition ${
      active ? 'bg-teal font-semibold text-white' : 'bg-teal/10 text-body hover:bg-teal/20'
    }`;

  return (
    <>
      <section className="bg-sky/20 py-12 lg:py-16">
        <div className={frame}>
          <h1 className="text-3xl font-semibold leading-[1.5] text-navy-title sm:text-[40px] fhd:text-[44px]">All articles</h1>
          <p className="mt-3 max-w-2xl text-lg leading-[1.8] text-body">
            Ideas, guides and news from teachers and engineers building better online classrooms.
          </p>

          <label className="mt-8 flex h-[60px] max-w-[640px] items-center gap-3 rounded-[80px] border border-[#83839a]/60 bg-white px-6 focus-within:border-teal focus-within:ring-4 focus-within:ring-teal/15">
            <IconSearch className="h-5 w-5 shrink-0 text-lilac" />
            <input
              type="search"
              value={q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Search articles, tags or authors"
              className="min-w-0 flex-1 bg-transparent text-lg text-navy outline-none placeholder:text-lilac"
            />
          </label>

          <div className="no-scrollbar -mx-5 mt-6 flex gap-3 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0">
            <button type="button" onClick={() => update({ category: '' })} className={pill(!category)}>
              All
            </button>
            {blogCategories.map((c) => (
              <button key={c} type="button" onClick={() => update({ category: c })} className={pill(category === c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 fhd:pb-[100px]">
        <div className={frame}>
          <p className="text-body">
            <span className="font-semibold text-navy">{list.length}</span> article{list.length === 1 ? '' : 's'}
            {category && <> in <span className="font-semibold text-teal">{category}</span></>}
            {q && <> matching “<span className="font-semibold text-navy">{q}</span>”</>}
          </p>

          {shown.length ? (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-3 fhd:gap-[50px]">
              {shown.map((p) => (
                <BlogCard key={p.slug} post={p} fluid />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[20px] bg-sky/20 px-6 py-20 text-center">
              <p className="text-xl font-semibold text-navy">No articles found</p>
              <p className="mt-2 text-body">Try another keyword or category.</p>
              <button type="button" onClick={() => setParams({})} className="mt-6 h-[49px] rounded-xl bg-teal px-8 font-bold text-white transition hover:bg-teal-dark">
                Clear filters
              </button>
            </div>
          )}

          <div className="mt-12">
            <Pagination
              page={page}
              pages={pages}
              setPage={(v) => {
                update({ page: String(typeof v === 'function' ? v(page) : v) });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
