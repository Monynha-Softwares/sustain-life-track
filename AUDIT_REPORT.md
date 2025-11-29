# EcoPulse Codebase Audit Report

**Date:** 2025-11-29  
**Status:** 🔴 Critical Issues Found

---

## 🚨 Critical Issues (Must Fix Immediately)

### 1. **Missing Database Schema**
- **Severity:** CRITICAL
- **Issue:** The app references a `activities` table in Supabase but no migration exists to create it
- **Impact:** App will crash when users try to log activities
- **Fix Required:** Create Supabase migration with proper schema

**Required Tables:**
```sql
-- activities table
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  points INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- feed_posts table (for community feed)
CREATE TABLE feed_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  message TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  participants UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- profiles table (if storing user metadata)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. **Missing Row Level Security (RLS) Policies**
- **Severity:** CRITICAL SECURITY ISSUE
- **Issue:** No RLS policies defined for any tables
- **Impact:** Data exposure, unauthorized access, potential data manipulation
- **Fix Required:** Enable RLS and create policies for all tables

**Required RLS Policies:**
```sql
-- Enable RLS on all tables
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Activities policies
CREATE POLICY "Users can view own activities"
  ON activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities"
  ON activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activities"
  ON activities FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own activities"
  ON activities FOR DELETE
  USING (auth.uid() = user_id);

-- Feed posts policies (public read, authenticated write)
CREATE POLICY "Anyone can view feed posts"
  ON feed_posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON feed_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Events policies (public read)
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  USING (true);

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

### 3. **Type Safety Issues**
- **Severity:** HIGH
- **Issues Fixed:**
  - ✅ `use-toast.ts` circular import (moved to `src/hooks/`)
  - ✅ Activity type mismatch (`date` vs `created_at`)
- **Recommendation:** Add proper TypeScript interfaces for all Supabase types

---

## ⚠️ High Priority Issues

### 4. **Authentication Flow Issues**
- **Issue:** Complex navigation logic in `SessionContextProvider` may cause redirect loops
- **Location:** `src/components/SessionContextProvider.tsx` lines 22-76
- **Recommendation:** Simplify auth logic, use route guards instead

### 5. **Missing Error Boundaries**
- **Issue:** No React error boundaries to catch component errors
- **Impact:** App crashes will show blank screen instead of friendly error
- **Fix:** Add error boundary wrapper in `App.tsx`

### 6. **Hard-coded Mock Data**
- **Issue:** Feed posts and events are hard-coded in both AppLayout and DemoLayout
- **Location:** `src/pages/AppLayout.tsx` lines 113-168, `src/pages/DemoLayout.tsx` lines 115-170
- **Recommendation:** Move to Supabase tables or separate data files

### 7. **No Loading States for Mutations**
- **Issue:** ActivityLogger shows basic loading but no optimistic UI updates
- **Recommendation:** Add optimistic updates for better UX

### 8. **Missing Image Upload**
- **Issue:** Activity logger has no image upload capability (mentioned in original requirements)
- **Fix Required:** Add Supabase Storage integration for activity images

---

## 📋 Medium Priority Issues

### 9. **No Form Validation Library**
- React Hook Form and Zod are installed but not used
- ActivityLogger uses basic validation
- **Recommendation:** Implement proper form validation with Zod schemas

### 10. **Notification System Not Implemented**
- Push notifications mentioned in requirements but not set up
- No Firebase Cloud Messaging integration
- No notification preferences table

### 11. **Incomplete Profile Management**
- Profile edit button exists but no implementation
- No profile update functionality
- No avatar upload

### 12. **Missing Analytics/Tracking**
- No event tracking for user actions
- No analytics integration (GA, Mixpanel, etc.)

### 13. **Accessibility Issues**
- Some buttons lack proper ARIA labels
- Color contrast may not meet WCAG AA standards
- No keyboard navigation testing

---

## 🔧 Code Quality Issues

