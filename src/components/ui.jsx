import { Link } from 'react-router-dom';
import { IconStar, IconCheck } from './Icons.jsx';

/* ---------- Bo'lim sarlavhasi ---------- */
export function SectionHeading({
  eyebrow, title, subtitle, align = 'center', className = '', titleClassName = '', subtitleClassName = '',
}) {
  const a = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col ${a} ${className}`}>
      {eyebrow && (
        <span className="eyebrow mb-3 flex items-center gap-3">
          {align === 'left' && <span className="h-px w-10 bg-teal" />}
          {eyebrow}
        </span>
      )}
      <h2 className={`text-[32px] font-semibold leading-tight text-navy-title sm:text-[40px] lg:text-[45px] ${titleClassName}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-3xl text-lg leading-relaxed text-body ${align === 'center' ? 'mx-auto' : ''} ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ---------- Statistika bloki ---------- */
export function Stat({ value, label }) {
  return (
    <div className="text-center">
      {/* Figma: 300 og'irlik, #136CB5 → #49BBBD gradient */}
      <p className="bg-gradient-to-r from-[#136CB5] to-[#49BBBD] bg-clip-text text-[48px] font-light leading-none text-transparent sm:text-[64px] 2xl:text-[96px]">
        {value}
      </p>
      <p className="mt-2 whitespace-nowrap text-base text-[#010514]/80 sm:text-xl 2xl:text-[32px] 2xl:leading-[42px]">{label}</p>
    </div>
  );
}

/* ---------- Xususiyat kartasi (All-in-one) ---------- */
export function FeatureCard({ Icon, iconClass = 'bg-teal', title, text }) {
  return (
    <article className="group relative rounded-card bg-white px-8 pb-10 pt-16 text-center shadow-[0_10px_60px_rgba(38,45,118,0.08)] transition hover:-translate-y-1 fhd:h-[430px] fhd:px-[50px] fhd:pt-[122px]">
      <span
        className={`absolute -top-[42px] left-1/2 flex h-[84px] w-[84px] -translate-x-1/2 items-center justify-center rounded-full text-white shadow-[0_10px_40px_rgba(54,61,136,0.06)] 2xl:-top-[57px] 2xl:h-[100px] 2xl:w-[100px] ${iconClass}`}
      >
        <Icon className="h-9 w-9" />
      </span>
      {/* Figma (1920px): sarlavha Poppins 500 30/45, matn 20/36 */}
      <h3 className="mb-4 text-[22px] font-semibold leading-snug text-navy-title fhd:mb-6 fhd:text-[30px] fhd:font-medium fhd:leading-[45px]">{title}</h3>
      <p className="leading-relaxed text-body fhd:text-xl fhd:leading-9">{text}</p>
    </article>
  );
}

/* ---------- Kurs kartasi ---------- */
export function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition hover:-translate-y-1 hover:shadow-pop"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-pill bg-white/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal">
          {course.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex text-amber">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStar key={i} className={`h-4 w-4 ${i < Math.round(course.rating) ? '' : 'opacity-25'}`} />
            ))}
          </div>
          <span className="text-sm text-body">
            {course.rating.toFixed(1)} ({course.reviews})
          </span>
        </div>
        <h3 className="mb-2 text-lg font-semibold leading-snug text-navy-title group-hover:text-teal">
          {course.title}
        </h3>
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-body">{course.excerpt}</p>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <div className="flex items-center gap-2">
            <img src={course.authorAvatar} alt={course.author} className="h-8 w-8 rounded-full object-cover" />
            <span className="text-sm text-body">{course.author}</span>
          </div>
          <span className="text-lg font-bold text-teal">
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ---------- Kitob kartasi (Explore Course) ---------- */
export function BookCard({ book }) {
  return (
    <Link to="/courses/literature" className="group block w-[150px] shrink-0 sm:w-[175px]">
      <div className="relative overflow-hidden rounded-soft bg-cloud shadow-card transition group-hover:-translate-y-1.5 group-hover:shadow-pop">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          className="aspect-[2/3] w-full object-cover"
        />
      </div>
      <p className="mt-3 line-clamp-2 text-sm font-medium leading-snug text-navy-title group-hover:text-teal">
        {book.title}
      </p>
      <p className="text-xs text-body">{book.author}</p>
    </Link>
  );
}

