## Internationalization (i18n)

- This project uses `i18next` + `react-i18next` with locales in `src/locales/` (`en`, `hi`, `mr`).
- The language switcher lives in `src/Components/Navbar.jsx`.
- Selected language is stored in localStorage under `ss_lang`.

### Install deps

```cmd
cd "c:\Users\lenovo\Downloads\New folder (5)\frontend"
npm install
```

### Run dev server

```cmd
npm run dev
```

### Add/modify translations

- Edit `src/locales/en.json`, `src/locales/hi.json`, or `src/locales/mr.json`.
- To translate new text, wrap strings with `const { t } = useTranslation();` and use `t('path.key')`.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
