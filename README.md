# Monynha Eco — Sustain Life Track

This repository contains the Sustain Life Track front-end application generated for a Monynha Eco project. It is a Vite + React + TypeScript application scaffolded to work with Monynha services (Monynha Eco) and common integrations like Supabase.

**Project URL**: https://eco.monynha.com

**Repository**: `sustain-life-track`

---

**What this README covers**
- Project overview and goals
- Local development and common commands (Windows PowerShell + cross-platform)
- Environment variables and integrations (Supabase client)
- Deployment guidance (Monynha, Vercel, Netlify)
- Contributing, troubleshooting, and resources

---

**Quick summary**
- Framework: Vite + React + TypeScript
- UI: `shadcn-ui` components + Tailwind CSS
- Integrations: Supabase client (see `src/integrations/supabase/client.ts`)

---

**Features**
- Activity logging UI and dashboard
- Mobile-aware layout and bottom navigation
- Components organized using shadcn-ui primitives

---

**Prerequisites**
- Node.js 18+ (use `nvm` or install from nodejs.org)
- A package manager: `npm` (default), `pnpm`, or `yarn`

Recommended (optional):
- `pnpm` for faster installs in monorepos: `npm i -g pnpm`

---

**Local development (PowerShell)**
Open PowerShell in the project root and run:

```powershell
# install deps
npm install

# start dev server
npm run dev
```

If you prefer `pnpm`:

```powershell
pnpm install
pnpm dev
```

Notes:
- The dev server runs via Vite and supports HMR (hot module replacement).
- The project uses TypeScript; your editor should provide TypeScript support for best DX.

---

**Scripts** (from `package.json`)
- `npm run dev` — start development server (Vite)
- `npm run build` — produce production build
- `npm run preview` — locally preview production build
- `npm run lint` — lint the codebase (if configured)

---

**Environment & Integrations**

This project includes a Supabase integration. See `src/integrations/supabase/client.ts` for the client setup.

Create a `.env` (or `.env.local`) in the project root with the variables your Supabase instance requires, for example:

```
VITE_SUPABASE_URL=https://your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Notes:
- Prefix client-side variables with `VITE_` so Vite exposes them to the browser.
- Do not commit secrets to the repository.

---

**Project structure (key files)**
- `src/main.tsx` — application entry
- `src/App.tsx` — top-level app component
- `src/pages` — route pages (Index, Login, NotFound, layouts)
- `src/components` — UI components and `shadcn-ui` wrappers
- `src/integrations/supabase/client.ts` — Supabase client configuration

---

**Deployment**

Monynha Eco
- If you are using Monynha Softwares to manage this project, push your branch and changes will be reflected in the Monynha project dashboard. Follow Monynha's deployment docs available in your Monynha project settings for automatic deployments.

Vercel / Netlify / Cloud
- Build command: `npm run build`
- Publish directory: `dist`

Example Vercel settings:
- Build command: `npm run build`
- Output directory: `dist`

Environment variables (set in the deployment provider):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

**Contributing**
- Make a branch for your change: `git checkout -b feat/your-change`
- Commit and push: `git add .` then `git commit -m "feat: ..."` then `git push origin feat/your-change`
- Open a Pull Request and request reviews.

If you are using Monynha Softwares, changes pushed to the repo will be visible in the Monynha dashboard.

---

**Troubleshooting**
- Dev server not starting: ensure Node.js version matches requirements and run `npm install` again.
- Environment variables not available: confirm they are prefixed with `VITE_` for Vite to expose them.
- Type errors: run `npm run dev` and check terminal for the TypeScript error details.

---

**Resources**
- Monynha Eco project dashboard: https://monynha.eco/projects/
- Vite docs: https://vitejs.dev/
- React docs: https://reactjs.org/
- Supabase docs: https://supabase.com/docs
- shadcn-ui components: https://ui.shadcn.com/

---

If you'd like, I can also:
- add a short `CONTRIBUTING.md` with PR guidelines
- add example `.env.example` file
- run a quick check that `src/integrations/supabase/client.ts` references environment variables correctly

If you want me to proceed with any of those, tell me which.
# Welcome to your Monynha Eco project

## Project info

**URL**: [Your Monynha Eco Project URL]

## How can I edit this code?

There are several ways of editing your application.

**Use Monynha Softwares**

Simply visit the [Monynha Eco Project](https://monynha.eco/projects/your-project-id) and start prompting.

Changes made via Monynha Softwares will be committed automatically to this repo.

**Use your preferred IDE**

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

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply use your preferred deployment method.

## Can I connect a custom domain to my Monynha Eco project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.