import { composeCards } from "$lib/server/cards/composeCards";

export async function load() {
    const yachts = await composeCards({
        type: "yachts",
        translationCollection: "yachts_translations",
    });

    return { yachts };
}
