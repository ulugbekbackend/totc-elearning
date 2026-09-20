import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import { IconMenu, IconClose } from './Icons.jsx';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/courses', label: 'Courses' },
  { to: '/membership', label: 'Careers' },
  { to: '/blog', label: 'Blog' },
  { to: '/search', label: 'About Us' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();

  // Landing sahifada navbar hero ustida shaffof turadi
  const overlay = pathname === '/';

  useEffect(() => {
    if (!overlay) return setSolid(true);
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlay]);

  useEffect(() => setOpen(false), [pathname]);

  const light = overlay && !solid;
  // Figma o'lchami (143px, 83px logo, 22px menyu) faqat hero ustidagi shaffof holatda;
  // oq (sticky) navbar ixcham qoladi — ekranning katta qismini egallamaydi.
  const big = light ? '2xl' : 'none';

  return (
    <header
      className={`${overlay ? 'fixed inset-x-0' : 'sticky'} top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-white/95 shadow-[0_2px_20px_rgba(37,38,65,0.07)] backdrop-blur' : 'bg-transparent'
      }`}
    >
      {/* Figma (1920px): x=121…1786; balandlik 143px — faqat hero ustida */}
      <div
        className={`shell flex h-20 items-center justify-between transition-[height] duration-300 lg:h-24 2xl:max-w-[1920px] 2xl:pl-[121px] 2xl:pr-[134px] ${
          big === '2xl' ? '2xl:h-[143px]' : ''
        }`}
      >
        <Logo tone={light ? 'light' : 'dark'} large={big === '2xl'} />

        <nav className="hidden items-center gap-8 lg:flex xl:gap-12 2xl:gap-[80px]">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `relative text-base transition-colors ${big === '2xl' ? '2xl:text-[22px]' : ''} ${
                  light ? 'text-white hover:text-white/80' : 'text-navy hover:text-teal'
                } ${isActive ? 'after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-current' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex 2xl:gap-[26px]">
          <Link
            to="/login"
            className={`btn btn-sm px-8 ${big === '2xl' ? '2xl:h-[60px] 2xl:w-[160px] 2xl:text-[22px]' : ''} ${light ? 'bg-white text-muted shadow-[0_20px_24px_rgba(0,0,0,0.03)] hover:bg-white/90' : 'border-2 border-teal text-teal hover:bg-teal hover:text-white'}`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`btn btn-sm px-8 ${big === '2xl' ? '2xl:h-[60px] 2xl:w-[160px] 2xl:text-[22px]' : ''} ${light ? 'bg-white/30 text-white shadow-[0_20px_24px_rgba(0,0,0,0.03)] backdrop-blur-sm hover:bg-white/40' : 'bg-teal text-white hover:bg-teal-dark'}`}
          >
            Sign Up
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className={`lg:hidden ${light ? 'text-white' : 'text-navy'}`}
        >
          {open ? <IconClose className="h-7 w-7" /> : <IconMenu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobil menyu */}
      {open && (
        <div className="border-t border-line bg-white px-5 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `rounded-soft px-4 py-3 text-base font-medium ${
                    isActive ? 'bg-teal/10 text-teal' : 'text-navy hover:bg-cloud'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex gap-3">
            <Link to="/login" className="btn-outline btn-sm flex-1">Login</Link>
            <Link to="/register" className="btn-primary btn-sm flex-1">Sign Up</Link>
          </div>
        </div>
      )}
    </header>
  );
}
