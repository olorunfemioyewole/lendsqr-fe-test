# Lendsqr Frontend Engineering Assessment
**Candidate:** Olorunfemi Elias Oyewole  
**Live App:** https://olorunfemi-oyewole-lendsqr-fe-test.vercel.app  
**Repository:** https://github.com/olorunfemioyewole/lendsqr-fe-test  

---

## Overview

This assessment required building four pages of the Lendsqr Admin Console — Login, Dashboard, Users, and User Details — using React, TypeScript, and SCSS.

---

## Tech Stack

| Tool | Reason |
|------|--------|
| **Vite** | Faster dev server and build times compared to Create React App. Better suited for a focused assessment build. |
| **React + TypeScript** | Required by the assessment. TypeScript adds type safety across components, props, and API response shapes. |
| **SCSS Modules** | Required by the assessment. Used `@use`/`@forward` pattern (modern replacement for deprecated `@import`) with a central `_variables.scss` file for design tokens. |
| **React Router v6** | Client-side routing between the four pages. |

---

## Pages Built

### 1. Login (`/login`)
- Two-column layout: illustration left, form right
- Email and password validation with inline error messages
- Password show/hide toggle
- Navigates to `/dashboard` on successful validation
- Fully responsive — illustration hidden on mobile

### 2. Dashboard (`/dashboard`)
- Shared layout with persistent sidebar and top navbar
- Sidebar uses `NavLink` for active state highlighting
- Serves as the shell for all authenticated pages

### 3. Users (`/users`)
- Four summary metric cards (Users, Active Users, Users with Loans, Users with Savings)
- Table with 500 mock users generated client-side
- Filter dropdown on table header (Organization, Username, Email, Date, Phone, Status)
- Status badges with colour coding: Active (green), Inactive (grey), Pending (yellow), Blacklisted (red)
- Configurable pagination (10, 20, 50, 100 rows per page)
- Per-row action menu: View Details, Blacklist User, Activate User
- Page content scrolls independently from the sidebar

### 4. User Details (`/users/:id`)
- Selected user saved to `localStorage` on "View Details" click
- Retrieved from `localStorage` on mount — no extra API call needed
- Redirects to `/users` if no data is found in storage
- Profile card with avatar initial, tier stars, account balance
- Tab navigation (General Details active; others show placeholder)
- General Details sections: Personal Information, Education & Employment, Socials, Guarantor
- Blacklist User and Activate User action buttons
- Responsive grid layout for detail fields

---

## Data Strategy

The assessment required 500 user records from a mock API. Rather than using an external service like mocky.io (which can go offline or rate-limit), I generated the 500 records deterministically client-side using a `generateUsers()` function. This guarantees the data is always available, fast, and consistent across environments — which is more reliable for a reviewable assessment than an external dependency.

---

## Design Decisions

**CSS Modules over global SCSS**  
Each component has its own `.module.scss` file to prevent class name collisions and keep styles co-located with their components. A shared `_variables.scss` file holds all design tokens (colours, typography) which are pulled in via `@use` where needed.

**LocalStorage for User Details**  
The assessment explicitly required using localStorage or IndexedDB to store and retrieve user details. I chose localStorage for its simplicity — the selected user object is serialised to JSON on click and deserialised on the details page mount. If no data is found (e.g. direct URL access), the user is redirected back to the Users list.

**Shared DashboardLayout component**  
Rather than repeating the sidebar and navbar in every page, I built a `DashboardLayout` wrapper component that accepts `children`. This keeps the layout DRY and means any future page just wraps its content in `<DashboardLayout>`.

**500 records, paginated client-side**  
All 500 records are held in memory and filtered/paginated client-side. This keeps the implementation simple and fast while meeting the 500-record requirement. In a production context this would be server-side with cursor-based pagination.

---

## Known Limitations

- Tabs other than "General Details" on the User Details page show a placeholder — the Figma only fully specifies the General Details tab.
- Blacklist and Activate User actions in the menu and on the details page do not persist state — implementing that was outside the scope of the assessment.
- The Dashboard page matches the Figma shell but the inner content is minimal, as the Figma does not fully specify dashboard widget content.

---

## Running Locally

```bash
git clone https://github.com/olorunfemioyewole/lendsqr-fe-test
cd lendsqr-fe-test
npm install
npm run dev
```

App runs at `http://localhost:5173`