// src\routes\(app)\[lang]\[type]\+page.server.js

export async function load({ fetch, parent, params }) {
    const { lang } = await parent();
    const { type } = params;

    const res = await fetch(`/api/${lang}/${type}`);
    const items = await res.json();

    return { items, lang, type };
}
