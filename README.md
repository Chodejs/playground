# Ormen Lange - React Boilerplate

A robust, opinionated React starter template designed for rapid development. Built with Vite, styled with **Tailwind CSS v4**, and pre-configured for real-world application needs.

## 🎨 UI & Styling (New!)
* **Framework:** Tailwind CSS v4 (Zero runtime, highly performant).
* **Theming:** Centralized design tokens (colors, spacing) defined in `src/index.css` using the new `@theme` directive.
* **Responsive Design:** Mobile-first approach using Flexbox layouts (no hardcoded `calc()` pixel math).

## 🍞 Toast Notification System
Replaced the default browser `alert()` with a custom, non-blocking Toast Context.
* **Usage:** Wrap the app in `<ToastProvider>`, then use `const { addToast } = useToast()` in any component.
* **Features:** Auto-dismiss, 4 severity types (Info, Success, Warning, Error), and visually consistent with Tailwind styles.
* **Location:** `src/context/ToastContext.jsx`

## 🚀 Features
* **⚡️ Vite:** Blazing fast dev server and bundler.
* **🎨 Theming:** Centralized CSS variables for easy re-branding.
* **🔀 Routing:** Full `react-router-dom` setup with Layout architecture.
* **💾 Data Layer:** Centralized API service and reusable `useFetch` hook.
* **🧪 Testing:** Pre-configured Vitest + React Testing Library environment.
* **🔒 Security:** Environment variable handling with `.env.example` template.
* **🔎 SEO:** Open Graph and Twitter Card meta tags pre-installed.

## 🛠️ Installation

1.  **Clone and Install:**
    ```bash
    git clone [your-repo-url]
    cd [project-name]
    npm install
    ```

2.  **Start Development:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```
