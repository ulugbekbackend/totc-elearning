import img from '../assets/images.js';

/* ============ Statistika (Our Success) ============ */
export const stats = [
  { value: '15K+', label: 'Students' },
  { value: '75%', label: 'Total success' },
  { value: '35', label: 'Main questions' },
  { value: '26', label: 'Chief experts' },
  { value: '16', label: 'Years of experience' },
];

/* ============ All-In-One Cloud Software ============ */
export const allInOne = [
  {
    key: 'billing',
    title: 'Online Billing, Invoicing, & Contracts',
    text: 'Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts.',
    iconClass: 'bg-[#5B72EE]',
  },
  {
    key: 'scheduling',
    title: 'Easy Scheduling & Attendance Tracking',
    text: 'Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance.',
    iconClass: 'bg-[#00CBB8]',
  },
  {
    key: 'tracking',
    title: 'Customer Tracking',
    text: 'Automate and track emails to individuals or groups. Skilline’s built-in system helps organize your organization.',
    iconClass: 'bg-[#29B9E7]',
  },
];

/* ============ Our Features — 4 ta katta blok ============ */
export const features = [
  {
    key: 'ui',
    title: 'A user interface designed for the classroom',
    points: [
      { text: 'Teachers don’t get lost in the grid view and have a dedicated Podium space.', icon: 'podium' },
      { text: 'TA’s and presenters can be moved to the front of the class.', icon: 'users' },
      { text: 'Teachers can easily see all students and class data at one time.', icon: 'grid' },
    ],
  },
  {
    key: 'tools',
    title: 'Tools For Teachers And Learners',
    body:
      'Class has a dynamic set of teaching tools built to be deployed and used during class. Teachers can handout assignments in real-time for students to complete and submit.',
    image: img.toolsPhone,
    reverse: true,
  },
  {
    key: 'assessments',
    title: 'Assessments, Quizzes, Tests',
    body:
      'Easily launch live assignments, quizzes, and tests. Student results are automatically entered in the online gradebook.',
    image: img.quizPhoto,
  },
  {
    key: 'management',
    title: 'Class Management Tools for Educators',
    body:
      'Class provides tools to help run and manage the class such as Class Roster, Attendance, and more. With the Gradebook, teachers can review and grade tests and quizzes in real-time.',
    reverse: true,
  },
  {
    key: 'discussions',
    title: 'One-on-One Discussions',
    body:
      'Teachers and teacher assistants can talk with students privately without leaving the Zoom environment.',
  },
];

/* ============ Testimonial ============ */
export const testimonial = {
  quote:
    '“Thank you so much for your help. It’s exactly what I’ve been looking for. You won’t regret it. It really saves me time and effort. TOTC is exactly what our business has been lacking.”',
  name: 'Gloria Rose',
  meta: '12 reviews at Yelp',
  photo: img.testimonialWoman,
  lead: 'TOTC has got more than 100k positive ratings from our users around the world.',
  sub: 'Some of the students and teachers were greatly helped by the Skilline.',
  cta: 'Are you too? Please give your assessment',
};

/* ============ Yangiliklar ============ */
export const news = [
  {
    slug: 'class-adds-30-million',
    tag: 'NEWS',
    title: 'Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution',
    excerpt:
      'Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively with Zoom to bring the classroom online.',
    image: img.news1,
    featured: true,
    date: 'Aug 12, 2021',
    author: 'Sarah Mills',
  },
  {
    slug: 'series-a-financing',
    tag: 'PRESS RELEASE',
    title: 'Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand',
    excerpt: 'Class Technologies Inc., the company that created Class, announced the close of its Series A.',
    image: img.news2,
    date: 'Aug 04, 2021',
    author: 'Press Desk',
  },
  {
    slug: 'zoom-earliest-investors',
    tag: 'NEWS',
    title: 'Zoom’s earliest investors are betting millions on a better Zoom for schools',
    excerpt: 'Zoom was never created to be a consumer product. Nonetheless, the pandemic changed everything.',
    image: img.news3,
    date: 'Jul 28, 2021',
    author: 'Daniel Ko',
  },
  {
    slug: 'former-blackboard-ceo',
    tag: 'NEWS',
    title: 'Former Blackboard CEO Raises $16M to Bring LMS Features to Zoom Classrooms',
    excerpt: 'This year, investors have reaped big financial returns from betting on Zoom and remote learning.',
    image: img.news4,
    date: 'Jul 15, 2021',
    author: 'Amina Yusuf',
  },
];

