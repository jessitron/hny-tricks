# Copy-Board Page: Column Display Enhancement

## Summary
Modified the copy-board page to display only the columns involved in each query, along with their types.

## Changes Made

### File: `src/copy-board/analyzeBoard.ts`

#### 1. Added ColumnInfo Type
```typescript
type ColumnInfo = {
  key_name: string;
  type: string;
  description?: string;
  hidden?: boolean;
};
```

#### 2. Added extractColumnsFromQuery Function
This function extracts all column names used in a query by examining:
- **Calculations**: Columns used in aggregation operations (e.g., `COUNT(column)`)
- **Filters**: Columns used in WHERE clauses
- **Breakdowns**: Columns used for GROUP BY operations
- **Orders**: Columns used in ORDER BY clauses
- **Havings**: Columns used in HAVING clauses

#### 3. Enhanced analyzeBoard Function
- Now fetches column information from the Honeycomb API using the endpoint: `columns/{dataset}`
- Filters the column list to show only columns that are actually used in the query
- Passes the filtered column list to the rendering functions

#### 4. Added renderColumns Function
Displays the columns used in a query with the following format:
```
Columns Used (N):
- column_name: column_type
- another_column: another_type
```

The columns are displayed in a `<code>` tag for better readability.

#### 5. Updated Type Signatures
Updated the type signatures for:
- `renderPanels()` - Now includes `columns: ColumnInfo[]` in the item type
- `renderQueryPanel()` - Now includes `columns: ColumnInfo[]` in the item type

## How It Works

1. When a board is analyzed, the system fetches the board details and all query definitions
2. For each query, it:
   - Extracts all column names used in the query
   - Fetches all columns from the dataset via the Honeycomb API
   - Filters to show only the columns that appear in the query
3. The filtered column list is displayed at the top of each query's details section, showing:
   - The column name (in monospace font)
   - The column type
   - A count of how many columns are used

## Display Order

The query details now display in this order:
1. **Query ID**
2. **Dataset**
3. **Columns Used** (NEW - shows only columns involved in the query with their types)
4. Calculations
5. Breakdowns
6. Filters
7. Order
8. Having
9. Time range
10. Limit

## Benefits

- **Clarity**: Users can immediately see which columns are involved in a query
- **Type Information**: Column types are displayed, helping users understand data types
- **Efficiency**: Only relevant columns are shown, not the entire dataset schema
- **Debugging**: Makes it easier to identify missing or incorrect column references

## API Endpoint Used

The implementation uses the Honeycomb API endpoint:
```
GET /columns/{dataset}
```

This returns an array of column information including `key_name`, `type`, and other metadata.
