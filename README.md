# TOTC — E-Learning Site

Figmadagi **E-Learning Site** dizaynining React 19 + Tailwind CSS implementatsiyasi.
Barcha 18 ta ekran, bitta umumiy dizayn tizimi, to'liq responsive (mobil → 1920px).

Figma: `figma.com/design/5Re2ffI6ua28Z4H5aDqR2F/E-Learning-Site`

---

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ ga yig'adi
npm run preview    # yig'ilgan versiyani ko'rish

# port band bo'lsa:
npm run dev -- --port 5180
```

---

## Marshrutlar (routes)

| Figmadagi ekran | Route | Fayl |
|---|---|---|
| Landing | `/` | `pages/Landing.jsx` |
| Login | `/login` | `pages/Login.jsx` |
| Register | `/register` | `pages/Register.jsx` |
| Mobile Login | `/login` (< 1024px) | `components/AuthScreen.jsx` |
| Mobile Register | `/register` (< 1024px) | `components/AuthScreen.jsx` |
| Course | `/courses` | `pages/Courses.jsx` |
| Course Detail | `/courses/:slug` | `pages/CourseDetail.jsx` |
| Course Full View | `/courses/:slug/full` | `pages/CourseFullView.jsx` |
| Literature course | `/courses/literature` | `pages/LiteratureCourse.jsx` |
| Course Calendar | `/calendar` | `pages/CourseCalendar.jsx` |
| Course Calendar Create 1 | `/calendar/create` (1-qadam) | `pages/CourseCalendarCreate.jsx` |
| Course Calendar Create 2 | `/calendar/create` (2-qadam) | `pages/CourseCalendarCreate.jsx` |
| Meeting | `/meeting` | `pages/Meeting.jsx` |
| MemberShip page | `/membership` | `pages/Membership.jsx` |
| Checkout page | `/checkout` | `pages/Checkout.jsx` |
| Blog page | `/blog` | `pages/Blog.jsx` |
| Blog detail | `/blog/:slug` | `pages/BlogDetail.jsx` |
| Search | `/search` | `pages/Search.jsx` |
| — | `*` | `pages/NotFound.jsx` |

**Eslatma:** Figmada `Login`/`Mobile Login` va `Register`/`Mobile Register` alohida frame'lar
edi. Ular bitta responsive komponentga birlashtirildi (`AuthScreen`) — kod ikki marta
yozilmasligi uchun. `Course Calendar Create1/Create2` ham bitta ikki qadamli sehrgar.

---

## Dizayn tizimi

Figmadan avtomatik chiqarilgan (4358 ta node tahlil qilindi).

### Ranglar — `tailwind.config.js`

| Token | Hex | Ishlatilishi |
|---|---|---|
| `teal` | `#49BBBD` | asosiy brend rangi, CTA tugmalar |
| `teal-light` / `teal-dark` | `#83E6E8` / `#2A9D9F` | hover, gradient |
| `navy` | `#252641` | asosiy matn, footer foni |
| `navy-title` | `#2F327D` | sarlavhalar |
| `navy-deep` | `#171B41` | meeting ekrani foni |
| `body` | `#696984` | asosiy paragraf matni |
| `line` | `#DCE2EE` | chegaralar |
| `lilac` | `#B2B3CF` | placeholder, ikkinchi darajali matn |
| `orange` / `amber` | `#F48C06` / `#FBA333` | urg'u ("Studying") |
| `coral` / `rose` | `#EE645B` / `#EE6767` | ogohlantirish, "Join Now" |
| `indigo` | `#545AE8` | ikonkalar |
| `mint` / `green` | `#55EFC4` / `#33EFA0` | muvaffaqiyat holati |
| `cloud` | `#F5F5FC` | yengil fon |

### Tipografika

Uchala shrift Google Fonts'dan, `index.html`da ulangan:

| Shrift | Qayerda |
|---|---|
| **Poppins** | asosiy matn, tugmalar, ko'p sarlavhalar |
| **Nunito Sans** | hero sarlavhasi, "Our Features" sarlavhalari, Testimonial |
| **Roboto** | "Explore Course" bo'limi |

Figmada `Buenos Aires Trial` ham uchraydi (Our Success raqamlari), lekin u pullik
shrift bo'lgani uchun Poppins bilan almashtirilgan.

Shkala: `display` 64 · `h1` 50 · `h2` 45 · `h3` 30 · `h4` 24 · `lead` 20 · body 16.

### Breakpointlar

