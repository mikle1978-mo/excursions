const API_URL = "/api/yachts";

/**
 * Удаление экскурсии
 */
export async function deleteYacht(slug) {
    if (!confirm("Удалить яхту?")) return false;

    const res = await fetch(`${API_URL}/${slug}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
    });

    if (res.ok) {
        alert("Яхта удалена");
        return true;
    } else {
        const err = await res.json();
        alert(`Ошибка: ${err.error || "Не удалось удалить"}`);
        return false;
    }
}

/**
 * Создание новой яхты
 */
export async function createYacht(data) {
    console.log("Пришлов обработчик:", data);

    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    console.log("====================================");
    console.log("Ответ от сервера:", res);
    console.log("====================================");

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка при создании яхты");
    }

    return await res.json();
}

/**
 * Обновление яхты
 */
export async function updateYacht(slug, data) {
    const res = await fetch(`${API_URL}/${slug}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка при обновлении яхты");
    }

    return await res.json();
}

/**
 * Получение одной яхты по slug
 */
export async function getYacht(slug) {
    const res = await fetch(`${API_URL}/${slug}`);
    if (!res.ok) {
        throw new Error("Не удалось загрузить яхту");
    }
    return await res.json();
}

/**
 * Дублирование одной Яхты
 */

export async function duplicateYacht(slug) {
    if (!confirm("Дублировать эту яхту?")) return;

    const res = await fetch(`${API_URL}/duplicate`, {
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
