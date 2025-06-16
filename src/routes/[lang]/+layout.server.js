import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export function load({ cookies, params }) {
    const cookieLocale = cookies.get("locale");

    // Если куки есть и не совпадают с URL
    if (cookieLocale && cookieLocale !== params.lang) {
        throw redirect(307, `/${cookieLocale}`);
    }

    // Если куки нет — записываем текущую локаль
    if (!cookieLocale) {
        cookies.set("locale", params.lang, {
            path: "/",
            httpOnly: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30, // 30 дней
        });
    }

    return {
        locale: params.lang,
    };
}
