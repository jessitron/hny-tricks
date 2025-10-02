# Fix for Calculated Fields Not Showing in Copy Board Query Analysis

## Problem
When analyzing boards in the copy-board feature, the list of columns in the query did not include calculated fields (derived columns). This was because:

1. The `ColumnInfo` type definition was incomplete and didn't include fields specific to derived columns
2. The column filtering logic only checked `key_name`, but derived columns are referenced by their `alias` in queries

## Solution

### Changes Made to `src/copy-board/analyzeBoard.ts`

#### 1. Updated `ColumnInfo` Type Definition (lines 34-42)
Added fields that are present in derived column responses from the Honeycomb API:
```typescript
type ColumnInfo = {
  key_name: string;
  type: string;
  description?: string;
  hidden?: boolean;
  id?: string;           // Added for derived columns
  alias?: string;        // Added for derived columns
  expression?: string;   // Added for derived columns
};
```

#### 2. Updated Column Filtering Logic (lines 153-161)
Modified the filter to check both `key_name` (for regular columns) and `alias` (for derived columns):
```typescript
if (!isFetchError(columnsResponse)) {
  // Extract column names used in the query
  const usedColumns = extractColumnsFromQuery(queryDef);
  // Filter to only show columns used in the query
  // For derived columns, check both key_name and alias
  columns = columnsResponse.filter((col) =>
    usedColumns.has(col.key_name) || (col.alias && usedColumns.has(col.alias))
  );
}
```

#### 3. Enhanced Column Display (lines 249-264)
Updated the `renderColumns` function to:
- Display the `alias` for derived columns (instead of `key_name`)
- Indicate when a column is derived by showing "derived" in the type information
```typescript
function renderColumns(columns: ColumnInfo[]): Html {
  if (!columns || columns.length === 0) {
    return html``;
  }
  return html`<div class="query-section">
    <strong>Columns Used (${columns.length}):</strong>
    <ul>
      ${columns.map((col) => {
        const displayName = col.alias || col.key_name;
        const isDerived = col.alias && col.expression;
        const typeInfo = isDerived ? `derived (${col.type})` : col.type;
        return html`<li><code>${displayName}</code>: ${typeInfo}</li>`;
      })}
    </ul>
  </div>`;
}
```

## How It Works

1. When the Honeycomb API returns columns from the `/columns/{dataset}` endpoint, it includes both regular columns and derived columns
2. Regular columns have a `key_name` field
3. Derived columns have both a `key_name` and an `alias` field (plus an `expression` field containing the formula)
4. In queries, derived columns are referenced by their `alias`, not their `key_name`
5. The fix ensures that when matching columns used in a query, we check both `key_name` and `alias`
6. The display now shows the `alias` for derived columns and marks them as "derived" for clarity

## Testing

To verify the fix:
1. Create a board with queries that use derived columns (calculated fields)
2. Use the copy-board feature to analyze the board
3. Verify that derived columns now appear in the "Columns Used" section
4. Verify that they are marked as "derived" in the type information

## Impact

This fix ensures that all columns used in a query, including calculated fields, are properly displayed when analyzing boards. This is important for understanding query dependencies and for the copy-board functionality to work correctly.
