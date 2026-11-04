# BookNook – A Small Online Library

**Live site:** https://your-booknook-client.vercel.app  <!-- replace after deploying -->
**Server repo / API:** https://your-booknook-api.onrender.com  <!-- replace after deploying -->

> Add a book, borrow a book, return a book.

## Features

- **Secure authentication** with BetterAuth (MongoDB adapter): email/password login, Google social login, password rules (uppercase, lowercase, 6+ characters) and redirect-back after login.
- **Private routes that survive reloads**: Add Book, My Books, My Borrows, Book Details and Profile are guarded by the Next.js 16 `proxy.ts`, so logged-in users are never bounced to Login on refresh.
- **Full book CRUD**: add with imgbb image upload, edit through a pre-filled modal, and delete with a custom confirm modal (no browser alerts anywhere, only toasts).
- **Smart borrowing system**: pick a return date, track copies with `$inc`, "Not Available" button at 0 copies, and no double-borrowing of the same book.
- **JWT-protected API**: the client sends a BetterAuth JWT; the Express server verifies it against the BetterAuth JWKS endpoint.
- **Polished UI**: Swiper hero slider, dynamic New Arrivals (newest 6), Framer Motion (`motion`) animations, dark/light theme toggle, search & category filter, loading spinners, custom 404 and per-route page titles.
- **Fully responsive** for mobile, tablet and desktop.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · daisyUI 5 · BetterAuth · MongoDB · Swiper · Motion · Sonner

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

### Environment variables

See `.env.example`. For Google login add `http://localhost:3000/api/auth/callback/google` (and your live URL equivalent) as an authorised redirect URI in Google Cloud Console.

### Deploying (Vercel)

Add every variable from `.env.example` in the Vercel project settings. Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your live URL, and `NEXT_PUBLIC_API_URL` to your deployed server. Also add the live URL as an authorised origin and redirect URI in Google Cloud Console.
