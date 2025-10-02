# Example Output: Copy-Board Page with Column Display

## Before the Change

When viewing a query on the copy-board page, you would see:

```
Query 1 (my-dataset)
  Query ID: abc123
  Dataset: my-dataset
  
  Calculations:
  - COUNT()
  - AVG(duration_ms)
  
  Breakdowns: service.name, http.status_code
  
  Filters:
  - error = true
  - duration_ms > 1000
  
  Order:
  - COUNT() desc
```

## After the Change

Now you will see the columns involved in the query listed first with their types:

```
Query 1 (my-dataset)
  Query ID: abc123
  Dataset: my-dataset
  
  Columns Used (3):
  - duration_ms: float
  - service.name: string
  - http.status_code: integer
  - error: boolean
  
  Calculations:
  - COUNT()
  - AVG(duration_ms)
  
  Breakdowns: service.name, http.status_code
  
  Filters:
  - error = true
  - duration_ms > 1000
  
  Order:
  - COUNT() desc
```

## Key Benefits

1. **Immediate Visibility**: You can see at a glance which columns are used in the query
2. **Type Information**: Each column's type is displayed (string, integer, float, boolean, etc.)
3. **Filtered List**: Only columns actually used in the query are shown, not the entire dataset schema
4. **Better Planning**: When copying a board to another environment, you can verify that all required columns exist in the target dataset

## Technical Details

The column information is fetched from the Honeycomb API endpoint:
```
GET /columns/{dataset}
```

The system then filters this list to show only columns that appear in:
- Calculations (e.g., `AVG(duration_ms)`)
- Filters (e.g., `error = true`)
- Breakdowns (e.g., `service.name`)
- Order clauses (e.g., `duration_ms desc`)
- Having clauses (e.g., `COUNT() > 100`)
