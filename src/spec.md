# Specification

## Summary
**Goal:** Fix the Select.Item empty value prop error in the dress listings filters.

**Planned changes:**
- Update all Select.Item components in DressFilters.tsx to use non-empty string values
- Replace empty string values with undefined or null for the default/empty state
- Ensure placeholders display correctly without triggering validation errors

**User-visible outcome:** Users can interact with all filter dropdowns (size, occasion, color, city) without encountering errors, and the filters work as expected with proper placeholder display.
