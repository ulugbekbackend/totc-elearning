import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { findPost, relatedPosts } from '../data/blog.js';
import { RelatedBlogs } from '../components/BlogBlocks.jsx';

/**
 * Figma "Blog detail" (30:64, 1920×3568). fhd: da 1:1 —
 * hero rasm 652px · sarlavha 44px (x=120) · paragraf guruhlari (24/1.8, 1681px, oraliq 30px) · teglar ·
 * 0.5px chiziq · muallif + "Follow" · Related Blog (1268px).
 * Figma'da birinchi paragraf kadrdan chapga chiqib ketgan (x=-72) — bu yerda x=120 ga tekislangan.
 */
const frame = 'shell fhd:max-w-[1920px] fhd:px-0';

// "Follow" holati brauzerda saqlanadi (backend yo'q) — muallif bo'yicha
const followKey = (author) => `totc.follow.${author}`;
const readFollow = (author) => {
  try {
    return localStorage.getItem(followKey(author)) === '1';
  } catch {
    return false;
  }
};

export default function BlogDetail() {
  const { slug } = useParams();
  const post = findPost(slug);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (post) setFollowing(readFollow(post.author));
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const toggleFollow = () => {
    const next = !following;
    setFollowing(next);
    try {
      if (next) localStorage.setItem(followKey(post.author), '1');
      else localStorage.removeItem(followKey(post.author));
    } catch {
      /* saqlab bo'lmasa ham tugma ishlayveradi */
    }
  };

  return (
    <>
      <section className="relative h-[280px] bg-teal sm:h-[420px] fhd:h-[652px]">
        <img src={post.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute inset-0 bg-black/20" />
      </section>

      <article className="py-12 lg:py-16 fhd:pb-[30px] fhd:pt-[80px]">
        <div className={`${frame} fhd:pl-[120px] fhd:pr-[119px]`}>
          <h1 className="text-3xl font-semibold leading-[1.5] text-navy-title sm:text-[40px] fhd:text-[44px] fhd:leading-[79.2px]">
            {post.title}
          </h1>

          <div className="text-base leading-[1.8] tracking-[0.02em] text-body sm:text-xl sm:leading-[1.8] fhd:text-2xl fhd:leading-[1.8]">
            {post.body.map((group, i) => (
              <div key={i} className={i === 0 ? 'mt-5' : i === 1 ? 'mt-[30px]' : 'mt-[29px]'}>
                {group.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          <ul className="mt-6 flex flex-wrap gap-[35px] fhd:mt-[25px]">
            {post.tags.map((t) => (
              <li key={t}>
                <Link
                  to={`/blog/all?q=${encodeURIComponent(t)}`}
                  className="flex h-[49px] min-w-[136px] items-center justify-center rounded-[36px] bg-teal/10 px-5 text-base text-body transition hover:bg-teal/20"
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="mt-8 h-[0.5px] border-0 bg-body fhd:mt-[31px]" />

          <div className="mt-[30px] flex items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <img src={post.avatar} alt="" className="h-[77px] w-[77px] rounded-md bg-[#d9d9d9] object-cover" />
              <div className="-mt-1.5">
                <p className="text-xs font-medium tracking-[0.02em] text-body">
                  Written by · {post.date}
                </p>
                <p className="mt-1.5 text-lg font-medium tracking-[0.02em] text-black">{post.author}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleFollow}
              aria-pressed={following}
              className={`h-[49px] w-[160px] rounded-[10px] border border-teal text-base font-bold transition sm:w-[232px] fhd:mr-[14px] fhd:mt-2 ${
                following ? 'bg-teal text-white' : 'text-teal hover:bg-teal/10'
              }`}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
      </article>

      <RelatedBlogs posts={relatedPosts(post)} titleTop="fhd:pt-[79px]" />
    </>
  );
}
