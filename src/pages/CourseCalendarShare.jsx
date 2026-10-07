import { shareIntro, sharePosts } from '../data/content.js';
import CoursePlayerShell from '../components/CoursePlayerShell.jsx';
import { PageIntro } from './CourseCalendar.jsx';

/**
 * Figma "Course Calendar Create2" (74:231) — "Share and Refer".
 * Kartalar 1353×316 (x=531, 346px qadam), o'ng yuqorida 6 ta 32px teal ijtimoiy tugma (57px qadam),
 * ichki rangli blok 1293×132 (sky / orange / coral, 20% shaffof).
 */
const socials = ['twitter', 'facebook', 'youtube', 'instagram', 'telegram', 'whatsapp'];
const toneBg = { sky: 'bg-sky/20', orange: 'bg-orange/20', coral: 'bg-coral/20' };

function SharePost({ post }) {
  return (
    <article className="rounded-[20px] bg-white p-6 sm:px-[30px] sm:pb-[45px] sm:pt-[30px] fhd:h-[316px] fhd:w-[1353px]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="text-2xl font-semibold leading-[1.5] text-navy fhd:text-[30px] fhd:leading-[45px]">{post.title}</h3>
        <div className="flex gap-[25px]">
          {socials.map((s) => (
            <a key={s} href="#" aria-label={`Share on ${s}`} className="block h-8 w-8 rounded-full transition hover:opacity-80">
              <img src={`/figma/icons/social/${s}Teal.svg`} alt="" width="32" height="32" />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-4 text-base leading-[1.5] tracking-[0.02em] text-body fhd:mt-[17px] fhd:text-lg fhd:leading-[27px]">{post.subtitle}</p>
      <p
        className={`mt-5 break-words p-4 text-base leading-[1.5] tracking-[0.02em] text-body sm:p-[21px] fhd:h-[132px] fhd:pr-[45px] fhd:text-lg fhd:leading-[27px] ${toneBg[post.tone]}`}
      >
        {post.text}
      </p>
    </article>
  );
}

export default function CourseCalendarShare() {
  return (
    <CoursePlayerShell backTo="/calendar" backLabel="Back to calendar" sections={2} panelPb="fhd:pb-[30px]">
      <div className="px-5 pb-12 pt-8 sm:px-8 fhd:pb-0 fhd:pl-[30px] fhd:pr-[36px] fhd:pt-[30px]">
        <PageIntro title="Share and Refer" paragraphs={shareIntro} />
        <div className="mt-10 flex flex-col gap-[30px] fhd:ml-1 fhd:mt-[59px]">
          {sharePosts.map((p, i) => (
            <SharePost key={i} post={p} />
          ))}
        </div>
      </div>
    </CoursePlayerShell>
  );
}
