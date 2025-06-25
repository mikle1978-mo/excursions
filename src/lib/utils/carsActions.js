const API_URL = "/api/cars";

/**
 * Удаление экскурсии
 */
export async function deleteCar(slug) {
    if (!confirm("Удалить машину?")) return false;

    const res = await fetch(`${API_URL}/${slug}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
    });

    if (res.ok) {
        alert("Экскурсия удалена");
        return true;
    } else {
        const err = await res.json();
        alert(`Ошибка: ${err.error || "Не удалось удалить"}`);
        return false;
    }
}

/**
 * Создание новой экскурсии
 */
export async function createCar(data) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка при создании экскурсии");
    }

    return await res.json();
}

/**
 * Обновление экскурсии
 */
export async function updateCar(slug, data) {
    const res = await fetch(`${API_URL}/${slug}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка при обновлении машины");
    }

    return await res.json();
}

/**
 * Получение одной машины по slug
 * @param {string} slug - Уникальный идентификатор машины
 */
export async function getCar(slug) {
    const res = await fetch(`${API_URL}/${slug}`);
    if (!res.ok) {
        throw new Error("Не удалось загрузить машину");
    }
    return await res.json();
}

/**
 * Дублирование одной машины
 * @param {string} slug - Уникальный идентификатор машины
 */

export async function duplicateCar(slug) {
    if (!confirm("Дублировать эту машину?")) return;

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

/**
 * Обновление статуса "active"
 */
export async function toggleCarActive(slug, active) {
    const res = await fetch(`${API_URL}/toggle-active`, {
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
