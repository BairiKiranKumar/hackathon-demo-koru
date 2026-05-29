# Integrations

## TanStack React Query (v5)

**Purpose:** All server/async state management.

**Setup:** QueryClient is configured in `main.tsx` (or App entry) with:
- `refetchOnWindowFocus: false`
- `retry: 1`

**Usage pattern:**
```ts
// src/features/{feature}/api/use{Resource}.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../services/api';

export function useProducts(search?: string) {
  return useQuery({
    queryKey: ['products', search],
    queryFn: () => api.products.search(search ?? ''),
  });
}
```

**Cache invalidation:** Not yet implemented (read-only app). When mutations are added, use `queryClient.invalidateQueries({ queryKey: ['products'] })`.

---

## React Router v7

**Setup:** `createBrowserRouter` in `src/routes/index.tsx`, mounted via `RouterProvider` in the app entry.

**Key APIs in use:**
- `useParams()` — extract `:id` on detail pages
- `useLocation()` — active nav detection in sidebar
- `<Link>` — all internal navigation
- `<Outlet>` — nested route rendering inside `App.tsx`

**Adding a new route:**
1. Create the page component in `src/pages/`.
2. Add the route object to `src/routes/index.tsx`.
3. Add a nav link in `src/app/App.tsx` if it should appear in the sidebar.

---

## Mock API (`src/services/api.ts`)

**Purpose:** Simulates a REST API with realistic async delay (500–800ms).

**Data source:** `src/mocks/data.json` — flat JSON with `products[]` and `orders[]` arrays.

**Switching to a real API:** Replace each method body in `api.ts` with a `fetch` / `axios` call. Hook signatures stay the same; no changes needed in pages or components.

---

## Tailwind CSS (v3)

**Config:** `tailwind.config.js` — content paths cover all `src/**/*.{ts,tsx}`.

**Theme extension:** Custom CSS variables in `src/index.css` (`:root`) define the color system. Tailwind references them via `hsl(var(--token))` in the config.

**Adding colors:** Add the CSS variable to `:root` in `index.css`, then reference it in `tailwind.config.js` under `theme.extend.colors`.

---

## Vitest

**Config:** Defined inside `vite.config.ts` under the `test` key.

```ts
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./src/setupTests.ts'],
}
```

**Running tests:** `npm run test` (no dedicated test script found — check if `vitest` is run directly or via `vite`).

---

## Lucide React

**Purpose:** Icon library used in sidebar navigation and detail page cards.

**Usage:** Import individual icons — `import { Package, ShoppingCart } from 'lucide-react'`. Never import the whole library.

---

## Build & Dev

| Command | Action |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | `tsc -b && vite build` — type check then bundle |
| `npm run lint` | ESLint with typescript-eslint |
| `npm run preview` | Serve the `dist/` build locally |
