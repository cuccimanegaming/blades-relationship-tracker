# Campaign Compass

Campaign Compass is a local-first GM reference application for keeping campaign characters, factions, tags, and their relationships close at hand during a session. It includes an immediately usable **Blades in the Dark Demo** campaign, which can be renamed or deleted.

## Run it

```powershell
npm install
npm run dev
```

Open the address Vite prints (normally `http://localhost:5173`). Production-check the project with `npm run build`, and run the basic tests with `npm test`.

## Architecture and technology choices

- **React + TypeScript + Vite** provide a compact desktop-first interface and fast local development.
- **sql.js** is SQLite compiled for the browser. It keeps the application entirely local and avoids a local server or database installation.
- The SQLite database is exported after each change and stored in the browser's **IndexedDB** under `campaign-compass` / `campaign-compass-sqlite-v1`. This is a genuine SQLite database blob, not an ad-hoc JSON store.
- **React Flow** (`@xyflow/react`) supplies the mature, draggable relationship graph.

This design is intentionally simple: the UI calls one small persistence service in `src/db.ts`. There is no authentication, API server, cloud account, or external database.

## Data model

The application uses a unified `entities` table rather than separate character and faction tables. Its `type` field is either `character` or `faction`; all shared display fields, status, favorite state, and campaign ownership live there. This lets a relationship point to any two entities without special-case foreign keys.

| Table | Purpose |
| --- | --- |
| `campaigns` | A separate container for every campaign. |
| `entities` | Characters and factions, including status, notes, favorite and optional context fields. |
| `tags` | Reusable, campaign-scoped tag names. |
| `entity_tags` | Many-to-many entity/tag links. |
| `relationships` | First-class links between two entities, with type, summary, notes, and optional importance. |

Foreign-key cascade deletion makes deleting an entity safe: its tags links and relationships disappear with it, so no relationship points to a missing entity. Every query is scoped to the selected campaign, so campaign information does not mix.

## Relationships

Relationships are stored once, with `entity_a_id` and `entity_b_id`, and appear in both entity profiles. The initial labels include Friend, Ally, Neutral, Rival, Enemy, Member, Leader, Works For, Family, Romantic, Owes, and a custom-label path. The first version intentionally does not model inverse wording; a future version can add that without changing the core links.

## Backups and local data

Your data belongs to your browser profile, not this repository. To back it up, export the IndexedDB database using browser developer tools (Application → IndexedDB → `campaign-compass`) or use the browser's profile backup tools. Clearing site data clears the local campaign database. A future export/import screen is the most useful next enhancement.

## Major extension points

- Export/import and explicit SQLite database backup UI
- Images and entity portraits
- Richer tag and directory filtering
- Direction-specific relationship labels
- Graph layout persistence and search
- More campaign metadata and session notes
