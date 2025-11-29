# AI Rules for Sustain-Life-Track Application

This document outlines the core technologies and library usage guidelines for the Sustain-Life-Track application. These rules are designed to ensure consistency, maintainability, and adherence to best practices.

## Tech Stack Description

*   **Frontend Framework**: React.js for building interactive user interfaces.
*   **Language**: TypeScript for type safety and improved code quality.
*   **Build Tool**: Vite for a fast development experience and optimized builds.
*   **Styling**: Tailwind CSS for utility-first, highly customizable styling.
*   **UI Components**: shadcn/ui, a collection of reusable components built on Radix UI and styled with Tailwind CSS.
*   **Routing**: React Router DOM for declarative client-side routing.
*   **Data Fetching & State Management**: React Query (`@tanstack/react-query`) for managing server state, caching, and asynchronous data operations.
*   **Toast Notifications**: Sonner for elegant and accessible toast notifications.
*   **Icons**: Lucide React for a comprehensive set of customizable SVG icons.
*   **Form Management**: React Hook Form with Zod for robust form validation and management.

## Library Usage Rules

To maintain a consistent and efficient codebase, please adhere to the following guidelines when using libraries:

*   **UI Components**:
    *   **Prioritize shadcn/ui**: Always use components from `shadcn/ui` (`@/components/ui/`) first. These components are pre-styled with Tailwind CSS and integrate seamlessly.
    *   **Custom Components**: If a required component is not available in `shadcn/ui` or needs significant custom logic/styling, create a new component in `src/components/` and style it exclusively with Tailwind CSS. Do not modify existing `shadcn/ui` component files.
*   **Styling**:
    *   **Tailwind CSS Only**: All styling must be done using Tailwind CSS utility classes. Avoid writing custom CSS in separate files or using inline styles, except for global styles defined in `src/index.css`.
    *   **Responsive Design**: Always ensure designs are responsive using Tailwind's responsive utility classes.
*   **Routing**:
    *   **React Router DOM**: Use `react-router-dom` for all navigation and routing within the application.
    *   **Route Definition**: Keep all main application routes defined within `src/App.tsx`.
*   **Data Fetching**:
    *   **React Query**: For any server-side data fetching, caching, and synchronization, use `@tanstack/react-query`.
*   **Icons**:
    *   **Lucide React**: Use icons from the `lucide-react` library for all graphical symbols.
*   **Forms**:
    *   **React Hook Form & Zod**: Utilize `react-hook-form` for managing form state and `zod` for schema-based validation.
*   **Toast Notifications**:
    *   **Sonner**: For displaying user feedback messages (success, error, info), use the `sonner` library. It's already integrated into `src/App.tsx`.
*   **File Structure**:
    *   **New Components/Hooks**: Always create new files for new components or hooks, even small ones.
    *   **Directory Naming**: Keep directory names lowercase (e.g., `src/pages`, `src/components`).
    *   **Main Page**: Ensure new features are integrated into `src/pages/Index.tsx` or linked from it to be visible.