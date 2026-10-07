import { Link } from 'react-router-dom';
import { readingCategories, blogMarketing } from '../data/content.js';
import { featuredPost as featured, blogPosts } from '../data/blog.js';
import { CardRow, CourseTile, RowHeader } from '../components/CourseBlocks.jsx';
import { RelatedBlogs } from '../components/BlogBlocks.jsx';

/**
 * Figma "Blog page" (34:89, 1920 kadr). fhd: da 1:1 —
 * hero (sky/20, 667px; matn x=114, rasm 779×527 x=978) · "Reading blog list" (4 × 356×327) ·
 * Related Blog (1268px) · Marketing Articles (4 × 374×617).
 */
const frame = 'shell fhd:max-w-[1920px] fhd:px-0';

export default function Blog() {
  return (
    <>
      {/* ---------- Hero: tanlangan maqola ---------- */}
      <section className="bg-sky/20 py-12 lg:py-16 fhd:mt-[2px] fhd:h-[667px] fhd:py-0">
        <div className={`${frame} grid items-center gap-10 lg:grid-cols-2 fhd:flex fhd:items-start fhd:justify-between fhd:pl-[114px] fhd:pr-[163px]`}>
          <div className="fhd:w-[688px] fhd:pt-[77px]">
            <p className="text-lg text-black sm:text-2xl fhd:leading-9">
              By {featured.publisher ?? featured.author} in{' '}
              <Link to={`/blog/all?category=${encodeURIComponent(featured.category)}`} className="font-bold text-teal hover:underline">
                {featured.category.toLowerCase()}
              </Link>
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.5] text-navy-title sm:text-[40px] fhd:ml-1 fhd:mt-6 fhd:w-[670px] fhd:text-[44px] fhd:leading-[66px]">
              {featured.title}
            </h1>
            <p className="mt-4 text-base leading-[1.8] tracking-[0.02em] text-body sm:text-xl sm:leading-[1.8] fhd:mt-[14px] fhd:w-[704px] fhd:text-2xl fhd:leading-[1.8]">
              {featured.excerpt}
            </p>
            <Link
              to={`/blog/${featured.slug}`}
              className="mt-8 flex h-[63px] w-[236px] items-center justify-center rounded-xl bg-teal text-base font-bold text-white transition hover:bg-teal-dark fhd:mt-6"
            >
              Start learning now
            </Link>
          </div>
          <Link
            to={`/blog/${featured.slug}`}
            className="group relative block overflow-hidden rounded-[20px] fhd:mt-[70px] fhd:h-[527px] fhd:w-[779px] fhd:shrink-0"
          >
            <img src={featured.image} alt="" className="aspect-[779/527] h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-navy-deep/10" />
          </Link>
        </div>
      </section>

      {/* ---------- Reading blog list ---------- */}
      <section className="py-14 lg:py-20 fhd:pb-[80px] fhd:pt-[80px]">
        <div className={`${frame} fhd:pl-[120px]`}>
          <h2 className="text-2xl font-bold leading-[1.5] text-black/80 fhd:text-[30px] fhd:leading-[45px]">Reading blog list</h2>
        </div>
        <div className={`${frame} mt-8 fhd:mt-[26px] fhd:pl-[110px]`}>
          <CardRow gap="gap-6 fhd:gap-[76px]">
            {readingCategories.map((c) => (
              <Link
                key={c.label}
                to={`/blog/all?category=${encodeURIComponent(c.label)}`}
                className="group relative block h-[280px] w-[260px] shrink-0 snap-start overflow-hidden rounded-[20px] lg:w-[calc((100%-72px)/4)] fhd:h-[327px] fhd:w-[356px]"
              >
                <img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-navy-deep/10" />
                <span className="absolute inset-x-[60px] bottom-[34px] flex h-[63px] items-center justify-center rounded-xl bg-white/70 text-xl font-bold text-black/80 sm:text-2xl">
                  {c.label}
                </span>
              </Link>
            ))}
          </CardRow>
        </div>
      </section>

      {/* Figma'da bu yerda yangiliklar ("Class adds $30 million…") turadi */}
      <RelatedBlogs posts={blogPosts.filter((p) => p.category === 'News')} />

      {/* ---------- Marketing Articles ---------- */}
      <section className="py-14 lg:py-20 fhd:pb-[171px] fhd:pt-[80px]">
        <div className={`${frame} fhd:pl-[120px] fhd:pr-[89px]`}>
          <RowHeader title="Marketing Articles" />
        </div>
        <div className={`${frame} mt-8 fhd:mt-[50px] fhd:pl-[137px]`}>
          <CardRow>
            {blogMarketing.map((c, i) => (
              <CourseTile key={i} course={c} />
            ))}
          </CardRow>
        </div>
      </section>
    </>
  );
}
