// src/routes/(app)/[lang]/+layout.server.js

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
    const segments = url.pathname.split("/").filter(Boolean);

    const lang = segments[0]; // ru | en
    const type = segments[1] ?? null; // excursions | yachts | ...

    return {
        lang,
        type,
    };
}