/* ---------- Blog kartasi ---------- */
export function PostCard({ post, featured = false }) {
  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} className="group block">
        <div className="overflow-hidden rounded-card">
          <img
            src={post.image}
            alt={post.title}
            className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <span className="mt-6 inline-block rounded-pill bg-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal">
          {post.tag}
        </span>
        <h3 className="mt-4 text-2xl font-semibold leading-snug text-navy-title group-hover:text-teal lg:text-[28px]">
          {post.title}
        </h3>
        <p className="mt-3 leading-relaxed text-body">{post.excerpt}</p>
        <span className="mt-4 inline-block font-semibold text-teal">Read more →</span>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className="group flex gap-5">
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        className="h-[110px] w-[150px] shrink-0 rounded-soft object-cover sm:h-[130px] sm:w-[180px]"
      />
      <div className="min-w-0">
        <h4 className="line-clamp-2 font-semibold leading-snug text-navy-title group-hover:text-teal">
          {post.title}
        </h4>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-body">{post.excerpt}</p>
        <span className="mt-2 inline-block rounded-pill bg-cloud px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal">
          {post.tag}
        </span>
      </div>
    </Link>
  );
}

/* ---------- Narx kartasi ---------- */
export function PriceCard({ plan }) {
  return (
    <article
      className={`relative flex flex-col rounded-card p-8 transition lg:p-10 ${
        plan.highlight
          ? 'bg-teal text-white shadow-pop lg:-my-4 lg:py-14'
          : 'bg-white text-navy shadow-card'
      }`}
    >
      {plan.highlight && (
        <span className="absolute right-8 top-8 rounded-pill bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-wider">
          Popular
        </span>
      )}
      <h3 className={`text-xl font-semibold ${plan.highlight ? 'text-white' : 'text-navy-title'}`}>
        {plan.name}
      </h3>
      <p className={`mt-2 text-sm ${plan.highlight ? 'text-white/80' : 'text-body'}`}>
        {plan.tagline}
      </p>

      <p className="mt-6 flex items-end gap-1">
        <span className="text-[44px] font-bold leading-none">${plan.price}</span>
        <span className={plan.highlight ? 'text-white/80' : 'text-body'}>/{plan.period}</span>
      </p>

      <ul className="mt-8 flex flex-1 flex-col gap-3.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[15px]">
            <IconCheck
              className={`mt-0.5 h-5 w-5 shrink-0 ${plan.highlight ? 'text-white' : 'text-teal'}`}
            />
            <span className={plan.highlight ? 'text-white/90' : 'text-body'}>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/checkout"
        className={`btn btn-md mt-9 w-full ${
          plan.highlight ? 'bg-white text-teal hover:bg-white/90' : 'bg-teal text-white hover:bg-teal-dark'
        }`}
      >
        {plan.cta}
      </Link>
    </article>
  );
}

/* ---------- Avatar "pill" (Figmadagi ism yorlig'i) ---------- */
export function NamePill({ name, role, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill bg-white/90 px-3 py-1.5 text-xs font-medium text-navy shadow-sm backdrop-blur ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
      {name}
      {role && <span className="text-body">· {role}</span>}
    </span>
  );
}

/* ---------- Breadcrumb ---------- */
export function Breadcrumb({ items }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-lilac">/</span>}
          {it.to ? (
            <Link to={it.to} className="text-body transition hover:text-teal">
              {it.label}
            </Link>
          ) : (
            <span className="font-medium text-navy">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ---------- Sahifa sarlavhasi (ichki sahifalar uchun) ---------- */
export function PageHero({ title, subtitle, children, crumbs }) {
  return (
    <section className="relative overflow-hidden bg-teal pb-16 pt-12 text-white lg:pb-24 lg:pt-16">
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-32 left-10 h-64 w-64 rounded-full bg-white/10" />
      <div className="shell relative">
        {crumbs && (
          <div className="mb-6 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white">
            <Breadcrumb items={crumbs} />
          </div>
        )}
        <h1 className="max-w-3xl text-[34px] font-bold leading-tight text-white sm:text-[44px] lg:text-[52px]">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/85">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
