const API_URL = "/api/transfers";

/**
 * Удаление трансфера
 */
export async function deleteTransfer(slug) {
    if (!confirm("Удалить Трансфер?")) return false;

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
 * Создание новой трансфера
 */
export async function createTransfer(data) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка при создании трансфера");
    }

    return await res.json();
}

/**
 * Обновление трансфера
 */
export async function updateTransfer(slug, data) {
    const res = await fetch(`${API_URL}/${slug}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка при обновлении трансфера");
    }

    return await res.json();
}

/**
 * Получение однго трансфера
 */
export async function getTransfer(slug) {
    const res = await fetch(`${API_URL}/${slug}`);
    if (!res.ok) {
        throw new Error("Не удалось загрузить экскурсию");
    }
    return await res.json();
}

/**
 * Дублирование однго трансфера
 */

export async function duplicateTransfer(slug) {
    if (!confirm("Дублировать эту экскурсию?")) return;

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
export async function toggleTransferActive(slug, active) {
    const res = await fetch("/api/transfers/toggle-active", {
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
