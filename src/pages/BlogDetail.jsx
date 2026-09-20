import { useParams, Link, Navigate } from 'react-router-dom';
import { posts, news } from '../data/content.js';
import { Breadcrumb, PostCard } from '../components/ui.jsx';
import {
  IconClock, IconFacebook, IconTwitter, IconTelegram, IconWhatsapp,
} from '../components/Icons.jsx';

const body = [
  {
    type: 'p',
    text: 'Two years ago, hybrid teaching was a contingency plan. Today it is a line item in the timetable — and the schools that treat it as a first-class format rather than a fallback are the ones whose students stay engaged.',
  },
  { type: 'h2', text: 'What changed' },
  {
    type: 'p',
    text: 'The first wave of remote teaching was a straight port: the same lecture, delivered through a webcam. Attendance held up for a term and then collapsed. What worked instead was rebuilding the session around the things a video call is genuinely good at — small rooms, instant polls, private side-channels with a struggling student.',
  },
  {
    type: 'quote',
    text: 'The lecture was never the valuable part. The valuable part was the twenty minutes afterwards, and that is the part we finally learned to schedule.',
    cite: 'Head of Learning Design, a UK sixth-form college',
  },
  { type: 'h2', text: 'Three things worth copying' },
  {
    type: 'list',
    items: [
      'Split the hour: 20 minutes of instruction, 25 of group work, 15 of review. Nobody watches a talking head for an hour.',
      'Give every room a visible task and a deadline. Ambiguity is what kills breakout rooms, not the technology.',
      'Record everything, but write a two-line summary of each recording. Nobody scrubs through 50 minutes of video.',
    ],
  },
  {
    type: 'p',
    text: 'None of this needs new software. It needs a timetable that admits the format has different rhythms, and a teacher who is allowed to stop talking.',
  },
  { type: 'h2', text: 'What we are still getting wrong' },
  {
    type: 'p',
    text: 'Assessment. Live quizzes are easy; meaningful assessment at distance is not. The honest answer is that most institutions have moved to more frequent, lower-stakes checks — and have quietly accepted that the final exam matters less than it did. Whether that is a loss or a correction is an argument worth having openly rather than by default.',
  },
];

export default function BlogDetail() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug) || news.find((n) => n.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* Sarlavha */}
      <section className="shell pt-10 lg:pt-14">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.tag }]} />

        <div className="mx-auto mt-8 max-w-3xl text-center">
          <span className="inline-block rounded-pill bg-teal/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-teal">
            {post.tag}
          </span>
          <h1 className="mt-6 text-[30px] font-bold leading-tight text-navy-title sm:text-[42px]">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-body">
            <span className="font-medium text-navy">{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-lilac" />
            <span>{post.date}</span>
            {post.readTime && (
              <>
                <span className="h-1 w-1 rounded-full bg-lilac" />
                <span className="flex items-center gap-1.5">
                  <IconClock className="h-4 w-4" /> {post.readTime}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-card">
          <img src={post.image} alt={post.title} className="aspect-[21/9] w-full object-cover" />
        </div>
      </section>

      {/* Matn */}
      <section className="shell py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_260px]">
          <article className="mx-auto max-w-3xl">
            <p className="text-xl leading-relaxed text-navy">{post.excerpt}</p>

            <div className="mt-8 flex flex-col gap-6">
              {body.map((b, i) => {
                if (b.type === 'h2')
                  return (
                    <h2 key={i} className="mt-4 text-2xl font-bold text-navy-title sm:text-[28px]">
                      {b.text}
                    </h2>
                  );
                if (b.type === 'quote')
                  return (
                    <blockquote key={i} className="rounded-card border-l-[6px] border-teal bg-cloud p-7">
                      <p className="text-lg italic leading-relaxed text-navy">“{b.text}”</p>
                      <footer className="mt-3 text-sm text-body">— {b.cite}</footer>
                    </blockquote>
                  );
                if (b.type === 'list')
                  return (
                    <ul key={i} className="flex flex-col gap-3">
                      {b.items.map((it) => (
                        <li key={it} className="flex gap-3 leading-relaxed text-body">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  );
                return (
                  <p key={i} className="text-lg leading-relaxed text-body">
                    {b.text}
                  </p>
                );
              })}
            </div>

            {/* Ulashish */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-y border-line py-7">
              <span className="font-medium text-navy">Share this article</span>
              <div className="flex gap-3">
                {[IconFacebook, IconTwitter, IconTelegram, IconWhatsapp].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-cloud text-body transition hover:bg-teal hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Muallif */}
            <div className="mt-10 flex flex-col gap-5 rounded-card bg-cloud p-7 sm:flex-row">
              <img
                src={post.image}
                alt={post.author}
                className="h-20 w-20 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold text-navy-title">{post.author}</p>
                <p className="text-sm text-teal">Writes about teaching and learning design</p>
                <p className="mt-3 leading-relaxed text-body">
                  Fifteen years in classrooms, four of them remote. Currently helping schools make
                  the hybrid timetable work without burning out their staff.
                </p>
              </div>
            </div>
          </article>

          {/* Yon panel */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-8">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-wider text-lilac">On this page</p>
                <ul className="flex flex-col gap-2.5 border-l-2 border-line pl-4 text-sm">
                  {body.filter((b) => b.type === 'h2').map((h) => (
                    <li key={h.text}>
                      <a href="#" className="text-body transition hover:text-teal">{h.text}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-card bg-teal p-6 text-white">
                <p className="font-semibold">Get the newsletter</p>
                <p className="mt-2 text-sm text-white/85">One email a month. Only what we actually learned.</p>
                <input
                  placeholder="Your email"
                  className="mt-4 w-full rounded-pill border border-white/25 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-white"
                />
                <button className="btn btn-sm mt-3 w-full bg-white text-teal hover:bg-white/90">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Tegishli maqolalar */}
      <section className="bg-cloud/60 py-14 lg:py-20">
        <div className="shell">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-navy-title sm:text-3xl">Keep reading</h2>
            <Link to="/blog" className="font-semibold text-teal hover:underline">All articles →</Link>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <article key={p.slug} className="group flex flex-col">
                <Link to={`/blog/${p.slug}`} className="overflow-hidden rounded-card">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>
                <h3 className="mt-5 text-lg font-semibold leading-snug text-navy-title">
                  <Link to={`/blog/${p.slug}`} className="transition group-hover:text-teal">{p.title}</Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
