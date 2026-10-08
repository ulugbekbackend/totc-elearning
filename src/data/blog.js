import img from '../assets/images.js';
import { posts, news } from './content.js';

/**
 * Blog ma'lumotlari — Blog, Blog detail va "Barcha maqolalar" sahifalari uchun yagona manba.
 * `posts` (blog) va `news` (Landing'dagi yangiliklar) content.js da qoladi — Landing va Search
 * ulardan foydalanadi; bu yerda ularga kategoriya, teglar, matn va muallif avatari qo'shiladi.
 */

const authors = {
  Lina: img.avatarLina,
  'Eveny Howard': img.avatar1,
  'Adam Levin': img.avatar2,
  'Tamara Clarke': img.avatar3,
  'Humbert Holland': img.avatar4,
  'Patricia Mendoza': img.avatar5,
  'Gloria Rose': img.avatar6,
};
export const authorAvatar = (name) => authors[name] ?? img.avatarLina;

const totcAbout =
  'TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.';

/* Har maqola: category — filtr uchun, tags — detail sahifadagi teglar, body — paragraf guruhlari */
const extra = {
  // Figma'dagi asosiy maqola (Blog hero + Blog detail)
  'why-swift-ui': {
    category: 'Inspiration',
    tags: ['affordable', 'Stunning', 'making', 'madbrawns'],
    views: 251232,
    body: [
      [totcAbout],
      [totcAbout, totcAbout, 'TOTC is a platform '],
      [totcAbout, 'TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage '],
    ],
  },
  'future-of-hybrid-classrooms': {
    category: 'Education',
    tags: ['hybrid', 'classroom', 'planning'],
    views: 18420,
    body: [
      ['Two years ago, hybrid teaching was a contingency plan. Today it is a line item in the timetable, and the schools that treat it as a first-class format rather than a fallback are the ones whose students stay engaged.'],
      [
        'The first wave of remote teaching was a straight port: the same lecture, delivered through a webcam. Attendance held up for a term and then collapsed.',
        'What worked instead was rebuilding the session around the things a video call is genuinely good at: small rooms, instant polls and private side-channels with a struggling student.',
      ],
      ['Split the hour into instruction, group work and review. Give every breakout room a visible task and a deadline. Record everything, but write a two-line summary of each recording so nobody has to scrub through fifty minutes of video.'],
    ],
  },
  'designing-assessments': {
    category: 'UX/UI',
    tags: ['assessment', 'design', 'quiz'],
    views: 9310,
    body: [
      ['A quiz is an interface like any other. When completion rates drop, the problem is usually the framing, not the difficulty of the questions.'],
      ['Show progress early, keep each screen to a single decision and tell students how long the whole thing will take before they start. These three changes alone lifted completion from 61% to 84% in our pilot schools.'],
      ['Finally, make the result useful: a short explanation for every wrong answer turns an assessment into a lesson.'],
    ],
  },
  'attendance-that-works': {
    category: 'PHP',
    tags: ['attendance', 'backend', 'automation'],
    views: 7215,
    body: [
      ['Manual roll call costs a teacher roughly ten minutes per lesson. Over a school year that is more than a full week of teaching time.'],
      ['Our attendance service listens to join and leave events from the meeting, stores them in a single table and resolves late joins against the timetable. A small PHP worker turns the raw events into a register the office can sign off.'],
      ['The key decision was to never overwrite an event: corrections are new rows. That keeps the record auditable and makes disputes easy to settle.'],
    ],
  },
  'breakout-rooms-guide': {
    category: 'Education',
    tags: ['breakout', 'groups', 'engagement'],
    views: 12904,
    body: [
      ['Breakout rooms fail for one reason: ambiguity. Students arrive in a room without knowing what “done” looks like, and the quiet ones stay quiet.'],
      ['Give every room one shared document, one question and a visible timer. Rotate the person who reports back so the same voices do not dominate every session.'],
    ],
  },
  'gradebook-workflow': {
    category: 'JavaScript',
    tags: ['gradebook', 'export', 'frontend'],
    views: 6120,
    body: [
      ['A gradebook is only trustworthy if every number can be traced back to the quiz, the attempt and the rubric that produced it.'],
      ['We rebuilt ours as a small JavaScript module that derives every total from raw attempts instead of storing totals. Exports are generated on demand in the format the registrar expects, so there is never a stale spreadsheet in circulation.'],
    ],
  },
  'onboarding-new-teachers': {
    category: 'Education',
    tags: ['onboarding', 'teachers', 'rollout'],
    views: 4380,
    body: [
      ['The first week decides whether a virtual campus rollout succeeds. Teachers who run one confident lesson in week one keep using the platform; the rest quietly go back to email attachments.'],
      ['Pair every new teacher with a colleague, prepare a template lesson they can copy and schedule a fifteen-minute check-in on day three. That is all it takes.'],
    ],
  },
  'accessibility-first': {
    category: 'UX/UI',
    tags: ['accessibility', 'captions', 'contrast'],
    views: 5590,
    body: [
      ['Accessible courses are better courses for everyone. Start with the three changes that help the most students for the least effort.'],
      ['Turn on live captions by default, check text contrast against the background of every slide and slow the pace: one idea per slide, and a pause after each question.'],
    ],
  },
};

