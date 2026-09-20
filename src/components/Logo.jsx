import { Link } from 'react-router-dom';

/**
 * Figmadagi logo: 83×83 romb (Polygon 2, Figmadan eksport) + "TOTC" (Poppins 700 32px),
 * yozuv rombning 22px ichidan boshlanadi — "T" romb ichida turadi.
 * O'lchamlar `--h` (romb balandligi) ga nisbatan: 44px → lg 56px → 2xl 83px (Figma, `large` bo'lsa).
 *
 * tone:    'light' — oq yozuv (hero ustida, footer), 'dark' — navy yozuv
 * diamond: 'nav' — #00FFF0 (hero ustidagi navbar), 'teal' — #49BBBD
 */
export default function Logo({ tone = 'dark', diamond, withTagline = false, large = true, className = '' }) {
  const text = tone === 'light' ? 'text-white' : 'text-navy';
  const src = (diamond ?? (tone === 'light' ? 'nav' : 'teal')) === 'nav'
    ? '/figma/icons/logoDiamondNav.svg'
    : '/figma/icons/logoDiamondTeal.svg';

  return (
    <Link
      to="/"
      aria-label="TOTC — Home"
      className={`inline-flex items-center [--h:44px] lg:[--h:56px] ${large ? '2xl:[--h:83px]' : ''} ${className}`}
    >
      <span className="relative inline-flex shrink-0 items-center" style={{ height: 'var(--h)' }}>
        <img src={src} alt="" className="h-full w-auto" style={{ width: 'var(--h)' }} />
        <span
          className={`absolute font-bold leading-none ${text}`}
          style={{ left: 'calc(var(--h) * 22 / 83)', fontSize: 'calc(var(--h) * 32 / 83)' }}
        >
          TOTC
        </span>
        {/* "TOTC" romb chegarasidan chiqib turadi — joy ajratish uchun */}
        <span aria-hidden="true" style={{ width: 'calc(var(--h) * 31 / 83)' }} />
      </span>

      {withTagline && (
        <>
          <span
            className="hidden w-px bg-[#626381] sm:block"
            style={{ height: 'var(--h)', margin: '0 calc(var(--h) * 41 / 83)' }}
          />
          <span
            className={`hidden max-w-[160px] font-semibold leading-[1.5] sm:block ${tone === 'light' ? 'text-white' : 'text-body'}`}
            style={{ fontSize: 'calc(var(--h) * 22 / 83)' }}
          >
            Virtual Class
            <br />
            for Zoom
          </span>
        </>
      )}
    </Link>
  );
}
