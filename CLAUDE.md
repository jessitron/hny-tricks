# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A web application for automating maintenance operations on Honeycomb.io teams. Provides a GUI for API key validation, sending events, managing datasets, and creating derived columns. The app uses Express with server-side rendering (via vhtml/htm) and htmx for dynamic updates.

## Common Commands

### Build and Run
- `npm run start` - Compiles TypeScript and runs the application (starts Express server on port 3000)
- `npm run clean` - Removes compiled JavaScript files

### Testing
- `npm test` - Compiles TypeScript and runs Jest tests
- `npm test -- -u` - Update Jest snapshots after verifying output changes

### Environment Setup
The app expects `HONEYCOMB_API_KEY` or `HONEYCOMB_INGEST_API_KEY` for tracing (where the app sends its own telemetry).

## Architecture

### Main Application Flow
- **Entry point**: `src/main.ts` sets up Express routes and middleware
- **Index page**: `src/index.ts` renders the main HTML page
- **Tracing**: Backend tracing initialized in `src/tracing.ts` (imported first), frontend tracing via `public/hny.js`

### Key Components

#### API Integration (`src/HoneycombApi.ts`)
- `fetchFromHoneycombApi()`: Centralized function for all Honeycomb API calls
- Handles multi-region support (US, EU, test)
- Returns typed responses or `FetchError` objects

#### Authorization (`src/Team.ts`, `src/auth/validate.ts`)
- API keys validated to determine region and permissions
- `HnyTricksAuthorization` type contains `apiKey`, `keyInfo` (region), and `permissions`
- `parseAuthData()` extracts auth from form submissions

#### Dataset Operations (`src/datasets/`)
- `datasets.ts`: Lists all datasets in an environment
- `derivedColumns.ts`: Creates derived columns (e.g., `dc.dataset` for dataset name tracking)
- `deletion.ts`: Bulk dataset deletion
- Uses htmx lazy loading (on intersect) to check derived column existence

#### Event Sending (`src/event/`)
- `send.ts`: Sends events to Honeycomb (with preset or custom JSON)
- `SendEvent.ts`: UI for event sending
- Generates trace/span IDs via `RandomIdGenerator.ts`

### HTML Rendering
- Uses `vhtml` for server-side JSX-like templates via `htm`
- `src/htm-but-right.ts`: Wrapper that normalizes vhtml output (removes excess whitespace)
- Components return `Html` type (branded string)

### Server Structure
- Routes in `src/main.ts` use POST for htmx partial updates
- Auth data passed via hidden input `#auth_data` and extracted server-side
- Response patterns: full page HTML or htmx fragments (via `hx-target`, `hx-trigger`)

### Tracing and Observability
- Backend: OpenTelemetry Node SDK with auto-instrumentation
- Frontend: Custom `hny.js` (from jessitron/hny-otel-web)
- `src/tracing-util.ts`: Helper functions like `report()`, `recordError()`, `currentTraceId()`

## TypeScript Configuration
- Target: ES2022, CommonJS modules
- Strict mode: **disabled**
- Output: JavaScript files generated in `src/` alongside TypeScript sources
- Tests excluded from compilation (`**/*.test.*`)

## Custom Dependencies
This project uses custom-instrumented versions of:
- htmx (from ~/code/bigskysoftware/htmx or jessitron/htmx fork)
- hny.js for OpenTelemetry initialization (from jessitron/hny-otel-web)
