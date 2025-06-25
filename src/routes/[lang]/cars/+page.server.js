import { composeCards } from "$lib/server/cards/composeCards";

export async function load() {
    const cars = await composeCards({
        type: "cars",
        translationCollection: "cars_translations",
        lang: "en",
    });

    return { cars };
}
