import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/images.js';
import Logo from './Logo.jsx';

/**
 * Figmadagi 4 ta ekranni qoplaydi:
 *   Login / Register (1440×900)  — yon rasm bilan
 *   Mobile Login / Mobile Register (375×876) — rasmsiz, bir ustun
 * Bitta responsive komponent, `mode` prop bilan.
 *
 * lg+ (Figma 1440×900) o'lchamlari aniq: rasm kartasi x=41 y=38 737×825 (Register 731),
 * forma ustuni 435px, elementlar orasidagi masofalar Figma koordinatalaridan olingan.
 * Mobil ko'rinish (<lg) hali Figma bilan solishtirilmagan.
 */
const inputCls =
  'block h-[54px] w-full rounded-[40px] border border-teal bg-white pl-[31px] pr-14 text-[15px] font-light ' +
  'text-black outline-none transition placeholder:text-[#acacac] focus:ring-4 focus:ring-teal/15';
const labelCls = 'block text-base leading-6 text-black';

export default function AuthScreen({ mode = 'login' }) {
  const isLogin = mode === 'login';
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate('/courses');
  };

  return (
    <div className="flex min-h-screen bg-[#fffefc] lg:pb-[37px] lg:pl-[41px] lg:pt-[38px]">
      {/* ---------- Yon rasm (faqat lg+) ---------- */}
      <div
        className={`relative hidden shrink-0 overflow-hidden rounded-[29px] lg:block ${
          isLogin ? 'w-[51.18vw] bg-teal' : 'w-[50.76vw] bg-[#c4c4c4]'
        }`}
      >
        <img
          src={isLogin ? img.authSide : img.authRegister}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-[55px] left-[69px] text-white">
          <p className="text-[37px] font-bold leading-[56px]">Lorem Ipsum is simply </p>
          <p className="mt-[5px] text-[25px] font-normal leading-[38px]">Lorem Ipsum is simply </p>
        </div>
      </div>

      {/* ---------- Forma ---------- */}
      <div
        className={`flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:items-center lg:px-0 lg:py-0 ${
          isLogin ? 'lg:pr-[5px]' : ''
        }`}
      >
        <div className="mx-auto flex w-full max-w-[440px] flex-col lg:mx-0 lg:w-[435px] lg:max-w-none">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <p className="text-center text-base leading-6 text-black">Welcome to lorem..!</p>

          {/* Login / Register tumbler */}
          <div className="mx-auto mt-6 flex h-[59px] w-[329px] max-w-full items-center justify-between rounded-[33px] bg-teal/60 pl-[13px] pr-3">
            <Link
              to="/login"
              className={`flex h-10 w-[146px] items-center justify-center rounded-full text-base font-medium text-white transition ${
                isLogin ? 'bg-teal' : ''
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`flex h-10 w-[146px] items-center justify-center rounded-full text-base text-white transition ${
                isLogin ? 'font-normal' : 'bg-teal font-medium'
              }`}
            >
              Register
            </Link>
          </div>

          <p className="mt-[52px] leading-6 text-muted lg:h-[49px] lg:w-[454px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          <form onSubmit={submit} className="flex flex-col">
            {!isLogin && (
              <label className="mt-8 block">
                <span className={labelCls}>Email Address</span>
                <input type="email" required placeholder="Enter your Email Address" className={`${inputCls} mt-3`} />
              </label>
            )}

            <label className={`block ${isLogin ? 'mt-[42px]' : 'mt-[30px]'}`}>
              <span className={labelCls}>User name</span>
              <input type="text" required placeholder="Enter your User name" className={`${inputCls} mt-3`} />
            </label>

            <label className="mt-[30px] block">
              <span className={labelCls}>Password</span>
              <span className="relative mt-3 block">
                <input
                  type={show ? 'text' : 'password'}
                  required
                  placeholder="Enter your Password"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? 'Hide password' : 'Show password'}
                  className="absolute right-7 top-1/2 -translate-y-1/2"
                >
                  <img
                    src="/figma/icons/eyeOff.svg"
                    alt=""
                    className={`block transition ${show ? 'opacity-40' : ''}`}
                  />
                </button>
              </span>
            </label>

            {isLogin && (
              <div className="mt-[22px] flex items-end justify-between text-xs font-light leading-[18px] text-black">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    className="relative top-[1.5px] h-[15px] w-[15px] shrink-0 appearance-none border border-black bg-white checked:bg-teal"
                  />
                  Rememebr me
                </label>
                <a href="#" className="pr-[3px] transition hover:text-teal">
                  Forgot Password ?
                </a>
              </div>
            )}

            <button
              type="submit"
              className={`h-[49px] w-[232px] self-end rounded-[36px] bg-teal text-base font-normal text-white transition hover:bg-teal-dark ${
                isLogin ? 'mt-[62px]' : 'mt-[55px]'
              }`}
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-center lg:hidden">
            <Link to="/" className="text-sm text-lilac transition hover:text-teal">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
