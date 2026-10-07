import { Link } from 'react-router-dom';
import { relatedBlogs } from '../data/content.js';
import { CardRow, RowHeader } from './CourseBlocks.jsx';
import { IconEyeSolid } from './Icons.jsx';

/**
 * Figma Blog (34:89) va Blog detail (30:64) dagi umumiy "Related Blog" bloki:
 * sky/20 fon (1268px), ikki karta 786×900 (oraliq 99px), pastda o'ngda strelkalar.
 * Sahifalar orasidagi farq — sarlavha va strelkalarning yuqori chekinishi (`titleTop`, `arrowsTop`).
 */
export function BlogCard({ post }) {
  return (
    <article className="flex w-[300px] shrink-0 snap-start flex-col rounded-[20px] bg-white p-5 shadow-[0_18.83px_47.08px_rgba(47,50,125,0.10)] sm:w-[440px] lg:w-[calc((100%-48px)/2)] fhd:h-[900px] fhd:w-[786px] fhd:px-[33.7px] fhd:pb-0 fhd:pt-[59.6px]">
      <Link to={`/blog/${post.slug}`} className="group relative block aspect-[720/382] shrink-0 overflow-hidden rounded-[20px]">
        <img src={post.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute inset-0 bg-navy-deep/10" />
      </Link>
      <h3 className="mt-4 text-lg font-medium leading-[1.8] text-navy sm:text-[22px] fhd:mt-[12.7px] fhd:w-[685px] fhd:text-[26px]">
        <Link to={`/blog/${post.slug}`} className="transition hover:text-teal">
          {post.title}
        </Link>
      </h3>
      <div className="mt-4 flex items-center gap-4 fhd:ml-[23.6px] fhd:mt-[26.6px] fhd:gap-[17px]">
        <img src={post.avatar} alt="" className="h-14 w-14 rounded-full bg-[#d9d9d9] object-cover fhd:h-[71px] fhd:w-[71px]" />
        <span className="text-lg font-medium tracking-[0.02em] text-black">{post.author}</span>
      </div>
      <p className="mt-4 text-base leading-[1.8] tracking-[0.02em] text-body sm:text-xl sm:leading-[1.8] fhd:mt-[23.5px] fhd:h-[81px] fhd:w-[685px]">{post.excerpt}</p>
      <div className="mt-6 flex items-center justify-between text-base leading-[1.8] tracking-[0.02em] text-body sm:text-xl sm:leading-[1.8] fhd:mt-[45px]">
        <Link to={`/blog/${post.slug}`} className="underline transition hover:text-teal">
          Read more
        </Link>
        <span className="flex items-center gap-[26px]">
          <IconEyeSolid className="h-5 w-[22px] text-teal" />
          <span className="min-w-[91px]">{post.views}</span>
        </span>
      </div>
    </article>
  );
}

const frame = 'shell fhd:max-w-[1920px] fhd:px-0';

export function RelatedBlogs({ className = '', titleTop = 'fhd:pt-[93px]', cardsTop = 'fhd:mt-[41px]', arrowsTop = 'fhd:mt-[73px]' }) {
  return (
    <section className={`bg-sky/20 py-14 lg:py-20 fhd:h-[1268px] fhd:pb-0 ${titleTop} ${className}`}>
      <div className={`${frame} fhd:pl-[120px] fhd:pr-[151px]`}>
        <RowHeader title="Related Blog" to="/blog" className="fhd:items-start" linkClassName="fhd:mt-1" />
      </div>
      <div className={`${frame} mt-8 fhd:pl-[116px] fhd:pr-[133px] ${cardsTop}`}>
        <CardRow arrows gap="gap-6 fhd:gap-[99px]" arrowsClassName={`-mt-4 fhd:mr-[4px] ${arrowsTop}`}>
          {relatedBlogs.map((p, i) => (
            <BlogCard key={i} post={p} />
          ))}
        </CardRow>
      </div>
    </section>
  );
}
