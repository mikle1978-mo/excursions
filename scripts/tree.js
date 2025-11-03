// scripts/tree.js
import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function scanDir(dir, prefix = "") {
    const items = fs.readdirSync(dir);
    items.forEach((item, index) => {
        const fullPath = path.join(dir, item);
        const isLast = index === items.length - 1;
        const stats = fs.statSync(fullPath);
        const connector = isLast ? "└---" : "+---";
        if (stats.isDirectory()) {
            console.log(`${prefix}${connector}${item}`);
            scanDir(fullPath, `${prefix}${isLast ? "    " : "|   "}`);
        } else {
            console.log(`${prefix}|   ${item}`);
        }
    });
}

// Путь к src
const rootDir = path.resolve(__dirname, "../src");
console.log(rootDir);
scanDir(rootDir);
