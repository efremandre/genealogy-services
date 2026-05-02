This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Genealogy Services Frontend

Это фронтенд-приложение для сервиса построения генеалогического древа. Приложение позволяет пользователям аутентифицироваться, управлять данными о людях и визуализировать генеалогические деревья.

### Технологии

- **Next.js 16** - React фреймворк с App Router
- **React 19** - UI библиотека
- **TypeScript** - Типизированный JavaScript
- **TanStack React Query** - Управление состоянием и API запросами
- **Tailwind CSS** - Стилизация
- **React Hook Form + Zod** - Формы и валидация
- **React Flow** - Визуализация деревьев

### Архитектура

Проект использует feature-based архитектуру:

- `app/` - Next.js App Router страницы и layouts
- `features/` - Фичи приложения (auth, persons, tree)
- `shared/` - Общие утилиты (API клиент, конфиг, токены)
- `widgets/` - Переиспользуемые компоненты (header, footer)

### Установка и запуск

1. Установите зависимости:
```bash
pnpm install
```

2. Запустите базу данных (через Docker Compose в backend):
```bash
# Из папки backend/genealogy-api
docker-compose up -d
```

3. Запустите backend:
```bash
# Из папки backend/genealogy-api
go run ./cmd/api/main.go
```

4. Запустите frontend:
```bash
pnpm run dev
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000).

### Скрипты

- `pnpm run dev` - Запуск dev сервера
- `pnpm run build` - Сборка для продакшена
- `pnpm run start` - Запуск продакшен сборки
- `pnpm run lint` - Проверка ESLint

### Переменные окружения

Создайте `.env.local` файл:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### API

Приложение взаимодействует с Go backend API:

- `POST /auth/login` - Вход
- `POST /auth/register` - Регистрация
- `GET /persons` - Получение списка людей
- `GET /tree` - Получение деревьев

### Структура проекта

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Страницы аутентификации
│   ├── (main)/                   # Защищенные страницы
│   ├── layout.tsx                # Корневой layout
│   ├── page.tsx                  # Главная страница
│   └── providers.tsx             # Провайдеры (React Query)
├── features/                     # Фичи
│   ├── auth/                     # Аутентификация
│   │   ├── api/                  # API вызовы
│   │   ├── model/                # Хуки и типы
│   │   └── ui/                   # Компоненты
│   ├── persons/                  # Персоны дерева
│   └── tree/                     # Деревья
├── shared/                       # Общие утилиты
│   ├── api/                      # API клиент
│   ├── config/                   # Конфигурация
│   └── lib/                      # Утилиты
└── widgets/                      # Виджеты
    ├── header/                   # Шапка
    └── footer/                   # Подвал
```

### Разработка

- Используйте feature-based подход для новых функций
- Добавляйте типы TypeScript для всех данных
- Используйте React Query для API запросов
- Следуйте конвенциям Next.js App Router

### Документация кода

Код документирован с помощью JSDoc комментариев. JSDoc - это стандарт для документирования JavaScript/TypeScript кода, который позволяет автоматически генерировать документацию из комментариев в коде.

Примеры JSDoc в проекте:
- Функции с описанием параметров и возвращаемых значений
- Типы и интерфейсы с описаниями
- Примеры использования

Для генерации документации можно использовать инструменты вроде TypeDoc или JSDoc CLI.
