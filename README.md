# آدم & ليان — Digital Wedding Invitation

Luxury Arabic RTL wedding invitation for Adam & Layan.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

> **Note:** The project folder name contains `&`. Scripts use direct `node` paths so npm works correctly on Windows.

## Configure the wedding

All couple-specific content lives in:

- `src/data/weddingData.ts` — names, date, venue, copy, RSVP, calendar
- `src/data/galleryImages.ts` — gallery photos & categories

## Premium features

| Feature | How to use |
|---|---|
| Guest personalization | `/?guest=Ahmed` or `/?guest=أحمد` |
| WhatsApp share | RSVP section → «شاركوا فرحتنا» |
| Add to calendar | Event section → Google Calendar / ICS |
| Gallery lightbox | Click any photo; arrows, swipe, Esc |
| RSVP | Attendance buttons open the modal (mock mode until `rsvp.apiUrl` is set) |

## RSVP backend

Set `weddingData.rsvp.apiUrl` to your endpoint. Until then, submissions use an explicit **mock** service and can also be sent via WhatsApp.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run preview` — preview production build
