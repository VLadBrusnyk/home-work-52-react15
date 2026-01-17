## BlogCraft — React + Redux Toolkit

Сучасний блог із feature-based архітектурою, Redux Toolkit, thunks та готовністю до інтеграції з бекендом. Проект містить сторінки перегляду, створення та редагування постів, фільтрацію за тегами та пошук.

### Технології

- React + Vite
- Redux Toolkit + React Redux
- React Router
- React Idle Timer
- React Toastify
- React Icons
- Feature-based структура директорій

### Встановлення та запуск

1. Встановити залежності:
   npm install
2. Запустити у режимі розробки:
   npm run dev
3. Збірка для продакшену:
   npm run build
4. Перегляд збірки:
   npm run preview

### Структура проєкту

```
my-react-app/
├── src/
│  ├── app/
│  │  ├── store.js         # Основний Redux store
│  │  └── hooks.js         # Кастомні хуки для роботи з Redux
│  ├── components/         # UI-компоненти
│  │  ├── Header.jsx
│  │  ├── Footer.jsx
│  │  └── Button.jsx
│  ├── features/           # Функціональні модулі (зрізи)
│  │  └── posts/
│  │     ├── api/
│  │     │  └── postsApi.js
│  │     ├── components/
│  │     │  ├── PostCard.jsx
│  │     │  ├── PostForm.jsx
│  │     │  └── PostList.jsx
│  │     ├── lib/
│  │     │  └── helpers.js
│  │     ├── model/
│  │     │  └── postsSlice.js
│  │     └── index.js
│  ├── pages/              # Сторінки додатку
│  │  ├── HomePage.jsx
│  │  ├── PostPage.jsx
│  │  ├── EditorPage.jsx
│  │  └── NotFoundPage.jsx
│  ├── services/           # Сервіси для роботи з API та storage
│  │  ├── api/
│  │  │  └── baseApi.js
│  │  └── storage/
│  │     └── localStorage.js
│  ├── shared/
│  │  └── styles/
│  ├── layouts/
│  │  └── MainLayout.jsx
│  ├── routes/
│  │  └── AppRoutes.jsx
│  ├── assets/
│  ├── App.jsx
│  ├── main.jsx
│  ├── App.css
│  └── index.css
├── package.json
├── README.md
└── ...
```