Tailwind standartlari + qo'shimcha `fhd` (1900px). Figma kadri 1920px bo'lgani uchun
Landing'dagi aniq o'lchamlar (masalan hero koordinatalari, 143px navbar, kitob
javonlari) `fhd:` prefiksi bilan beriladi. Kichikroq ekranlarda moslashuvchan layout
ishlaydi. Konteyner kengligi — `.shell`, maksimum 1664px (Figmadagi 1600px kontent + padding).

### Radiuslar va soyalar

`card` 20px · `lg2` 24px · `soft` 12px · `pill` 60px
`shadow-card` · `shadow-float` · `shadow-pop`

### Tayyor CSS klasslari — `src/index.css`

`.shell` (konteyner) · `.btn-primary` `.btn-outline` `.btn-ghost` `.btn-glass` ·
`.btn-sm/md/lg` · `.field` · `.card-soft` · `.eyebrow`

---

## Struktura

```
src/
├─ assets/images.js        # barcha rasm manbalari — bitta joyda
├─ components/
│  ├─ Icons.jsx            # Figmadan chiqarilgan SVG ikonkalar + interfeys ikonkalari
│  ├─ ui.jsx               # SectionHeading, CourseCard, BookCard, PriceCard, PostCard…
│  ├─ Navbar.jsx           # landing'da shaffof, scroll'da oq bo'ladi
│  ├─ Footer.jsx
│  ├─ Logo.jsx             # Figmadagi romb shakli (SVG) + "TOTC"
│  └─ AuthScreen.jsx       # Login + Register + ularning mobil versiyasi
├─ layouts/
│  ├─ SiteLayout.jsx       # Navbar + Footer (ommaviy sahifalar)
│  └─ AppLayout.jsx        # sidebar (calendar ekranlari)
├─ data/content.js         # barcha matn va ro'yxatlar — Figmadagi nusxalar
├─ pages/                  # 16 ta sahifa komponenti
└─ index.css
public/
├─ figma/                  # Figmadan olingan rasmlar (WebP)
│  ├─ features/            # "Our Features" illyustratsiyalari
│  └─ icons/               # logo rombi, kichik ikonkalar
└─ favicon.svg
```

---

## Rasmlar

Barcha fotosuratlar **Figma faylidan** olingan va repozitoriyda saqlanadi
(`public/figma/`, WebP, jami ~6 MB). Har bir rasm saytdagi eng katta ko'rinish
o'lchamidan 2 barobar kattaroq qilib siqilgan (Retina ekranlar uchun), sifat 92.

Ikonkalar ham asl — Figmadan SVG sifatida chiqarilgan (`Icons.jsx` va
`public/figma/icons/`).

Figmada alohida rasmi bo'lmagan bir nechta joy bor (avatarlar, Meeting oynalari,
ba'zi blog va kitob rasmlari) — dizaynda u yerlar kulrang to'rtburchak. Ular uchun
Figmadagi mos rasmlardan kesib olingan nusxalar ishlatilgan. Masalan avatarlar —
"Our Features" illyustratsiyasidagi aynan o'sha odamlar (Eveny Howard, Adam Levin,
Tamara Clarke, Humbert Holland, Patricia Mendoza) va Testimonial'dagi Gloria Rose.

Rasmlar repozitoriyda tayyor holda yotadi — klon qilib `npm install && npm run dev`
qilsangiz yetarli, qo‘shimcha yuklash kerak emas.

---

## Tekshiruv

```bash
npm run build && npm run preview
```

Landing 1920 / 1440 / 390px da Figma bilan solishtirilgan: bo'lim joylashuvlari va
sahifa balandligi mos (1920px da 13489px — Figmadagi bilan bir xil). Barcha route'lar
desktop va mobilda tekshirilgan — konsol xatolari yo'q, gorizontal scroll yo'q.

### Hali qilinmagan

- Landing'dan boshqa 17 ta ekran Figma bilan piksel darajasida solishtirilmagan.

---

## Keyingi qadamlar (taklif)

- **Backend:** Django + DRF uchun modellar — `Course`, `Lesson`, `Enrollment`,
  `Membership`, `Order`, `Post`, `ClassSession`, `Attendance`, `Grade`.
- `data/content.js` ni API chaqiruvlariga almashtirish (React Query yoki SWR).
- Auth: `AuthScreen` hozir faqat UI — JWT yoki session bilan ulash kerak.
- Meeting ekrani UI darajasida — real video uchun WebRTC yoki Zoom SDK.
