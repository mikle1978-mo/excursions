/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
    const lang = params.lang || "en"; // если lang в URL есть — взять, иначе en
    return { lang };
}
