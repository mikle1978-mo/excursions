/**
 * Универсальные actions для CRUD по типу услуги
 */
function getApiUrl(type) {
    return `/api/admin/${type}`;
}
function getCollection(type) {
    // return type + "s";
    return type;
}

/**
 * Удаление
 */
export async function deleteItem(type, slug) {
    if (!confirm("Удалить элемент?")) return false;
    const collection = getCollection(type);
    const res = await fetch(`${getApiUrl(collection)}/${slug}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
    });

    if (res.ok) {
        alert("Элемент удалён");
        return true;
    } else {
        const err = await res.json();
        alert(`Ошибка: ${err.error || "Не удалось удалить"}`);
        return false;
    }
}

/**
 * Создание
 */
export async function createItem(type, data) {
    const res = await fetch(getApiUrl(type), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка при создании");
    }

    return await res.json();
}

/**
 * Обновление
 */
export async function updateItem(type, slug, data) {
    const collection = getCollection(type);
    const res = await fetch(`${getApiUrl(collection)}/${slug}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка при обновлении");
    }

    return await res.json();
}

/**
 * Получение
 */
export async function getItem(type, slug) {
    const collection = getCollection(type);
    const res = await fetch(`${getApiUrl(collection)}/${slug}`);
    if (!res.ok) {
        throw new Error("Не удалось загрузить");
    }
    return await res.json();
}

/**
 * Дублирование
 */
export async function duplicateItem(type, slug) {
    const collection = getCollection(type);
    if (!confirm("Дублировать элемент?")) return;

    const res = await fetch(`${getApiUrl(collection)}/duplicate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
    });

    if (!res.ok) {
        const err = await res.json();
        alert(`Ошибка: ${err.error || "Не удалось продублировать"}`);
        return;
    }

    const { newSlug } = await res.json();
    return newSlug;
}

/**
 * Обновление статуса "active"
 */
export async function toggleItemActive(type, slug, active) {
    const res = await fetch(`${getApiUrl(type)}/toggle-active`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, active }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка при обновлении статуса");
    }

    return true;
}