// Kategoriyalarning har birida maqola bo'lishi uchun qo'shimcha maqolalar
const added = [
  {
    slug: 'why-swift-ui',
    tag: 'INSPIRATION',
    title: 'Why Swift UI Should Be on the Radar of Every Mobile Developer',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor',
    image: img.news1,
    cover: img.blogHero,
    date: 'Sep 10, 2021',
    author: 'Lina',
    publisher: 'Themadbrains',
    featured: true,
  },
  {
    slug: 'live-quiz-with-react',
    tag: 'REACT',
    title: 'Building a live quiz widget with React hooks',
    excerpt: 'A small component that keeps forty students in sync without a page refresh.',
    image: img.blog3,
    date: 'Aug 30, 2021',
    author: 'Adam Levin',
    category: 'React',
    tags: ['react', 'hooks', 'realtime'],
    views: 8840,
    body: [
      ['A live quiz needs three things: the current question, a countdown and a way to collect answers without losing any when the network hiccups.'],
      ['We keep the question in a single useReducer, drive the countdown from the server clock instead of setInterval and queue answers locally until the server confirms them. The whole widget is under two hundred lines.'],
    ],
  },
  {
    slug: 'offline-first-javascript',
    tag: 'JAVASCRIPT',
    title: 'Offline-first JavaScript for flaky classroom Wi-Fi',
    excerpt: 'Service workers and a tiny sync queue keep lessons usable when the network is not.',
    image: img.blog1,
    date: 'Aug 22, 2021',
    author: 'Patricia Mendoza',
    category: 'JavaScript',
    tags: ['offline', 'pwa', 'sync'],
    views: 6710,
    body: [
      ['School Wi-Fi drops at the worst possible moment: halfway through a test. Offline-first design means the student never notices.'],
      ['Cache the lesson shell with a service worker, write every answer to IndexedDB first and sync it in the background. When the connection returns, the queue drains in order.'],
    ],
  },
  {
    slug: 'laravel-queues-grade-reports',
    tag: 'PHP',
    title: 'Sending thousands of grade reports with Laravel queues',
    excerpt: 'How we moved report generation off the request cycle and stopped timing out.',
    image: img.blog2,
    date: 'Aug 14, 2021',
    author: 'Humbert Holland',
    category: 'PHP',
    tags: ['laravel', 'queues', 'reports'],
    views: 5230,
    body: [
      ['At the end of term every teacher clicks “send reports” within the same hour. Generating PDFs inside the request meant timeouts and duplicate emails.'],
      ['Moving the work to a queue with one job per student fixed both problems. Failed jobs retry with back-off, and the teacher sees a progress bar instead of a spinner.'],
    ],
  },
];

const newsExtra = (n, i) => ({
  ...n,
  category: 'News',
  tags: ['news', 'funding', 'edtech'],
  views: [251232, 132800, 98110, 76045][i] ?? 50000,
  body: [[n.excerpt], [totcAbout]],
});

export const blogPosts = [
  ...added.map((p) => ({ ...p, ...(extra[p.slug] ?? {}) })),
  ...posts.map((p) => ({ ...p, ...extra[p.slug] })),
  ...news.map(newsExtra),
].map((p) => ({
  ...p,
  avatar: authorAvatar(p.author),
  cover: p.cover ?? p.image,
  viewsLabel: (p.views ?? 0).toLocaleString('en-US'),
}));

export const findPost = (slug) => blogPosts.find((p) => p.slug === slug);
export const featuredPost = blogPosts.find((p) => p.featured) ?? blogPosts[0];

// Filtrdagi tartib: Figma'dagi "Reading blog list" kategoriyalari birinchi
export const blogCategories = ['UX/UI', 'React', 'PHP', 'JavaScript', 'Education', 'Inspiration', 'News'];

// Shu kategoriyadagi maqolalar birinchi, keyin eng yangilari
export function relatedPosts(post, limit = 6) {
  const others = blogPosts.filter((p) => p.slug !== post?.slug);
  const same = others.filter((p) => p.category === post?.category);
  return [...same, ...others.filter((p) => p.category !== post?.category)].slice(0, limit);
}
