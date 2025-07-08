import { composeCards } from "$lib/server/cards/composeCards";

export async function load() {
    const transfers = await composeCards({
        type: "transfers",
        translationCollection: "transfers_translations",
        lang: "en",
    });

    return { transfers };
}
