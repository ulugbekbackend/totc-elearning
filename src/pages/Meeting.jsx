import { useState } from 'react';
import { Link } from 'react-router-dom';
import { participants } from '../data/content.js';
import Logo from '../components/Logo.jsx';
import {
  IconMic, IconVideo, IconChat, IconUsers, IconGrid, IconClose, IconSend, IconPhone,
} from '../components/Icons.jsx';

const messages = [
  { who: 'Adam Levin', text: 'Can you share the slide again?', me: false },
  { who: 'You', text: 'Sure — posting it in resources now.', me: true },
  { who: 'Tamara Clarke', text: 'Thanks! The second sketch made it click.', me: false },
];

export default function Meeting() {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [panel, setPanel] = useState('chat');
  const main = participants.find((p) => p.main) || participants[0];
  const tiles = participants.filter((p) => !p.main);

  return (
    <div className="flex min-h-screen flex-col bg-navy-deep text-white">
      {/* Yuqori panel */}
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 lg:px-8">
        <Logo tone="light" />
        <div className="hidden text-center sm:block">
          <p className="font-medium">User Experience Class</p>
          <p className="text-sm text-white/50">Live · 42 min</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-pill bg-white/10 px-4 py-2 text-sm sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-coral" /> Recording
          </span>
          <Link
            to="/calendar"
            className="rounded-pill bg-coral px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Leave
          </Link>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Video maydoni */}
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 lg:p-8">
          <div className="relative flex-1 overflow-hidden rounded-card bg-black/40">
            <img src={main.photo} alt={main.name} className="h-full w-full object-cover" />
            <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-pill bg-navy/70 px-4 py-2 text-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-mint" />
              {main.name}
              <span className="text-white/60">· {main.role}</span>
            </span>
            <span className="absolute right-5 top-5 rounded-pill bg-teal px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Podium
            </span>
          </div>

          {/* Ishtirokchilar qatori */}
          <div className="no-scrollbar flex gap-4 overflow-x-auto">
            {tiles.map((p) => (
              <div key={p.name} className="relative aspect-video w-44 shrink-0 overflow-hidden rounded-soft bg-black/40">
                <img src={p.photo} alt={p.name} className="h-full w-full object-cover" />
                <span className="absolute bottom-2 left-2 rounded-pill bg-navy/70 px-2.5 py-1 text-[11px] backdrop-blur">
                  {p.name}
                </span>
              </div>
            ))}
            <div className="flex aspect-video w-44 shrink-0 items-center justify-center rounded-soft border border-dashed border-white/20 text-sm text-white/50">
              +18 more
            </div>
          </div>

          {/* Boshqaruv tugmalari */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setMic((v) => !v)}
              className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
                mic ? 'bg-white/10 hover:bg-white/20' : 'bg-coral'
              }`}
              aria-label="Toggle microphone"
            >
              <IconMic className="h-6 w-6" />
            </button>
            <button
              onClick={() => setCam((v) => !v)}
              className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
                cam ? 'bg-white/10 hover:bg-white/20' : 'bg-coral'
              }`}
              aria-label="Toggle camera"
            >
              <IconVideo className="h-6 w-6" />
            </button>
            <button className="flex h-14 items-center gap-2 rounded-full bg-teal px-7 font-medium transition hover:bg-teal-dark">
              <IconGrid className="h-5 w-5" /> Present
            </button>
            <button
              onClick={() => setPanel(panel === 'chat' ? null : 'chat')}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 lg:hidden"
              aria-label="Chat"
            >
              <IconChat className="h-6 w-6" />
            </button>
            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-coral transition hover:brightness-95" aria-label="End call">
              <IconPhone className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Yon panel */}
        {panel && (
          <aside className="flex w-full shrink-0 flex-col border-t border-white/10 bg-white/5 lg:w-[360px] lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex gap-1">
                {[
                  { id: 'chat', label: 'Chat', Icon: IconChat },
                  { id: 'people', label: 'People', Icon: IconUsers },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setPanel(t.id)}
                    className={`flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-medium transition ${
                      panel === t.id ? 'bg-teal text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <t.Icon className="h-4 w-4" /> {t.label}
                  </button>
                ))}
              </div>
              <button onClick={() => setPanel(null)} aria-label="Close panel" className="text-white/50 hover:text-white">
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            {panel === 'chat' ? (
              <>
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex flex-col ${m.me ? 'items-end' : 'items-start'}`}>
                      <span className="mb-1 text-xs text-white/40">{m.who}</span>
                      <span
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                          m.me ? 'bg-teal text-white' : 'bg-white/10 text-white/90'
                        }`}
                      >
                        {m.text}
                      </span>
                    </div>
                  ))}
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 border-t border-white/10 p-4">
                  <input
                    placeholder="Message everyone…"
                    className="min-w-0 flex-1 rounded-pill bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-teal/50"
                  />
                  <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal transition hover:bg-teal-dark" aria-label="Send">
                    <IconSend className="h-5 w-5" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 overflow-y-auto p-5">
                <p className="mb-4 text-sm text-white/50">{participants.length + 18} in the room</p>
                <ul className="flex flex-col gap-3">
                  {participants.map((p) => (
                    <li key={p.name} className="flex items-center gap-3">
                      <img src={p.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm">{p.name}</span>
                        {p.role && <span className="block text-xs text-teal">{p.role}</span>}
                      </span>
                      <IconMic className="h-4 w-4 text-white/40" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
