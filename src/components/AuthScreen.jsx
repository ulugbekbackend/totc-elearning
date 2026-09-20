import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/images.js';
import Logo from './Logo.jsx';
import { IconEyeOff } from './Icons.jsx';

/**
 * Figmadagi 4 ta ekranni qoplaydi:
 *   Login / Register (1440×900)  — yon rasm bilan
 *   Mobile Login / Mobile Register (375×876) — rasmsiz, bir ustun
 * Bitta responsive komponent, `mode` prop bilan.
 */
export default function AuthScreen({ mode = 'login' }) {
  const isLogin = mode === 'login';
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate('/courses');
  };

  return (
    <div className="flex min-h-screen bg-white p-0 lg:p-10">
      {/* ---------- Yon rasm (faqat lg+) ---------- */}
      <div className="relative hidden w-1/2 overflow-hidden rounded-card lg:block">
        <img src={img.authSide} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-12">
          <p className="text-[38px] font-bold leading-tight text-white">Lorem Ipsum is simply</p>
          <p className="mt-2 text-[26px] font-light text-white/70">Lorem Ipsum is simply</p>
        </div>
        <div className="absolute left-12 top-10">
          <Logo tone="light" />
        </div>
      </div>

      {/* ---------- Forma ---------- */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[440px]">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <p className="text-center text-lg font-medium text-navy">Welcome to lorem..!</p>

          {/* Login / Register tumbler */}
          <div className="mx-auto mt-6 flex w-full max-w-[330px] rounded-pill bg-teal/45 p-2.5">
            <Link
              to="/login"
              className={`flex-1 rounded-pill py-2.5 text-center text-[15px] font-medium transition ${
                isLogin ? 'bg-teal text-white shadow-sm' : 'text-white/90 hover:text-white'
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`flex-1 rounded-pill py-2.5 text-center text-[15px] font-medium transition ${
                !isLogin ? 'bg-teal text-white shadow-sm' : 'text-white/90 hover:text-white'
              }`}
            >
              Register
            </Link>
          </div>

          <p className="mt-8 leading-relaxed text-body">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-6">
            {!isLogin && (
              <label className="block">
                <span className="mb-2 block font-medium text-navy">Email Address</span>
                <input type="email" required placeholder="Enter your Email Address" className="field rounded-pill" />
              </label>
            )}

            <label className="block">
              <span className="mb-2 block font-medium text-navy">User name</span>
              <input type="text" required placeholder="Enter your User name" className="field rounded-pill" />
            </label>

            <label className="block">
              <span className="mb-2 block font-medium text-navy">Password</span>
              <span className="relative block">
                <input
                  type={show ? 'text' : 'password'}
                  required
                  placeholder="Enter your Password"
                  className="field rounded-pill pr-14"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? 'Hide password' : 'Show password'}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-lilac transition hover:text-navy"
                >
                  <IconEyeOff className="h-5 w-5" />
                </button>
              </span>
            </label>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2.5 text-body">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-line text-teal focus:ring-teal/30"
                  />
                  Rememebr me
                </label>
                <a href="#" className="text-body transition hover:text-teal">
                  Forgot Password ?
                </a>
              </div>
            )}

            <button type="submit" className="btn-primary btn-md mt-2 self-end px-16">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-body">
            {isLogin ? 'Don’t have an account? ' : 'Already have an account? '}
            <Link to={isLogin ? '/register' : '/login'} className="font-semibold text-teal hover:underline">
              {isLogin ? 'Register' : 'Login'}
            </Link>
          </p>

          <p className="mt-6 text-center">
            <Link to="/" className="text-sm text-lilac transition hover:text-teal">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
