import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import img from '../assets/images.js';
import { posts, news, blogFeatured, blogBody, blogTags } from '../data/content.js';
import { RelatedBlogs } from '../components/BlogBlocks.jsx';

/**
 * Figma "Blog detail" (30:64, 1920×3568). fhd: da 1:1 —
 * hero rasm 652px · sarlavha 44px (x=120) · uchta paragraf guruhi (24/1.8, 1681px) · teglar ·
 * 0.5px chiziq · muallif + "Follow" · Related Blog (1268px).
 * Figma'da birinchi paragraf kadrdan chapga chiqib ketgan (x=-72) — bu yerda x=120 ga tekislangan.
 */
const frame = 'shell fhd:max-w-[1920px] fhd:px-0';

export default function BlogDetail() {
  const { slug } = useParams();
  const post = [...posts, ...news].find((p) => p.slug === slug);
  const [following, setFollowing] = useState(false);
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <section className="relative h-[280px] bg-teal sm:h-[420px] fhd:h-[652px]">
        <img src={img.blogHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute inset-0 bg-black/20" />
      </section>

      <article className="py-12 lg:py-16 fhd:pb-[30px] fhd:pt-[80px]">
        <div className={`${frame} fhd:pl-[120px] fhd:pr-[119px]`}>
          <h1 className="text-3xl font-semibold leading-[1.5] text-navy-title sm:text-[40px] fhd:text-[44px] fhd:leading-[79.2px]">
            {blogFeatured.title}
          </h1>

          <div className="text-base leading-[1.8] tracking-[0.02em] text-body sm:text-xl sm:leading-[1.8] fhd:text-2xl fhd:leading-[1.8]">
            {blogBody.map((group, i) => (
              <div key={i} className={i === 0 ? 'mt-5' : i === 1 ? 'mt-[30px]' : 'mt-[29px]'}>
                {group.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          <ul className="mt-6 flex flex-wrap gap-[35px] fhd:mt-[25px]">
            {blogTags.map((t) => (
              <li key={t}>
                <a href="#" className="flex h-[49px] w-[136px] items-center justify-center rounded-[36px] bg-teal/10 text-base text-body transition hover:bg-teal/20">
                  {t}
                </a>
              </li>
            ))}
          </ul>

          <hr className="mt-8 h-[0.5px] border-0 bg-body fhd:mt-[31px]" />

          <div className="mt-[30px] flex items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <img src={img.avatarLina} alt="" className="h-[77px] w-[77px] rounded-md bg-[#d9d9d9] object-cover" />
              <div className="-mt-1.5">
                <p className="text-xs font-medium tracking-[0.02em] text-body">Written by</p>
                <p className="mt-1.5 text-lg font-medium tracking-[0.02em] text-black">Lina</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFollowing((v) => !v)}
              className={`h-[49px] w-[160px] rounded-[10px] border border-teal text-base font-bold transition sm:w-[232px] fhd:mr-[14px] fhd:mt-2 ${
                following ? 'bg-teal text-white' : 'text-teal hover:bg-teal/10'
              }`}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
      </article>

      <RelatedBlogs titleTop="fhd:pt-[79px]" />
    </>
  );
}