/* ============ Blog ============ */
export const posts = [
  {
    slug: 'future-of-hybrid-classrooms',
    tag: 'EDUCATION',
    title: 'The future of hybrid classrooms is closer than you think',
    excerpt:
      'Hybrid teaching is no longer an experiment. Here is what schools learned after two years of running classes both online and in person.',
    image: img.blogHero,
    date: 'Sep 02, 2021',
    author: 'Gloria Rose',
    readTime: '8 min read',
  },
  {
    slug: 'designing-assessments',
    tag: 'TEACHING',
    title: 'Designing assessments students actually want to take',
    excerpt: 'Small changes in how you frame a quiz can lift completion rates dramatically.',
    image: img.blog1,
    date: 'Aug 27, 2021',
    author: 'Adam Levin',
    readTime: '6 min read',
  },
  {
    slug: 'attendance-that-works',
    tag: 'PRODUCT',
    title: 'Attendance tracking that doesn’t eat your first ten minutes',
    excerpt: 'Automatic roll call, late joins, and how to keep the record clean.',
    image: img.blog2,
    date: 'Aug 19, 2021',
    author: 'Tamara Clarke',
    readTime: '5 min read',
  },
  {
    slug: 'breakout-rooms-guide',
    tag: 'TEACHING',
    title: 'A practical guide to breakout rooms for large cohorts',
    excerpt: 'Grouping strategies that keep quiet students engaged.',
    image: img.blog3,
    date: 'Aug 11, 2021',
    author: 'Humbert Holland',
    readTime: '7 min read',
  },
  {
    slug: 'gradebook-workflow',
    tag: 'PRODUCT',
    title: 'Building a gradebook workflow you can trust',
    excerpt: 'From live quiz results to an export your registrar accepts.',
    image: img.blog4,
    date: 'Aug 03, 2021',
    author: 'Patricia Mendoza',
    readTime: '9 min read',
  },
  {
    slug: 'onboarding-new-teachers',
    tag: 'CULTURE',
    title: 'Onboarding new teachers onto a virtual campus',
    excerpt: 'The first week decides whether your rollout succeeds.',
    image: img.blog5,
    date: 'Jul 25, 2021',
    author: 'Eveny Howard',
    readTime: '4 min read',
  },
  {
    slug: 'accessibility-first',
    tag: 'EDUCATION',
    title: 'Accessibility-first course design, step by step',
    excerpt: 'Captions, contrast and pacing — the three things to fix first.',
    image: img.blog6,
    date: 'Jul 16, 2021',
    author: 'Gloria Rose',
    readTime: '6 min read',
  },
];

/* ============ Kurslar ============ */
const instructors = [
  { name: 'Eveny Howard', avatar: img.avatar1 },
  { name: 'Adam Levin', avatar: img.avatar2 },
  { name: 'Tamara Clarke', avatar: img.avatar3 },
  { name: 'Humbert Holland', avatar: img.avatar4 },
  { name: 'Patricia Mendoza', avatar: img.avatar5 },
  { name: 'Gloria Rose', avatar: img.avatar6 },
];

