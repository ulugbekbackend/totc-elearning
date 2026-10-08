import { FaIcon } from './CourseBlocks.jsx';

/**
 * Figma "Literature course" (119:251) dagi sahifalash: 70px katakchalar, chetlarida teal/20 strelkalar,
 * faol sahifa — teal. Literature va blog ro'yxatida ishlatiladi.
 */
export default function Pagination({ page, setPage, pages = 5 }) {
  if (pages < 2) return null;
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
