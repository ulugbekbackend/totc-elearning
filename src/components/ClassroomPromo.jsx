import { Link } from 'react-router-dom';
import img from '../assets/images.js';
import { IconPlay } from './Icons.jsx';

/**
 * "Everything you can do in a physical classroom" bloki — Landing va Course Detail'da bir xil.
 * Figma: matn x=211 (730px), rasm x=1008 (705×471). Sarlavha shrifti sahifaga qarab farq qiladi
 * (Landing — Nunito Sans 700, Course Detail — Poppins 500), shuning uchun `titleClassName` orqali.
 */
export default function ClassroomPromo({
  className = '',
  titleClassName = 'font-nunito font-bold leading-tight fhd:leading-[58px]',
}) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className="shell grid items-center gap-12 lg:grid-cols-2 fhd:grid-cols-[730px_705px] fhd:justify-between fhd:pl-[83px] fhd:pr-[79px]">
        <div className="relative">
          {/* Figma: Ellipse 12 — #33EFA0, 73px, sarlavha boshining ortida */}
          <span className="pointer-events-none absolute -left-[25px] -top-[13px] h-[73px] w-[73px] rounded-full bg-[#33EFA0]" />
          <h2 className={`relative text-[30px] text-navy-title sm:text-[36px] fhd:max-w-[655px] ${titleClassName}`}>
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
  );
}
