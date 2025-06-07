const API_URL = "/api/excursions";

/**
 * Удаление экскурсии
 */
export async function deleteExcursion(slug) {
    if (!confirm("Удалить экскурсию?")) return false;

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
export async function createExcursion(data) {
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
export async function updateExcursion(slug, data) {
    const res = await fetch(`${API_URL}/${slug}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка при обновлении экскурсии");
    }

    return await res.json();
}

/**
 * Получение одной экскурсии
 */
export async function getExcursion(slug) {
    const res = await fetch(`${API_URL}/${slug}`);
    if (!res.ok) {
        throw new Error("Не удалось загрузить экскурсию");
    }
    return await res.json();
}

/**
 * Дублирование одной экскурсии
 */

export async function duplicateExcursion(slug) {
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

export async function getAllExcursionsSlugs() {
    const db = await connectToDatabase();
    const excursions = await db
        .collection("excursions")
        .find({}, { projection: { slug: 1 } })
        .toArray();
    return excursions.map((e) => e.slug);
}