export const courses = [
  {
    slug: 'user-experience-design',
    title: 'User Experience Design Fundamentals',
    category: 'Design',
    excerpt: 'Learn how to research, wireframe and test interfaces people actually enjoy using.',
    image: img.course1,
    price: 49,
    rating: 4.8,
    reviews: 312,
    lessons: 24,
    hours: 12,
    level: 'Beginner',
  },
  {
    slug: 'literature-and-drama',
    title: 'Literature and Drama: Reading Between the Lines',
    category: 'Literature',
    excerpt: 'A close-reading course covering tragedy, comedy and the modern novel.',
    image: img.course2,
    price: 0,
    rating: 4.6,
    reviews: 188,
    lessons: 18,
    hours: 9,
    level: 'All levels',
  },
  {
    slug: 'data-science-basics',
    title: 'Data Science Basics with Python',
    category: 'Technology',
    excerpt: 'From your first notebook to a working model, with no prior maths required.',
    image: img.course3,
    price: 79,
    rating: 4.9,
    reviews: 540,
    lessons: 32,
    hours: 20,
    level: 'Intermediate',
  },
  {
    slug: 'classroom-management',
    title: 'Classroom Management for Virtual Teachers',
    category: 'Teaching',
    excerpt: 'Keep a remote class focused, fair and on schedule.',
    image: img.course4,
    price: 35,
    rating: 4.5,
    reviews: 96,
    lessons: 14,
    hours: 7,
    level: 'Beginner',
  },
  {
    slug: 'academic-writing',
    title: 'Academic Writing and Research Methods',
    category: 'Literature',
    excerpt: 'Structure an argument, cite properly and survive peer review.',
    image: img.course5,
    price: 59,
    rating: 4.7,
    reviews: 221,
    lessons: 20,
    hours: 11,
    level: 'Intermediate',
  },
  {
    slug: 'intro-to-business',
    title: 'Introduction to Business Strategy',
    category: 'Business',
    excerpt: 'Frameworks that help you decide where to compete and how to win.',
    image: img.course6,
    price: 45,
    rating: 4.4,
    reviews: 143,
    lessons: 16,
    hours: 8,
    level: 'Beginner',
  },
  {
    slug: 'maths-for-everyone',
    title: 'Maths for Everyone: Algebra Refresher',
    category: 'Science',
    excerpt: 'Rebuild the foundations you need for statistics and data work.',
    image: img.course7,
    price: 0,
    rating: 4.3,
    reviews: 410,
    lessons: 22,
    hours: 10,
    level: 'Beginner',
  },
  {
    slug: 'public-speaking',
    title: 'Public Speaking and Online Presence',
    category: 'Business',
    excerpt: 'Hold a room — or a Zoom call — without reading from slides.',
    image: img.course8,
    price: 39,
    rating: 4.6,
    reviews: 167,
    lessons: 12,
    hours: 6,
    level: 'All levels',
  },
].map((c, i) => ({
  ...c,
  author: instructors[i % instructors.length].name,
  authorAvatar: instructors[i % instructors.length].avatar,
}));

export const courseCategories = ['All', 'Design', 'Literature', 'Technology', 'Teaching', 'Business', 'Science'];

/* ============ Explore Course — kitob javonlari ============ */
const bookTitles = [
  'Ut Sed Eros', 'Curabitur Egestas', 'Quisque Consequat', 'Cras Convallis',
  'Vestibulum Faucibus', 'Aenean Facilisis', 'Nullam Tincidunt',
];

export const bookShelves = [
  {
    title: 'Lorem Ipsum',
    icon: 'palette',
    books: bookTitles.map((t, i) => ({
      title: t,
      author: instructors[i % instructors.length].name,
      cover: img[`book${(i % 7) + 1}`],
    })),
  },
  {
    title: 'Quisque a Consequat',
    icon: 'globe',
    books: bookTitles.slice().reverse().map((t, i) => ({
      title: t,
      author: instructors[(i + 2) % instructors.length].name,
      cover: img[`book${((i + 3) % 7) + 1}`],
    })),
  },
  {
    title: 'Aenean Facilisis',
    icon: 'ribbon',
    books: bookTitles.map((t, i) => ({
      title: t,
      author: instructors[(i + 4) % instructors.length].name,
      cover: img[`book${((i + 5) % 7) + 1}`],
    })),
  },
];

/* ============ Landing — Explore Course (Figma bo'yicha) ============ */
// Kitob qirralari: [nom, rang]. `detailAt` — ochilgan karta qaysi indeksda turadi.
const spine = (title, color) => ({ title, color });
const S = {
  sed: spine('Ut Sed Eros', '#FF6F00'),
  cur: spine('Curabitur Egestas', '#FF8374'),
  qui: spine('Quisque Consequat', '#B45A1B'),
  cra: spine('Cras Convallis', '#FFB300'),
  vesViolet: spine('Vestibulum faucibus', '#C583FF'),
  sedBlue: spine('Ut Sed Eros', '#00A8FF'),
  vesGreen: spine('Vestibulum faucibus', '#6DB4A7'),
  vesTeal: spine('Vestibulum faucibus', '#308598'),
};

