import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { posts, news } from '../data/content.js';
import { PageHero, PostCard } from '../components/ui.jsx';
import { IconSearch, IconClock } from '../components/Icons.jsx';

const tags = ['All', 'EDUCATION', 'TEACHING', 'PRODUCT', 'CULTURE'];

export default function Blog() {
  const [tag, setTag] = useState('All');
  const [q, setQ] = useState('');

  const [featured, ...rest] = posts;

  const list = useMemo(() => {
    let out = rest.filter((p) => tag === 'All' || p.tag === tag);
    if (q.trim()) {
      const n = q.toLowerCase();
      out = out.filter((p) => p.title.toLowerCase().includes(n) || p.excerpt.toLowerCase().includes(n));
    }
    return out;
  }, [tag, q]);

  return (
    <>
      <PageHero
        title="News, resources and things we learned the hard way"
        subtitle="Written by the teachers and engineers building TOTC."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]}
      >
        <div className="flex w-full max-w-xl items-center gap-3 rounded-pill bg-white p-2 shadow-float">
          <span className="pl-4 text-lilac"><IconSearch className="h-5 w-5" /></span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-navy outline-none placeholder:text-lilac"
          />
        </div>
      </PageHero>

      {/* Asosiy maqola */}
      <section className="shell py-14 lg:py-20">
        <Link to={`/blog/${featured.slug}`} className="group grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-card">
            <img
              src={featured.image}
              alt={featured.title}
              className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div>
            <span className="inline-block rounded-pill bg-teal/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-teal">
              {featured.tag}
            </span>
            <h2 className="mt-5 text-[28px] font-bold leading-tight text-navy-title group-hover:text-teal sm:text-[36px]">
              {featured.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-body">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-4 text-sm text-body">
              <span className="font-medium text-navy">{featured.author}</span>
              <span className="h-1 w-1 rounded-full bg-lilac" />
              <span>{featured.date}</span>
              <span className="h-1 w-1 rounded-full bg-lilac" />
              <span className="flex items-center gap-1.5">
                <IconClock className="h-4 w-4" /> {featured.readTime}
              </span>
            </div>
            <span className="mt-6 inline-block font-semibold text-teal">Read the article →</span>
          </div>
        </Link>
      </section>

      {/* Teglar + ro'yxat */}
      <section className="shell pb-16 lg:pb-24">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto border-b border-line px-5 pb-6 lg:mx-0 lg:px-0">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`shrink-0 rounded-pill px-6 py-2.5 text-sm font-medium transition ${
                tag === t ? 'bg-teal text-white' : 'bg-cloud text-body hover:bg-teal/10 hover:text-teal'
              }`}
            >
              {t === 'All' ? 'All' : t.charAt(0) + t.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <article key={p.slug} className="group flex flex-col">
              <Link to={`/blog/${p.slug}`} className="overflow-hidden rounded-card">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </Link>
              <span className="mt-5 inline-block self-start rounded-pill bg-cloud px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-teal">
                {p.tag}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-navy-title">
                <Link to={`/blog/${p.slug}`} className="transition group-hover:text-teal">{p.title}</Link>
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body">{p.excerpt}</p>
              <div className="mt-4 flex items-center gap-3 text-xs text-body">
                <span>{p.author}</span>
                <span className="h-1 w-1 rounded-full bg-lilac" />
                <span>{p.date}</span>
                <span className="h-1 w-1 rounded-full bg-lilac" />
                <span>{p.readTime}</span>
              </div>
            </article>
          ))}
        </div>

        {list.length === 0 && (
          <div className="rounded-card bg-cloud py-20 text-center">
            <p className="text-lg font-medium text-navy">Maqola topilmadi</p>
          </div>
        )}
      </section>

      {/* Press */}
      <section className="bg-cloud/60 py-14 lg:py-20">
        <div className="shell">
          <h2 className="text-2xl font-bold text-navy-title sm:text-3xl">In the press</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {news.slice(1).map((n) => (
              <PostCard key={n.slug} post={n} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
