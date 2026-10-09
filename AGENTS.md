# Campaign Compass notes for future Codex sessions

## Structure

- `src/App.tsx`: all current React views and local UI state. Keep new V1 UI components close here unless the file genuinely becomes difficult to maintain.
- `src/db.ts`: sole persistence boundary. It owns schema, migrations/seeding, mapping SQLite snake_case columns to UI camelCase models, and IndexedDB persistence.
- `src/types.ts`: shared domain types.
- `src/styles.css`: desktop-first styling; dense information presentation is intentional.

## Architecture decisions

- Use one `entities` SQLite table with `type: character | faction`; never create separate relationship tables per entity type.
- Relationships must always reference two entity IDs and stay campaign-scoped.
- Entity deletion depends on SQLite foreign-key cascade behavior. Do not replace it with orphaned text references.
- Local browser SQLite via sql.js and IndexedDB is deliberate. Do not introduce a remote API, authentication, cloud sync, or a server database without an explicit user request.
- The demo seed in `db.seed()` is disposable and is created only for a new local database.

## Commands

```powershell
npm install
npm run dev
npm run build
npm test
```

## UI conventions

- Prioritize quick, dense at-table lookup over marketing/dashboard styling.
- Status colors are friendly green, neutral gold, and enemy red; character/faction nodes should remain visually distinct.
- Destructive actions need confirmation.
- Favorited records, not all records, populate the dashboard and are the default graph scope.

## Avoid unnecessary rewrites

Do not replace Vite, sql.js, React Flow, the unified entity model, or the plain CSS approach merely for abstraction. Add focused components and tests as features grow. Preserve campaign scoping on every new query and use `db` for all persistence.
