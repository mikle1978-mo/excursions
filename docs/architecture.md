# 📘 Архитектура проекта

## 🔄 Поток данных (Data Flow)

```text
Компонент (Svelte)
  ↓ вызывает
Actions (src/lib/utils/itemsActions.js)
  ↓ обращается к
API (src/routes/api/[entity]/...)
  ↓ вызывает
Services (src/lib/server/utils/[entity]Service.js)
  ↓ обращается к
Базе данных (MongoDB)
  ↓ возвращает
данные → mergeWithDefaults() → UI
```

---

## 🧱 Уровни ответственности

| Уровень         | Расположение                              | Ответственность                                                                                                |
| --------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **UI**          | `src/lib/components/admin/`               | Отображает поля формы, рендерит по схеме (ObjectField, ArrayField, PrimitiveField). Не содержит логики данных. |
| **Actions**     | `src/lib/utils/itemsActions.js`           | Вызовы API (fetch), передача данных с фронта на сервер. Минимум логики.                                        |
| **API routes**  | `src/routes/api/[entity]/+server.js`      | Валидация, разбор тела запроса, возврат JSON-ответа.                                                           |
| **Services**    | `src/lib/server/utils/[entity]Service.js` | Работа с базой данных: create, get, update, delete. Обрабатывает локализованные поля и слияние с дефолтами.    |
| **Schemas**     | `src/lib/schemas/[entity]Schema.js`       | Описывает структуру данных и дефолтные значения (через Zod).                                                   |
| **Merge Layer** | `src/lib/utils/mergeWithDefaults.js`      | Сопоставляет данные из базы со схемой, добавляя недостающие поля и дефолты.                                    |

---

## 🥉 Пример цепочки

### Получение данных (GET)

1. UI вызывает `getItem(slug, 'blogs')` из **itemsActions.js**
2. API `/api/blogs/[slug]` вызывает `getItemFromDB(slug, 'blogs')`
3. `getItemFromDB` обращается к MongoDB
4. Полученные данные проходят через `mergeWithDefaults(blogSchema, data)`
5. UI получает готовые данные, полностью соответствующие схеме

### Сохранение данных (POST/PUT)

1. UI собирает данные из формы
2. Отправляет их через action `createItem('blogs', formData)`
3. API принимает, валидирует через `blogSchema.parse()`
4. `createItemInDB` сохраняет в MongoDB
5. Возвращает обновлённый объект клиенту

---

## 🗂️ Структура проекта

```
src/
 ├── lib/
 │   ├── components/admin/
 │   │   ├── UniversalForm.svelte
 │   │   ├── ObjectField.svelte
 │   │   ├── ArrayField.svelte
 │   │   └── PrimitiveField.svelte
 │   ├── schemas/
 │   │   └── blogSchema.js
 │   ├── utils/
 │   │   ├── itemsActions.js
 │   │   ├── mergeWithDefaults.js
 │   │   └── helpers.js
 │   └── server/utils/
 │       ├── blogService.js
 │       └── db.js
 ├── routes/api/blogs/
 │   ├── +server.js
 │   └── [slug]/+server.js
 └── app.html
```

---

## 🥰 mergeWithDefaults.js

Файл, который гарантирует, что форма **всегда получает полные данные**, даже если в базе чего-то нет.

```js
export function mergeWithDefaults(schemaDefaults, dbData = {}) {
    if (Array.isArray(schemaDefaults)) return dbData || [];

    const merged = { ...schemaDefaults };
    for (const key in schemaDefaults) {
        const val = dbData?.[key];
        if (val === undefined || val === null) continue;

        if (Array.isArray(val) && Array.isArray(schemaDefaults[key])) {
            merged[key] = val.map((v, i) =>
                mergeWithDefaults(schemaDefaults[key][0], v)
            );
        } else if (
            typeof val === "object" &&
            typeof schemaDefaults[key] === "object"
        ) {
            merged[key] = mergeWithDefaults(schemaDefaults[key], val);
        } else {
            merged[key] = val;
        }
    }
    return merged;
}
```

---

## 🥮 Принципы проектирования

1. **Схема — источник истины.** Все формы, валидации и структура интерфейса строятся на основе схемы.
2. **UI тупой.** Компоненты не содержат логики обработки данных — они только рендерят поля, полученные из схемы.
3. **Actions минимальны.** Все, что касается обработки данных, должно происходить на сервере или в merge-функциях.
4. **Слияние с дефолтами на сервере.** При получении данных из базы они нормализуются по схеме до передачи на фронт.
5. **Кэширование.** Для ускорения работы используется Redis с TTL и безопасной сериализацией.
6. **Локализация.** Локализованные поля хранятся отдельно и собираются вместе через сервисы для удобного использования в UI.
7. **Однонаправленный поток.** Данные проходят через API → Service → Merge → UI, редактирование отправляется обратно через API → Service → База.

---

Эта документация описывает текущую архитектуру и рекомендации по работе с апи
