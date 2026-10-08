import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import img from '../assets/images.js';
import Logo from './Logo.jsx';
import { FaIcon } from './CourseBlocks.jsx';
import { IconMenu, IconClose } from './Icons.jsx';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/courses', label: 'Courses' },
  { to: '/membership', label: 'Careers' },
  { to: '/blog', label: 'Blog' },
  { to: '/search', label: 'About Us' },
];

const USER_PAGES = ['/courses', '/blog'];

/* ---------- Profil menyusi (avatar + "Lina" + strelka) ---------- */
function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center"
      >
        <img src={img.avatarLina} alt="" className="h-11 w-11 rounded-full bg-[#d9d9d9] object-cover 2xl:h-[63px] 2xl:w-[63px]" />
        <span className="ml-3 text-base font-medium tracking-[0.02em] text-black 2xl:ml-[15px] 2xl:text-lg">Lina</span>
        <FaIcon name="faAngleDown" className={`ml-3 h-2 w-3 text-black transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-10 mt-3 w-48 overflow-hidden rounded-xl bg-white py-2 shadow-[0_18.83px_47.08px_rgba(47,50,125,0.15)]">
          {[
            { to: '/courses', label: 'My courses' },
            { to: '/calendar', label: 'Calendar' },
            { to: '/login', label: 'Log out' },
          ].map((m) => (
            <Link key={m.label} to={m.to} role="menuitem" className="block px-5 py-2.5 text-base text-navy transition hover:bg-teal/10 hover:text-teal">
              {m.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Figma (Course 47:247 va boshqa ichki ekranlar, 1920): 143px oq navbar — logo x=120 (83px),
 * menyu 22px #5B5B5B x=869 dan 80px oraliq bilan, avatar 63px x=1660, "Lina" 18px, strelka x=1788.
 */
function UserNavbar({ open, setOpen }) {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="shell flex h-20 items-center lg:h-24 2xl:h-[143px] 2xl:max-w-[1920px] 2xl:pl-[120px] 2xl:pr-[120px]">
        <Logo tone="muted" diamond="nav" />

        <nav className="ml-auto hidden items-center gap-8 lg:flex xl:gap-12 2xl:gap-[80px]">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.end}
              className="text-base tracking-[0.02em] text-muted transition-colors hover:text-teal 2xl:text-[22px] 2xl:leading-[33px]"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden lg:ml-10 lg:block 2xl:ml-[69px]">
          <ProfileMenu />
        </div>

        <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="ml-auto text-navy lg:hidden">
          {open ? <IconClose className="h-7 w-7" /> : <IconMenu className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-5 pb-6 pt-4 lg:hidden">
          <div className="mb-3 flex items-center gap-3 px-4">
            <img src={img.avatarLina} alt="" className="h-11 w-11 rounded-full object-cover" />
            <span className="font-medium text-black">Lina</span>
          </div>
          <nav className="flex flex-col gap-1">
            {[...links, { to: '/calendar', label: 'Calendar' }, { to: '/login', label: 'Log out' }].map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `rounded-soft px-4 py-3 text-base font-medium ${isActive ? 'bg-teal/10 text-teal' : 'text-navy hover:bg-cloud'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();

  // Landing sahifada navbar hero ustida shaffof turadi
  const overlay = pathname === '/';
  // Figma'da login qilingan foydalanuvchi navbari (Lina avatari) chizilgan ichki sahifalar
  const user = USER_PAGES.some((p) => pathname.startsWith(p));

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

  if (user) return <UserNavbar open={open} setOpen={setOpen} />;

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
