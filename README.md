# Monynha Eco Project Documentation

Welcome to your Monynha Eco project! This document provides an overview of the project, how to set it up, and guidelines for development.

## Project Info

**URL**: https://eco.monynha.com

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

## Project Structure

The project follows a standard React application structure with a focus on modularity:

*   `src/`: Contains all application source code.
    *   `src/assets/`: Static assets like images.
    *   `src/components/`: Reusable UI components.
        *   `src/components/ui/`: shadcn/ui components. Prioritize these first.
    *   `src/hooks/`: Custom React hooks for reusable logic.
    *   `src/lib/`: Utility functions and configurations (e.g., `utils.ts` for `cn` helper).
    *   `src/pages/`: Main application pages/views.
    *   `src/App.tsx`: Main application entry point, defining global providers and routes.
    *   `src/main.tsx`: Renders the root React component.
    *   `src/index.css`: Global styles and Tailwind CSS directives.

## How to Edit This Code?

There are several ways to edit your application:

**Use Monynha Softwares**

Simply visit the [Monynha Eco Project](https://monynha.eco/projects/your-project-id) and start prompting. Changes made via Monynha Softwares will be committed automatically to this repo.

**Use Your Preferred IDE (Local Development)**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Monynha Softwares.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a File Directly in GitHub**

-   Navigate to the desired file(s).
-   Click the "Edit" button (pencil icon) at the top right of the file view.
-   Make your changes and commit the changes.

**Use GitHub Codespaces**

-   Navigate to the main page of your repository.
-   Click on the "Code" button (green button) near the top right.
-   Select the "Codespaces" tab.
-   Click on "New codespace" to launch a new Codespace environment.
-   Edit files directly within the Codespace and commit and push your changes once you're done.

## Development Guidelines

To maintain a consistent and efficient codebase, please adhere to the following guidelines:

### UI Components
*   **Prioritize shadcn/ui**: Always use components from `shadcn/ui` (`@/components/ui/`) first. These components are pre-styled with Tailwind CSS and integrate seamlessly.
*   **Custom Components**: If a required component is not available in `shadcn/ui` or needs significant custom logic/styling, create a new component in `src/components/` and style it exclusively with Tailwind CSS. Do not modify existing `shadcn/ui` component files.

### Styling
*   **Tailwind CSS Only**: All styling must be done using Tailwind CSS utility classes. Avoid writing custom CSS in separate files or using inline styles, except for global styles defined in `src/index.css`.
*   **Responsive Design**: Always ensure designs are responsive using Tailwind's responsive utility classes.

### Routing
*   **React Router DOM**: Use `react-router-dom` for all navigation and routing within the application.
*   **Route Definition**: Keep all main application routes defined within `src/App.tsx`.

### Data Fetching
*   **React Query**: For any server-side data fetching, caching, and synchronization, use `@tanstack/react-query`.

### Icons
*   **Lucide React**: Use icons from the `lucide-react` library for all graphical symbols.

### Forms
*   **React Hook Form & Zod**: Utilize `react-hook-form` for managing form state and `zod` for schema-based validation.

### Toast Notifications
*   **Sonner**: For displaying user feedback messages (success, error, info), use the `sonner` library. It's already integrated into `src/App.tsx`.

### File Structure
*   **New Components/Hooks**: Always create new files for new components or hooks, even small ones.
*   **Directory Naming**: Keep directory names lowercase (e.g., `src/pages`, `src/components`).
*   **Main Page**: Ensure new features are integrated into `src/pages/Index.tsx` or linked from it to be visible.

## How can I deploy this project?

Simply use your preferred deployment method.

## Can I connect a custom domain to my Monynha Eco project?

Yes, you can! To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.