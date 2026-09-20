import { Outlet, NavLink, Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import {
  IconGrid, IconCalendar, IconBook, IconChat, IconUsers,
} from '../components/Icons.jsx';
import img from '../assets/images.js';

const nav = [
  { to: '/courses', label: 'Dashboard', Icon: IconGrid },
  { to: '/calendar', label: 'Calendar', Icon: IconCalendar },
  { to: '/courses', label: 'My Courses', Icon: IconBook },
  { to: '/meeting', label: 'Meetings', Icon: IconChat },
  { to: '/search', label: 'Students', Icon: IconUsers },
];

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-cloud">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white lg:flex">
        <div className="px-6 py-7">
          <Logo />
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-4">
          {nav.map(({ to, label, Icon }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-soft px-4 py-3 text-[15px] font-medium transition ${
                  isActive ? 'bg-teal text-white' : 'text-body hover:bg-cloud hover:text-navy'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-line p-5">
          <Link to="/membership" className="btn-primary btn-sm w-full">
            Upgrade plan
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-20 items-center justify-between border-b border-line bg-white px-5 lg:px-8">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm text-body">Welcome back</p>
            <p className="font-semibold text-navy">Eveny Howard</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/meeting" className="btn-outline btn-sm hidden sm:inline-flex">
              Start a class
            </Link>
            <img
              src={img.avatar1}
              alt="Eveny Howard"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-teal/30"
            />
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
