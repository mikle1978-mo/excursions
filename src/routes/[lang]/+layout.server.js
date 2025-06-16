// src/routes/[lang=ru|en]/+layout.server.js
export async function load({ locals, params }) {
    // Если lang в пути не совпадает с локалью из куки, можно сделать редирект
    if (params.lang !== locals.locale) {
        return {
            status: 301,
            redirect: `/${locals.locale}`,
        };
    }

    return {
        locale: locals.locale,
    };
}
