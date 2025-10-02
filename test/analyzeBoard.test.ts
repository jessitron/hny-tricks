import { describe, it, expect } from '@jest/globals';

describe('Column filtering for derived columns', () => {
  it('should match columns by key_name', () => {
    const usedColumns = new Set(['duration', 'status_code']);
    const columns = [
      { key_name: 'duration', type: 'float' },
      { key_name: 'status_code', type: 'integer' },
      { key_name: 'unused_field', type: 'string' }
    ];
    
    const filtered = columns.filter((col: any) =>
      usedColumns.has(col.key_name) || (col.alias && usedColumns.has(col.alias))
    );
    
    expect(filtered.length).toBe(2);
    expect(filtered.map(c => c.key_name)).toEqual(['duration', 'status_code']);
  });

  it('should match derived columns by alias', () => {
    const usedColumns = new Set(['my_calculated_field', 'status_code']);
    const columns = [
      { key_name: 'derived_column_123', type: 'float', alias: 'my_calculated_field', expression: 'SUM(duration)' },
      { key_name: 'status_code', type: 'integer' },
      { key_name: 'unused_field', type: 'string' }
    ];
    
    const filtered = columns.filter((col: any) =>
      usedColumns.has(col.key_name) || (col.alias && usedColumns.has(col.alias))
    );
    
    expect(filtered.length).toBe(2);
    expect(filtered.map(c => c.alias || c.key_name)).toEqual(['my_calculated_field', 'status_code']);
  });

  it('should match both regular and derived columns', () => {
    const usedColumns = new Set(['duration', 'my_calculated_field', 'status_code']);
    const columns = [
      { key_name: 'duration', type: 'float' },
      { key_name: 'derived_column_123', type: 'float', alias: 'my_calculated_field', expression: 'SUM(duration)' },
      { key_name: 'status_code', type: 'integer' },
      { key_name: 'unused_field', type: 'string' }
    ];
    
    const filtered = columns.filter((col: any) =>
      usedColumns.has(col.key_name) || (col.alias && usedColumns.has(col.alias))
    );
    
    expect(filtered.length).toBe(3);
  });

  it('should identify derived columns correctly', () => {
    const columns = [
      { key_name: 'duration', type: 'float' },
      { key_name: 'derived_column_123', type: 'float', alias: 'my_calculated_field', expression: 'SUM(duration)' },
    ];
    
    const results = columns.map((col: any) => {
      const displayName = col.alias || col.key_name;
      const isDerived = col.alias && col.expression;
      const typeInfo = isDerived ? `derived (${col.type})` : col.type;
      return { displayName, isDerived, typeInfo };
    });
    
    expect(results[0].displayName).toBe('duration');
    expect(results[0].isDerived).toBeFalsy();
    expect(results[0].typeInfo).toBe('float');
    
    expect(results[1].displayName).toBe('my_calculated_field');
    expect(results[1].isDerived).toBeTruthy();
    expect(results[1].typeInfo).toBe('derived (float)');
  });
});
