import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-cloud px-6 text-center">
      <p className="text-[110px] font-bold leading-none text-teal sm:text-[150px]">404</p>
      <h1 className="mt-4 text-3xl font-bold text-navy-title">Bunday sahifa yo'q</h1>
      <p className="mt-3 max-w-md text-body">
        Manzil noto'g'ri bo'lishi mumkin, yoki sahifa ko'chirilgan.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-primary btn-md px-9">Bosh sahifa</Link>
        <Link to="/courses" className="btn-outline btn-md px-9">Kurslar</Link>
      </div>
    </section>
  );
}