const detail = {
  title: 'Integer id Orc Sed Ante Tincidunt',
  text: 'Cras convallis lacus orci, tristique tincidunt magna fringilla at faucibus vel.',
  price: 450,
};

export const exploreShelves = [
  {
    title: 'Lorem Ipsum',
    icon: 'palette',
    books: [S.sed, S.cur, S.qui, S.cra, S.vesViolet, S.sedBlue, S.vesGreen],
    detailAt: 7,
    detail: { ...detail, cover: img.shelfDetail1, border: '#599BA9' },
  },
  {
    title: 'Quisque a Consequat',
    icon: 'globe',
    books: [S.sed, S.cur, S.qui, S.cra, S.vesTeal, S.sedBlue, S.vesGreen],
    detailAt: 4,
    detail: { ...detail, cover: img.shelfDetail2, border: '#E91E63' },
  },
  {
    title: 'Aenean Facilisis',
    icon: 'ribbon',
    books: [S.sed, S.cur, S.qui, S.cra, S.vesTeal, S.sedBlue, S.vesGreen],
    detailAt: 1,
    detail: { ...detail, cover: img.shelfDetail3, border: '#00BCD4' },
  },
];

/* ============ Membership tariflari ============ */
export const plans = [
  {
    name: 'Starter',
    tagline: 'For a single teacher trying things out',
    price: 0,
    period: 'mo',
    cta: 'Start for free',
    features: [
      'Up to 30 students per class',
      '40-minute sessions',
      'Basic attendance tracking',
      'Community support',
    ],
  },
  {
    name: 'Classroom',
    tagline: 'For schools running daily classes',
    price: 29,
    period: 'mo',
    cta: 'Choose Classroom',
    highlight: true,
    features: [
      'Up to 300 students per class',
      'Unlimited session length',
      'Gradebook and live quizzes',
      'Breakout rooms and podium',
      'One-on-one discussions',
      'Priority email support',
    ],
  },
  {
    name: 'Campus',
    tagline: 'For multi-campus institutions',
    price: 89,
    period: 'mo',
    cta: 'Talk to sales',
    features: [
      'Everything in Classroom',
      'Multiple campuses and rooms',
      'Online billing and contracts',
      'SSO and admin roles',
      'Dedicated success manager',
    ],
  },
];

/* ============ Dars jadvali ============ */
export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const calendarEvents = [
  { day: 0, start: 9, span: 2, title: 'User Experience Class', room: 'Room A1', tone: 'bg-teal' },
  { day: 0, start: 13, span: 1, title: 'Office Hours', room: 'Online', tone: 'bg-indigo' },
  { day: 1, start: 10, span: 2, title: 'Literature Seminar', room: 'Room B2', tone: 'bg-orange' },
  { day: 2, start: 9, span: 1, title: 'Quiz: Algebra', room: 'Online', tone: 'bg-coral' },
  { day: 2, start: 14, span: 2, title: 'Data Science Lab', room: 'Lab 3', tone: 'bg-teal' },
  { day: 3, start: 11, span: 2, title: 'Public Speaking', room: 'Hall', tone: 'bg-indigo' },
  { day: 4, start: 9, span: 3, title: 'Final Presentations', room: 'Hall', tone: 'bg-teal' },
  { day: 5, start: 10, span: 1, title: 'Teacher Sync', room: 'Online', tone: 'bg-lilac' },
];

export const calendarHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

/* ============ Meeting ishtirokchilari ============ */
export const participants = [
  { name: 'Eveny Howard', role: 'Instructor', photo: img.meetingMain, main: true },
  { name: 'Adam Levin', photo: img.meetingTile1 },
  { name: 'Tamara Clarke', photo: img.meetingTile2 },
  { name: 'Humbert Holland', photo: img.meetingTile3 },
  { name: 'Patricia Mendoza', photo: img.meetingTile4 },
];
