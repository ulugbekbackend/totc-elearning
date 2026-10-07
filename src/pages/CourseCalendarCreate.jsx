import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEventDefaults as ph } from '../data/content.js';
import CoursePlayerShell from '../components/CoursePlayerShell.jsx';
import { FaIcon } from '../components/CourseBlocks.jsx';

/**
 * Figma "Course Calendar Create1" (62:245). Forma kartasi 1337×1006 (x=533, y=389):
 * yorliqlar 18px #5B5B5B, maydonlar 60px (tavsif 260px), 616px ikki ustun orasi 44px, "Save Now" 337×63.
 */
const labelCls = 'block text-lg font-semibold leading-[27px] text-muted';
const fieldCls =
  'mt-2.5 block h-[60px] w-full rounded-[10px] border border-[#d9d9d9] bg-transparent px-5 text-lg text-[#5b5b5b] outline-none ' +
  'transition placeholder:text-[#9d9b9b] focus:border-teal focus:ring-4 focus:ring-teal/15';

function Field({ label, className = '', children }) {
  return (
    <label className={`block ${className}`}>
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

export default function CourseCalendarCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', start: '', end: '', location: '', notification: '30 mins', email: '', description: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    navigate('/calendar/share');
  };

  return (
    <CoursePlayerShell backTo="/calendar" backLabel="Back to calendar" sections={2} panelPb="fhd:pb-[30px]">
      <div className="px-5 pb-12 pt-8 sm:px-8 fhd:pb-0 fhd:pl-[30px] fhd:pr-[50px] fhd:pt-[30px]">
        <h2 className="text-2xl font-semibold leading-[1.5] text-navy fhd:text-[30px] fhd:leading-[45px]">Create new event</h2>
        <p className="mt-4 break-words text-base leading-[1.5] tracking-[0.02em] text-body fhd:mt-5 fhd:w-[1359px] fhd:text-lg fhd:leading-[27px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodeiusmodadipiscing elit, sed do eiusmodLorem
        </p>

        <form
          onSubmit={submit}
          className="mt-8 rounded-[20px] bg-white p-6 sm:px-[30px] sm:pb-[98px] sm:pt-[30px] fhd:ml-1.5 fhd:mt-[50px] fhd:h-[1006px] fhd:w-[1337px] fhd:pl-[30px] fhd:pr-[31px]"
        >
          <Field label="Event Name">
            <input className={fieldCls} value={form.name} onChange={set('name')} placeholder={ph.name} required />
          </Field>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-x-11">
            <Field label="Start date / Time">
              <input className={fieldCls} value={form.start} onChange={set('start')} placeholder={ph.start} />
            </Field>
            <Field label="End Date / Time">
              <input className={fieldCls} value={form.end} onChange={set('end')} placeholder={ph.end} />
            </Field>
          </div>

          <Field label="Location" className="mt-5">
            <input className={fieldCls} value={form.location} onChange={set('location')} placeholder={ph.location} />
          </Field>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-x-11">
            <Field label="Notification">
              <span className="relative block">
                <select className={`${fieldCls} appearance-none pr-12 text-[#9d9b9b]`} value={form.notification} onChange={set('notification')}>
                  {['10 mins', '30 mins', '1 hour', '1 day'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <FaIcon name="faAngleDown" className="pointer-events-none absolute right-[21px] top-1/2 mt-[5px] h-2.5 w-[15px] -translate-y-1/2 text-body" />
              </span>
            </Field>
            <Field label="Email">
              <input type="email" className={fieldCls} value={form.email} onChange={set('email')} placeholder={ph.email} />
            </Field>
          </div>

          <Field label="Event Description" className="mt-5">
            <textarea
              className={`${fieldCls} h-[260px] resize-none py-4 leading-[27px]`}
              value={form.description}
              onChange={set('description')}
              placeholder={ph.description}
            />
          </Field>

          <div className="mt-10 flex justify-end fhd:mt-[50px]">
            <button
              type="submit"
              className="h-[63px] w-full rounded-xl bg-teal text-2xl font-bold text-white transition hover:bg-teal-dark sm:w-[337px]"
            >
              Save Now
            </button>
          </div>
        </form>
      </div>
    </CoursePlayerShell>
  );
}
