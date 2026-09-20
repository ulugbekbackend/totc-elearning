import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

/*
 * Figma (1920px): #252641, balandligi 593px.
 * Logo (83px) → 95px → "Subscribe…" 26px → 20px → forma 400×60 + 20px + 179×60
 * → 96px → havolalar 22px #B2B3CF → 20px → copyright.
 */
export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="shell flex flex-col items-center py-14 text-center lg:py-16 2xl:pb-[49px] 2xl:pt-[74px]">
        <Logo tone="light" diamond="teal" withTagline />

        <p className="mt-12 text-lg font-medium text-[#B2B3CF] 2xl:mt-[95px] 2xl:text-[26px] 2xl:leading-[39px]">
          Subscribe to get our Newsletter
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-5 flex w-full max-w-[599px] flex-col gap-4 sm:flex-row sm:gap-5"
        >
          <input
            type="email"
            required
            placeholder="Your Email"
            aria-label="Your Email"
            className="h-[52px] min-w-0 flex-1 rounded-[80px] border border-[#83839A] bg-transparent px-[30px]
                       text-white outline-none placeholder:text-[#83839A] focus:border-teal
                       focus:ring-4 focus:ring-teal/20 2xl:h-[60px] 2xl:text-xl"
          />
          <button
            type="submit"
            className="h-[52px] shrink-0 rounded-[60px] bg-teal px-9 font-medium text-white
                       shadow-[0_14px_30px_rgba(84,90,232,0.35)] transition hover:bg-teal-dark
                       2xl:h-[60px] 2xl:w-[179px] 2xl:text-[22px]"
          >
            Subscribe
          </button>
        </form>

        <nav className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-base text-[#B2B3CF] 2xl:mt-[96px] 2xl:gap-x-5 2xl:text-[22px]">
          <Link to="/membership" className="hover:text-white">Careers</Link>
          <span className="h-[17px] w-px bg-[#626381]" />
          <Link to="/blog" className="hover:text-white">Privacy Policy</Link>
          <span className="h-[17px] w-px bg-[#626381]" />
          <Link to="/blog" className="hover:text-white">Terms &amp; Conditions</Link>
        </nav>

        <p className="mt-5 text-sm text-[#B2B3CF] 2xl:text-[22px] 2xl:leading-[33px]">
          © {new Date().getFullYear()} Class Technologies Inc.
        </p>
      </div>
    </footer>
  );
}
