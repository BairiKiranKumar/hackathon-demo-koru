# Architecture

## Overview

Commerce Admin — a React + TypeScript single-page admin dashboard for managing products and orders. Built with Vite. All data is currently served from local mock JSON (no live backend).

---

## Technology Stack

| Layer | Choice | Version |
|---|---|---|
| UI Framework | React | 19.x |
| Language | TypeScript | 6.x (strict) |
| Build Tool | Vite | 8.x |
| Routing | React Router v7 | 7.x |
| Data Fetching / Server State | TanStack React Query | 5.x |
| Styling | Tailwind CSS | 3.x |
| Icons | Lucide React | latest |
| Class Utility | clsx + tailwind-merge via `cn()` | — |
| Testing | Vitest + Testing Library + jsdom | 4.x / 16.x |

No Redux, Zustand, or React Context for state. React Query is the only state layer.

---

## Folder Structure

```
src/
├── app/          App.tsx — layout shell with sidebar navigation
├── assets/       Static images
├── components/   Shared primitives: Card, Table (compound components)
├── features/     Feature modules (dashboard, orders, products)
│   └── {feature}/
│       ├── api/        useQuery hooks for this feature
│       └── components/ Feature-specific UI
├── hooks/        Global custom hooks (currently empty)
├── mocks/        data.json — mock data source
├── pages/        Page-level components mounted by the router
├── routes/       index.tsx — router definition (createBrowserRouter)
├── services/     api.ts — mock API namespace (api.products.*, api.orders.*)
├── types/        index.ts — shared TypeScript interfaces
├── utils.ts      cn() helper
└── setupTests.ts Vitest global setup
```

---

## Routing

Framework: `react-router-dom` v7 with `createBrowserRouter`.

Root layout: `App` component wraps all routes (sidebar + main content area).

| Path | Page |
|---|---|
| `/` | DashboardPage |
| `/products` | ProductsPage |
| `/products/:id` | ProductDetailsPage |
| `/orders` | OrdersPage |
| `/orders/:id` | OrderDetailsPage |

---

## Data Flow

```
Page
 └── feature/api/use*.ts  (React Query useQuery hook)
       └── services/api.ts  (mock async function, 500–800ms delay)
             └── mocks/data.json  (source of truth for all data)
```

No HTTP calls currently. `api.ts` simulates latency with `setTimeout`.

---

## API Namespace (`services/api.ts`)

```
api.products.getAll()
api.products.getById(id)
api.products.search(query)
api.orders.getAll()
api.orders.getById(id)
api.orders.getRecent(limit)
api.dashboard.getStats()  → { totalProducts, totalOrders }
```

---

## Pages & Features

| Feature | Hooks | Components |
|---|---|---|
| Dashboard | useDashboardStats | StatsCard, RecentOrdersTable |
| Products | useProducts, useProduct | ProductListTable, ProductSearch |
| Orders | useOrders, useOrder, useRecentOrders | OrderListTable |

---

## Shared Components (`src/components/`)

Both are compound components built with `React.forwardRef` and pure Tailwind.

- **Card** — `Card > CardHeader > CardTitle > CardContent`
- **Table** — `Table > TableHeader > TableBody > TableHead > TableRow > TableCell`

---

## TypeScript Config (strict)

- Target: ES2023, module: esnext
- `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`: true
- `verbatimModuleSyntax`: true — import types must use `import type`

---

## Testing

- Runner: Vitest (jsdom environment, globals enabled)
- Assertions: `@testing-library/jest-dom`
- Setup: `src/setupTests.ts`
- Current coverage: `utils.test.ts` covers the `cn()` utility only
