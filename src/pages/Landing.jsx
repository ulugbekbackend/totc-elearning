import { Link } from 'react-router-dom';
import img from '../assets/images.js';
import {
  stats, allInOne, testimonial, news, exploreShelves,
} from '../data/content.js';
import { SectionHeading, Stat, FeatureCard } from '../components/ui.jsx';
import {
  IconPlay, IconCalendar, IconInvoice, IconUsers, IconSend,
  IconPalette, IconGlobe, IconRibbon, IconStar, IconChevronRight, IconArrowRight,
} from '../components/Icons.jsx';

const shelfIcons = { palette: IconPalette, globe: IconGlobe, ribbon: IconRibbon };

/*
 * Explore Course o'lchamlari Figma (1920px) piksellarida yoziladi va `--k`
 * masshtabiga ko'paytiriladi: 0.7 → 2xl'da 0.8 → 1900px+ da 1 (Figmadagidek).
 */
const k = (px) => `calc(var(--k) * ${px}px)`;

/*
 * Explore Course — javondagi kitob qirrasi (Figma: Book).
 * Figmadagi 175×430 — burilgan kitobning tashqi qutisi; haqiqiy o'lcham 104×418, -10°.
 * Ichki qatlamlar Figmadagi joyida: yashil fon 81×382 (11,18), rangli qirra 63×319 (21,49).
 */
function BookSpine({ title, color }) {
  return (
    <div
      className="relative z-10 shrink-0 -rotate-[10deg] bg-white shadow-[0_3px_49px_rgba(0,0,0,0.06)]"
      style={{ width: k(104), height: k(418), borderRadius: k(24) }}
      title={title}
    >
      <div
        className="absolute bg-[#CBF4C3]"
        style={{ left: k(11), top: k(18), width: k(81), height: k(382), borderRadius: k(24) }}
      />
      <div
        className="absolute flex items-center justify-center overflow-hidden"
        style={{ left: k(21), top: k(49), width: k(63), height: k(319), borderRadius: k(24), backgroundColor: color }}
      >
        <span
          className="truncate font-medium text-white [writing-mode:vertical-rl]"
          style={{ fontSize: k(24), maxHeight: k(290) }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

/* Explore Course — javondagi ochilgan kitob kartasi (Figma: Detail, 685×430) */
function ShelfDetail({ title, text, price, cover, border }) {
  return (
    <div
      className="relative z-10 flex shrink-0 bg-white"
      style={{
        width: k(685), height: k(430), margin: `0 ${k(14)}`, gap: k(28),
        padding: `${k(24)} ${k(21)} ${k(21)}`, borderRadius: k(24),
        border: `${k(3)} solid ${border}`,
      }}
    >
      {/* Figmada karta bitta rasm; muqova qismi shu rasmdan kesib olinadi */}
      <div
        className="shrink-0 bg-no-repeat"
        style={{
          width: k(266), height: k(377), borderRadius: k(24),
          backgroundImage: `url(${cover})`, backgroundSize: '258% 114%', backgroundPosition: '5.2% 50%',
        }}
        role="img"
        aria-label={title}
      />
      <div className="flex min-w-0 flex-1 flex-col" style={{ padding: `${k(11)} 0` }}>
        <h4 className="font-medium leading-[1.4] text-black/[0.87]" style={{ fontSize: k(31) }}>{title}</h4>
        <p className="leading-[1.5] text-black/[0.54]" style={{ fontSize: k(21), marginTop: k(11) }}>{text}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="flex text-[#FFC107]">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStar key={i} style={{ width: k(26), height: k(26) }} />
            ))}
          </span>
          <span className="font-bold text-black/[0.87]" style={{ fontSize: k(23) }}>$ {price}</span>
        </div>
        <Link
          to="/courses/literature"
          className="flex items-center justify-center border border-[#00BCD4] font-medium uppercase text-[#00BCD4] transition hover:bg-[#00BCD4] hover:text-white"
          style={{ height: k(54), marginTop: k(23), fontSize: k(20), borderRadius: k(11) }}
        >
          Explore
        </Link>
      </div>
    </div>
  );
}

/* Our Features — Figma: Nunito Sans 700 40/64 #2F327D, ajratilgan so'z #00CBB8 */
const Hl = ({ children }) => <span className="text-[#00CBB8]">{children}</span>;