### 14. **Component Size**
- `AppLayout.tsx` (336 lines) and `DemoLayout.tsx` (346 lines) are too large
- **Recommendation:** Extract tab content into separate components

### 15. **Duplicate Code**
- Feed and Events UI duplicated between AppLayout and DemoLayout
- **Recommendation:** Create shared components for Feed, Events, Profile tabs

### 16. **Magic Numbers**
- Hard-coded points values in ActivityLogger
- Weekly goal hard-coded to 200
- **Recommendation:** Move to constants file or database configuration

### 17. **Incomplete TypeScript Coverage**
- Some components use implicit `any` types
- Missing proper types for Supabase responses
- **Recommendation:** Enable strict TypeScript checks

---

## 🎨 Design System Issues

### 18. **Inconsistent Spacing**
- Mix of Tailwind spacing classes
- No standardized component spacing system

### 19. **Theme Variables Not Fully Utilized**
- Some hard-coded colors still present (e.g., `text-blue-700`)
- **Location:** `src/components/ActivityLogger.tsx` lines 24-29

---

## 🚀 Performance Concerns

### 20. **No Data Pagination**
- Activities list will grow unbounded
- Feed posts and events not paginated
- **Recommendation:** Implement infinite scroll or pagination

### 21. **Missing Data Caching Strategy**
- React Query default settings may not be optimal
- No stale-while-revalidate strategy defined

### 22. **No Image Optimization**
- Hero image not optimized for different screen sizes
- No lazy loading for images

---

## 📱 Mobile-Specific Issues

### 23. **Capacitor Not Set Up**
- Original requirement for mobile app using Capacitor
- No Capacitor configuration exists
- **Action:** Need to run `npx cap init` and add platforms

### 24. **No PWA Manifest**
- Missing web app manifest for installability
- No service worker for offline support

---

## 🔐 Security Recommendations

### 25. **Supabase Keys Exposed**
- Anon key in client.ts is public (this is normal for Supabase)
- Ensure RLS is properly configured to prevent data leaks

### 26. **No Rate Limiting**
- Activity logging has no rate limiting
- Could be abused for point farming
- **Recommendation:** Add backend function with rate limiting

### 27. **No Input Sanitization**
- User inputs not sanitized before database insertion
- **Risk:** XSS if content is rendered as HTML
- **Fix:** Use proper escaping and validation

---

## ✅ Positive Findings

- Clean component structure with good separation of concerns
- Proper use of React hooks and modern patterns
- Good TypeScript adoption (with room for improvement)
- Tailwind CSS well integrated with design system
- Sonner toast notifications properly set up
- React Query for data fetching is a good choice

---

## 📊 Priority Action Items

### Immediate (Today):
1. ✅ Fix TypeScript build errors (DONE)
2. Create Supabase database schema migration
3. Enable RLS and create security policies
4. Test authentication flow

### This Week:
5. Implement image upload for activities
6. Add error boundary
7. Extract large components into smaller ones
8. Set up Capacitor for mobile

### Next Sprint:
9. Implement notifications system
10. Add proper form validation with Zod
11. Implement pagination for activities/feed
12. Add analytics tracking

---

## 🎯 Architectural Recommendations

1. **Backend Functions:** Create Supabase Edge Functions for:
   - Point calculation logic
   - Badge award logic
   - Streak calculation (move from client)

2. **State Management:** Consider adding:
   - Context for user preferences
   - Zustand/Jotai for client-only state

3. **Testing:** Add:
   - Unit tests for utilities
   - Integration tests for auth flow
   - E2E tests for critical paths

4. **Documentation:** Create:
   - Component documentation
   - API documentation
   - Setup guide for new developers

---

## 📈 Technical Debt Score: 6.5/10

**Overall Assessment:** The codebase has a solid foundation but requires immediate attention to database setup and security. The architecture is sound, but several core features from the requirements are incomplete or missing. Focus on the Critical and High Priority issues first before adding new features.

---

**Next Steps:** Review this audit with the team and create GitHub issues for each item. Prioritize database schema and RLS policies as they block all other functionality.
