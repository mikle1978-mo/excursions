import { composeCards } from "$lib/server/cards/composeCards";

export async function load() {
    const excursions = await composeCards({
        type: "excursions",
        translationCollection: "excursions_translations",
        lang: "en",
    });

    return { excursions };
}
