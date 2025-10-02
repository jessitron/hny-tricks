# Visual Explanation: How the Fix Works

## The Problem

### API Response Structure
When fetching columns from Honeycomb API `/columns/{dataset}`:

```json
[
  {
    "key_name": "duration",
    "type": "float"
  },
  {
    "key_name": "status_code",
    "type": "integer"
  },
  {
    "key_name": "derived_column_abc123",
    "type": "float",
    "id": "abc123",
    "alias": "error_rate",
    "expression": "COUNT_IF(status_code >= 500) / COUNT(*)"
  }
]
```

### Query Structure
Queries reference columns like this:

```json
{
  "calculations": [
    { "op": "AVG", "column": "duration" }
  ],
  "filters": [
    { "column": "error_rate", "op": ">", "value": 0.01 }
  ],
  "breakdowns": ["status_code"]
}
```

**Notice:** The query uses `"error_rate"` (the alias), not `"derived_column_abc123"` (the key_name)!

## The Old Code (Broken)

```typescript
// ❌ Only checked key_name
columns = columnsResponse.filter((col) =>
  usedColumns.has(col.key_name)
);
```

### What Happened:
```
usedColumns = Set { "duration", "error_rate", "status_code" }

Checking column: { key_name: "duration", type: "float" }
  ✅ usedColumns.has("duration") → true → INCLUDED

Checking column: { key_name: "status_code", type: "integer" }
  ✅ usedColumns.has("status_code") → true → INCLUDED

Checking column: { key_name: "derived_column_abc123", alias: "error_rate", ... }
  ❌ usedColumns.has("derived_column_abc123") → false → EXCLUDED!
```

**Result:** Derived column was excluded even though it was used in the query!

## The New Code (Fixed)

```typescript
// ✅ Checks both key_name AND alias
columns = columnsResponse.filter((col) =>
  usedColumns.has(col.key_name) || (col.alias && usedColumns.has(col.alias))
);
```

### What Happens Now:
```
usedColumns = Set { "duration", "error_rate", "status_code" }

Checking column: { key_name: "duration", type: "float" }
  ✅ usedColumns.has("duration") → true → INCLUDED

Checking column: { key_name: "status_code", type: "integer" }
  ✅ usedColumns.has("status_code") → true → INCLUDED

Checking column: { key_name: "derived_column_abc123", alias: "error_rate", ... }
  ❌ usedColumns.has("derived_column_abc123") → false
  ✅ col.alias && usedColumns.has("error_rate") → true → INCLUDED!
```

**Result:** All columns including derived columns are properly included!

## Display Enhancement

### Old Display:
```
Columns Used (2):
- duration: float
- status_code: integer
```

### New Display:
```
Columns Used (3):
- duration: float
- status_code: integer
- error_rate: derived (float)
```

The display logic:
```typescript
const displayName = col.alias || col.key_name;  // Use alias if available
const isDerived = col.alias && col.expression;   // Check if it's derived
const typeInfo = isDerived ? `derived (${col.type})` : col.type;
```

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Fetch Query Definition                                   │
│    GET /queries/{dataset}/{query_id}                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Extract Column Names from Query                          │
│    - From calculations: ["duration"]                        │
│    - From filters: ["error_rate"]                           │
│    - From breakdowns: ["status_code"]                       │
│    Result: Set { "duration", "error_rate", "status_code" }  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Fetch All Columns for Dataset                            │
│    GET /columns/{dataset}                                   │
│    Returns: Regular columns + Derived columns               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Filter Columns (THE FIX IS HERE!)                        │
│    For each column:                                         │
│      ✓ Check if key_name is in usedColumns                  │
│      ✓ OR check if alias is in usedColumns (NEW!)          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Display Columns                                          │
│    - Show alias for derived columns (NEW!)                  │
│    - Mark as "derived" (NEW!)                               │
└─────────────────────────────────────────────────────────────┘
```

## Key Insight

**The fundamental issue:** Honeycomb's API uses different identifiers for derived columns:
- **Internal identifier** (`key_name`): Used by the API for storage
- **User-facing identifier** (`alias`): Used in queries and UI

The fix ensures we check both identifiers when matching columns!
