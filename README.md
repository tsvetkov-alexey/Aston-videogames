# Aston: videogames

Данный проект представляет собой агрегатор различных видеоигр.

Реализованы следующие требования к функциональности:

## 1 уровень (необходимый минимум)

### React

- Функциональные компоненты c хуками в приоритете над классовыми

- Есть разделение на [умные](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/pages/Home.tsx) и [глупые](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/layouts/MainLayout.tsx) компоненты

- Есть [рендеринг списков](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/pages/Home.tsx)

- Реализована хотя бы одна [форма](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/components/Form.tsx)

- Есть применение [Контекст API](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/pages/SignIn.tsx)

- Есть применение предохранителя [тут](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/App.tsx) и [тут](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/layouts/ErrorLayout.tsx)

- Есть хотя бы один кастомный хук: [useAuth](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/hooks/useAuth.ts)

- Хотя бы несколько компонентов используют PropTypes: [GameCard](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/components/GameCard.tsx) и [SearchHistory](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/components/SearchHistory.tsx)

- Поиск не должен триггерить много запросов к серверу: [useDebounce](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/components/Search.tsx)

- Есть применение [lazy](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/router/routerConfig.ts) + [Suspense](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/router/index.tsx)

### Redux

- Используется [Modern Redux with Redux Toolkit](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/redux/store.ts)

- Используются [слайсы](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/redux/users/slice.ts)

- Есть хотя бы одна [кастомная мидлвара](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/redux/middleware/isAuthMiddleware.ts)

- Используется [RTK Query](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/services/GameService.ts)

- Используется [Transforming Responses](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/services/GameService.ts)

## 2 уровень

- Использован TypeScript

- Использование Firebase для [учетных записей пользователей](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/firebase.ts) их [Избранного](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/redux/favourite/slice.ts) и [Истории поиска](https://github.com/tsvetkov-alexey/Aston-videogames/blob/main/src/redux/history/slice.ts)

## API

В данном проекте был использован mokapi для для получения данных об играх.

Mokapi - это инструмент для создания фейкового (mock) API для разработки и тестирования приложений. Он позволяет эмулировать серверное взаимодействие и предоставлять тестовые данные через API-эндпоинты.
