import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import SiteLayout from './layouts/SiteLayout.jsx';
import AppLayout from './layouts/AppLayout.jsx';

import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import CourseFullView from './pages/CourseFullView.jsx';
import LiteratureCourse from './pages/LiteratureCourse.jsx';
import CourseCalendar from './pages/CourseCalendar.jsx';
import CourseCalendarCreate from './pages/CourseCalendarCreate.jsx';
import Meeting from './pages/Meeting.jsx';
import Membership from './pages/Membership.jsx';
import Checkout from './pages/Checkout.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Search from './pages/Search.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Navbar + Footer bilan ommaviy sahifalar */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/courses/:slug/full" element={<CourseFullView />} />
          <Route path="/courses/literature" element={<LiteratureCourse />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/search" element={<Search />} />
        </Route>

        {/* Ichki (login qilingan) ekranlar — soddalashtirilgan sidebar layout */}
        <Route element={<AppLayout />}>
          <Route path="/calendar" element={<CourseCalendar />} />
          <Route path="/calendar/create" element={<CourseCalendarCreate />} />
        </Route>

        {/* To'liq ekranli ekranlar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/meeting" element={<Meeting />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
