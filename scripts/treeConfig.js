// scripts/treeConfig.js
// npx vite-node scripts/treeConfig.js

import fs from "fs";
import path from "path";
import { appConfig } from "../src/lib/config/app.config.js";

/**
 * Рекурсивная функция для построения дерева объекта
 * @param {object} obj — объект для обхода
 * @param {string} prefix — отступ
 * @param {boolean} isLast — является ли последний элемент на этом уровне
 */
function buildTree(obj, prefix = "", isLast = true) {
    const lines = [];
    const keys = Object.keys(obj);

    keys.forEach((key, index) => {
        const value = obj[key];

        // Пропускаем папку/ключ "+schema"
        if (key === "+schema") return;

        const last = index === keys.length - 1;
        const connector = last ? "L---" : "+---";

        if (value && typeof value === "object" && !Array.isArray(value)) {
            lines.push(`${prefix}${connector}${key}`);
            lines.push(
                ...buildTree(value, `${prefix}${last ? "    " : "|   "}`, last)
            );
        } else if (Array.isArray(value)) {
            lines.push(`${prefix}${connector}${key}[]`);
        } else {
            // Игнорируем функции (методы) и любые строки, содержащие "zod" или "schema"
            if (
                typeof value !== "function" &&
                !String(value).toLowerCase().includes("zod")
            ) {
                lines.push(`${prefix}${connector}${key}`);
            }
        }
    });

    return lines;
}

// Генерация дерева
const treeLines = buildTree(appConfig);
const treeStr = treeLines.join("\n");

// Путь к файлу
const outPath = path.resolve("CONFIG_TREE.txt");
fs.writeFileSync(outPath, treeStr, "utf-8");
console.log(`Tree saved to ${outPath}`);
