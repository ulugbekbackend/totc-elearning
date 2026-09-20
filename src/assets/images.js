/**
 * Barcha rasm manbalari shu yerda — bitta joyda.
 *
 * Hozir placeholder (picsum.photos) ishlatilyapti, chunki bu muhitdan
 * figma.com'ga tarmoq ruxsati yo'q edi. Asl Figma rasmlarini olish uchun:
 *
 *   1. Figma → Settings → Security → "Personal access tokens" → yangi token
 *   2. export FIGMA_TOKEN=figd_xxx
 *   3. npm run assets
 *
 * Skript barcha image fill'larni /public/figma/ ichiga yuklab, quyidagi
 * yo'llarni avtomatik almashtiradi (LOCAL obyektiga qarang).
 */

const USE_LOCAL = false; // `npm run assets` ishlagandan keyin true qiling

// Lokal SVG placeholder — tarmoqqa bog'liq emas, sayt oflayn ham to'liq ishlaydi.
// `node scripts/make-placeholders.mjs` bilan qayta yasaladi.
const ph = (seed) => `/placeholder/${seed}.svg`;

const REMOTE = {
  // Hero / header
  heroGirl: ph('heroGirl'),
  heroAvatar: ph('heroAvatar'),

  // "What is TOTC" — ikki karta
  forInstructors: ph('forInstructors'),
  forStudents: ph('forStudents'),

  // "Everything you can do in a physical classroom"
  classroomVideo: ph('classroomVideo'),

  // Features — sinf ishtirokchilari
  teacherMain: ph('teacherMain'),
  student1: ph('student1'),
  student2: ph('student2'),
  student3: ph('student3'),
  student4: ph('student4'),

  // Tools for teachers
  toolsPhone: ph('toolsPhone'),

  // Assessments
  quizPhoto: ph('quizPhoto'),

  // Testimonials
  testimonialWoman: ph('testimonialWoman'),

  // News
  news1: ph('news1'),
  news2: ph('news2'),
  news3: ph('news3'),
  news4: ph('news4'),

  // Kurslar
  course1: ph('course1'),
  course2: ph('course2'),
  course3: ph('course3'),
  course4: ph('course4'),
  course5: ph('course5'),
  course6: ph('course6'),
  course7: ph('course7'),
  course8: ph('course8'),

  // Kitob muqovalari
  book1: ph('book1'),
  book2: ph('book2'),
  book3: ph('book3'),
  book4: ph('book4'),
  book5: ph('book5'),
  book6: ph('book6'),
  book7: ph('book7'),

  // Blog
  blogHero: ph('blogHero'),
  blog1: ph('blog1'),
  blog2: ph('blog2'),
  blog3: ph('blog3'),
  blog4: ph('blog4'),
  blog5: ph('blog5'),
  blog6: ph('blog6'),

  // Auth ekranlari
  authSide: ph('authSide'),

  // Meeting
  meetingMain: ph('meetingMain'),
  meetingTile1: ph('meetingTile1'),
  meetingTile2: ph('meetingTile2'),
  meetingTile3: ph('meetingTile3'),
  meetingTile4: ph('meetingTile4'),

  // Instruktor avatarlari
  avatar1: ph('avatar1'),
  avatar2: ph('avatar2'),
  avatar3: ph('avatar3'),
  avatar4: ph('avatar4'),
  avatar5: ph('avatar5'),
  avatar6: ph('avatar6'),
};

const LOCAL = Object.fromEntries(
  Object.keys(REMOTE).map((k) => [k, `/figma/${k}.jpg`])
);

// `npm run assets` yuklagan asl Figma rasmlari (public/figma/manifest.json).
// Figmada asl rasmi yo'q kalitlar (avatar*, meeting*, blog4-6, book6-7)
// placeholder'da qoladi.
const FIGMA = {
  // Landing
  heroGirl: '/figma/heroGirl.webp',
  heroAvatar: '/figma/heroAvatar.webp',
  forInstructors: '/figma/forInstructors.webp',
  forStudents: '/figma/forStudents.webp',
  classroomVideo: '/figma/classroomVideo.webp',
  toolsPhone: '/figma/heroGirl.webp', // Figmada hero bilan bir xil rasm
  // teacherMain va student1-4 endi kerak emas: "Our Features" illyustratsiyalari
  // Figmadan butun holda eksport qilingan (public/figma/features/).
  quizPhoto: '/figma/quizPhoto.webp',
  testimonialWoman: '/figma/testimonialWoman.webp',
  news1: '/figma/news1.webp',
  news2: '/figma/news2.webp',
  news3: '/figma/news3.webp',
  news4: '/figma/news4.webp',
  shelfDetail1: '/figma/shelfDetail1.webp',
  shelfDetail2: '/figma/shelfDetail2.webp',
  shelfDetail3: '/figma/shelfDetail3.webp',

  // Auth
  authSide: '/figma/authSide.webp',
  authRegister: '/figma/authRegister.webp',

  // Blog
  blogHero: '/figma/blogHero.webp',
  blog1: '/figma/blog1.webp',
  blog2: '/figma/blog2.webp',
  blog3: '/figma/blog3.webp',

  // Kurslar
  course1: '/figma/course1.webp',
  course2: '/figma/course2.webp',
  course3: '/figma/course3.webp',
  course4: '/figma/course4.webp',
  course5: '/figma/course5.webp',
  course6: '/figma/course6.webp',
  course7: '/figma/course7.webp',
  course8: '/figma/course8.webp',

  // Literature course
  literatureHero: '/figma/literatureHero.webp',
  book1: '/figma/book1.webp',
  book2: '/figma/book2.webp',
  book3: '/figma/book3.webp',
  book4: '/figma/book4.webp',
  book5: '/figma/book5.webp',

  // Checkout
  payPaypal: '/figma/payPaypal.webp',
  payAmex: '/figma/payAmex.webp',
  payVisa: '/figma/payVisa.webp',

  /*
   * Quyidagilar uchun Figmada alohida rasm yo'q — u yerlar dizaynda kulrang
   * to'rtburchak. Shuning uchun mavjud Figma rasmlaridan kesib olingan
   * (scripts/derive-images.mjs). Avatarlar — Figmadagi aynan o'sha odamlar:
   * Eveny Howard, Adam Levin, Tamara Clarke, Humbert Holland,
   * Patricia Mendoza (Our Features) va Gloria Rose (Testimonial).
   */
  avatar1: '/figma/avatar1.webp',
  avatar2: '/figma/avatar2.webp',
  avatar3: '/figma/avatar3.webp',
  avatar4: '/figma/avatar4.webp',
  avatar5: '/figma/avatar5.webp',
  avatar6: '/figma/avatar6.webp',
  meetingMain: '/figma/meetingMain.webp',
  meetingTile1: '/figma/meetingTile1.webp',
  meetingTile2: '/figma/meetingTile2.webp',
  meetingTile3: '/figma/meetingTile3.webp',
  meetingTile4: '/figma/meetingTile4.webp',
  blog4: '/figma/blog4.webp',
  blog5: '/figma/blog5.webp',
  blog6: '/figma/blog6.webp',
  book6: '/figma/book6.webp',
  book7: '/figma/book7.webp',
};

export const img = USE_LOCAL ? LOCAL : { ...REMOTE, ...FIGMA };
export default img;
