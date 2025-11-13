const API_URL = "/api/faq";

/**
 * Удаление FAQ
 */
export async function deleteFaq(id) {
    if (!confirm("Удалить этот FAQ?")) return false;

    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (res.ok) {
        alert("FAQ удалён");
        return true;
    } else {
        const err = await res.json();
        alert(`Ошибка: ${err.error || "Не удалось удалить FAQ"}`);
        return false;
    }
}

/**
 * Создание нового FAQ
 */
export async function createFaq(data) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка при создании FAQ");
    }

    return await res.json();
}

/**
 * Обновление FAQ
 */
export async function updateFaq(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка при обновлении FAQ");
    }

    return await res.json();
}

/**
 * Получение одного FAQ
 */
export async function getFaq(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) {
        throw new Error("Не удалось загрузить FAQ");
    }
    return await res.json();
}

/**
 * Дублирование FAQ
 */
export async function duplicateFaq(id) {
    if (!confirm("Дублировать этот FAQ?")) return;

    const res = await fetch(`${API_URL}/duplicate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    });

    if (!res.ok) {
        const err = await res.json();
        alert(`Ошибка: ${err.error || "Не удалось продублировать"}`);
        return;
    }

    return true;
}

/**
 * Импорт FAQ из JSON
 */
export async function importFaqs(faqsArray) {
    if (!Array.isArray(faqsArray)) {
        alert("Формат JSON должен быть массивом FAQ");
        return false;
    }

    const res = await fetch(`${API_URL}/import`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ faqs: faqsArray }),
    });

    if (!res.ok) {
        const err = await res.json();
        alert(`Ошибка: ${err.error || "Не удалось импортировать"}`);
        return false;
    }

    alert("Импорт завершён успешно");
    return true;
}
