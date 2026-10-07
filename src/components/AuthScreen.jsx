import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/images.js';

/**
 * Figmadagi 4 ta ekranni qoplaydi:
 *   Login / Register (1440×900)  — yon rasm bilan
 *   Mobile Login / Mobile Register (375×876) — rasmsiz, bir ustun
 * Bitta responsive komponent, `mode` prop bilan.
 *
 * lg+ (Figma 1440×900) o'lchamlari aniq: rasm kartasi x=41 y=38 737×825 (Register 731),
 * forma ustuni 435px, elementlar orasidagi masofalar Figma koordinatalaridan olingan.
 * Mobil (<lg, Figma 375×876): logotip va qo'shimcha havolalar yo'q, kontent vertikal markazda,
 * chap chekka 26px, input 317px, tumbler 315px (chapga tekislangan).
 */
const inputCls =
  'block h-[54px] w-full rounded-[40px] border border-teal bg-white pl-[23px] pr-14 lg:pl-[31px] text-[15px] font-light ' +
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
    <div className="flex min-h-screen bg-white lg:bg-[#fffefc] lg:pb-[37px] lg:pl-[41px] lg:pt-[38px]">
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
        className={`flex min-w-0 flex-1 flex-col justify-center px-[26px] py-12 lg:items-center lg:px-0 lg:py-0 ${
          isLogin ? 'lg:pr-[5px]' : ''
        }`}
      >
        <div className="mx-auto flex w-full max-w-[317px] flex-col lg:mx-0 lg:w-[435px] lg:max-w-none">

          <p className="text-center text-base leading-6 text-black">Welcome to lorem..!</p>

          {/* Login / Register tumbler */}
          <div className="mx-auto mt-6 flex h-[59px] w-[315px] max-w-full items-center justify-between rounded-[33px] bg-teal/60 pl-3 pr-[11px] lg:w-[329px] lg:pl-[13px] lg:pr-3">
            <Link
              to="/login"
              className={`flex h-10 w-[140px] items-center justify-center rounded-full text-base font-medium lg:w-[146px] text-white transition ${
                isLogin ? 'bg-teal' : ''
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`flex h-10 w-[140px] items-center justify-center rounded-full text-base text-white lg:w-[146px] transition ${
                isLogin ? 'font-normal' : 'bg-teal font-medium'
              }`}
            >
              Register
            </Link>
          </div>

          <p
            className={`h-[49px] w-full leading-6 text-muted lg:mt-[52px] lg:w-[454px] ${
              isLogin ? 'mt-[52px]' : 'mt-[51px]'
            }`}
          >
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
                  className="absolute right-[15px] top-1/2 -translate-y-1/2 lg:right-7"
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
              <div className="mt-[22px] flex items-center justify-between text-xs lg:items-end font-light leading-[18px] text-black">
                <label className="flex cursor-pointer items-center gap-1.5 lg:gap-2.5">
                  <input
                    type="checkbox"
                    className="relative h-3 w-3 shrink-0 lg:top-[1.5px] lg:h-[15px] lg:w-[15px] appearance-none border border-black bg-white checked:bg-teal"
                  />
                  Rememebr me
                </label>
                <a href="#" className="mr-0.5 w-[122px] transition lg:mr-0 lg:w-auto lg:pr-[3px] hover:text-teal">
                  Forgot Password ?
                </a>
              </div>
            )}

            <button
              type="submit"
              className={`h-[49px] w-[231px] self-end rounded-[36px] lg:w-[232px] bg-teal text-base font-normal text-white transition hover:bg-teal-dark ${
                isLogin ? 'mt-[62px]' : 'mt-[52px] lg:mt-[55px]'
              }`}
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
