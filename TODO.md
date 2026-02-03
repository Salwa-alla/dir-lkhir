# Dir-Khir Platform Development Plan

## Phase 1: Database & Schema Setup
- [ ] Create needs schema with title, description, city, category, whatsapp, userId, status, volunteersCount
- [ ] Update db/index.ts to include needs table
- [ ] Run database migration

## Phase 2: Authentication Integration
- [ ] Add Better-Auth session provider to providers/index.tsx
- [ ] Update layout to include session provider

## Phase 3: Server Actions
- [ ] Create lib/actions.ts with:
  - createNeed action (Server Action)
  - volunteer action
  - markComplete action
  - getNeeds action
  - getUserNeeds action
  - getEngagedNeeds action

## Phase 4: Page Implementation
- [ ] Create /proposer-un-besoin page using need-form component
- [ ] Create /mon-espace page using dashboard-content component
- [ ] Update home page (/) to use hero-section and needs-grid components
- [ ] Update layout metadata for Dir-Khir branding

## Phase 5: Testing & Polish
- [ ] Test authentication flow
- [ ] Test need creation and display
- [ ] Test volunteering functionality
- [ ] Test dashboard features
- [ ] Ensure responsive design
- [ ] Add proper redirects after auth

## Phase 6: Final Touches
- [ ] Add Moroccan cities and categories data
- [ ] Implement WhatsApp contact links
- [ ] Add proper error handling
- [ ] Polish UI/UX
