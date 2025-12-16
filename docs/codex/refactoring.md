# CSS Refactoring Specification

## Objective
Refactor the codebase to improve code legibility and remove duplicates **WITHOUT** changing any functionality or visual design.

## Critical Constraints ⚠️

### MUST NOT CHANGE:
1. **Zero Functionality Changes** - All features, interactions, and behaviors must work exactly as before
2. **Zero Visual Changes** - Design, layout, spacing, colors, animations must remain identical
3. **Zero Breaking Changes** - All components must render and function as they currently do

### What CAN Change:
- Code organization and structure
- Removal of duplicate CSS rules
- Consolidation of repeated styles into globals.css
- Removal of unused/commented code
- Improved code readability and maintainability

---

## Refactoring Tasks

### 1. Audit All CSS Usage
- Scan all `.astro`, `.jsx`, `.tsx` files for:
  - Inline styles
  - CSS classes being used
  - Component-specific CSS in `<style>` tags
  - Tailwind utility classes
  - Custom CSS variables

### 2. Identify Duplicates
Look for:
- **Duplicate color values** (e.g., `rgba(0, 191, 255, 0.4)` appearing multiple times)
- **Duplicate animation definitions** (same keyframes in multiple files)
- **Duplicate utility classes** (same class definitions across files)
- **Repeated style patterns** (same combinations of properties)
- **Redundant glow effects** (multiple versions of same shadow effect)
- **Duplicate transition definitions**

### 3. Consolidate to globals.css

#### Move to globals.css:
- Any CSS class used in 2+ files
- All animation `@keyframes` definitions
- All reusable utility classes
- Color variables that appear in multiple places
- Glow effect classes used across components
- Transition/animation timing that's repeated

#### Keep in Component Files:
- Truly component-specific styles used only once
- Inline styles that are dynamic or conditional

### 4. Remove Unused Code
Delete:
- All commented-out code (HTML, CSS, imports)
- Unused imports
- Unreferenced CSS classes
- Dead code paths

### 5. Organize globals.css Structure

Maintain clear sections:
```css
/* ===== ROOT VARIABLES ===== */
/* ===== BASE STYLES ===== */
/* ===== UTILITY CLASSES ===== */
/* ===== COMPONENT STYLES ===== */
/* ===== ANIMATIONS ===== */
/* ===== SECTION-SPECIFIC STYLES ===== */
/* ===== RESPONSIVE ===== */
/* ===== REDUCED MOTION ===== */
```

### 6. Standardize Naming Conventions
- Use consistent naming for similar effects (e.g., all glow effects follow same pattern)
- Group related utilities together
- Use clear, descriptive names

---

## File-by-File Instructions

### globals.css
- **Keep all existing functionality**
- Remove duplicate `--background`, `--foreground` definitions (appears in `:root` and `html`)
- Consolidate all glow effects into one section
- Remove commented CSS blocks
- Merge any duplicate animation definitions
- Organize by logical sections with clear comments

### Layout.astro
- Remove commented-out code (Header, Footer imports, theme script)
- Keep all functional code
- Ensure navigation positioning logic remains intact

### index.astro
- Remove commented-out component imports (Spotlight, Education, Experience, Skills, About)
- Remove unused `pageTitle` export
- Keep prerender directive

### About.astro
- Move reusable transition effects to globals.css if used elsewhere
- Remove commented HTML/image section
- Keep all IntersectionObserver functionality

### Blog.astro
- Keep all data fetching and rendering logic
- Consolidate card hover styles if duplicated elsewhere

### Contact.astro
- Keep all form submission logic
- Keep toast notification functionality
- Move reusable card/button styles to globals.css if duplicated

### ComingSoon.astro & Empty.astro
- These are fine as-is, very minimal

---

## Validation Checklist

After refactoring, verify:

- [ ] All pages render identically in browser
- [ ] All animations work the same
- [ ] All hover effects function correctly
- [ ] All form submissions work
- [ ] All navigation works
- [ ] All responsive breakpoints look the same
- [ ] All color schemes match exactly
- [ ] All glow effects appear identical
- [ ] No console errors introduced
- [ ] File sizes reduced (due to duplicate removal)

---

## Example Refactoring Pattern

### BEFORE (Duplicated):
```css
/* In globals.css */
.glow-primary-blue {
  box-shadow: 0 0 30px rgba(0, 191, 255, 0.4);
}

/* In Component.astro <style> tag */
.custom-glow {
  box-shadow: 0 0 30px rgba(0, 191, 255, 0.4);
}
```

### AFTER (Consolidated):
```css
/* In globals.css only */
.glow-primary-blue {
  box-shadow: 0 0 30px rgba(0, 191, 255, 0.4);
}

/* In Component.astro - use existing class */
<div class="glow-primary-blue">...</div>
```

---

## Priority Order

1. **High Priority**: Remove all commented/unused code
2. **High Priority**: Consolidate duplicate animations and keyframes
3. **Medium Priority**: Move repeated utility classes to globals.css
4. **Medium Priority**: Standardize color usage via CSS variables
5. **Low Priority**: Improve CSS organization and comments

---

## Testing Instructions

1. Before refactoring: Take screenshots of all pages/sections
2. After refactoring: Compare screenshots pixel-by-pixel
3. Test all interactive elements (buttons, forms, navigation)
4. Test responsive behavior at different breakpoints
5. Test animations trigger correctly
6. Verify no new console errors

---

## Notes

- The current codebase has extensive animation systems - **DO NOT BREAK THESE**
- Many components use IntersectionObserver for scroll animations - **PRESERVE THIS**
- CSS custom properties (`--primary-blue`, etc.) are used throughout - **MAINTAIN CONSISTENCY**
- Tailwind utility classes are mixed with custom CSS - **BOTH MUST WORK**
- The dark theme system must continue working
- Banner positioning logic in Layout.astro is critical - **DO NOT MODIFY**

---

## Success Criteria

✅ Codebase is more maintainable
✅ No duplicate CSS rules exist
✅ globals.css is well-organized
✅ All functionality works identically
✅ Visual design is pixel-perfect match
✅ No new errors or warnings
✅ Code is more readable and documented