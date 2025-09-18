# Products Catalog — NestJS + React

Полнофункциональное приложение каталога товаров: CRUD, загрузка/удаление фото, пагинация, фильтрация, сортировка. Проект полностью контейнеризован (Docker) и имеет аккуратную фронтенд-архитектуру с переиспользуемыми UI-компонентами.

## Стек

- Backend: NestJS, TypeScript, TypeORM, PostgreSQL, Multer, Zod
- Frontend: React, TypeScript, Vite, TanStack Query, Tailwind CSS, Mantine UI, Redux Toolkit
- Инфраструктура: Docker, Docker Compose

## Возможности

- Товары: создание, просмотр, редактирование, удаление
- Фото: загрузка и удаление, раздача статики `/uploads/*`
- Каталог: пагинация, фильтрация (поиск, цена), сортировка (`title`, `price`, `discountedPrice`, `sku`)
- Страницы: список, карточка товара, создание, редактирование
- UX: дебаунс поиска, скелетоны/спиннеры загрузки, понятные ошибки

## Быстрый старт (Docker)

Требования: установлен Docker и Docker Compose

```bash
# из корня репозитория
docker compose build
docker compose up -d
```

Открыть в браузере:

- Клиент: http://localhost:3000
- API: http://localhost:3001/api
- Health: http://localhost:3001/api/health

Файлы загрузок:

- Путь в контейнере: `/app/uploads`
- Volume: `uploads-data` (персистентно)
- Публичный URL: `/uploads/<filename>`

## Переменные окружения

### Backend (`server/.env`)

```
PORT=3001
API_PREFIX=api
UPLOADS_DIR=uploads
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=products_db
NODE_ENV=development
```

### Frontend (`client/.env` — опционально)

```
VITE_API_URL=http://localhost:3001/api
```

Если переменная не задана, используется `http://localhost:3001/api` по умолчанию.

## Локальная разработка (без Docker)

### Backend

```bash
cd server
npm i
npm run start:dev
```

API базовый путь: `http://localhost:3001/api`.

### Frontend

```bash
cd client
npm i
npm run dev
```

Открыть: http://localhost:5173

## API (основные эндпоинты)

- `GET    /api/products` — список (query: `page`, `limit`, `q`, `sortBy`, `order`, `minPrice`, `maxPrice`)
- `GET    /api/products/:id` — детально
- `POST   /api/products` — создать
- `PATCH  /api/products/:id` — обновить
- `DELETE /api/products/:id` — удалить
- `POST   /api/products/:id/photo` — загрузить фото (multipart/form-data, поле `file`)
- `DELETE /api/products/:id/photo` — удалить фото

Пример ответа списка:

```json
{
  "items": [
    {
      "id": 1,
      "title": "Product",
      "description": "...",
      "price": 100.0,
      "discountedPrice": 90.0,
      "sku": "SKU-1",
      "photoPath": "/uploads/abc.jpg",
      "createdAt": "2025-09-18T10:00:00.000Z",
      "updatedAt": "2025-09-18T10:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

## Структура проекта (ключевые части)

```
server/src
  common/filters/http-exception.filter.ts   # единый формат HTTP-ошибок
  common/pipes/zod-validation.pipe.ts       # валидация Zod для DTO/квери
  common/upload/upload.util.ts              # конфиг Multer, безопасное удаление
  products/                                 # entity, controller, service, dto (zod)
  config.ts                                 # рантайм-конфиг (порты, БД, префикс, uploads)
  main.ts                                   # запуск, префикс API, статика /uploads, health

client/src
  app/                                      # store (Redux), hooks, провайдеры
  entities/product/                         # API и React Query hooks
  features/productForm/                     # универсальная форма товара (create/edit)
  features/productList/                     # параметры списка (slice, селекторы)
  pages/                                    # список, детальная, create, edit
  shared/api/types.ts                       # типы: Product, ListResponse, ProductListParams
  shared/lib/apiClient.ts                   # axios instance + buildUploadUrl
  shared/ui/                                # Button, Pagination, LoadingSpinner, Skeleton, Layout, ProductCard
```

## Скрипты

### Backend (server)

- `npm run start:dev` — dev-сервер Nest
- `npm run build` — сборка prod
- `npm run start` — запуск prod (`dist`)

### Frontend (client)

- `npm run dev` — Vite dev-сервер
- `npm run build` — сборка
- `npm run preview` — предпросмотр сборки

## Конвенции и решения

- Валидация: Zod на бэке (строгие правила, включая `discountedPrice ≤ price` и лимит для `decimal(10,2)`); согласованные схемы на фронте
- Данные: React Query (кэш, статус, keepPreviousData), Redux Toolkit — только для параметров списка
- Стили: Tailwind + переиспользуемые компоненты UI
- Импорты: алиасы путей `@/*` (vite + tsconfig)
- Файлы: хранение в Docker volume `uploads-data`, публичная раздача `/uploads/*`
