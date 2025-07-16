/**
 * Универсальный экспорт массива объектов в CSV
 * @param {Object[]} items - массив объектов
 * @param {string} fileName - имя файла
 * @param {Object} [columnMap] - ключи: поля, значения: заголовки
 */
export function exportToCSV(items, fileName = "data", columnMap = null) {
    if (!Array.isArray(items) || items.length === 0) {
        alert("Нет данных для экспорта");
        return;
    }

    const keys = columnMap ? Object.keys(columnMap) : Object.keys(items[0]);
    const headers = columnMap
        ? keys.map((k) => `"${columnMap[k]}"`)
        : keys.map((k) => `"${k}"`);

    const rows = items.map((item) =>
        keys.map((key) => {
            let value = item[key];
            if (typeof value === "object" && value !== null) {
                value = JSON.stringify(value);
            }
            return `"${String(value).replace(/"/g, '""')}"`;
        })
    );

    const csv = [headers, ...rows].map((r) => r.join(";")).join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
