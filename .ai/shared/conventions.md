# Conventions

## File & Folder Naming

- Folders: camelCase (`dashboard`, `orderDetails`)
- Component files: PascalCase (`ProductListTable.tsx`)
- Hook files: camelCase starting with `use` (`useProducts.ts`)
- Utility/service files: camelCase (`api.ts`, `utils.ts`)
- Type files: camelCase (`index.ts` under `types/`)

---

## Component Patterns

- Shared primitives live in `src/components/` and are compound components using `React.forwardRef`.
- Feature-specific components live in `src/features/{feature}/components/`.
- Page components live in `src/pages/` and are thin orchestrators — they call hooks and pass data to feature components.
- No default props — rely on TypeScript optional types.

---

## Styling

- Tailwind utility classes only. No CSS modules, no styled-components.
- Use `cn()` (from `src/utils.ts`) for all conditional or merged class strings.
- Color tokens are CSS custom properties (`hsl(var(--primary))`), defined in `src/index.css`. Never hardcode color hex values.
- Status badge pattern: inline conditional class using `cn()` — e.g., `delivered → green`, `processing → blue`, `shipped → purple`, `cancelled → red`.

---

## Data Fetching

- Every data fetch is a React Query `useQuery` hook inside `src/features/{feature}/api/`.
- Query key convention: `['resource', ...params]` — e.g., `['products', searchQuery]`.
- All hooks are configured with `refetchOnWindowFocus: false` and `retry: 1`.
- Debounce search inputs before including them in query keys (300ms default).
- Hooks return `{ data, isLoading, error }` — pages handle loading/error states.

## Client-Side Filtering Pattern

When adding a filter that doesn't need a new API call (data is already loaded):

1. Add filter state in the page component (`useState`).
2. Derive a `filtered*` array with a pure function before passing to the table component.
3. Do not modify the hook or the API layer — keep filtering in the page.

```ts
// In the page
const [inventoryFilter, setInventoryFilter] = useState<InventoryStatus>('all');
const filteredProducts = filterByInventory(products ?? [], inventoryFilter);
```

## UI Constants and Filter Types

- Export threshold constants and filter union types from the filter component file, not from `src/types/index.ts`.
- Types/constants in `src/types/index.ts` are data model concerns. Filter-specific constants (e.g., `LOW_STOCK_THRESHOLD`) are UI concerns and belong with the component that owns them.
- Import the constant anywhere it is needed to stay DRY — e.g., the display table imports `LOW_STOCK_THRESHOLD` from the filter component.

---

## API Layer (`services/api.ts`)

- All API calls go through the `api` namespace object, never fetch directly from pages or hooks.
- Methods are async and return typed results.
- Adding a new endpoint: add the async function to the correct namespace (`api.products`, `api.orders`, etc.) and the corresponding type to `src/types/index.ts`.

---

## TypeScript

- All props interfaces are defined inline or in `src/types/index.ts` for shared types.
- Use `import type` for type-only imports (`verbatimModuleSyntax` is enabled).
- No `any`. Use proper generics or explicit interfaces.
- Unused locals and parameters are compile errors — clean them up.

---

## Navigation

- Use `<Link>` from `react-router-dom` for in-app navigation. Never use `<a href>` for internal routes.
- Back navigation: render a `<Link to="../">` or `<Link to="/resource">` — do not use `window.history.back()`.
- Active route detection for sidebar: use `useLocation()` and `pathname.startsWith(path)`.

---

## Testing

- Test file co-located with the module it tests or in the same directory (`utils.test.ts` next to `utils.ts`).
- Use Vitest globals (`describe`, `it`, `expect`) — no imports needed due to `globals: true` in config.
- Use `@testing-library/react` for component tests and `@testing-library/jest-dom` matchers.
- Do not mock the API service unless testing a hook in isolation — prefer testing with real mock data from `data.json`.
