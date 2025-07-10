# Plan: Adding Environment-Level Derived Columns

## Overview
Currently, the hny-tricks application supports dataset-level derived columns (specifically `dc.dataset` columns that identify which dataset an event belongs to). This plan outlines adding support for environment-level derived columns that can provide metadata about the environment context.

## Current State Analysis
- **Existing Implementation**: `src/datasets/derivedColumns.ts` handles dataset-specific derived columns
- **Current Focus**: Only `dc.dataset` columns that use `COALESCE("datasetName")` formula
- **Architecture**: Uses HTMX for dynamic UI updates, Honeycomb API for CRUD operations
- **Permissions**: Respects API key permissions for column management

## Proposed Environment-Level Derived Columns

### 1. Environment Identification Columns
- **`dc.environment`**: Environment name/slug for multi-environment setups
- **`dc.team`**: Team name/slug for organizational context
- **`dc.region`**: Honeycomb region (US, EU, etc.)

### 2. Environment Metadata Columns
- **`dc.environment_type`**: Classic vs Environments & Services
- **`dc.deployment_context`**: Production, staging, development indicators

## Implementation Plan

### Phase 1: Core Infrastructure
1. **Extend Data Models**
   - Add environment-level column types to existing types
   - Extend `HnyTricksAuthorization` usage for environment context
   - Create new column alias constants

2. **API Integration**
   - Research Honeycomb API endpoints for environment-level derived columns
   - Determine if environment-level columns use different API paths
   - Test API permissions and access patterns

### Phase 2: Backend Implementation
1. **Extend derivedColumns.ts**
   - Create new column classes similar to `DerivedColumnForDatasetName`
   - Implement environment-specific formula generation
   - Add environment-level column existence checking

2. **New Column Types**
   ```typescript
   class DerivedColumnForEnvironment implements Column
   class DerivedColumnForTeam implements Column  
   class DerivedColumnForRegion implements Column
   ```

3. **Formula Generation**
   - Environment: `COALESCE("${environmentName}")`
   - Team: `COALESCE("${teamName}")`
   - Region: `COALESCE("${regionName}")`

### Phase 3: UI Integration
1. **New Environment-Wide Columns Section**
   - Create dedicated section below the dataset table
   - Implement environment-wide column management interface
   - Add section header with environment context (team/environment name)

2. **Environment Section Features**
   - Display all environment-level derived columns in a dedicated table
   - Show status across all datasets for each environment column
   - Bulk creation/management controls for environment columns
   - Summary statistics (e.g., "dc.environment exists in 15/20 datasets")

3. **User Experience**
   - Clear separation between dataset-specific and environment-wide operations
   - Environment section appears after user authenticates and datasets load
   - Tooltips explaining environment-level column benefits and use cases

### Phase 4: Advanced Features
1. **Bulk Operations**
   - Create all environment columns across all datasets
   - Batch validation of environment column consistency
   - Environment-wide column management

2. **Query Integration**
   - Generate sample queries using environment columns
   - Link to Honeycomb UI with pre-built environment queries
   - Show usage examples and best practices

## Technical Considerations

### API Compatibility
- Verify environment-level derived columns work with all Honeycomb regions
- Test with both Classic and Environments & Services setups
- Handle API key permission variations

### Performance
- Batch API calls for environment column checks
- Implement caching for environment metadata
- Optimize HTMX updates for large dataset lists

### Error Handling
- Handle missing environment information gracefully
- Provide clear error messages for permission issues
- Fallback behavior for unsupported environments

## File Structure Changes

### New Files
- `src/datasets/environmentColumns.ts` - Environment-specific column logic
- `src/environment/metadata.ts` - Environment metadata utilities
- `src/environment/EnvironmentSection.ts` - New UI section component
- `src/environment/EnvironmentColumnsTable.ts` - Environment columns table component

### Modified Files
- `src/datasets/DatasetsTable.ts` - Integration point for environment section
- `src/datasets/dataset_common.ts` - Extend Column interface if needed
- `src/common.ts` - Add environment-level constants and types
- `src/main.ts` - Add routes for environment column operations
- `src/index.ts` - Include environment section in main page layout

## Testing Strategy

### Unit Tests
- Test environment column formula generation
- Verify API integration with mock responses
- Test permission handling for environment operations

### Integration Tests
- Test full workflow: check → create → verify environment columns
- Test environment section loading and display
- Test with different API key permission levels
- Verify HTMX interactions work correctly between dataset and environment sections

### Manual Testing
- Test with real Honeycomb environments
- Verify columns appear correctly in Honeycomb UI
- Test bulk operations with multiple datasets

## Success Criteria
1. New "Environment-Wide Columns" section appears below dataset table
2. Users can create environment-level derived columns across all datasets from dedicated section
3. Environment columns provide consistent metadata across queries
4. Environment section shows clear status summary for each environment column type
5. Implementation maintains existing performance and UX patterns
6. Feature works across all supported Honeycomb regions and environment types
7. Clear visual separation between dataset-specific and environment-wide operations

## Future Enhancements
- Custom environment column formulas
- Environment column templates
- Integration with Honeycomb SLOs and alerts
- Environment-based dataset organization features

## Notes
- Consider impact on existing `dc.dataset` column workflows
- Ensure backward compatibility with current derived column features
- Document new environment column patterns for users
- Consider adding environment column examples to README