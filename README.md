# Amazon Store

Simple product listing app — browse products, filter them, click through to a detail page. Data comes from [DummyJSON](https://dummyjson.com/docs/products).

Built with React, Vite, Tailwind CSS, React Router, and Framer Motion.

## Getting started

You need Node.js installed.

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

Other useful commands:

- `npm run build` — production build
- `npm run preview` — preview the build locally
- `npm run lint` — run ESLint

No `.env` file needed. The app talks to DummyJSON directly.

## What it does

- Product grid with image, title, price, and rating
- Filters: category, price range, brand
- Search bar (hits `/products/search`)
- Pagination (8 products per page)
- Product detail page at `/product/:id`
- Filters stay applied when you go to a product and hit back

## Assumptions

- DummyJSON is up and the API shape doesn't change.
- Price and brand filtering happen on the client after fetching products.
- I fetch all products in a category (or the full catalog) with `limit=0` so brands and combined filters work properly — fine for ~200 products, wouldn't scale to a real catalog.
- Only one category can be selected at a time. Multiple brands is fine.
- Search is debounced by 400ms. Clearing it resets immediately.
- Cart, notifications, and profile icons in the header don't do anything — they're just UI.
- It's a client-side React app, so "View Source" won't show product HTML. Inspect element will.

## How it's built

**Stack:** React 19, Vite, Tailwind v4, React Router, Framer Motion, react-helmet-async for meta tags.

**Folders:**

```
src/
  components/   UI pieces (cards, filters, navbar, etc.)
  context/      FilterContext — keeps filters alive across pages
  hooks/        useProducts, useDebounce
  pages/        listing + detail
  services/     API calls
  utils/        pagination + SEO helpers
```

**State:** Filter state (`search`, `category`, `price`, `brands`, `page`) lives in a React Context. Didn't pull in Redux — wasn't needed for this size.

**Fetching:**
- All products → `GET /products`
- By category → `GET /products/category/{slug}`
- Search → `GET /products/search?q=...`
- Single product → `GET /products/{id}`

Price, brand, and category (during search) get filtered in the browser. Pagination is also client-side on whatever's left after filtering.

**SEO:** Semantic HTML, meta tags per page, JSON-LD for products. Good enough for a demo; not true SSR.

## If I had more time

- Put filters in the URL so links are shareable
- Use API `limit`/`skip` instead of loading everything upfront
- Add tests (Vitest for hooks, Playwright for the main flows)
- SSR so crawlers and View Source actually see content
- Working cart, sort dropdown, search autocomplete
- Skeleton loaders instead of a spinner

## API docs

https://dummyjson.com/docs/products