function FeatureTitle({ children }) {
  return (
    <h3 className="font-nunito text-[28px] font-bold leading-[1.5] text-navy-title sm:text-[34px] 2xl:text-[40px] 2xl:leading-[64px]">
      {children}
    </h3>
  );
}

function FeatureText({ children, className = '' }) {
  return (
    <p className={`text-base leading-[1.8] text-body sm:text-lg 2xl:text-[22px] 2xl:leading-[40px] ${className}`}>
      {children}
    </p>
  );
}

const allInOneIcons = [IconInvoice, IconCalendar, IconUsers];

export default function Landing() {
  return (
    <>
      {/* ============================== HERO ============================== */}
      {/* fhd (1900px+): Figma koordinatalari — ekran markaziga nisbatan (50% ± px), balandlik 1118px */}
      {/* Navbar Landing'da fixed (oqimdan tashqarida) — pt uning joyini ajratadi */}
      <section className="relative overflow-hidden bg-teal pt-20 lg:pt-24 2xl:pt-[143px] fhd:h-[1118px]">
        <div className="shell relative grid items-center gap-10 pb-24 pt-10 lg:grid-cols-2 lg:gap-6 lg:pb-40 lg:pt-16 fhd:static fhd:block fhd:p-0">
          {/* Chap ustun */}
          <div className="relative z-10 max-w-xl fhd:absolute fhd:left-[calc(50%-820px)] fhd:top-[335px] fhd:max-w-[681px]">
            <h1 className="font-nunito text-[38px] font-extrabold leading-[1.3] text-white sm:text-[48px] lg:text-[54px] lg:leading-[74px]">
              <span className="text-orange">Studying</span> Online is now much easier
            </h1>
            <p className="mt-6 max-w-[523px] font-nunito text-lg leading-relaxed text-white lg:text-2xl lg:leading-[38px] fhd:mt-[34px]">
              TOTC is an interesting platform that will teach you in more an interactive way
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5 fhd:mt-[52px] fhd:gap-10">
              <Link
                to="/register"
                className="btn h-16 bg-white/30 px-10 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/40 fhd:h-20 fhd:w-[220px] fhd:px-0 fhd:text-2xl"
              >
                Join for free
              </Link>
              <button className="group flex items-center gap-4 fhd:gap-8">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[2px_20px_60px_rgba(61,155,185,0.10)] transition group-hover:scale-105 fhd:h-20 fhd:w-20">
                  <IconPlay className="ml-1 h-6 w-6 text-cyan fhd:h-8 fhd:w-8" />
                </span>
                <span className="text-lg text-navy lg:text-xl fhd:text-2xl">Watch how it works</span>
              </button>
            </div>
          </div>

          {/* O'ng ustun — rasm + suzuvchi kartalar */}
          <div className="relative flex min-h-[420px] justify-center lg:min-h-[580px] lg:justify-end fhd:static">
            <img
              src={img.heroGirl}
              alt="Student"
              className="h-[420px] w-[280px] rounded-card object-cover object-top shadow-[0_4px_100px_rgba(29,28,24,0.25)]
                         sm:h-[480px] sm:w-[330px]
                         lg:absolute lg:bottom-[-160px] lg:right-10 lg:h-[700px] lg:w-[427px] lg:rounded-none lg:shadow-none
                         fhd:bottom-auto fhd:left-[calc(50%+128px)] fhd:right-auto fhd:top-[224px] fhd:h-[892px] fhd:w-[544px] fhd:object-[87%_100%]"
            />

            {/* Pushti diagramma belgisi — Figma: 69px, x=1625 y=354 */}
            <span className="absolute right-0 top-0 hidden h-[69px] w-[69px] items-center justify-center rounded-[14px] bg-[#F3627C] shadow-[0_8px_40px_rgba(210,77,101,0.26)] animate-floaty lg:flex lg:-top-8 fhd:left-[calc(50%+665px)] fhd:right-auto fhd:top-[354px]">
              <span className="flex h-[45px] w-[47px] items-center justify-center rounded-lg bg-white">
                <img src="/figma/heroChartIcon.svg" alt="" className="h-[24px] w-[18px]" />
              </span>
            </span>

            {/* 250k Assisted Student — Figma: 300×100, x=895 y=409 */}
            <div className="absolute left-0 top-0 flex items-center gap-3 rounded-[20px] bg-white/80 px-4 py-3 font-nunito shadow-float backdrop-blur-[10px] animate-floaty sm:gap-4 sm:px-5 sm:py-4 lg:top-10 fhd:left-[calc(50%-65px)] fhd:top-[409px] fhd:h-[100px] fhd:w-[300px] fhd:gap-8 fhd:px-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan text-white sm:h-12 sm:w-12 fhd:h-[50px] fhd:w-[50px]">
                <IconCalendar className="h-5 w-5 sm:h-6 sm:w-6 fhd:h-7 fhd:w-7" />
              </span>
              <span>
                <span className="block text-lg font-bold leading-[1.5] text-[#595959] sm:text-xl fhd:text-2xl">250k</span>
                <span className="block text-xs font-semibold text-[#545567] sm:text-sm fhd:text-xl">Assisted Student</span>
              </span>
            </div>

            {/* Congratulations — Figma: 370×110, x=1424 y=604 */}
            <div
              className="absolute right-0 top-[38%] hidden items-center gap-4 rounded-[20px] bg-white/80 px-5 py-4 font-nunito shadow-float backdrop-blur-[10px] animate-floaty xl:flex xl:translate-x-6 fhd:left-[calc(50%+464px)] fhd:right-auto fhd:top-[604px] fhd:h-[110px] fhd:w-[370px] fhd:translate-x-0 fhd:gap-6 fhd:px-[26px]"
              style={{ animationDelay: '1.5s' }}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F88C3D] text-white fhd:h-[50px] fhd:w-[50px]">
                <IconSend className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-bold leading-[1.5] text-[#595959] fhd:text-2xl">Congratulations</span>
                <span className="block text-sm font-semibold text-[#545567] fhd:text-xl">Your admission completed</span>
              </span>
            </div>

            {/* User Experience Class — Figma: 390×187, x=883 y=744 */}
            <div
              className="absolute bottom-0 left-0 w-[250px] rounded-[20px] bg-white/80 p-4 font-nunito shadow-float backdrop-blur-[10px] animate-floaty sm:w-[280px] sm:p-5 lg:bottom-6 fhd:bottom-auto fhd:left-[calc(50%-77px)] fhd:top-[744px] fhd:h-[187px] fhd:w-[390px] fhd:px-[26px] fhd:pt-[26px]"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="flex items-start gap-3 fhd:gap-[23px]">
                <span className="relative shrink-0">
                  <img src={img.heroAvatar} alt="" className="h-11 w-11 rounded-full object-cover sm:h-12 sm:w-12 fhd:h-14 fhd:w-14" />
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#29CC39] fhd:h-5 fhd:w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold leading-snug text-[#595959] sm:text-base fhd:text-2xl fhd:leading-[1.8]">
                    User Experience Class
                  </span>
                  <span className="block text-xs font-semibold text-[#545567] sm:text-sm fhd:text-xl">Today at 12.00 PM</span>
                </span>
              </div>
              <Link
                to="/meeting"
                className="mt-4 block rounded-[80px] bg-[#D8587E] py-2.5 text-center text-sm font-bold text-white transition hover:brightness-95 fhd:ml-[79px] fhd:mt-[15px] fhd:flex fhd:h-[50px] fhd:w-[180px] fhd:items-center fhd:justify-center fhd:py-0 fhd:text-xl"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>

        {/* Figmadagi oq to'lqin: chetlarda y=990, markazda 1118 */}
        <div className="absolute inset-x-0 bottom-0 h-[70px] overflow-hidden lg:h-[110px] 2xl:h-[128px]">
          <svg viewBox="0 0 1920 110" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0 110h1920V0c-320 74-680 110-960 110S320 74 0 0v110Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ============================== OUR SUCCESS ============================== */}
      <section className="shell py-16 lg:py-24 2xl:px-[68px] fhd:pb-[51px] fhd:pt-[134px]">
        <div className="mx-auto max-w-[750px] text-center">
          <h2 className="text-[32px] font-bold leading-tight text-[#010514] sm:text-[40px] 2xl:text-[48px]">Our Success</h2>
          <p className="mt-4 text-base leading-[1.6] text-[#010514]/80 2xl:text-lg">
            Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec nam et pharetra
            gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-4 2xl:mt-[101px]">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ============================== ALL-IN-ONE ============================== */}
      <section className="py-16 lg:py-24 fhd:py-20">
        <div className="shell">
          <SectionHeading
            title={<>All-In-One <span className="text-[#00CBB8]">Cloud Software.</span></>}
            subtitle="TOTC is one powerful online software suite that combines all the tools needed to run a successful school or office."
            titleClassName="fhd:text-[36px] fhd:leading-[65px]"
            subtitleClassName="fhd:mt-5 fhd:max-w-[837px] fhd:text-2xl fhd:leading-[43px]"
          />
          {/* Figma: 3 × 450×430, oralig'i 60px */}
          <div className="mt-24 grid gap-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 fhd:mt-[160px] fhd:grid-cols-[repeat(3,450px)] fhd:justify-center fhd:gap-[60px]">
            {allInOne.map(({ key, ...c }, i) => (
              <FeatureCard key={key} Icon={allInOneIcons[i]} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================== WHAT IS TOTC ============================== */}
      <section className="shell py-16 lg:py-24 fhd:pb-20 fhd:pt-[78px]">
        <SectionHeading
          title={<>What is <span className="text-[#00CBB8]">TOTC?</span></>}
          subtitle="TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place."
          titleClassName="fhd:text-[44px] fhd:leading-[1.8]"
          subtitleClassName="fhd:mt-5 fhd:max-w-[1101px] fhd:text-2xl fhd:leading-[1.8]"
        />

        {/* Figma: 2 × 600×400, oralig'i 100px */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2 fhd:mt-20 fhd:grid-cols-[repeat(2,600px)] fhd:justify-center fhd:gap-[100px]">
          {[
            { label: 'FOR INSTRUCTORS', cta: 'Start a class today', to: '/register', image: img.forInstructors, solid: false, overlay: 'bg-navy-deep/60' },
            { label: 'FOR STUDENTS', cta: 'Enter access code', to: '/login', image: img.forStudents, solid: true, overlay: 'bg-navy-deep/25' },
          ].map((c) => (
            <div key={c.label} className="relative overflow-hidden rounded-card">
              <img src={c.image} alt={c.label} className="h-[320px] w-full object-cover sm:h-[400px]" />
              <div className={`absolute inset-0 ${c.overlay}`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
                <p className="text-2xl font-semibold tracking-wide text-white sm:text-3xl fhd:text-[32px] fhd:tracking-normal">{c.label}</p>
                <Link
                  to={c.to}
                  className={`btn btn-md px-9 fhd:h-20 fhd:w-[283px] fhd:px-0 fhd:text-[22px] ${c.solid ? 'bg-cyan/90 text-white hover:bg-cyan' : 'border border-white text-white hover:bg-white hover:text-navy'}`}
                >
                  {c.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================== YOU CAN DO WITH TOTC ============================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 fhd:pb-20 fhd:pt-[92px]">
        {/* Figma: matn x=211 (730px), rasm x=1008 (705×471) */}
        <div className="shell grid items-center gap-12 lg:grid-cols-2 fhd:grid-cols-[730px_705px] fhd:justify-between fhd:pl-[83px] fhd:pr-[79px]">
          <div className="relative">
            {/* Figma: Ellipse 12 — #33EFA0, 73px, sarlavha boshining ortida */}
            <span className="pointer-events-none absolute -left-[25px] -top-[13px] h-[73px] w-[73px] rounded-full bg-[#33EFA0]" />
            <h2 className="relative font-nunito text-[30px] font-bold leading-tight text-navy-title sm:text-[36px] fhd:max-w-[655px] fhd:leading-[58px]">
              Everything you can do in a physical classroom,{' '}
              <span className="text-[#00CBB8]">you can do with TOTC</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-body fhd:mt-[30px] fhd:text-2xl fhd:leading-[43px]">
              TOTC’s school management software helps traditional and online schools manage scheduling,
              attendance, payments and virtual classrooms all in one secure cloud-based system.
            </p>
            <Link to="/courses" className="mt-8 inline-block text-lg text-body underline underline-offset-4 transition hover:text-teal fhd:mt-[30px] fhd:text-[22px]">
              Learn more
            </Link>
          </div>

          <div className="relative">
            {/* Figma: rasm ortidagi ikki kvadrat (20px chiqib turadi) va kichik yashil doira */}
            <span className="absolute -left-5 -top-5 h-[138px] w-[138px] rounded-[20px] bg-[#23BDEE]" />
            <span className="absolute -bottom-5 -right-5 h-[231px] w-[231px] rounded-[20px] bg-[#33EFA0]" />
            <span className="absolute -left-[15%] top-[56%] hidden h-[30px] w-[30px] rounded-full bg-[#33EFA0] lg:block" />
            <div className="relative overflow-hidden rounded-[20px]">
              <img src={img.classroomVideo} alt="Classroom" className="aspect-[3/2] w-full object-cover" />
              <button className="absolute inset-0 flex items-center justify-center" aria-label="Play">
                <span className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white shadow-float transition hover:scale-105">
                  <IconPlay className="ml-1 h-7 w-7 text-cyan" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== OUR FEATURES ============================== */}
      {/* Illyustratsiyalar Figmadan eksport qilingan (public/figma/features/), matnlar — HTML */}
      <section className="py-16 lg:py-24 fhd:pb-[57px] fhd:pt-[105px]">
        <div className="shell">
          <SectionHeading
            title={<>Our <span className="text-[#00CBB8]">Features</span></>}
            subtitle="This very extraordinary feature, can make learning activities more efficient"
            titleClassName="fhd:text-[36px] fhd:leading-[65px]"
            subtitleClassName="fhd:mt-5 fhd:max-w-[888px] fhd:text-2xl fhd:leading-[43px]"
          />
        </div>

        {/* 1 — A user interface designed for the classroom */}
        <div className="shell mt-16 grid items-center gap-10 lg:grid-cols-[930fr_558fr] lg:gap-[92px] 2xl:mt-[100px] fhd:mt-[140px]">
          <img src="/figma/features/feature1.webp" alt="Virtual classroom with instructor and students" className="w-full" />
          <div>
            <FeatureTitle>
              A <Hl>user interface</Hl> designed <br className="hidden xl:block" />for the classroom
            </FeatureTitle>
            <ul className="mt-8 flex flex-col gap-8 2xl:mt-[51px] 2xl:gap-10">
              {[
                { icon: 'featPodium', text: 'Teachers don’t get lost in the grid view and have a dedicated Podium space.' },
                { icon: 'featPresenter', text: 'TA’s and presenters can be moved to the front of the class.' },
                { icon: 'featUsers', text: 'Teachers can easily see all students and class data at one time.' },
              ].map((p) => (
                <li key={p.text} className="flex items-start gap-6 2xl:gap-[39px]">
                  <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#FBFBFB] shadow-[0_15px_44px_rgba(13,15,28,0.12)]">
                    <img src={`/figma/icons/${p.icon}.svg`} alt="" className="h-[27px] w-[28px]" />
                  </span>
                  <FeatureText className="mt-2.5">{p.text}</FeatureText>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2 — Tools For Teachers And Learners */}
        <div className="shell mt-16 grid items-center gap-10 lg:grid-cols-[568fr_678fr] lg:gap-[236px] 2xl:mt-[150px] fhd:mt-[124px] 2xl:pl-[111px] 2xl:pr-[71px]">
          <div className="relative order-2 lg:order-1">
            <FeatureTitle>
              <Hl>Tools</Hl> For Teachers <br className="hidden xl:block" />And Learners
            </FeatureTitle>
            <FeatureText className="mt-5">
              Class has a dynamic set of teaching tools built to be deployed and used during class.
              Teachers can handout assignments in real-time for students to complete and submit.
            </FeatureText>
            <img src="/figma/icons/featHand.svg" alt="" className="pointer-events-none absolute left-[64%] top-[52%] hidden h-[55px] w-[38px] lg:block" />
          </div>
          <img src="/figma/features/feature2.webp" alt="Student holding notebooks" className="order-1 w-full lg:order-2" />
        </div>

        {/* 3 — Assessments, Quizzes, Tests */}
        <div className="shell mt-16 grid items-center gap-10 lg:grid-cols-[670fr_596fr] lg:gap-[195px] 2xl:mt-[160px] fhd:mt-[31px] 2xl:pl-[64px] 2xl:pr-[139px]">
          <img src="/figma/features/feature3.webp" alt="Quiz question with answer sent confirmation" className="w-full" />
          <div>
            <FeatureTitle>
              Assessments, <br className="hidden xl:block" /><Hl>Quizzes</Hl>, Tests
            </FeatureTitle>
            <FeatureText className="mt-5">
              Easily launch live assignments, quizzes, and tests. Student results are automatically
              entered in the online gradebook.
            </FeatureText>
          </div>
        </div>

        {/* 4 — Class Management Tools for Educators */}
        <div className="shell mt-16 grid items-center gap-10 lg:grid-cols-[646fr_880fr] lg:gap-[91px] 2xl:mt-[176px] fhd:mt-[190px] 2xl:pl-[22px] 2xl:pr-[25px]">
          <div className="order-2 lg:order-1">
            <FeatureTitle>
              <Hl>Class Management</Hl> <br className="hidden xl:block" />Tools for Educators
            </FeatureTitle>
            <FeatureText className="mt-5">
              Class provides tools to help run and manage the class such as Class Roster, Attendance,
              and more. With the Gradebook, teachers can review and grade tests and quizzes in real-time.
            </FeatureText>
          </div>
          <img src="/figma/features/feature4.webp" alt="Gradebook with student scores" className="order-1 w-full lg:order-2" />
        </div>

        {/* 5 — One-on-One Discussions */}
        <div className="shell mt-16 grid items-center gap-10 lg:grid-cols-[761fr_540fr] lg:gap-[185px] 2xl:mt-[145px] fhd:mt-[54px] 2xl:pl-[63px] 2xl:pr-[115px]">
          <img src="/figma/features/feature5.webp" alt="Private discussion between teacher and student" className="w-full" />
          <div>
            <FeatureTitle>
              One-on-One <br className="hidden xl:block" /><Hl>Discussions</Hl>
            </FeatureTitle>
            <FeatureText className="mt-5">
              Teachers and teacher assistants can talk with students privately without leaving the
              Zoom environment.
            </FeatureText>
          </div>
        </div>

        <div className="mt-16 flex justify-center 2xl:mt-[150px] fhd:mt-[117px]">
          <Link
            to="/courses"
            className="flex h-16 items-center rounded-[80px] border border-teal px-9 font-nunito text-xl text-teal transition hover:bg-teal hover:text-white 2xl:h-20 2xl:w-[280px] 2xl:justify-center 2xl:text-2xl"
          >
            See more features
          </Link>
        </div>
      </section>

      {/* ============================== EXPLORE COURSE ============================== */}
      {/* Figma (1920px): tepada 247px, pastda 63px — --k bilan masshtablanadi */}
      <section className="relative py-16 font-roboto [--k:0.7] lg:pb-[calc(var(--k)*63px)] lg:pt-[calc(var(--k)*247px)] 2xl:[--k:0.8] fhd:[--k:1]">
        {/* Figma: #9DCCFF 20%, ekranning to'liq kengligi, o'ng-pastki burchagi 100px yumaloq */}
        <span className="pointer-events-none absolute inset-0 bg-[#9DCCFF]/20 lg:rounded-br-[100px]" />

        {/* 1900px+ da Figmadagi chap chegara x=156; 2-3-javonlar Figmada ham o'ngga chiqib turadi */}
        <div className="shell relative fhd:max-w-[1920px] fhd:pl-[156px] fhd:pr-[30px]">
          <h2 className="text-[28px] font-bold leading-[1.2] text-black/[0.87] sm:text-[32px] lg:text-[40px]">Explore Course</h2>
          <p className="mt-2 text-base font-medium text-black/[0.54] lg:text-xl fhd:mt-4 fhd:text-2xl">
            Ut sed eros finibus, placerat orci id, dapibus.
          </p>

          {/* w-max: uchala javon eng uzun javon kengligida — "See all" va javon chiziqlari bir chiziqda.
              max-w-full: tor ekranda javonlar suriladi, sarlavhalar esa ekranda qoladi. */}
          <div className="mt-12 flex w-max max-w-full flex-col gap-12 lg:mt-[calc(var(--k)*145px)] lg:gap-[calc(var(--k)*112px)]">
            {exploreShelves.map((shelf) => {
              const Icon = shelfIcons[shelf.icon];
              const items = [...shelf.books];
              items.splice(shelf.detailAt, 0, 'detail');
              return (
                <div key={shelf.title}>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="flex min-w-0 items-center gap-3 font-roboto text-lg font-bold text-black/[0.87] sm:text-xl lg:text-2xl fhd:text-[28px]">
                      <Icon className="h-6 w-6 text-black/[0.54] lg:h-7 lg:w-7 fhd:h-[29px] fhd:w-[29px]" />
                      {shelf.title}
                    </h3>
                    <Link
                      to="/courses/literature"
                      aria-label={`See all — ${shelf.title}`}
                      className="group flex shrink-0 items-center gap-3 text-base font-medium uppercase text-[#00BCD4] lg:text-xl fhd:text-2xl"
                    >
                      See all
                      <IconArrowRight className="h-6 w-6 transition group-hover:translate-x-1 fhd:h-8 fhd:w-8" />
                    </Link>
                  </div>

                  {/* Javon: kitoblar + ochilgan karta, tagida kulrang chiziq */}
                  <div className="no-scrollbar relative -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8">
                    <div
                      className="relative flex w-max min-w-full items-center"
                      style={{ gap: k(31), padding: `${k(56)} ${k(12)} ${k(23)} ${k(33)}` }}
                    >
                      <span
                        className="absolute bottom-0 left-0 right-0 bg-black/5"
                        style={{ height: k(82), borderRadius: k(29.5) }}
                      />
                      {items.map((b, i) =>
                        b === 'detail' ? (
                          <ShelfDetail key="detail" {...shelf.detail} />
                        ) : (
                          <BookSpine key={i} {...b} />
                        ),
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== TESTIMONIALS ============================== */}
      <section className="shell py-16 lg:py-24 2xl:px-[72px] fhd:pb-[139px] fhd:pt-[151px]">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,612px)_1fr] lg:gap-16 2xl:gap-[158px]">
          <div className="lg:pt-0">
            <span className="flex items-center gap-[30px] font-nunito text-base uppercase tracking-[0.2em] text-[#525596] 2xl:text-xl">
              <span className="h-px w-20 bg-[#525596]" /> Testimonial
            </span>
            <h2 className="mt-5 font-nunito text-[40px] font-bold leading-[1.35] text-navy-title 2xl:text-[60px]">
              What They Say?
            </h2>
            <p className="mt-6 text-lg leading-[1.6] text-body 2xl:mt-7 2xl:text-[26px]">{testimonial.lead}</p>
            <p className="mt-6 text-lg leading-[1.6] text-body 2xl:text-[26px]">{testimonial.sub}</p>
            <p className="mt-10 text-lg leading-[1.6] text-body 2xl:mt-[46px] 2xl:text-[26px]">{testimonial.cta}</p>
            {/* Figma: 403×80 pill + o'ng tomonda 80px doira ichida o'q */}
            <button className="group relative mt-10 flex h-16 w-[340px] max-w-full items-center rounded-[80px] border border-teal pl-9 text-lg text-teal transition hover:bg-teal/5 2xl:mt-[43px] 2xl:h-20 2xl:w-[403px] 2xl:text-[22px]">
              Write your assessment
              <span className="absolute inset-y-[-1px] right-[-1px] flex aspect-square items-center justify-center rounded-full border border-teal">
                <IconArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
              </span>
            </button>
          </div>

          {/* Rasm 560×700 + ustiga chiqib turgan sharh kartasi 680×329 */}
          <div className="relative pb-[120px] sm:pb-[140px] 2xl:pb-[121px]">
            <div className="relative w-full max-w-[560px]">
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="aspect-[4/5] w-full rounded-[20px] object-cover"
              />
              <button
                aria-label="Next"
                className="absolute right-3 top-[41%] sm:right-[-30px] flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#1EA4CE] shadow-[0_4px_60px_rgba(41,44,124,0.15)] 2xl:right-[-58px] 2xl:h-20 2xl:w-20"
              >
                <IconChevronRight className="h-7 w-7" />
              </button>
            </div>
            <blockquote className="absolute bottom-0 left-4 right-0 max-w-[680px] overflow-hidden rounded-[20px] bg-white py-8 pl-[70px] pr-8 shadow-[2px_4px_60px_rgba(41,44,124,0.10)] sm:left-[69px] 2xl:py-[41px] 2xl:pl-[87px] 2xl:pr-[59px]">
              <span className="absolute inset-y-0 left-0 w-[14px] bg-[#F67766]" />
              <span className="absolute left-[40px] top-8 h-[139px] w-px bg-[#BDBDD1] 2xl:left-[55px] 2xl:top-[49px]" />
              <p className="font-nunito text-base leading-[1.8] text-[#5F5F7E] 2xl:text-[22px]">{testimonial.quote}</p>
              <footer className="mt-6 flex items-end justify-between gap-4 2xl:mt-[43px]">
                <cite className="font-nunito text-lg font-semibold not-italic text-[#5F5F7E] 2xl:text-2xl">{testimonial.name}</cite>
                <span className="flex flex-col items-end gap-1">
                  <span className="flex gap-1 text-[#FBA333]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IconStar key={i} className="h-5 w-5 2xl:h-6 2xl:w-6" />
                    ))}
                  </span>
                  <span className="font-nunito text-sm font-semibold text-[#80819A] 2xl:text-lg">{testimonial.meta}</span>
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============================== LATEST NEWS ============================== */}
      {/* Figma (1920px): x=200…1757; katta karta 640px, o'ngda 3 × (280×200 rasm + matn), qadam 250px */}
      <section className="shell pb-20 lg:pb-28 2xl:pl-[72px] 2xl:pr-[35px] fhd:pb-[115px]">
        <SectionHeading
          title="Lastest News and Resources"
          subtitle="See the developments that have occurred to TOTC in the world"
          titleClassName="font-nunito font-bold fhd:text-[36px] fhd:leading-[65px]"
          subtitleClassName="font-nunito fhd:mt-5 fhd:max-w-none fhd:text-2xl fhd:leading-[43px]"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[640fr_797fr] lg:gap-12 fhd:mt-[100px] fhd:gap-[120px]">
          <article>
            <Link to={`/blog/${news[0].slug}`} className="group block">
              <div className="relative overflow-hidden rounded-[20px]">
                <img
                  src={news[0].image}
                  alt={news[0].title}
                  className="aspect-[640/340] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-navy-deep/10" />
              </div>
              <span className="mt-8 inline-flex h-10 items-center rounded-[80px] bg-teal px-[35px] text-base font-medium uppercase text-white fhd:mt-10 fhd:text-xl">
                {news[0].tag}
              </span>
              <h3 className="mt-5 text-xl font-medium leading-[1.8] text-navy group-hover:text-teal fhd:max-w-[609px] fhd:text-[26px]">
                {news[0].title}
              </h3>
              <p className="mt-5 leading-[1.8] text-body fhd:max-w-[609px] fhd:text-xl">{news[0].excerpt}</p>
              <span className="mt-5 inline-block text-body underline underline-offset-4 group-hover:text-teal fhd:mt-7 fhd:text-xl">
                Read more
              </span>
            </Link>
          </article>

          <div className="flex flex-col gap-8 fhd:gap-[50px]">
            {news.slice(1).map((n) => (
              <Link key={n.slug} to={`/blog/${n.slug}`} className="group flex gap-5 fhd:gap-10">
                <div className="relative h-[140px] w-[190px] shrink-0 overflow-hidden rounded-[20px] sm:h-[160px] sm:w-[224px] fhd:h-[200px] fhd:w-[280px]">
                  <img src={n.image} alt={n.title} loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute inset-0 bg-navy-deep/10" />
                  {/* Figma: teg rasmning o'ng-pastki burchagida, chetlardan 20px */}
                  <span className="absolute bottom-3 right-3 inline-flex h-7 items-center rounded-[80px] bg-teal px-3 text-xs uppercase text-white fhd:bottom-5 fhd:right-5 fhd:h-[34px] fhd:px-3 fhd:text-lg">
                    {n.tag}
                  </span>
                </div>
                <div className="min-w-0">
                  <h4 className="line-clamp-2 font-medium leading-[1.8] text-navy group-hover:text-teal fhd:text-[22px]">
                    {n.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-sm leading-[1.8] text-body fhd:mt-5 fhd:max-w-[447px] fhd:text-xl">{n.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
