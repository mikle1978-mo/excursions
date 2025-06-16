// src/hooks.server.js
import { connectToDatabase } from "$lib/server/mongodb";
let warmedUp = false;
const removedUrls = new Set([
    "/catalog/66179550f9abd2efcefd96f6",
    "/catalog/6558b6dee1d2bd54066f45a2",
    "/catalog/660165161a189298ce36b985",
    "/catalog/668c0690a05e18ec8c213c42",
    "/catalog/668bf7f5c2e35e0e2e7d411a",
    "/catalog/668da516522d40160a263ce2",
    "/catalog/66634f171113afc7a6043b2f",
    "/catalog/66168599c0aaa94bc7fef044",
    "/catalog/category/products",
    "/catalog/6558b978e1d2bd54066f45d0",
    "/catalog/6616f98f69f625fbe9a56982",
    "/catalog/6705020f4014851056b1d8dd",
    "/catalog/6601aec314f830a0474ce067",
    "/catalog/668d1d6a1207f4b219595286",
    "/catalog/6606d3b849eb8d1ad42335ca",
    "/catalog/6605597439c97f4b53fe7d3e",
    "/catalog/668c10dab434f56955bf9508",
    "/catalog/category/underwear",
    "/catalog/category/health",
    "/catalog/66159bb5f659fa83fe90c4ab",
    "/catalog/6606e662bbfd47231f81d94b",
    "/catalog/category/cheeses",
    "/catalog/668c169cfa0ce7b9ef1a0398",
    "/landings/tosellers/conditions",
    "/catalog/668bcaf8b213f0109037fe2a",
    "/catalog/668d2406272c40ba8bf46a2c",
    "/catalog/666c5ab996e62f53babb75f4",
    "/catalog/668c05cc9cc34767776a245b",
    "/catalog/668bc973b213f0109037ef82",
    "/catalog/668d1e6b7ea31e06d031b5c3",
    "/catalog/668c04949cc34767776a034f",
    "/catalog/668ef7e399d601dce3b3f6f7",
    "/catalog/6666cc8df0a8cddafa9de675",
    "/catalog/6616dbe2ca9ca948a5c2e5f4",
    "/catalog/668c09dea05e18ec8c2216ee",
    "/catalog/668c0efbb217029e05b93b56",
    "/catalog/668c11d599f0daad96763c52",
    "/catalog/668bc502b213f0109037b816",
    "/catalog/6606e398a194c7f26aaf78b0",
    "/catalog/668bd3f59176ce8a617e03d7",
    "/landings/toadvertisers/banner",
    "/catalog/668d26478375cf2bd8d34853",
    "/catalog/668d24b3272c40ba8bf47b70",
    "/catalog/6606dadca194c7f26aaf6dfd",
    "/catalog/668bfa75911b7018b392b097",
    "/catalog/668ef9439f6f1a2515b2b2e0",
    "/catalog/668bfd01911b7018b392dce1",
    "/catalog/660d08c6eea04f0282972ed6",
    "/catalog/668c0c8e7abe45bb06ebc3f5",
    "/catalog/668bf934911b7018b3928333",
    "/catalog/668c0384ec04c6c018521a67",
    "/catalog/661517b377b1d03b7fd94313",
    "/catalog/668c19e1b45a92b6e36c28e3",
    "/catalog/668c0f6db217029e05b94d01",
    "/catalog/668bfc01911b7018b392d2d3",
    "/catalog/6702af67e69594155f5d7382",
    "/catalog/661682006deead7d82aaf969",
    "/catalog/66166bf1f0eccc5d056abf55",
    "/landings/canyon",
    "/catalog/6616e14d3c5d4d87d7b3587f",
    "/catalog/6655c9f8e1458807d65f8d4c",
    "/landings/tosellers/prices",
    "/catalog/668c06fba05e18ec8c219763",
    "/catalog/668c15a0fa0ce7b9ef19b59e",
    "/catalog/66165d27d0936b8533cee64e",
    "/catalog/668c03c4ec04c6c018523f51",
    "/catalog/668bdaf029dc908971e2e5ca",
    "/catalog/668eeb1c2d5a6c58f3e80329",
    "/catalog/66055a5039c97f4b53fe7e71",
    "/catalog/66057c20c901d50c414b34c3",
    "/catalog/category/sauces",
]);

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // Проверка локали в куки
    const cookieLocale = event.cookies.get("locale");

    // Проверяем, чтобы была либо ru, либо en, иначе дефолт en
    event.locals.locale = cookieLocale === "ru" ? "ru" : "en";

    // 410 Gone check
    if (removedUrls.has(event.url.pathname)) {
        return new Response("Gone", { status: 410 });
    }

    // Прогрев MongoDB при первом запросе

    if (!warmedUp) {
        console.log("⏱ Прогреваем MongoDB на первом запросе");
        warmedUp = true;
        await connectToDatabase();
    }

    return resolve(event);
}
