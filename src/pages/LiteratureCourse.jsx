import { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images.js';
import { literatureAuthor as author, literatureTabs, literatureBooks } from '../data/content.js';
import { FaIcon } from '../components/CourseBlocks.jsx';
import { IconStarOutline, IconEye, IconPlayCircle } from '../components/Icons.jsx';

/**
 * Figma "Literature course" (119:251, 1920 kadr). fhd: da 1:1 —
 * banner 1679×415 (portret 338px, oq karta 1199×348) · 7 ta tab (183×63) ·
 * kitob kartalari 503×647 (3 ustun) · sahifalash (70px katakchalar).
 */
const frame = 'shell fhd:max-w-[1920px] fhd:px-0';

// socialTeal.svg ichidagi uchta doira (32px, oraliq 25px)
const socials = [
  { label: 'Twitter', x: 0 },
  { label: 'YouTube', x: 57 },
  { label: 'Instagram', x: 114 },
];

function AuthorBanner() {
  return (
    <section className="relative overflow-hidden rounded-[20px] p-5 sm:p-8 fhd:h-[415px] fhd:p-0">
      <img src={img.literatureHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute inset-0 bg-black/40" />

      <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:items-start fhd:block">
        {/* Portret — oq halqa 363px ichida 338px rasm */}
        <span className="flex h-[200px] w-[200px] shrink-0 items-center justify-center rounded-full bg-white sm:h-[260px] sm:w-[260px] fhd:absolute fhd:left-[50px] fhd:top-[26px] fhd:h-[363px] fhd:w-[363px]">
          <img src={author.photo} alt={author.name} className="h-[93%] w-[93%] rounded-full object-cover" />
        </span>

        <div className="relative w-full rounded-[20px] bg-white/80 p-6 sm:p-8 fhd:absolute fhd:left-[447px] fhd:top-[33px] fhd:h-[348px] fhd:w-[1199px] fhd:px-[50px] fhd:pb-0 fhd:pt-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h1 className="text-2xl font-medium leading-[1.5] tracking-[0.02em] text-black fhd:mt-[66px] fhd:text-[30px] fhd:leading-[45px]">
              {author.name}
            </h1>
            <Link
              to="/checkout"
              className="flex h-[63px] w-[183px] items-center justify-center rounded-xl bg-teal text-2xl font-bold text-white transition hover:bg-teal-dark fhd:-mr-[7px] fhd:mt-12"
            >
              Enroll Now
            </Link>
          </div>
          <p className="font-inter mt-1 text-lg leading-8 text-[#2d3436]/70 fhd:mt-[11px]">
            {author.role}
          </p>
          <p className="font-inter mt-3 text-lg leading-8 text-[#2d3436] sm:text-[25px] fhd:mt-6 fhd:w-[1091px]">
            {author.bio}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3 fhd:mt-[34px] fhd:gap-0">
            <span className="font-inter flex items-center gap-1 text-[15px] leading-8 text-[#2d3436]/80 fhd:ml-8 fhd:w-[299px]">
              <IconStarOutline className="h-5 w-5" /> {author.rating}
            </span>
            <span className="font-inter flex items-center gap-1.5 text-[15px] leading-8 text-[#2d3436]/80 fhd:w-[261px]">
              <IconEye className="h-5 w-5" /> {author.students}
            </span>
            <span className="font-inter flex items-center gap-1 text-[15px] leading-8 text-[#2d3436]/80">
              <IconPlayCircle className="h-5 w-5" /> Courses
            </span>
            <span className="relative ml-auto block h-8 w-[146px] fhd:-mr-[7px]">
              <img src="/figma/icons/socialTeal.svg" alt="" width="146" height="32" />
              {socials.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="absolute top-0 h-8 w-8 rounded-full" style={{ left: s.x }} />
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookCard({ book }) {
  return (
    <article className="rounded-[10px] bg-white p-5 shadow-[2px_2px_10px_2px_rgba(0,0,0,0.25)] fhd:h-[647px] fhd:w-[503px] fhd:px-[26.5px] fhd:pb-0 fhd:pt-[29.6px]">
      <img src={book.image} alt="" className="aspect-[451/519] w-full rounded-[10px] object-cover" />
      <div className="mt-5 flex items-start justify-between gap-3 fhd:mt-[25px]">
        <p className="text-xl tracking-[0.02em] text-black/80 fhd:mt-[3.4px] fhd:text-[25px] fhd:leading-[37.5px]">{book.title}</p>
        <p className="text-2xl font-extrabold tracking-[0.02em] text-teal/80 fhd:-mr-[1px] fhd:text-[30px] fhd:leading-[45px]">
          ${book.price}
        </p>
      </div>
    </article>
  );
}

function Pagination({ page, setPage, pages = 5 }) {
  const cell = 'flex h-[70px] w-[70px] items-center justify-center text-[30px] transition';
  return (
    <nav className="flex justify-center" aria-label="Pagination">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className={`${cell} bg-teal/20 text-teal hover:bg-teal/30`}
      >
        <FaIcon name="faAngleLeft" className="h-[26px] w-4" />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => setPage(n)}
          aria-current={n === page ? 'page' : undefined}
          className={`${cell} ${n === page ? 'bg-teal text-white' : 'bg-white/20 text-black hover:text-teal'}`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        aria-label="Next page"
        onClick={() => setPage((p) => Math.min(pages, p + 1))}
        className={`${cell} bg-teal/20 text-teal hover:bg-teal/30`}
      >
        <FaIcon name="faAngleRight" className="h-[26px] w-4" />
      </button>
    </nav>
  );
}

export default function LiteratureCourse() {
  const [tab, setTab] = useState('Book');
  const [page, setPage] = useState(3);

  return (
    <div className="pb-16 pt-6 fhd:pb-[52px] fhd:pt-0">
      <div className={`${frame} fhd:pl-[120px] fhd:pr-[121px]`}>
        <AuthorBanner />

        <div className="no-scrollbar -mx-5 mt-10 flex gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 fhd:mx-0 fhd:mt-[68px] fhd:gap-[26px] fhd:px-0">
          {literatureTabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`h-[63px] w-[150px] shrink-0 rounded-xl text-xl font-bold transition sm:w-[183px] fhd:text-2xl ${
                tab === t ? 'bg-teal text-white' : 'bg-[#bbb]/50 text-[#696969] hover:bg-[#bbb]/70'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-medium leading-[1.5] tracking-[0.02em] text-black fhd:mt-[68px] fhd:text-[30px] fhd:leading-[45px]">
          Literature course
        </h2>
      </div>

      <div className={`${frame} fhd:pl-[117px]`}>
        {tab === 'Book' ? (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 fhd:mt-[49px] fhd:grid-cols-[repeat(3,503px)] fhd:gap-x-[86.5px] fhd:gap-y-[87px]">
            {literatureBooks.map((b, i) => (
              <div key={i} className={i >= 3 ? 'fhd:ml-0.5' : ''}>
                <BookCard book={b} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-[20px] bg-sky/20 p-8 text-lg text-body fhd:mr-[121px]">
            {tab} materials for this course will appear here.
          </p>
        )}
      </div>

      {tab === 'Book' && (
        <div className="mt-12 fhd:mt-[52px]">
          <Pagination page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
}
