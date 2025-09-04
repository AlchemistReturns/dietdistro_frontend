# DietDistro Frontend (React + Vite + Tailwind)

A starter frontend for DietDistro with protected routes and a 3-step menu creator wizard.

## Features
- React + Vite + Tailwind
- React Router v6 with protected routes (only **Home**, **Login**, **Register** are public)
- Auth state with JWT token stored in `localStorage`
- Real API mode (Axios) or Mock mode (localStorage)
- Dashboard: list menus (from API), Create Menu (carb → protein → lipid), Profile (update health)

## Quick Start
```bash
npm i
npm run dev
```

By default it runs in **Real API** mode. To use **Mock** mode:
1. Copy `.env.example` to `.env`
2. Set `VITE_USE_MOCK=true`

### Env
Create `.env`:
```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_USE_MOCK=false
```

When `VITE_USE_MOCK=true`, the app uses `localStorage` to simulate:
- `POST /auth/login`, `POST /auth/register` (returns `{ token, user }`)
- `GET /menus`, `POST /menus`
- `GET /foods?type=...` (carbs, proteins, lipids)
- `GET/PATCH /users/me`

### Replace with your Backend
- Auth endpoints expected:
  - `POST /auth/login` → `{ token, user }`
  - `POST /auth/register` → `{ token, user }`
  - `GET /auth/me` → `user`
- Menus:
  - `GET /menus` → `Menu[]`
  - `POST /menus` → `Menu`
- User:
  - `PATCH /users/me` → updated `user`
- Foods:
  - `GET /foods?type=carb|protein|lipid` → `Food[]`

The `Authorization: Bearer <token>` header is automatically attached by Axios interceptor.

## File Structure
```
src/
  components/
    Navbar.jsx
    ProtectedRoute.jsx
  pages/
    Home.jsx
    Login.jsx
    Register.jsx
    Dashboard.jsx
    Profile.jsx
    create/
      CreateMenu.jsx
      Stepper.jsx
  state/
    AuthContext.jsx
  utils/
    api.js
  main.jsx
  App.jsx
  index.css
```

## Styling
- Tailwind classes with a minimal dark UI
- Utility classes: `.card`, `.btn`, `.input`, `.stepper`

## Notes
- In Mock mode, a demo user is seeded: `demo@dietdistro.app` (any password).
- All routes except `/`, `/login`, `/register` are protected.
```

