import { Link } from 'react-router-dom';
import { CardRow, RowHeader } from './CourseBlocks.jsx';
import { IconEyeSolid } from './Icons.jsx';

/**
 * Figma Blog (34:89) va Blog detail (30:64) dagi maqola kartasi va "Related Blog" bloki.
 * Karta 786×900 (fhd), `fluid` bo'lsa — ro'yxat (grid) uchun kenglik ota elementdan olinadi.
 */
export function BlogCard({ post, fluid = false }) {
  const size = fluid
    ? 'w-full'
    : 'w-[300px] shrink-0 snap-start sm:w-[440px] lg:w-[calc((100%-48px)/2)] fhd:h-[900px] fhd:w-[786px] fhd:px-[33.7px] fhd:pb-[69px] fhd:pt-[59.6px]';
  const href = `/blog/${post.slug}`;
  return (
    <article className={`flex flex-col rounded-[20px] bg-white p-5 shadow-[0_18.83px_47.08px_rgba(47,50,125,0.10)] ${size}`}>
      <Link to={href} className="group relative block aspect-[720/382] shrink-0 overflow-hidden rounded-[20px]">
        <img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute inset-0 bg-navy-deep/10" />
      </Link>
      <h3
        className={`mt-4 text-lg font-medium leading-[1.8] text-navy sm:text-[22px] ${
          fluid ? 'line-clamp-2' : 'fhd:mt-[12.7px] fhd:h-[94px] fhd:w-[685px] fhd:text-[26px]'
        }`}
      >
        <Link to={href} className="transition hover:text-teal">
          {post.title}
        </Link>
      </h3>
      <div className={`mt-4 flex items-center gap-4 ${fluid ? '' : 'fhd:ml-[23.6px] fhd:mt-[26.6px] fhd:gap-[17px]'}`}>
        <img src={post.avatar} alt="" className={`h-14 w-14 rounded-full bg-[#d9d9d9] object-cover ${fluid ? '' : 'fhd:h-[71px] fhd:w-[71px]'}`} />
        <span className="text-lg font-medium tracking-[0.02em] text-black">{post.author}</span>
      </div>
      <p
        className={`mt-4 line-clamp-2 text-base leading-[1.8] tracking-[0.02em] text-body sm:text-xl sm:leading-[1.8] ${
          fluid ? '' : 'fhd:mt-[23.5px] fhd:h-[81px] fhd:w-[685px]'
        }`}
      >
        {post.excerpt}
      </p>
      <div className={`mt-auto flex items-center justify-between pt-6 text-base leading-[1.8] tracking-[0.02em] text-body sm:text-xl sm:leading-[1.8] ${fluid ? '' : 'fhd:pt-[45px]'}`}>
        <Link to={href} className="underline transition hover:text-teal">
          Read more
        </Link>
        <span className="flex items-center gap-[26px]" title={`${post.viewsLabel} views`}>
          <IconEyeSolid className="h-5 w-[22px] text-teal" />
          <span className="min-w-[91px]">{post.viewsLabel}</span>
        </span>
      </div>
    </article>
  );
}

const frame = 'shell fhd:max-w-[1920px] fhd:px-0';

/**
 * "Related Blog": sky/20 fon (1268px), 786px kartalar (oraliq 99px). 1920 da Figma'dagidek ikkitasi
 * ko'rinadi, qolganlari strelkalar bilan aylantiriladi. `titleTop` — sahifaga qarab (Blog 93, detail 79).
 */
export function RelatedBlogs({ posts, title = 'Related Blog', seeAllTo = '/blog/all', titleTop = 'fhd:pt-[93px]' }) {
  if (!posts.length) return null;
  return (
    <section className={`bg-sky/20 py-14 lg:py-20 fhd:h-[1268px] fhd:overflow-hidden fhd:pb-0 ${titleTop}`}>
      <div className={`${frame} fhd:pl-[120px] fhd:pr-[151px]`}>
        <RowHeader title={title} to={seeAllTo} className="fhd:items-start" linkClassName="fhd:mt-1" />
      </div>
      <div className={`${frame} mt-8 fhd:mt-[37px] fhd:pl-[116px] fhd:pr-[83px]`}>
        <CardRow
          arrows
          scrollFhd
          gap="gap-6 fhd:gap-[99px]"
          arrowsClassName="-mt-4 fhd:mr-[54px] fhd:mt-[33px]"
        >
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </CardRow>
      </div>
    </section>
  );
}
